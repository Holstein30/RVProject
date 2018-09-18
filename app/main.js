// Main JS Functionality

function fetchData() {
  fetch("./dealers.json").then(res => {
    res.json().then(data => {
      //update the rendered cards with the correct dealers based on the filter
      let dealersZip = document.getElementById("dealers-zip");
      dealersZip.innerHTML = data.zipcode;
      checkboxValue(data);
    });
  });
}

// Filter Dealers based on selected User filters for certifications
function filterData(values, data) {
  let filter = data.dealers.map(dealer => {
    let certData = dealer.data.certifications;
    // if (values.length !== certData.length) return false;
    let valuesSorted = values.sort();
    let certDataSorted = certData.sort();
    if (values.length < certData.length) {
      if (values.some(x => certData.includes(x))) {
        return true;
      }
    }
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

// Determine whether a filter checkbox is checked or not
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

// Render the Dealers cards to the page(initial and after filtering)
function renderData(data) {
  let numDealers = document.getElementById("num-dealers");
  numDealers.innerHTML = data.length;
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
                <h3>Business Hours</h3>
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

// Return the certfications of each dealer without punctuation
function certifications(data) {
  let returnCerts = data.map(cert => {
    return `<p>${cert}</p>`;
  });
  return returnCerts.join("");
}

// Open Modal once a user clicks to contact a Dealer
function contactDealerEvent(selectedPro) {
  document.querySelector(".modal").classList.remove("hidden");
  document.getElementById("modal-overlay").classList.remove("hidden");
  let proName = selectedPro.value;
  document
    .querySelectorAll(".modal-pro-name")
    .forEach(el => (el.innerHTML = proName));
}

// Toggle the Modal back to hidden after User submits form or X's out of Modal
function toggleModal(e) {
  if (e) {
    e.preventDefault();
  }
  document
    .querySelectorAll('input[data-inputs="modal-input"')
    .forEach(input => (input.value = ""));
  document.querySelector("textarea").value = "";
  document.querySelector(".modal").classList.add("hidden");
  document.getElementById("modal-overlay").classList.add("hidden");
}

fetchData();
