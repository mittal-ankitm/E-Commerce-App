import React, { Component } from "react";
import "./about.css";
import Navbar from '../navbarpage/Navbar/Navbar';
const about = () => {
  
  return (
    <div>
      <title>URC BAGDOGRA</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
      />
      <title>LandingPage</title>
      <link rel="stylesheet" type="text/css" href="./about.css" />
      
      <div className="igloo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTpb_6-Tv-Ju50YtNihPFDiwH5PZ2voHIfMQQ&usqp=CAU"
          style={{ width: "10%", height: "100px" }}
        />
      </div>
      <div className="inside">
        <Navbar/>
        <div className="container">
          <h2>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Roundel_of_India.svg/1200px-Roundel_of_India.svg.png"
              style={{ width: "7%", height: "30px" }}
            />{" "}
            URC Bagdogra Canteen
          </h2>
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            {/* Indicators */}
            {/* Wrapper for slides */}
            <div className="carousel-inner">
              <div className="item active">
                <img
                  src="https://afcat.cdac.in/AFCAT/assets/images/gallery/Helicopters/helicop9.gif"
                  alt="Los Angeles"
                  style={{ width: "100%", height: "400px" }}
                />
              </div>
              <div className="item">
                <img
                  src="https://afcat.cdac.in/AFCAT/assets/images/gallery/Helicopters/helicop3.gif"
                  alt="Chicago"
                  style={{ width: "100%", height: "400px" }}
                />
              </div>
              <div className="item">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="New york"
                  style={{ width: "100%", height: "400px" }}
                />
              </div>
            </div>
            {/* Left and right controls */}
            <a
              className="left carousel-control"
              href="#myCarousel"
              data-slide="prev"
            >
              <span className="glyphicon glyphicon-chevron-left" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="right carousel-control"
              href="#myCarousel"
              data-slide="next"
            >
              <span className="glyphicon glyphicon-chevron-right" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="introduction">
          <h2>Welcome to the URC Bagdogra Canteen Website.</h2>
          <p>
            You may use this website to place your order from the canteen, after
            which a token will be given to you speciying the time you should
            come and collect your products
          </p>
        </div>
        <hr className="divider-w" />
        <section
          id="newsContent"
          className="module "
          style={{
            backgroundColor: "#3c4d5f",
            height: "auto",
            paddingTop: "30px",
            paddingBottom: "30px"
          }}
        >
          <div className="container">
            <div className="col-sm-6 col-sm-offset-3">
              <h2
                className="module-title font-alt"
                style={{ color: "white", marginBottom: "20px" }}
              >
                UPDATES
              </h2>
            </div>
            <marquee
              style={{
                padding: "0 50px 0 30px",
                maxHeight: "30%",
                height: "250px"
              }}
              onmouseover="this.stop();"
              onmouseout="this.start();"
              direction="up"
              scrolldelay={0}
              scrollamount={3}
            >
              {/* <img style="padding-bottom: 2px;" class="blinking" src="assets/images/new/new.gif"> */}
              <a
                className="font-alt mb-30 titan-title-size-1"
                style={{ color: "white", textAlign: "justify" }}
              >
                URC BAGDOGRA CANTEEN
              </a>
              <br />
              <br />
              <a
                className="font-alt mb-30 titan-title-size-1"
                style={{ color: "white", textAlign: "justify" }}
              >
                {" "}
                CANTEEN WILL BE CLOSED ON SATURDAY AND SUNDAY
              </a>
              <br />
              <br />
              <a
                className="font-alt mb-30 titan-title-size-1"
                style={{ color: "white", textAlign: "justify" }}
              >
                CANTEEN TIMINGS FROM 1PM TO 6PM{" "}
              </a>
              <br />
              <br />
              <a
                className="font-alt mb-30 titan-title-size-1"
                style={{ color: "white", textAlign: "justify" }}
              >
                ADDITIONAL NEWS
              </a>
              <br />
              <br />
              <a
                className="font-alt mb-30 titan-title-size-1"
                style={{ color: "white", textAlign: "justify" }}
              >
                ADDITIONAL NEWS{" "}
              </a>
              <br />
              <br />
            </marquee>
          </div>
        </section>
      </div>
      <footer>
        <p>
          <br />
          <a href="@urcbagdogra">@urcbagdogra</a>
        </p>
      </footer>
    </div>
  );
};

export default about;