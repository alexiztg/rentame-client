import "./HomePage.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import SimpleSlider from "../../components/Carrusel";
import ShopListPage from "../ShopListPage";

function HomePage() {
  return (
    <div>
      <SimpleSlider/>
      <br/>
      <ShopListPage/>
    </div>
  );
}

export default HomePage;
