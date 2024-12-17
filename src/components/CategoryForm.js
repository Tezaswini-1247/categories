import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Alert from "../Alert/Alert"; // Assuming you have an Alert component

const apiUrl = "http://localhost:5000"; // Backend Express API URL

const CategoryForm = () => {
  const initialValues = {
    uid: "",
    retail_store_type: "",
    store_types: "",
    description: "",
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    uid: Yup.string().required("UID is required").max(10, "UID must be at most 10 characters"),
    retail_store_type: Yup.string().required("Retail store type is required"),
    store_types: Yup.string().required("Store types are required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${apiUrl}/api/categories`, values);
      if (response.data.success) {
        setAlertMessage("Category submitted successfully!");
        setShowAlert(true);
        resetForm();
      } else {
        setAlertMessage("Error: Unable to submit the category.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error submitting category:", error);
      setAlertMessage("An error occurred while submitting the category.");
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setShowAlert(false), 4000);
    }
  };

  const handleExcelUpload = async () => {
    if (!excelFile) {
      alert("Please choose an Excel file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      const response = await axios.post(`${apiUrl}/api/categories/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setAlertMessage("Excel file uploaded successfully!");
        setShowAlert(true);
      } else {
        setAlertMessage("Error uploading file.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error uploading Excel file:", error);
      setAlertMessage("An error occurred while uploading the file.");
      setShowAlert(true);
    } finally {
      setTimeout(() => setShowAlert(false), 4000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Category Entry Form
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="uid" className="block text-sm font-medium mb-2">
                  UID
                </label>
                <Field
                  name="uid"
                  type="text"
                  placeholder="Enter UID"
                  className="w-full p-3 border rounded"
                />
                <ErrorMessage name="uid" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label htmlFor="retail_store_type" className="block text-sm font-medium mb-2">
                  Retail Store Type
                </label>
                <Field
                  name="retail_store_type"
                  type="text"
                  placeholder="Enter Retail Store Type"
                  className="w-full p-3 border rounded"
                />
                <ErrorMessage
                  name="retail_store_type"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <label htmlFor="store_types" className="block text-sm font-medium mb-2">
                  Store Types
                </label>
                <Field
                  name="store_types"
                  type="text"
                  placeholder="Enter Store Types"
                  className="w-full p-3 border rounded"
                />
                <ErrorMessage name="store_types" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <Field
                  name="description"
                  type="text"
                  placeholder="Enter Description"
                  className="w-full p-3 border rounded"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Upload Excel File</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => setExcelFile(e.target.files[0])}
          className="w-full mb-4"
        />
        <button
          onClick={handleExcelUpload}
          disabled={!excelFile}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Upload Excel
        </button>
      </div>

      {showAlert && (
        <div className="mt-4 text-center">
          <Alert message={alertMessage} />
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
