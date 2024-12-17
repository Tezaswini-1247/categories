import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../Alert/Alert";

const apiUrl = "http://localhost:5000"; // Backend Express API URL

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [editMode, setEditMode] = useState({}); // Track edit mode for each category
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle field change for inline editing
  const handleInputChange = (uid, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [uid]: { ...prev[uid], [field]: value },
    }));
  };

  // Toggle edit mode for a specific category
  const handleEditClick = (uid) => {
    setEditMode((prev) => ({
      ...prev,
      [uid]: true,
    }));
  };

  // Handle Save button click
  const handleSave = async (uid) => {
    const updatedValues = editedData[uid];
    try {
      const response = await axios.put(`${apiUrl}/api/categories/${uid}`, updatedValues);
      if (response.data.success) {
        setAlertMessage("Category updated successfully!");
        setShowAlert(true);
        setEditMode((prev) => ({ ...prev, [uid]: false })); // Exit edit mode
        fetchCategories(); // Refresh data
      } else {
        setAlertMessage("Error: Unable to update the category.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setAlertMessage("An error occurred while updating the category.");
      setShowAlert(true);
    } finally {
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Category List</h1>

        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">UID</th>
              <th className="border p-3">Retail Store Type</th>
              <th className="border p-3">Store Types</th>
              <th className="border p-3">Description</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.uid} className="hover:bg-gray-100">
                <td className="border p-3">{category.uid}</td>
                <td className="border p-3">
                  {editMode[category.uid] ? (
                    <input
                      type="text"
                      defaultValue={category.retail_store_type}
                      onChange={(e) =>
                        handleInputChange(category.uid, "retail_store_type", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    category.retail_store_type
                  )}
                </td>
                <td className="border p-3">
                  {editMode[category.uid] ? (
                    <input
                      type="text"
                      defaultValue={category.store_types}
                      onChange={(e) =>
                        handleInputChange(category.uid, "store_types", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    category.store_types
                  )}
                </td>
                <td className="border p-3">
                  {editMode[category.uid] ? (
                    <input
                      type="text"
                      defaultValue={category.description}
                      onChange={(e) =>
                        handleInputChange(category.uid, "description", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    category.description
                  )}
                </td>
                <td className="border p-3 text-center">
                  {editMode[category.uid] ? (
                    <button
                      onClick={() => handleSave(category.uid)}
                      className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(category.uid)}
                      className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showAlert && (
          <div className="mt-4 text-center">
            <Alert message={alertMessage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTable;
