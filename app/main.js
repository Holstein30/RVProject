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
  let dealerContainer = document.getElementById("dealers-container");
  let dealerList = `<ul>`;
  data.dealers.map(dealer => {
    dealerList += `
    <li>
        <h1>${dealer.data.name}</h1>
        <section>
            <h1>${dealer.data.phone1}</h1>
        </section>
    </li>`;
  });
  dealerList += `</ul>`;
  dealerContainer.innerHTML = dealerList;
}

fetchData();
// Build HTML Elements
// Render All
// Filter Results
