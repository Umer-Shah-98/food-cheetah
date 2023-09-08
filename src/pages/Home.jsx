import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Card from "../components/card/Card";
import "../components/carousel/carousel.css";
import grilledChicken from "../assets/grilled-chicken.jpg";
import chickenWings from "../assets/chicken-wings.jpg";
import butterChicken from "../assets/butter-chicken.jpg";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:3000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    // console.log(response[0], response[1]);
    setFoodItems(response[0]);
    setFoodCategory(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="form-control me-2"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">
                Search
              </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src={grilledChicken}
                className="d-block w-100 carousel-image"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={chickenWings}
                className="d-block w-100 carousel-image"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={butterChicken}
                className="d-block w-100 carousel-image"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container border-0" style={{  width:"200rem" }}>
        {foodCategory.length !== 0
          ? foodCategory.map((data) => {
              return (
                <div key={data._id} className="row mb-3">
                  <div className="fs-3 m-3">{data.CategoryName}</div>
                  <hr />
                  {foodItems.length !== 0 ? (
                    foodItems
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItem) => {
                        return (
                          <div 
                            key={filterItem._id}
                            className="col-12 col-md-8 col-lg-3"
                            // style={{marginRight:'20px'}} 
                          >
                            <Card
                              foodItem={filterItem}
                              options={filterItem.options[0]}
                              style={{}}
                              
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No Such Data found</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
