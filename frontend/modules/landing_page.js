import config from "../conf/index.js";
console.log(config.backendEndpoint);
async function init() {
  //Fetches list of all cities along with their images and description
  try {
    let cities = await fetchCities();

    //Updates the DOM with the cities
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  } catch (error) {
    return null;
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    console.log(config.backendEndpoint);
    let response = await fetch(`${config.backendEndpoint}/cities`);
    console.log(response);
    let citiesData = await response.json();
    console.log(citiesData);
    return citiesData;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const columnElement = document.getElementById("data");

  //Create a new div element and set className
  let sectionElement = document.createElement("div");
  sectionElement.setAttribute("class", "col- col-sm-6 col-xl-3 mb-4");
  
  //Create a new div element and set className
  let sectionElement1 = document.createElement("div");
  sectionElement1.setAttribute("class", "tile");

  //Create a new <a> element and set id and link path
  let linkElement = document.createElement("a");
  linkElement.setAttribute("id", id);
  linkElement.setAttribute("href", `pages/adventures/?city=${id}`);

  //Create a new div element and set className
  let divForTextContent = document.createElement("div");
  divForTextContent.setAttribute("class", "tile-text");

  //Create an h5 for city name
  let h5Element = document.createElement("h5");
  h5Element.textContent = city;

  //Create a p element for description
  let pElement = document.createElement("p");
  pElement.textContent = description;

  //Create a new <a> element and set id and link path
  let linkElementForImage = document.createElement("a");
  linkElementForImage.setAttribute("id", id);
  linkElementForImage.setAttribute("href", `pages/adventures/?city=${id}`);

  //Create an img element using function
  let imageElement = getImageElement(image, city);

  //Append the city, description to the div created for text.
  divForTextContent.appendChild(h5Element);
  divForTextContent.appendChild(pElement);

  //Append the div created for text to the a element.
  linkElement.appendChild(divForTextContent);
  linkElementForImage.appendChild(imageElement);

  //Append <a> elements created to the div element
  sectionElement1.appendChild(linkElement);
  sectionElement1.appendChild(linkElementForImage);

  //Append the div element to the outer div element
  sectionElement.appendChild(sectionElement1);

  //Append the div element to the element with class="row"
  columnElement.append(sectionElement);

  ////Return the new section element created.
  return columnElement;
}

const getImageElement = (src, alt) => {
  let imgElement = document.createElement("img");
  imgElement.setAttribute("src", src);
  imgElement.setAttribute("alt", alt);
  // imgElement.setAttribute("width", 100);
  // imgElement.setAttribute("height", 100);
  return imgElement;
};

export { init, fetchCities, addCityToDOM };
