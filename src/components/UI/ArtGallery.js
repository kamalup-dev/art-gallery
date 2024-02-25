import React from "react";
import image_data from "../../data/pictures";
import "../../styles/artgallery.css";

const photos = image_data;

function ArtGallery() {
    var timer;
    const addTransform = (componentList) => {
        componentList.map(el => el.componentId.classList.add(el.transformStyle))
    }
  const handleMouseEnter = (index) => {
    const componentId = `overlay-container-${index}`;
    const textComponentId = `cardTitleContainer-${index}`
    const dateComponetId = `cardDateContainer-${index}`
    let component = document.getElementById(componentId);
    let componentList = [
        {
            componentId: document.getElementById(textComponentId),
            transformStyle: "transform-40"
        },
        {
            componentId: document.getElementById(dateComponetId),
            transformStyle: "transform-10"
        }
    ]
    timer = setTimeout(() => addTransform(componentList), 50)
    component.classList.add("overlay");
  };

  const handleMouseLeave = (index) => {
    clearTimeout(timer)
    const componentId = `overlay-container-${index}`;
    const textComponentId = `cardTitleContainer-${index}`
    const dateComponetId = `cardDateContainer-${index}`
    let component = document.getElementById(componentId);
    let componentText = document.getElementById(textComponentId);
    let componentDate = document.getElementById(dateComponetId);
    componentText.classList.remove("transform-40")
    componentDate.classList.remove("transform-10")
    component.classList.remove("overlay");
  };
  return (
    <div className="container text-center">
      <div className="row gap-16 row-cols-auto justify-content-center">
        {photos.map((image, index) => (
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
              alt={`Photo ${index}`}
              loading="lazy"
            />
            <div
              id={`overlay-container-${index}`}
              class="image-overlay position-absolute"
            >
              <div id={`cardTitleContainer-${index}`} class="items card-title-container">
                <p id="cardTitle">{image.name}</p>
              </div>
              <div id={`cardDateContainer-${index}`} class="items card-date-container">
                <p id="cardDate">{image.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtGallery;
