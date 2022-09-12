// Import modules
import { toggleForm, clearForm } from "./form";
import { initDb, getDb, postDb, deleteDb } from "./database";
import { fetchCards } from "./card";

// Import CSS files
import "../css/index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip, Toast, Popover } from "bootstrap";

import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";

window.addEventListener("load", function () {
  initDb();
  fetchCards();
  // We are temporarily placing getDb() and postDb() function calls here for testing. We will move it to another event listener later.
  //   getDb();
  //   postDb("Lernantino", "learnantino@test.com", 8186601234, "Bear");
  //   getDb();
  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
});

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener("click", (event) => {
  toggleForm();
});

form.addEventListener("submit", (event) => {
  // Handle data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {
    fetchCards();
    // Toggles the submit button back to POST functionality
    submitBtnToUpdate = false;
  }

  //not working (error: deleteCard not defined)
  window.deleteCard = (e) => {
    // Grabs the id from the button element attached to the contact card.
    let id = parseInt(e.id);
    // Delete the card
    deleteDb(id);
    // Reload the DOM
    fetchCards();
  };

  window.editCard = (e) => {
    // Grabs the id from the button element attached to the contact card and sets a global variable that will be used in the form element.
    profileId = parseInt(e.dataset.id);

    // Grabs information to pre-populate edit form
    let editName = e.dataset.name;
    let editEmail = e.dataset.email;
    let editPhone = e.dataset.phone;

    document.getElementById("name").value = editName;
    document.getElementById("email").value = editEmail;
    document.getElementById("phone").value = editPhone;

    form.style.display = "block";

    // Toggles the Submit button so that it now Updates an existing contact instead of posting a new one
    submitBtnToUpdate = true;
  };

  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
});
