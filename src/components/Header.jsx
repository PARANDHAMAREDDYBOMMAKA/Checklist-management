import { Plus } from "lucide-react";
import React from "react";

const Header = ({
  weightPercent,
  onAddActivity,
  onSave,
  onEdit,
  isEditing,
  canSave,
}) => {
  const getWeightColor = () => {
    if (weightPercent === 100) return "text-green-600";
    if (weightPercent > 100) return "text-red-600";
    return "text-yellow-600";
  };

  return (
    <div className="border-b-2 border-gray-300 bg-white shadow-sm p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            NX MUI Testing - CP Checklist
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className={`font-medium ${getWeightColor()}`}>
            <span>Weight Percent: </span>
            <span className="font-bold">{weightPercent}%</span>
          </div>

          {isEditing && (
            <button
              onClick={onAddActivity}
              className="bg-orange-500 hover:bg-orange-600 rounded-full text-white w-8 h-8 flex items-center justify-center transition-colors"
              title="Add Activity"
            >
              <Plus size={20} />
            </button>
          )}

          {isEditing ? (
            <button
              onClick={onSave}
              className={`px-4 py-2 rounded-full transition-colors ${
                canSave
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              disabled={!canSave}
            >
              Save
            </button>
          ) : (
            <button
              onClick={onEdit}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
