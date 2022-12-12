import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ShopListPage from "./pages/ShopListPage";
import RentListPage from "./pages/RentListPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<IsPrivate><ProfilePage /></IsPrivate>}/>
        <Route path="/signup" element={ <IsAnon> <SignupPage/> </IsAnon>}/>
        <Route path="/login" element={<IsAnon> <LoginPage/> </IsAnon> }/>
        <Route path="/shops" element={<ShopListPage/> }/>
        <Route path="/shops/:id/rent" element={<RentListPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
