import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import MyTrips from "./pages/MyTrips";
import Favorites from "./pages/Favorites";
import DestinationDetails from "./pages/DestinationDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <div className="app__content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route
              path="/destinations/:slug"
              element={<DestinationDetails />}
            />
            <Route path="/trips" element={<MyTrips />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
