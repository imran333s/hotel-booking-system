import React, { useState } from "react";

const RoomTypeManagement = () => {
  const [roomTypes, setRoomTypes] = useState(["Single", "Double"]);
  const [newType, setNewType] = useState("");

  const addRoomType = () => {
    if (!newType) return;
    setRoomTypes([...roomTypes, newType]);
    setNewType("");
  };

  return (
    <div>
      <h2>Room Types</h2>

      <input
        placeholder="Room Type"
        value={newType}
        onChange={(e) => setNewType(e.target.value)}
      />
      <button onClick={addRoomType}>Add</button>

      <ul>
        {roomTypes.map((type, index) => (
          <li key={index}>{type}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomTypeManagement;
