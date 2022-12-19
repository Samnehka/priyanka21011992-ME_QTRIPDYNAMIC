import config from "../conf/index.js";
console.log(config.backendEndpoint);

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  try {
    console.log(search);
    let city = search.substring(6);
    return city;
  } catch (error) {
    return null;
  }
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let response = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    let adventuresData = await response.json();
    console.log(adventuresData);
    return adventuresData;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log(adventures);
  try {
    adventures.forEach((key) => {
      const columnElement = document.getElementById("data");
      columnElement.setAttribute("class", "row d-flex");
      //Create a new div element and set className
      let sectionElement = document.createElement("div");
      sectionElement.setAttribute("class", "col-sm-6 col-xl-3 mb-4");

      let sectionElement1 = document.createElement("div");
      sectionElement1.setAttribute("class", "card actvity-card ");

      //Create a new <a> element and set id and link path
      let linkElement = document.createElement("a");
      linkElement.setAttribute("id", key.id);
      linkElement.setAttribute("href", `detail/?adventure=${key.id}`);
      linkElement.setAttribute("class", "text-decoration-none text-dark");

      let imgElement = document.createElement("img");
      imgElement.setAttribute("src", key.image);
      imgElement.setAttribute("alt", key.name);
      imgElement.setAttribute("class", "card-img-top img-fluid ");

      let divForTextContent = document.createElement("div");
      divForTextContent.setAttribute(
        "class",
        "card-body d-xl-flex justify-content-between  pb-0"
      );

      let pElement1 = document.createElement("p");
      pElement1.textContent = key.name;
      pElement1.setAttribute(
        "class",
        "card-text m-0 p-0 text-center text-dark "
      );

      let pElement2 = document.createElement("p");
      pElement2.innerHTML = `<p class="card-text m-0 text-center text-dark">&#8377;${key.costPerHead}</p>`;

      let divForTextContent1 = document.createElement("div");
      divForTextContent1.setAttribute(
        "class",
        "card-body d-xl-flex justify-content-between align-items-end pt-0"
      );

      let pElement3 = document.createElement("p");
      pElement3.textContent = "Duration";
      pElement3.setAttribute(
        "class",
        "card-text m-0 p-0 text-center text-dark"
      );

      let pElement4 = document.createElement("p");
      pElement4.textContent = key.duration + " Hours";
      pElement4.setAttribute(
        "class",
        "card-text m-0 p-0 text-center text-dark "
      );

      let categoryElement = document.createElement("p");
      categoryElement.textContent = key.category;
      categoryElement.setAttribute("class", "category-banner");

      sectionElement1.appendChild(categoryElement);

      divForTextContent1.appendChild(pElement3);
      divForTextContent1.appendChild(pElement4);

      divForTextContent.appendChild(pElement1);
      divForTextContent.appendChild(pElement2);

      linkElement.appendChild(imgElement);
      linkElement.appendChild(divForTextContent);
      linkElement.appendChild(divForTextContent1);

      sectionElement1.appendChild(linkElement);

      sectionElement.appendChild(sectionElement1);

      columnElement.appendChild(sectionElement);
    });
  } catch (error) {
    console.log(error);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter(
    (key) => key.duration > low && key.duration <= high
  );

  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  const filteredList = list.filter(adventure => categoryList.includes(adventure.category))

  return filteredList;


}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  let filteredList = [];

  console.log(filters)
  // 3. Filter by duration and category together
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  // 2. Filter by duration only
  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  // 1. Filter by category only
  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }

  // default case when there is no filter
  else {
    filteredList = list;
  }
  return filteredList;

  // Place holder for functionality to work in the Stubs
  // return list;
}


function isEmpty(filters) {
  return Object.keys(filters.category).length === 0;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = JSON.parse(window.localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;

console.log(filters);
  //Iterates over category filters and inserts category pills into DOM
  
  // let divElement = document.createElement("div");
  // divElement.setAttribute("class","border border-success rounded d-flex")

  filters["category"].forEach((key) => {
    
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `
                 <div>${key}</div>
                `;
    // divElement.appendChild(ele);
    // document.getElementById("category-list").appendChild(divElement);
    document.getElementById("category-list").appendChild(ele);
    
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
