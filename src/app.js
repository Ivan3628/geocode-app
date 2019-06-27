import axios from "axios";

//Get Location Form
const locationForm = document.getElementById("location-form");

//Listen For Submit
locationForm.addEventListener("submit", e => {
  const location = document.getElementById("location-input").value;

  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: "AIzaSyAr9Lylv2hLihvotSOfBYKOBTnA-bTlxUc"
      }
    })
    .then(response => {
      //Log full response
      console.log(response);

      //Formatted Adress
      const formattedAddress = response.data.results[0].formatted_address;

      const formattedAddressOutput = `
      <ul class="list-group">
      <li class="list-group-item">${formattedAddress}</li>
      </ul>
      `;

      //Address Components
      const addressComponents = response.data.results[0].address_components;

      let addressComponentsOutput = "<ul class='list-group'>";

      addressComponents.forEach(addressComponent => {
        addressComponentsOutput += `
        <li class="list-group-item"><strong>${
          addressComponent.types[0]
        }<strong>:${addressComponent.long_name}</li>
        `;
      });
      addressComponentsOutput += "</ul>";

      //Geometry
      const lat = response.data.results[0].geometry.location.lat;
      const lng = response.data.results[0].geometry.location.lng;

      const geometryOutput = `
      <ul class="list-group">
      <li class="list-group-item"><strong>Latitude:</strong> ${lat}</li>
      <li class="list-group-item"><strong>Longtitude:</strong> ${lng}</li>
      </ul>
      `;

      //Clear input
      document.getElementById("location-input").value = "";

      //Output to app
      document.getElementById(
        "formatted-address"
      ).innerHTML = formattedAddressOutput;

      document.getElementById(
        "address-components"
      ).innerHTML = addressComponentsOutput;

      document.getElementById("geometry").innerHTML = geometryOutput;
    })
    .catch(err => {
      console.log(err);
    });

  e.preventDefault();
});
