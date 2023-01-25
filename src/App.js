import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Reset from "./pages/reset/Reset";
import Itinerary from "./pages/Itinerary/Itinerary";
import History from "./pages/history/History";
import HotelDetail from "./pages/hoteldetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/itinerary/" element={<Itinerary />} />
        <Route path="/history/" element={<History />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
