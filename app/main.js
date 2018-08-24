// Main JS Functionality

// !Event Handlers
// Navigation Events
// Filter Events
// Dealer Section Events
// Connect Events
// Footer Events

// !Conditional List Rendering
function fetchData() {
  fetch("./dealers.json").then(res => {
    res.json().then(data => {
      //update the rendered cards with the correct dealers based on the filter
      renderData(data);
    });
  });
}

function renderData(data) {
  let name = data.dealers[0].data.name;
  document.getElementById("dealer-cards").innerHTML = name;
}

fetchData();
// Build HTML Elements
// Render All
// Filter Results
