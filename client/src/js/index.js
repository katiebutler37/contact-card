// Import modules
import { toggleForm, clearForm } from "./form";
import { initDb, getDb, postDb } from "./database";
import { fetchCards } from "./card";

// Import CSS files
import "../css/index.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, Toast, Popover } from 'bootstrap';

import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

window.addEventListener('load', function () {
    initDb();
    fetchCards();
     // We are temporarily placing getDb() and postDb() function calls here for testing. We will move it to another event listener later.
//   getDb();
//   postDb("Lernantino", "learnantino@test.com", 8186601234, "Bear");
//   getDb();
    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
  });

    // Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener('click', event => {
  toggleForm()
 })

form.addEventListener('submit', event => {
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

// Clear form
clearForm();
// Toggle form
toggleForm();
// Reload the DOM
fetchCards();
});