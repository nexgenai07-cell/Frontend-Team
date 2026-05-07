// =====================================
// ARRAY FOR STORING CONTACTS
// =====================================

// Empty array for contacts
let contacts = [];

// =====================================
// SELECTING HTML ELEMENTS
// =====================================

// Selecting name input field
const nameInput = document.getElementById("name-input");

// Selecting phone input field
const phoneInput = document.getElementById("phone-input");

// Selecting add button
const addButton = document.getElementById("add-btn");

// Selecting contact list container
const contactList = document.getElementById("contact-list");

// Selecting search input field
const searchInput = document.getElementById("search-input");

// =====================================
// FUNCTION TO DISPLAY CONTACTS
// =====================================

// Function for showing contacts on screen
function displayContacts(contactArray) {
  // Clearing old contacts before rendering again
  contactList.innerHTML = "";

  // Using map() to loop through contacts
  contactArray.map(function (contact, index) {
    // Creating new div for contact card
    const card = document.createElement("div");

    // Adding class name to card
    card.classList.add("contact-card");

    // Adding HTML content inside card
    card.innerHTML = `
        
            <!-- Contact information -->
            <div class="contact-info">

                <!-- Showing contact name -->
                <strong>${contact.name}</strong><br>

                <!-- Showing contact phone -->
                ${contact.phone}

            </div>

            <!-- Delete button -->
            <button class="delete-btn">Delete</button>

        `;

    // Selecting delete button from current card
    const deleteButton = card.querySelector(".delete-btn");

    // Adding click event on delete button
    deleteButton.addEventListener("click", function () {
      // Calling delete function
      deleteContact(index);
    });

    // Adding card inside contact list container
    contactList.appendChild(card);
  });
}

// =====================================
// FUNCTION TO ADD NEW CONTACT
// =====================================

// Function for adding contact
function addContact() {
  // Getting value from name input
  const name = nameInput.value;

  // Getting value from phone input
  const phone = phoneInput.value;

  // Checking if fields are empty
  if (name === "" || phone === "") {
    // Showing alert message
    alert("Please fill all fields");

    // Stopping function
    return;
  }

  // Creating contact object
  const newContact = {
    name: name,
    phone: phone,
  };

  // Adding contact object into array
  contacts.push(newContact);

  // Calling display function
  displayContacts(contacts);

  // Clearing input fields after adding contact
  nameInput.value = "";
  phoneInput.value = "";
}

// =====================================
// FUNCTION TO DELETE CONTACT
// =====================================

// Function for deleting contact
function deleteContact(index) {
  // Removing contact from array using splice()
  contacts.splice(index, 1);

  // Updating UI after deletion
  displayContacts(contacts);
}

// =====================================
// SEARCH CONTACT USING FILTER()
// =====================================

// Adding input event on search field
searchInput.addEventListener("input", function () {
  // Getting search text and converting to lowercase
  const searchText = searchInput.value.toLowerCase();

  // Using filter() for matching contacts
  const filteredContacts = contacts.filter(function (contact) {
    // Returning matching contacts
    return contact.name.toLowerCase().includes(searchText);
  });

  // Showing filtered contacts
  displayContacts(filteredContacts);
});

// =====================================
// BUTTON CLICK EVENT
// =====================================

// Adding click event on add button
addButton.addEventListener("click", addContact);
