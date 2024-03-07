import React, { useEffect, useState } from "react";
import image_data from "../../data/pictures";
import "../../styles/artgallery.css";
import _ from "lodash";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://irfzjowoxktrxrthxdqc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZnpqb3dveGt0cnhydGh4ZHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MDYwMjYsImV4cCI6MjAyNTM4MjAyNn0.8IDMst-h7mFIS0DcgfB0-Ry2l2rlRVmmedUdAGrlhDU"
);


function ArtGallery() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [data, setData] = useState({
    column1: [],
    column2: [],
    column3: [],
  });
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    getImageData();
  }, []);

  async function getImageData() {
    const { data } = await supabase.from("tb_images").select('*').eq('deleted', 0);
    console.log(data);
    setPhotos(data);
  }

  // Function to update screenWidth state
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    const total_photos = photos?.length;
    // PC
    if (screenWidth >= 1024) {
      const dataPerColoumn = Math.floor(total_photos / 3);
      const extraData = total_photos % 3;
      let col1 = photos.slice(0, dataPerColoumn);
      let col2 = photos.slice(dataPerColoumn, dataPerColoumn * 2);
      let col3 = photos.slice(dataPerColoumn * 2, total_photos);
      if (extraData === 1) {
        col1 = photos.slice(0, dataPerColoumn + 1);
        col2 = photos.slice(dataPerColoumn + 1, dataPerColoumn * 2 + 1);
        col3 = photos.slice(dataPerColoumn * 2 + 1, total_photos);
      } else if (extraData === 2) {
        col1 = photos.slice(0, dataPerColoumn + 1);
        col2 = photos.slice(dataPerColoumn + 1, dataPerColoumn * 2 + 2);
        col3 = photos.slice(dataPerColoumn * 2 + 2, total_photos);
      }
      setData({
        column1: col1,
        column2: col2,
        column3: col3,
      });
    }
    // TAB
    else if (screenWidth < 1024 && screenWidth > 767) {
      const dataPerColoumn = Math.floor(total_photos / 2);
      const extraData = total_photos % 2;
      let col1 = photos.slice(0, dataPerColoumn);
      let col2 = photos.slice(dataPerColoumn, total_photos);
      if (extraData === 1) {
        col1 = photos.slice(0, dataPerColoumn + 1);
        col2 = photos.slice(dataPerColoumn + 1, total_photos);
      }
      setData({
        column1: col1,
        column2: col2,
        column3: [],
      });
    }
    // Mobile
    else if (screenWidth <= 767) {
      setData({
        column1: photos,
        column2: [],
        column3: [],
      });
    }
  }, [screenWidth, photos]);

  useEffect(() => {
    // Event listener to update screenWidth state when the window is resized
    window.addEventListener("resize", updateScreenWidth);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  var timer;
  const addTransform = (componentList) => {
    componentList.map((el) => el.componentId.classList.add(el.transformStyle));
  };

  const removeClasses = (componentList) => {
    componentList.map((el) => el.component.classList.remove(el.class));
  };
  const handleMouseEnter = (index) => {
    const componentId = `overlay-container-${index}`;
    const textComponentId = `cardTitleContainer-${index}`;
    const dateComponetId = `cardDateContainer-${index}`;
    let component = document.getElementById(componentId);
    let componentList = [
      {
        componentId: document.getElementById(textComponentId),
        transformStyle: "transform-40",
      },
      {
        componentId: document.getElementById(dateComponetId),
        transformStyle: "transform-10",
      },
      {
        componentId: component,
        transformStyle: "opacity-1",
      },
    ];
    timer = setTimeout(() => addTransform(componentList), 50);
    // timer2 = setTimeout(() => , 50);
    component.classList.add("overlay");
  };

  const handleMouseLeave = (index) => {
    clearTimeout(timer);
    // clearTimeout(timer2)
    const componentId = `overlay-container-${index}`;
    const textComponentId = `cardTitleContainer-${index}`;
    const dateComponetId = `cardDateContainer-${index}`;
    let componentList = [
      {
        component: document.getElementById(componentId),
        class: "overlay",
      },
      {
        component: document.getElementById(componentId),
        class: "opacity-1",
      },
      {
        component: document.getElementById(textComponentId),
        class: "transform-40",
      },
      {
        component: document.getElementById(dateComponetId),
        class: "transform-10",
      },
    ];
    removeClasses(componentList);
  };
  return (
    <div className="container text-center d-flex justify-content-around align-items-start">
      {_.isArray(data.column1) && data.column1.length > 0 && (
        <div className="row gap-16 row-cols-auto flex-col justify-content-center">
          {data.column1.map((image, index) => (
            <div
              id={`image-container-${index}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="col position-relative"
              key={index}
            >
              <img
                className="image-element border-dark-subtle"
                src={image.src}
                width={300}
                alt={`art ${index}`}
                loading="lazy"
              />
              <div
                id={`overlay-container-${index}`}
                class="image-overlay position-absolute"
              >
                <div
                  id={`cardTitleContainer-${index}`}
                  class="items card-title-container"
                >
                  <p id="cardTitle">{_.toUpper(image.name)}</p>
                </div>
                <div
                  id={`cardDateContainer-${index}`}
                  class="items card-date-container"
                >
                  <p id="cardDate">{image?.date.split('T')[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {_.isArray(data.column2) && data.column2.length > 0 && (
        <div className="row gap-16 row-cols-auto flex-col justify-content-center">
          {data.column2.map((image, index) => (
            <div
              id={`image-container-${index}+col2`}
              onMouseEnter={() => handleMouseEnter(index + "col2")}
              onMouseLeave={() => handleMouseLeave(index + "col2")}
              className="col position-relative"
              key={index}
            >
              <img
                className="image-element border-dark-subtle"
                src={image.src}
                width={300}
                alt={`art ${index}`}
                loading="lazy"
              />
              <div
                id={`overlay-container-${index}col2`}
                class="image-overlay position-absolute"
              >
                <div
                  id={`cardTitleContainer-${index}col2`}
                  class="items card-title-container"
                >
                  <p id="cardTitle">{_.toUpper(image.name)}</p>
                </div>
                <div
                  id={`cardDateContainer-${index}col2`}
                  class="items card-date-container"
                >
                  <p id="cardDate">{image?.date.split('T')[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {_.isArray(data.column3) && data.column3.length > 0 && (
        <div className="row gap-16 row-cols-auto flex-col justify-content-center">
          {data.column3.map((image, index) => (
            <div
              id={`image-container-${index}col3`}
              onMouseEnter={() => handleMouseEnter(index + "col3")}
              onMouseLeave={() => handleMouseLeave(index + "col3")}
              className="col position-relative"
              key={index}
            >
              <img
                className="image-element border-dark-subtle"
                src={image.src}
                width={300}
                alt={`art ${index}`}
                loading="lazy"
              />
              <div
                id={`overlay-container-${index}col3`}
                class="image-overlay position-absolute"
              >
                <div
                  id={`cardTitleContainer-${index}col3`}
                  class="items card-title-container"
                >
                  <p id="cardTitle">{_.toUpper(image.name)}</p>
                </div>
                <div
                  id={`cardDateContainer-${index}col3`}
                  class="items card-date-container"
                >
                  <p id="cardDate">{image?.date.split('T')[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArtGallery;
