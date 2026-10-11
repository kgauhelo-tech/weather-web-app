import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import PageNotFound from "./pages/404/PageNotFound";
import LocationsPage from "./pages/Locations/LocationsPage";
import SettingsPage from "./pages/Settings/SettingsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route index path="/locations" element={<LocationsPage />} />
        <Route index path="/settings" element={<SettingsPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
