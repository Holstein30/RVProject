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
      checkboxValue(data);
    });
  });
}

function filterData(values, data) {
  let filter = data.dealers.map(dealer => {
    let certData = dealer.data.certifications;
    if (values.length !== certData.length) return false;
    let valuesSorted = values.sort();
    let certDataSorted = certData.sort();
    for (var i = values.length; i--; ) {
      if (valuesSorted[i] !== certDataSorted[i]) return false;
    }
    return true;
  });
  let filteredResults = [];
  let filterResults = filter.map((bool, i) => {
    if (bool) {
      filteredResults.push(data.dealers[i]);
    }
  });
  if (filteredResults.length === 0) {
    data.dealers.map(dealer => {
      filteredResults.push(dealer);
    });
  }
  renderData(filteredResults);
}

function checkboxValue(data) {
  let checkboxes = document.querySelectorAll(
      'input[name="filter-checkbox"]:checked'
    ),
    values = [];
  checkboxes.forEach.call(checkboxes, function(el) {
    values.push(el.value);
  });
  filterData(values, data);
}

function renderData(data) {
  let dealerContainer = document.getElementById("dealers-container");
  let dealerList = `<section>`;
  data.map(dealer => {
    dealerList += `
    <div>
        <h1>${dealer.data.name}</h1>
        <section>
            <a href="#"><img src="./assets/images/phone-icon-mobile.png" /><span>Tap to Call</span>${
              dealer.data.phone1
            }</a>
            <p>Can't talk now? Click below to send an email.</p>
            <button class="contact-dealer" value="${
              dealer.data.name
            }" onClick="contactDealerEvent(this)"><img src="./assets/images/email-icon.png" />Contact this Pro</button>
            <section class="hours-section">
                <h1>Business Hours</h1>
                <p>Weekdays ${dealer.data.weekHours.mon}</p>
                <p>Saturdays ${dealer.data.weekHours.sat}</p>
                <p>Sundays ${dealer.data.weekHours.sun}</p>
            </section>
            <section class="certs-section">
               ${certifications(dealer.data.certifications)}
            </section>
        </section>
    </div>`;
  });
  dealerList += `</section>`;
  dealerContainer.innerHTML = dealerList;
}

function certifications(data) {
  let returnCerts = data.map(certs => {
    return `<p>${certs}</p>`;
  });
  return returnCerts;
}

function contactDealerEvent(selectedPro) {
  document.querySelector(".modal").classList.remove("hidden");
  let proName = selectedPro.value;
  document
    .querySelectorAll(".modal-pro-name")
    .forEach(el => (el.innerHTML = proName));
}

document.getElementById("modal-submit").addEventListener("click", e => {
  e.preventDefault();
  document
    .querySelectorAll('input[data-inputs="modal-input"')
    .forEach(input => (input.value = ""));
  document.querySelector("textarea").value = "";
  // document.querySelector(".modal").classList.add("hidden");
});

fetchData();
// Build HTML Elements
// Render All
// Filter Results
