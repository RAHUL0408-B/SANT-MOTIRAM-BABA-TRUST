import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface Props {
  selectedState: string;
  selectedDistrict: string;
  selectedTaluka: string;
  selectedVillage: string;
  onStateChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onTalukaChange: (value: string) => void;
  onVillageChange: (value: string) => void;
  // Optional props for dynamic data from API
  districts?: string[];
  talukas?: string[];
  villages?: string[];
}

const LocationForm: React.FC<Props> = ({
  selectedState,
  selectedDistrict,
  selectedTaluka,
  selectedVillage,
  onStateChange,
  onDistrictChange,
  onTalukaChange,
  onVillageChange,
  districts = [],
  talukas = [],
  villages = [],
}) => {
  const { t } = useLanguage();

  const [manualEntry, setManualEntry] = React.useState({
    district: false,
    taluka: false,
    village: false,
  });

  const handleManualToggle = (field: 'district' | 'taluka' | 'village', isManual: boolean) => {
    setManualEntry(prev => ({ ...prev, [field]: isManual }));
    // Reset value when switching back to list
    if (!isManual) {
      if (field === 'district') onDistrictChange('');
      if (field === 'taluka') onTalukaChange('');
      if (field === 'village') onVillageChange('');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* State */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("member.state")}
        </label>
        <input
          type="text"
          value={selectedState || "महाराष्ट्र"}
          onChange={(e) => onStateChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          placeholder={t("member.state")}
        />
      </div>

      {/* District */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("member.district")}
        </label>
        {districts.length > 0 && !manualEntry.district ? (
          <select
            value={selectedDistrict || ""}
            onChange={(e) => {
              if (e.target.value === "MANUAL_ENTRY") {
                handleManualToggle('district', true);
              } else {
                onDistrictChange(e.target.value);
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">{t("common.selectDistrict")}</option>
            {districts.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
            <option value="MANUAL_ENTRY" className="font-bold text-orange-600">
              Other / Manual Entry
            </option>
          </select>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={selectedDistrict || ""}
              onChange={(e) => onDistrictChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder={t("member.district")}
            />
            {districts.length > 0 && (
              <button
                type="button"
                onClick={() => handleManualToggle('district', false)}
                className="px-3 py-2 text-sm text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors whitespace-nowrap"
              >
                Back to List
              </button>
            )}
          </div>
        )}
      </div>

      {/* Taluka */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("member.taluka")}
        </label>
        {talukas.length > 0 && !manualEntry.taluka ? (
          <select
            value={selectedTaluka || ""}
            onChange={(e) => {
              if (e.target.value === "MANUAL_ENTRY") {
                handleManualToggle('taluka', true);
              } else {
                onTalukaChange(e.target.value);
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">{t("common.selectTaluka")}</option>
            {talukas.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
            <option value="MANUAL_ENTRY" className="font-bold text-orange-600">
              Other / Manual Entry
            </option>
          </select>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={selectedTaluka || ""}
              onChange={(e) => onTalukaChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder={t("member.taluka")}
            />
            {talukas.length > 0 && (
              <button
                type="button"
                onClick={() => handleManualToggle('taluka', false)}
                className="px-3 py-2 text-sm text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors whitespace-nowrap"
              >
                Back to List
              </button>
            )}
          </div>
        )}
      </div>

      {/* Village */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("member.village")}
        </label>
        {villages.length > 0 && !manualEntry.village ? (
          <select
            value={selectedVillage || ""}
            onChange={(e) => {
              if (e.target.value === "MANUAL_ENTRY") {
                handleManualToggle('village', true);
              } else {
                onVillageChange(e.target.value);
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">{t("common.selectVillage")}</option>
            {villages.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
            <option value="MANUAL_ENTRY" className="font-bold text-orange-600">
              Other / Manual Entry
            </option>
          </select>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={selectedVillage || ""}
              onChange={(e) => onVillageChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder={t("member.village")}
            />
            {villages.length > 0 && (
              <button
                type="button"
                onClick={() => handleManualToggle('village', false)}
                className="px-3 py-2 text-sm text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors whitespace-nowrap"
              >
                Back to List
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationForm;

