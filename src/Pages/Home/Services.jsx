import React from "react";
import "./services.scss";
import service1 from "../../images/service.png";
import service2 from "../../images/service-02.png";
import service3 from "../../images/service-03.png";
import service4 from "../../images/service-04.png";
import service5 from "../../images/service-05.png";
const Services = () => {
  const ServiesItem = [
    {
      img: service1,
      title: "Free Shipping",
      desc: "From all order over ₹200",
    },

    {
      img: service2,
      title: "Daily Surprise offers",
      desc: "Save upto 30% off",
    },

    {
      img: service3,
      title: "Support 24/7",
      desc: "Shop with an expert",
    },
    {
      img: service4,
      title: "Affordable Price",
      desc: "Get Factory Default Price",
    },
    {
      img: service5,
      title: "Secure Payments",
      desc: "100% Protected Payment",
    },
  ];
  return (
    <div id="services">
      <div className="services-item">
        {ServiesItem.map((item, index) => {
          const { img, title, desc } = item;
          return (
            <div key={index}>
              <img src={img} alt={title} />
              <aside>
                <h3>{title}</h3>
                <p>{desc}</p>
              </aside>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
