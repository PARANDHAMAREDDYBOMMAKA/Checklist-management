import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Plus, Trash } from "lucide-react";

const ActivityPage = () => {
  const [weightPercent, setWeightPercent] = useState(0);
  const [activities, setActivities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const units = [
    "Piers",
    "Modules",
    "Units",
    "List",
    "Items",
    "Tons",
    "Kgs",
    "Lbs",
    "Mts",
    "M3",
    "M2",
    "M1",
    "Pcs",
  ];

  const calculateTotalWeight = () => {
    return activities.reduce(
      (total, activity) => total + Number(activity.weight),
      0
    );
  };

  const updateParentWeight = (activityId) => {
    const updatedActivities = [...activities];
    const activityIdx = updatedActivities.findIndex(
      (act) => act.id === activityId
    );

    if (activityIdx !== -1) {
      const totalSubWeight = updatedActivities[
        activityIdx
      ].subActivities.reduce(
        (total, subAct) => total + Number(subAct.weight),
        0
      );

      updatedActivities[activityIdx].weight = totalSubWeight;
      setActivities(updatedActivities);
    }
  };

  useEffect(() => {
    const totalWeight = calculateTotalWeight();
    setWeightPercent(totalWeight);
  }, [activities]);

  const handleAddActivity = () => {
    const newId =
      activities.length > 0 ? Math.max(...activities.map((a) => a.id)) + 1 : 1;

    const newActivity = {
      id: newId,
      name: "",
      unitOfCount: units[0],
      weight: 0,
      subActivities: [],
    };

    setActivities([...activities, newActivity]);
  };

  const handleAddSubActivity = (activityId) => {
    const updatedActivities = [...activities];
    const activityIdx = updatedActivities.findIndex(
      (act) => act.id === activityId
    );

    if (activityIdx !== -1) {
      const activity = updatedActivities[activityIdx];
      const subActivities = activity.subActivities;

      const newSubId =
        subActivities.length > 0
          ? Math.max(
              ...subActivities.map((sa) => {
                const parts = sa.id.toString().split(".");
                return Number(parts[parts.length - 1]);
              })
            ) + 1
          : 1;

      const newSubActivity = {
        id: `${activityId}.${newSubId}`,
        name: "",
        unitOfCount: activity.unitOfCount,
        weight: 0,
      };

      updatedActivities[activityIdx].subActivities = [
        ...subActivities,
        newSubActivity,
      ];

      const totalSubWeight = [...subActivities, newSubActivity].reduce(
        (total, subAct) => total + Number(subAct.weight),
        0
      );

      updatedActivities[activityIdx].weight = totalSubWeight;

      setActivities(updatedActivities);
    }
  };

  const handleNameChange = (id, value) => {
    const updatedActivities = [...activities];

    if (typeof id === "string" && id.includes(".")) {
      const [parentId, subId] = id.split(".");
      const activityIdx = updatedActivities.findIndex(
        (act) => act.id === Number(parentId)
      );

      if (activityIdx !== -1) {
        const subActivityIdx = updatedActivities[
          activityIdx
        ].subActivities.findIndex((subAct) => subAct.id === id);

        if (subActivityIdx !== -1) {
          updatedActivities[activityIdx].subActivities[subActivityIdx].name =
            value;
        }
      }
    } else {
      const activityIdx = updatedActivities.findIndex(
        (act) => act.id === Number(id)
      );
      if (activityIdx !== -1) {
        updatedActivities[activityIdx].name = value;
      }
    }

    setActivities(updatedActivities);
  };

  const handleUnitChange = (id, value) => {
    const updatedActivities = [...activities];

    if (typeof id === "string" && id.includes(".")) {
      const [parentId, subId] = id.split(".");
      const activityIdx = updatedActivities.findIndex(
        (act) => act.id === Number(parentId)
      );

      if (activityIdx !== -1) {
        const subActivityIdx = updatedActivities[
          activityIdx
        ].subActivities.findIndex((subAct) => subAct.id === id);

        if (subActivityIdx !== -1) {
          updatedActivities[activityIdx].subActivities[
            subActivityIdx
          ].unitOfCount = value;
        }
      }
    } else {
      const activityIdx = updatedActivities.findIndex(
        (act) => act.id === Number(id)
      );
      if (activityIdx !== -1) {
        updatedActivities[activityIdx].unitOfCount = value;
        updatedActivities[activityIdx].subActivities.forEach((subAct) => {
          subAct.unitOfCount = value;
        });
      }
    }

    setActivities(updatedActivities);
  };

  const handleWeightChange = (id, value) => {
    const updatedActivities = [...activities];
    const numValue = Number(value);

    if (typeof id === "string" && id.includes(".")) {
      const [parentId, subId] = id.split(".");
      const activityIdx = updatedActivities.findIndex(
        (act) => act.id === Number(parentId)
      );

      if (activityIdx !== -1) {
        const subActivityIdx = updatedActivities[
          activityIdx
        ].subActivities.findIndex((subAct) => subAct.id === id);

        if (subActivityIdx !== -1) {
          updatedActivities[activityIdx].subActivities[subActivityIdx].weight =
            numValue;

          const totalSubWeight = updatedActivities[
            activityIdx
          ].subActivities.reduce(
            (total, subAct) => total + Number(subAct.weight),
            0
          );

          updatedActivities[activityIdx].weight = totalSubWeight;
        }
      }
    } else {
      const activityIdx = updatedActivities.findIndex(
        (act) => act.id === Number(id)
      );
      if (
        activityIdx !== -1 &&
        updatedActivities[activityIdx].subActivities.length === 0
      ) {
        updatedActivities[activityIdx].weight = numValue;
      }
    }

    setActivities(updatedActivities);
  };

  const handleDelete = (id) => {
    if (typeof id === "string" && id.includes(".")) {
      const [parentId, subId] = id.split(".");
      const parentIdNum = Number(parentId);

      const updatedActivities = activities.map((activity) => {
        if (activity.id === parentIdNum) {
          const updatedSubActivities = activity.subActivities.filter(
            (subAct) => subAct.id !== id
          );

          const totalSubWeight = updatedSubActivities.reduce(
            (total, subAct) => total + Number(subAct.weight),
            0
          );

          return {
            ...activity,
            subActivities: updatedSubActivities,
            weight: totalSubWeight,
          };
        }
        return activity;
      });

      setActivities(updatedActivities);
    } else {
      // Delete main activity
      const updatedActivities = activities.filter(
        (act) => act.id !== Number(id)
      );
      setActivities(updatedActivities);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (weightPercent === 100) {
      alert("Saved successfully!");
      setIsEditing(false);
    } else {
      alert(
        `Cannot save! Total weight must be 100% (current: ${weightPercent}%)`
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        weightPercent={weightPercent}
        onAddActivity={handleAddActivity}
        onSave={handleSave}
        onEdit={toggleEdit}
        isEditing={isEditing}
        canSave={weightPercent === 100}
      />

      <div className="flex-1 p-4 max-w-6xl mx-auto w-full">
        {activities.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No activities yet. Click the + button to add an activity.
          </div>
        )}

        {activities.map((activity) => (
          <div
            key={activity.id}
            className="border-2 border-gray-300 p-4 rounded-lg mb-4 shadow-sm bg-white"
          >
            <div className="flex items-center mb-2 text-gray-600 text-sm">
              <div className="w-12 mr-2 text-center font-medium">ID</div>
              <div className="flex-1 ml-2">Activity</div>
              <div className="w-40 text-center">Unit of count</div>
              <div className="w-28 text-center">Weight</div>
              <div className="w-8"></div>
            </div>

            <div className="flex items-center mb-4">
              <div className="w-12 text-center font-bold text-gray-700">
                {activity.id}
              </div>
              <div className="flex-1 mx-2">
                <input
                  type="text"
                  value={activity.name}
                  placeholder="Enter Activity name"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  onChange={(e) =>
                    handleNameChange(activity.id, e.target.value)
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="w-40 px-2">
                <select
                  value={activity.unitOfCount}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  onChange={(e) =>
                    handleUnitChange(activity.id, e.target.value)
                  }
                  disabled={!isEditing}
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-28 px-2">
                <div className="flex">
                  <input
                    type="number"
                    value={activity.weight}
                    className="border rounded-l-lg p-2 w-full bg-gray-100"
                    onChange={(e) =>
                      handleWeightChange(activity.id, e.target.value)
                    }
                    min="0"
                    max="100"
                    disabled={true}
                  />
                  <span className="bg-gray-200 flex items-center justify-center border-t border-r border-b rounded-r-lg px-2 text-sm font-semibold">
                    %
                  </span>
                </div>
              </div>
              <div className="w-8 flex justify-center">
                {isEditing && (
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    title="Delete Activity"
                  >
                    <Trash size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Sub-activities section */}
            <div className="pl-12 space-y-2">
              {activity.subActivities.map((subActivity) => (
                <div
                  key={subActivity.id}
                  className="flex items-center bg-gray-50 p-2 rounded-lg"
                >
                  <div className="w-12 text-center text-gray-500">
                    {subActivity.id}
                  </div>
                  <div className="flex-1 mx-2">
                    <input
                      type="text"
                      value={subActivity.name}
                      placeholder="Enter sub-activity name"
                      className="border border-gray-300 rounded-lg p-2 w-full"
                      onChange={(e) =>
                        handleNameChange(subActivity.id, e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="w-40 px-2">
                    <select
                      value={subActivity.unitOfCount}
                      className="border border-gray-300 rounded-lg p-2 w-full"
                      onChange={(e) =>
                        handleUnitChange(subActivity.id, e.target.value)
                      }
                      disabled={!isEditing}
                    >
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-28 px-2">
                    <div className="flex">
                      <input
                        type="number"
                        value={subActivity.weight || ""}
                        className="border rounded-l-lg p-2 w-full"
                        onChange={(e) =>
                          handleWeightChange(subActivity.id, e.target.value)
                        }
                        min="0"
                        max="100"
                        disabled={!isEditing}
                      />
                      <span className="bg-gray-200 flex items-center justify-center border-t border-r border-b rounded-r-lg px-2 text-sm font-semibold">
                        %
                      </span>
                    </div>
                  </div>
                  <div className="w-8 flex justify-center">
                    {isEditing && (
                      <button
                        onClick={() => handleDelete(subActivity.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        title="Delete Sub-Activity"
                      >
                        <Trash size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isEditing && (
                <div className="mt-2">
                  <button
                    onClick={() => handleAddSubActivity(activity.id)}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Sub-Activity
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityPage;
