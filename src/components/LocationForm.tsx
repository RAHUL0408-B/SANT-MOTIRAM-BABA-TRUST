import React, { useEffect, useState } from "react";
import maharashtraData from "../data/Maharashtra.json";

interface District {
  district: string;
  subDistricts: {
    subDistrict: string;
    villages: string[];
  }[];
}

interface Props {
  selectedState: string;
  selectedDistrict: string;
  selectedTaluka: string;
  selectedVillage: string;
  onStateChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onTalukaChange: (value: string) => void;
  onVillageChange: (value: string) => void;
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
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* State */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          राज्य (State)
        </label>
        <input
          type="text"
          value={selectedState || "महाराष्ट्र"}
          readOnly
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg"
        />
      </div>

      {/* District */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
      </div>

      {/* Taluka */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
      </div>

      {/* Village */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
      </div>
    </div>
  );
};

export default LocationForm;

