import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import LocationForm from "../components/LocationForm";

export default function MemberForm() {
  const { id } = useParams();
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (id) fetchMember();
  }, [id]);

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
    } catch (error: any) {
      console.error("Error saving member:", error);
      alert(error?.message || t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/members")}
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
              </label>
              <input
                type="date"
                value={formData.joining_date}
                onChange={(e) =>
                  setFormData({ ...formData, joining_date: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("member.fullName")} *
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              मोबाईल क्रमांक (Mobile No)
            </label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="10 अंकी मोबाईल नंबर लिहा"
              required
            />
          </div>

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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? t("common.loading") : t("common.save")}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/members")}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t("common.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}