import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface User {
id: string;
email: string;
full_name: string;
role: string;
created_at?: string;
}

interface AuthContextType {
user: User | null;
loading: boolean;
signUp: (email: string, password: string, fullName: string) => Promise<void>;
signIn: (email: string, password: string) => Promise<void>;
signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
children,
}) => {
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const storedUser = localStorage.getItem("user");
if (storedUser) setUser(JSON.parse(storedUser));
setLoading(false);
}, []);

const signUp = async (email: string, password: string, fullName: string) => {
const bcrypt = await import("bcryptjs");
const hashedPassword = await bcrypt.hash(password, 10);

const { data, error } = await supabase
  .from("users")
  .insert([
    {
      email,
      password: hashedPassword,
      full_name: fullName,
      role: "user",
    },
  ])
  .select()
  .single();

if (error) throw error;

const userData: User = {
  id: data.id,
  email: data.email,
  full_name: data.full_name,
  role: data.role,
  created_at: data.created_at,
};

setUser(userData);
localStorage.setItem("user", JSON.stringify(userData));

};

const signIn = async (email: string, password: string) => {
const { data, error } = await supabase
.from("users")
.select("*")
.eq("email", email)
.maybeSingle();

if (error) throw error;
if (!data) throw new Error("Invalid credentials");

const bcrypt = await import("bcryptjs");
const validPassword = await bcrypt.compare(password, data.password);

if (!validPassword) throw new Error("Invalid credentials");

const userData: User = {
  id: data.id,
  email: data.email,
  full_name: data.full_name,
  role: data.role,
  created_at: data.created_at,
};

setUser(userData);
localStorage.setItem("user", JSON.stringify(userData));

};

const signOut = async () => {
setUser(null);
localStorage.removeItem("user");
};

return (
<AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
{children}
</AuthContext.Provider>
);
};

export const useAuth = () => {
const context = useContext(AuthContext);
if (context === undefined) {
throw new Error("useAuth must be used within an AuthProvider");
}
return context;
};