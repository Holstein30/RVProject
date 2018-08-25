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
      filterData(data);
    });
  });
}

function filterData(data) {
  let checkboxes = document.querySelectorAll(
      'input[name="filter-checkbox"]:checked'
    ),
    values = [];
  checkboxes.forEach.call(checkboxes, function(el) {
    values.push(el.value);
  });
  console.log(values);
  // let certData = data.dealers.data.certifications
  // if (values.length !== certData.length)
  //     return false;
  // for (var i = values.length; i--;) {
  //     if (values[i] !== certData[i])
  //         return false;
  // }

  // return true;
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
            <p>Can't talk now? Click below to send an email.</p>
            <button class="contact-dealer">Contact this Pro</button>
            <section>
                <h1>Business Hours</h1>
                <p>Weekdays ${dealer.data.weekHours.mon}</p>
                <p>Saturdays ${dealer.data.weekHours.sat}</p>
                <p>Sundays ${dealer.data.weekHours.sun}</p>
            </section>
            <section>
               ${certifications(dealer.data.certifications)}
            </section>
        </section>
    </li>`;
  });
  dealerList += `</ul>`;
  dealerContainer.innerHTML = dealerList;
}

function certifications(data) {
  let returnCerts = data.map(certs => {
    return `<p>${certs}</p>`;
  });
  return returnCerts;
}

fetchData();
// Build HTML Elements
// Render All
// Filter Results
