import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddHospital from "./pages/AddHospital";
import HospitalsAvailable from "./pages/HospitalsAvailable";
import AddChild from "./pages/AddChild";
import ViewChildren from "./pages/ViewChildren";
import Vaccines from "./pages/Vaccines";
import AddVaccine from "./pages/AddVaccine";
import AssignVaccine from "./pages/AssignVaccine";
import ChildVaccines from "./pages/ChildVaccines";
import AdminReport from "./pages/AdminReport";
import DueVaccines from "./pages/DueVaccines";
import AdminHospitals from "./pages/AdminHospitals";
import EditHospital from "./pages/EditHospital";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminChildren from "./pages/AdminChildren";
import Hospitals from "./pages/Hospitals";
import Notifications from "./pages/Notifications";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/children" element={<AdminChildren />} />
        <Route path="/admin/report" element={<AdminReport />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/add-hospital" element={<AddHospital />} />
        <Route path="/admin/hospitals" element={<AdminHospitals />} />
        <Route path="/admin/hospital/edit/:id" element={<EditHospital />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/parent/hospitals" element={<HospitalsAvailable />} />


        {/* PARENT */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-child"
          element={
            <ProtectedRoute>
              <AddChild />
            </ProtectedRoute>
          }
        />

        <Route
          path="/children"
          element={
            <ProtectedRoute>
              <ViewChildren />
            </ProtectedRoute>
          }
        />

        <Route
          path="/child-vaccines/:id"
          element={
            <ProtectedRoute>
              <ChildVaccines />
            </ProtectedRoute>
          }
        />

        <Route
          path="/due-vaccines/:id"
          element={
            <ProtectedRoute>
              <DueVaccines />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vaccines"
          element={
            <ProtectedRoute>
              <Vaccines />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-vaccine"
          element={
            <ProtectedRoute>
              <AddVaccine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assign-vaccine"
          element={
            <ProtectedRoute>
              <AssignVaccine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-report"
          element={
            <ProtectedRoute>
              <AdminReport />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
