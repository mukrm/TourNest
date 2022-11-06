import { useAuthState } from "react-firebase-hooks/auth";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import { auth } from "../../firebase";
import { SearchBarMain } from "../../components/searchBarMain/SearchBarMain";
const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <Navbar />
          {/* <Header user /> */}
          <SearchBarMain />
          <div className="homeContainer">
            {/* <h1 className="homeTitle">Most Popular Locations</h1>
            <Featured />
            <h1 className="homeTitle">Tours guests love</h1>
            <FeaturedProperties /> */}
            <MailList />
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
