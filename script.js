const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// Drop Down List

var config = {
  cUrl: "https://api.countrystatecity.in/v1/countries",
  cKey: "dUVFd3ZyZzdEQ0Fyc0R6OW1GN2l3QXRKMFBXUmJLcXFDTkcwVlFvcw==",
};

var countrySelect = document.querySelector(".country"),
  stateSelect = document.querySelector(".state"),
  citySelect = document.querySelector(".city");

function loadCountries() {
  let apiEndPoint = config.cUrl;

  fetch(apiEndPoint, { headers: { "X-CSCAPI-KEY": config.cKey } })
    .then((Response) => Response.json())
    .then((data) => {
      // console.log(data);

      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.iso2;
        option.textContent = country.name;
        countrySelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error loading countries:", error));

  stateSelect.disabled = true;
  citySelect.disabled = true;
  stateSelect.style.pointerEvents = "none";
  citySelect.style.pointerEvents = "none";
}

function loadStates() {
  stateSelect.disabled = false;
  citySelect.disabled = true;
  stateSelect.style.pointerEvents = "auto";
  citySelect.style.pointerEvents = "none";

  const selectedCountryCode = countrySelect.value;
  // console.log(selectedCountryCode);
  stateSelect.innerHTML = '<option value="">Select State</option>'; // for clearing the existing states
  citySelect.innerHTML = '<option value="">Select City</option>'; // Clear existing city options

  fetch(`${config.cUrl}/${selectedCountryCode}/states`, {
    headers: { "X-CSCAPI-KEY": config.cKey },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      data.forEach((state) => {
        const option = document.createElement("option");
        option.value = state.iso2;
        option.textContent = state.name;
        stateSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error loading countries:", error));
}

function loadCities() {
  citySelect.disabled = false;
  citySelect.style.pointerEvents = "auto";

  const selectedCountryCode = countrySelect.value;
  const selectedStateCode = stateSelect.value;
  // console.log(selectedCountryCode, selectedStateCode);

  citySelect.innerHTML = '<option value="">Select City</option>'; // Clear existing city options

  fetch(
    `${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`,
    { headers: { "X-CSCAPI-KEY": config.cKey } }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      data.forEach((city) => {
        const option = document.createElement("option");
        option.value = city.iso2;
        option.textContent = city.name;
        citySelect.appendChild(option);
      });
    });
}

window.onload = loadCountries;

// ending of drop down list

// contact form
const scriptURL =
  "https://script.google.com/macros/s/AKfycbyUJAUK392dyA4sJiSUUvif8kFhihPU6Nqihs6bh_dZfMcVpFrm8WHUnd5Ou-8xtmPr/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Thank you, Message Sent Successfully...";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 2000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});

// end of contact form



// schedule pickup form
const scriptURL2 =
  "https://script.google.com/macros/s/AKfycbzJ8xPNXlypP4ZrXJoJvcHXFEc45-B2pMg-b21rVPIQrlVmlT_kztibpsID9smXy3AR/exec";
const form2 = document.forms["submit-to-google-sheet"];
const msg2 = document.getElementById("msg2");

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL2, { method: "POST", body: new FormData(form2) })
    .then((response) => {
      msg2.innerHTML =
        "Congratulations, Your Request Has Been Sent Successfully, We Will Get Back To You Soon.....";
      setTimeout(function () {
        msg2.innerHTML = "";
      }, 10000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});

// select image in pickup form
// const selectImage = document.querySelector(".select-image");
// const inputFile = document.querySelector("#file");
// const imgArea = document.querySelector(".img-area");

// inputFile.addEventListener("change", function () {
//   const image = this.files[0];
//   if (image.size < 2000000) {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const allImg = imgArea.querySelectorAll("img");
//       allImg.forEach((item) => item.remove());
//       const imgUrl = reader.result;
//       const img = document.createElement("img");
//       img.src = imgUrl;
//       imgArea.appendChild(img);
//       imgArea.classList.add("active");
//       imgArea.dataset.img = image.name;

//       setTimeout(() => {
//         imgArea.classList.remove('active');
//         imgArea.dataset.img = '';
//         imgArea.innerHTML = `
//             <i class='bx bxs-cloud-upload icon'></i>
//             <h3>Upload Image</h3>
//             <p>Image size must be less than <span>2MB</span></p>
//         `;
//     }, 2000);
//     };
//     reader.readAsDataURL(image);
//   } else {
//     alert("Image size more than 2MB");
//   }
// });