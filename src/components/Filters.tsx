// src/components/Filters.tsx
import { useState } from 'react';

interface FiltersProps {
  onApply: (filters: { objectTypes: string[]; orbitCodes: string[] }) => void;
}

const OBJECT_TYPES = ["ROCKET BODY", "DEBRIS", "UNKNOWN", "PAYLOAD"];
const ORBIT_CODES = [
  "LEO", "LEO1", "LEO2", "LEO3", "LEO4", "MEO", "GEO", "HEO", "IGO", "EGO",
  "NSO", "GTO", "GHO", "HAO", "MGO", "LMO", "UFO", "ESO", "UNKNOWN"
];

const Filters = ({ onApply }: FiltersProps) => {
  const [selectedObjectTypes, setSelectedObjectTypes] = useState<string[]>([]);
  const [selectedOrbitCodes, setSelectedOrbitCodes] = useState<string[]>([]);

  const toggleSelection = (value: string, list: string[], setter: Function) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-4 border">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Object Types</label>
          <div className="flex flex-wrap gap-2">
            {OBJECT_TYPES.map((type) => (
              <button
                key={type}
                className={`px-3 py-1 text-sm rounded-full border ${
                  selectedObjectTypes.includes(type)
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() =>
                  toggleSelection(type, selectedObjectTypes, setSelectedObjectTypes)
                }
                type="button"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Orbit Codes</label>
          <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
            {ORBIT_CODES.map((code) => (
              <button
                key={code}
                className={`px-3 py-1 text-sm rounded-full border ${
                  selectedOrbitCodes.includes(code)
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() =>
                  toggleSelection(code, selectedOrbitCodes, setSelectedOrbitCodes)
                }
                type="button"
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-right">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() =>
            onApply({ objectTypes: selectedObjectTypes, orbitCodes: selectedOrbitCodes })
          }
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
