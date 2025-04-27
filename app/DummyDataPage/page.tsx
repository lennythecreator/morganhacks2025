'use client';

import { useState } from 'react';

export default function DummyDataPage() {
  const [users, setUsers] = useState<any[]>([]); // hold dummy users

  const fetchDummyData = async () => {
    try {
      const response = await fetch('http://localhost:5000/send-data', {
        method: 'POST',
      });
      const result = await response.json();
      setUsers(result.data); // Update state with the dummy data
    } catch (error) {
      console.error("Error fetching dummy data:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fetch Dummy Data</h1>

      {/* Button to trigger the API call */}
      <button
        onClick={fetchDummyData}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Fetch Dummy Users
      </button>

      {/* Display the users once loaded */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow">
            <img
              src={user.image_url}
              alt={user.full_name}
              className="w-24 h-24 rounded-full mx-auto mb-2"
            />
            <h2 className="text-xl text-center font-semibold">{user.full_name}</h2>
            <p className="text-center text-gray-600">{user.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
