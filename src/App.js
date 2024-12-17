import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CategoryForm from "./components/CategoryForm"; // Entry Form
import CategoryTable from "./components/CategoryTable"; // Retrieve & Update Form

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-indigo-600 text-white py-4 shadow-md">
          <nav className="flex justify-center space-x-6">
            <Link
              to="/category"
              className="py-2 px-4 bg-white text-indigo-600 rounded hover:bg-gray-200 transition"
            >
              Category Entry Form
            </Link>
            <Link
              to="/category-table"
              className="py-2 px-4 bg-white text-indigo-600 rounded hover:bg-gray-200 transition"
            >
              Category Table (Edit Form)
            </Link>
          </nav>
        </header>

        <main className="container mx-auto py-8">
          <Routes>
            {/* Route for Category Entry Form */}
            <Route path="/category" element={<CategoryForm />} />

            {/* Route for Category Table Form */}
            <Route path="/category-table" element={<CategoryTable />} />

            {/* Default Route */}
            
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
