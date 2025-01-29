import React from "react";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import CourseList from "./Pages/CourseList";
import AddCourse from "./Pages/AddCourse";
import Managecouse from "./Pages/Managecouse";
import ProtectedRoute from "./utill/ProtectedRoute";
import Coursedetails from "./Pages/Coursedetails";
import './App.css'
import Dashboard from "./Pages/Dashboard";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={< >Page not found</>} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/course" element={<ProtectedRoute><CourseList /></ProtectedRoute>} />
          <Route path="/add_course" element={<ProtectedRoute>< AddCourse /></ProtectedRoute>} />
          <Route path="/manage_course" element={<ProtectedRoute><Managecouse /></ProtectedRoute>} />
          <Route path="/course_detail" element={<ProtectedRoute><Coursedetails /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
