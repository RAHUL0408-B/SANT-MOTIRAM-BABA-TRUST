<<<<<<< HEAD
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
=======
import React, { useEffect, useState } from "react";
import maharashtraData from "../data/Maharashtra.json";

interface District {
  district: string;
  subDistricts: {
    subDistrict: string;
    villages: string[];
  }[];
}
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c

interface Props {
  selectedState: string;
  selectedDistrict: string;
  selectedTaluka: string;
  selectedVillage: string;
  onStateChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onTalukaChange: (value: string) => void;
  onVillageChange: (value: string) => void;
<<<<<<< HEAD
  // Optional props for dynamic data from API
  districts?: string[];
  talukas?: string[];
  villages?: string[];
=======
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
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
<<<<<<< HEAD
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
=======
}) => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [talukas, setTalukas] = useState<District["subDistricts"]>([]);
  const [villages, setVillages] = useState<string[]>([]);

  useEffect(() => {
    if (maharashtraData && (maharashtraData as any).districts) {
      setDistricts((maharashtraData as any).districts);
    }
  }, []);

  const handleDistrictChange = (districtName: string) => {
    const district = districts.find((d) => d.district === districtName);
    setTalukas(district ? district.subDistricts : []);
    setVillages([]);
    onDistrictChange(districtName);
    onTalukaChange("");
    onVillageChange("");
    onStateChange("महाराष्ट्र");
  };

  const handleTalukaChange = (talukaName: string) => {
    const taluka = talukas.find((t) => t.subDistrict === talukaName);
    setVillages(taluka ? taluka.villages : []);
    onTalukaChange(talukaName);
    onVillageChange("");
  };

  const handleVillageChange = (villageName: string) => {
    onVillageChange(villageName);
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* State */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
          {t("member.state")}
=======
          राज्य (State)
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
        </label>
        <input
          type="text"
          value={selectedState || "महाराष्ट्र"}
<<<<<<< HEAD
          onChange={(e) => onStateChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          placeholder={t("member.state")}
=======
          readOnly
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg"
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
        />
      </div>

      {/* District */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
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
=======
          जिल्हा (District)
        </label>
        <select
          value={selectedDistrict || ""}
          onChange={(e) => handleDistrictChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          required
        >
          <option value="">जिल्हा निवडा</option>
          {districts.map((d, i) => (
            <option key={i} value={d.district}>
              {d.district}
            </option>
          ))}
        </select>
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
      </div>

      {/* Taluka */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
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
=======
          तालुका (Taluka)
        </label>
        <select
          value={selectedTaluka || ""}
          onChange={(e) => handleTalukaChange(e.target.value)}
          disabled={!talukas.length}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          required
        >
          <option value="">तालुका निवडा</option>
          {talukas.map((t, i) => (
            <option key={i} value={t.subDistrict}>
              {t.subDistrict}
            </option>
          ))}
        </select>
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
      </div>

      {/* Village */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
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
=======
          गाव (Village)
        </label>
        <select
          value={selectedVillage || ""}
          onChange={(e) => handleVillageChange(e.target.value)}
          disabled={!villages.length}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          required
        >
          <option value="">गाव निवडा</option>
          {villages.map((v, i) => (
            <option key={i} value={v}>
              {v}
            </option>
          ))}
        </select>
>>>>>>> ee7e979468e748e7a9ae8d267be4c7b7a55e2e2c
      </div>
    </div>
  );
};

export default LocationForm;

