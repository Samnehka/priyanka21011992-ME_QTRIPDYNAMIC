import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  try {
    console.log(search);
    let adventureId = search.substring(11);
    return adventureId;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let response = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    let adventuresDetailsData = await response.json();
    console.log(adventuresDetailsData);
    return adventuresDetailsData;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent =
    adventure.subtitle;

  let imageDivElement = document.getElementById("photo-gallery");

  adventure.images.forEach((photo) => {
    let divElement = document.createElement("div");
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", photo);
    imgElement.setAttribute("class", "activity-card-image ");
    divElement.append(imgElement);
    imageDivElement.appendChild(divElement);
  });

  document.getElementById("adventure-content").textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let imageDivElement = document.getElementById("photo-gallery");
  // remove all child nodes
  while (imageDivElement.hasChildNodes()) { 
    imageDivElement.removeChild(imageDivElement.lastChild); 
  }
  
  let maindiv = document.createElement("div");
  maindiv.setAttribute("id", "carouselExampleControls");
  maindiv.setAttribute("class", "carousel slide");
  maindiv.setAttribute("data-bs-ride", "carousel");

  let innerdiv = document.createElement("div");
  innerdiv.setAttribute("class", "carousel-inner");

  images.forEach((photo) => {
    console.log(photo);
    let divElement = document.createElement("div");
    divElement.setAttribute("class", "carousel-item ");

    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", photo);
    imgElement.setAttribute("class", "d-block w-100");
    divElement.appendChild(imgElement);
    innerdiv.append(divElement);
  });

  let buttonElement = document.createElement("div");
  buttonElement.innerHTML = `
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>`;

  maindiv.appendChild(innerdiv);
  maindiv.appendChild(buttonElement);
  imageDivElement.appendChild(maindiv);

  let classToSetActive = document.querySelector(".carousel-item");
  console.log(classToSetActive);
  classToSetActive.setAttribute("class", "carousel-item active");
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure.available);
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";

    let costElement = document.getElementById("reservation-person-cost");
    costElement.textContent = adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let cost = adventure.costPerHead * persons;
  let totalCostElement = document.getElementById("reservation-cost");
  totalCostElement.textContent = cost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let url = config.backendEndpoint + "/reservations/new";
    let date = new Date(form.elements["date"].value);
    let name = form.elements["name"].value;
    let person = form.elements["person"].value;
    let adventureId = adventure.id;

    let bodyString = JSON.stringify({
      name: name,
      date: date,
      person:person,
      adventure: adventureId,
    });

    // var a = [];
    // for (var p in dataObject)
    //   a.push(encodeURIComponent(p) + "=" + encodeURIComponent(dataObject[p]));
    // var objectString = a.join("&");
    // console.log(objectString);
    // console.log(JSON.stringify(objectString));

    try{
      let res = await fetch(url, {
        method: "POST",
        body: bodyString,
        headers: {
          "Content-Type": "application/json",
        },
      });

    const data = await res.json();
    //alert("Success!")
    console.log(data);
  } catch(error) {
    console.log(error.message)
  }
   
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure.reserved);
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
