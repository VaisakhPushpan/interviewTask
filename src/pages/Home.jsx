import React from "react";
import NavBar from "../components/NavBar";
import UploadPage from "../components/UploadPage";
import ListOfImages from "../components/ListOfImages";
import './Home.scss'
const Home = () => {
  return (
    <div className="container">
      <NavBar />
      <UploadPage />
      <ListOfImages />
      <footer>
      </footer>
    </div>
  );
};

export default Home;
