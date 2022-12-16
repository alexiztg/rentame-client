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
import AddShop from "./pages/NewShopPage";
import AddReview from "./pages/NewReviewPage";
import AddRent from "./pages/NewRentPage";
import EditShopPage from "./pages/EditShopPage";
import EditRentPage from "./pages/EditRentPage";
import EditReviewPage from "./pages/EditReviewPage";

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
        <Route path="/shops/:id/edit" element={<EditShopPage/>}/>
        <Route path="/shops/:id/rent" element={<RentListPage/>}/>
        <Route path="/shops/:id/rent/:idRent/edit" element={<EditRentPage/>}/>
        <Route path="/shops/:id/rent/create" element={<AddRent/>}/>
        <Route path="/shops/:id/review/:idReview/edit" element={<EditReviewPage/>}/>
        <Route path="/shops/:id/review/create" element={<AddReview/>}/>
        <Route path="/new-shop" element={<AddShop/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
