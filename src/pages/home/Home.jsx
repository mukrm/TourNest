import { useAuthState } from "react-firebase-hooks/auth";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import { auth } from "../../firebase";
const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <Navbar />
      <Header user />
      <div className="homeContainer">
        <h1 className="homeTitle">Most Popular Locations</h1>
        <Featured />
        <h1 className="homeTitle">Tours guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
