import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, LogOut, Languages } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
  };

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 font-bold text-lg">
              <span className="hidden md:inline">{t('temple.title').substring(0, 30)}...</span>
            </Link>

            <div className="flex space-x-1">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') ? 'bg-orange-800' : 'hover:bg-orange-500'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>{t('nav.dashboard')}</span>
              </Link>

              <Link
                to="/members"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/members') ? 'bg-orange-800' : 'hover:bg-orange-500'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{t('nav.members')}</span>
              </Link>

              <Link
                to="/programs"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/programs') ? 'bg-orange-800' : 'hover:bg-orange-500'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{t('nav.programs')}</span>
              </Link>

              <Link
                to="/temple"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/temple') ? 'bg-orange-800' : 'hover:bg-orange-500'
                }`}
              >
                <span>{t('nav.temple')}</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-500 transition-colors"
            >
              <Languages className="w-4 h-4" />
              <span>{language === 'mr' ? 'EN' : 'मर'}</span>
            </button>

            <div className="text-sm hidden md:block">
              <div className="font-medium">{user.full_name}</div>
              <div className="text-orange-200 text-xs">{user.role}</div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">{t('common.logout')}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};