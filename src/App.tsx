import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import PageNotFound from "./pages/404/PageNotFound";
import LocationsPage from "./pages/Locations/LocationsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import { LocationProvider } from "./data/LocationServices";
import ChangeLocationsPage from "./pages/Locations/ChangeLocations/ChangeLocations";
import { WeatherProvider } from "./data/WeatherServices";

function App() {
  return (
    <>
      {" "}
      <LocationProvider>
        <WeatherProvider>
          <div className="app-cont">
            <Navbar />
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route
                path="/changeLocations"
                element={<ChangeLocationsPage />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </WeatherProvider>
      </LocationProvider>
    </>
  );
}

export default App;
