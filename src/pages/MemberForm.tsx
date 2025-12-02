import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
<<<<<<< HEAD
import axios from "axios";
=======
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import LocationForm from "../components/LocationForm";
<<<<<<< HEAD
import { translateBatch } from "../lib/translate";

interface PostOffice {
  Name: string;
  District: string;
  Block: string;
}
=======
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c

export default function MemberForm() {
  const { id } = useParams();
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [addressLoading, setAddressLoading] = useState(false);
=======
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
  const [formData, setFormData] = useState({
    joining_date: new Date().toISOString().split("T")[0],
    full_name: "",
    mobile: "",
    state: "महाराष्ट्र",
    district: "",
    taluka: "",
    village: "",
    post: "",
    pincode: "",
    notes: "",
  });

<<<<<<< HEAD
  const [fetchedDistricts, setFetchedDistricts] = useState<string[]>([]);
  const [fetchedTalukas, setFetchedTalukas] = useState<string[]>([]);
  const [fetchedVillages, setFetchedVillages] = useState<string[]>([]);

=======
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
  useEffect(() => {
    if (id) fetchMember();
  }, [id]);

<<<<<<< HEAD


  const fetchAddressDetails = async (type: 'pincode' | 'postoffice', value: string) => {
    setAddressLoading(true);
    try {
      const endpoint = type === 'pincode'
        ? `https://api.postalpincode.in/pincode/${value}`
        : `https://api.postalpincode.in/postoffice/${value}`;

      const response = await axios.get(endpoint);
      const data = response.data[0];

      if (data.Status === "Success" && data.PostOffice && data.PostOffice.length > 0) {
        const postOffices = data.PostOffice;

        // Extract unique values
        // Extract unique values and filter out invalid ones
        const isValidValue = (val: unknown): val is string => {
          return typeof val === 'string' &&
            val !== "NA" &&
            val !== "Null" &&
            val !== "Undefined" &&
            val.trim() !== "";
        };

        const districts = [...new Set(postOffices.map((po: PostOffice) => po.District))].filter(isValidValue) as string[];
        let talukas = [...new Set(postOffices.map((po: PostOffice) => po.Block))].filter(isValidValue) as string[];

        // Fallback: If no valid Talukas found (e.g. for "Arjuni"), use Post Office Names
        if (talukas.length === 0) {
          talukas = [...new Set(postOffices.map((po: PostOffice) => po.Name))].filter(isValidValue) as string[];
        }

        const villages = [...new Set(postOffices.map((po: PostOffice) => po.Name))].filter(isValidValue) as string[];

        // Translate to Marathi
        const [translatedDistricts, translatedTalukas, translatedVillages] = await Promise.all([
          translateBatch(districts),
          translateBatch(talukas),
          translateBatch(villages)
        ]);

        setFetchedDistricts(translatedDistricts);
        setFetchedTalukas(translatedTalukas);
        setFetchedVillages(translatedVillages);

        // Auto-select if only one option
        setFormData((prev) => {
          const newState = { ...prev };
          let updated = false;

          if (translatedDistricts.length === 1) {
            newState.district = translatedDistricts[0];
            updated = true;
          }
          if (translatedTalukas.length === 1) {
            newState.taluka = translatedTalukas[0];
            updated = true;
          }

          // Ensure we preserve the pincode that triggered this fetch
          // Although 'prev' should have it, explicitly setting it from the argument is safer if we wanted, 
          // but 'prev' is sufficient since the onChange update happened before this async callback finishes.
          // Actually, to be 100% sure we don't revert, we rely on 'prev'.

          return updated ? newState : prev;
        });
      } else {
        // Reset if invalid pincode or no data
        setFetchedDistricts([]);
        setFetchedTalukas([]);
        setFetchedVillages([]);
      }
    } catch (error) {
      console.error("Error fetching address details:", error);
    } finally {
      setAddressLoading(false);
    }
  };

=======
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
  const fetchMember = async () => {
    try {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) setFormData({ ...data });
    } catch (error) {
      console.error("Error fetching member:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        const { error } = await supabase
          .from("members")
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("members")
          .insert([{ ...formData, added_by: user?.id }]);
        if (error) throw error;
      }

      navigate("/members");
<<<<<<< HEAD
    } catch (error) {
      console.error("Error saving member:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(errorMessage || t("common.error"));
=======
    } catch (error: any) {
      console.error("Error saving member:", error);
      alert(error?.message || t("common.error"));
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/members")}
<<<<<<< HEAD
        className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">{t("member.membersList")}</span>
      </button>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-100">
          {id ? t("member.editMember") : t("member.addMember")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Joining Date & Full Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("member.joiningDate")} <span className="text-red-500">*</span>
=======
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t("member.membersList")}</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {id ? t("member.editMember") : t("member.addMember")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Joining Date & Full Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("member.joiningDate")} *
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
              </label>
              <input
                type="date"
                value={formData.joining_date}
                onChange={(e) =>
                  setFormData({ ...formData, joining_date: e.target.value })
                }
<<<<<<< HEAD
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
=======
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
                {t("member.fullName")} <span className="text-red-500">*</span>
=======
                {t("member.fullName")} *
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
<<<<<<< HEAD
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                placeholder="Enter full name"
=======
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
                required
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
              मोबाईल क्रमांक (Mobile No) <span className="text-red-500">*</span>
=======
              मोबाईल क्रमांक (Mobile No)
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
            </label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
<<<<<<< HEAD
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
=======
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="10 अंकी मोबाईल नंबर लिहा"
              required
            />
          </div>

<<<<<<< HEAD
          {/* Pincode - Moved up for better flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पिनकोड (Pincode)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => {
                    const newPincode = e.target.value;
                    setFormData({ ...formData, pincode: newPincode });
                    if (newPincode.length === 6) {
                      fetchAddressDetails('pincode', newPincode);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  placeholder="उदा. 411001"
                />
                {addressLoading && (
                  <div className="absolute right-3 top-3.5 text-xs font-medium text-orange-600 animate-pulse">
                    Loading...
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter pincode to auto-fill address</p>
            </div>
=======
          {/* Location Section */}
          <LocationForm
            selectedState={formData.state}
            selectedDistrict={formData.district}
            selectedTaluka={formData.taluka}
            selectedVillage={formData.village}
            onStateChange={(state) =>
              setFormData((prev) => ({ ...prev, state }))
            }
            onDistrictChange={(district) =>
              setFormData((prev) => ({ ...prev, district }))
            }
            onTalukaChange={(taluka) =>
              setFormData((prev) => ({ ...prev, taluka }))
            }
            onVillageChange={(village) =>
              setFormData((prev) => ({ ...prev, village }))
            }
          />

          {/* Post & Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पोस्ट (Post)
              </label>
              <input
                type="text"
                value={formData.post}
                onChange={(e) =>
                  setFormData({ ...formData, post: e.target.value })
                }
<<<<<<< HEAD
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                placeholder="पोस्ट ऑफिसचे नाव"
                onBlur={(e) => {
                  if (e.target.value.length > 3) {
                    fetchAddressDetails('postoffice', e.target.value);
                  }
                }}
              />
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Address Details</h3>
            <LocationForm
              selectedState={formData.state}
              selectedDistrict={formData.district}
              selectedTaluka={formData.taluka}
              selectedVillage={formData.village}
              onStateChange={(state) =>
                setFormData((prev) => ({ ...prev, state }))
              }
              onDistrictChange={(district) =>
                setFormData((prev) => ({ ...prev, district }))
              }
              onTalukaChange={(taluka) =>
                setFormData((prev) => ({ ...prev, taluka }))
              }
              onVillageChange={(village) =>
                setFormData((prev) => ({ ...prev, village }))
              }
              districts={fetchedDistricts}
              talukas={fetchedTalukas}
              villages={fetchedVillages}
            />
=======
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="पोस्ट ऑफिसचे नाव"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पिनकोड (Pincode)
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                pattern="[0-9]{6}"
                placeholder="उदा. 411001"
              />
            </div>
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("member.notes")}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={4}
<<<<<<< HEAD
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
              placeholder="Additional notes..."
=======
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
            />
          </div>

          {/* Buttons */}
<<<<<<< HEAD
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-orange-600 text-white px-8 py-3.5 rounded-xl hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
=======
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
            >
              <Save className="w-5 h-5" />
              <span>{loading ? t("common.loading") : t("common.save")}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/members")}
<<<<<<< HEAD
              className="px-8 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
=======
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
            >
              {t("common.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}