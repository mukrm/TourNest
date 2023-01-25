import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import { db } from "../../firebase";
import { MdLocationOn } from "react-icons/md";

export default function HotelDetail() {
  const { id } = useParams();

  const { data, loading } = useGetHotelData(id);

  if (loading)
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <Header type="list" />
      {data && (
        <div
          style={{
            minHeight: "80vh",
            padding: "30px 200px",
            display: "grid",
            gap: "30px",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <div>
            <h1 style={{ fontSize: "24px" }}>{data.title}</h1>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "smaller",
                color: "gray",
              }}
            >
              <MdLocationOn color="black" />
              {data.location}
            </span>
            <div>
              <img
                alt={data.title}
                src={data.img}
                style={{ width: "600px", height: "400px", objectFit: "cover" }}
              ></img>
            </div>
          </div>
          <div></div>
          <div></div>
          <div
            style={{
              justifySelf: "center",
              background: "#ebf3ff",
              padding: "20px 40px",
            }}
          >
            <h2 style={{ textAlign: "center", color: "gray" }}>{data.title}</h2>
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>
              {data.price}
              <span
                style={{
                  fontSize: "20px",
                  color: "gray",
                  fontWeight: "normal",
                }}
              >
                /night
              </span>
            </h1>
            <button
              style={{
                backgroundColor: "#0071c2",
                color: "white",
                fontWeight: "bold",
                padding: "10px 5px",
                border: "none",
                borderRadius: "5px",
                width: "100%",
                textAlign: "center",
                cursor: "pointer",
                marginTop: "40px",
              }}
              onClick={async () => {
                window.location.href = data.link;
              }}
            >
              Visit Original
            </button>
          </div>
        </div>
      )}
      <MailList />
      <Footer />
    </div>
  );
}

const useGetHotelData = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getHotel() {
    try {
      setError(null);
      setLoading(true);

      const hotelRef = doc(db, "Hotels", id);

      const snap = await getDoc(hotelRef);

      setData(snap.data());
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getHotel();

    //eslint-disable-next-line
  }, []);

  return { data, error, loading };
};
