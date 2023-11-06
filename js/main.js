//Kunskapskontroll 2 - Jessica Tell

document.addEventListener("DOMContentLoaded", () => {
  //-------globala variablar-------
  let nameInput = document.querySelector("#name-input");
  let phoneInput = document.querySelector("#phone-input");
  let list = document.querySelector("#contacts");
  let addBtn = document.getElementById("add-btn");
  let deleteAllBtn = document.getElementById("delete-all-btn");
  let errorMessage = document.getElementById("error-message");
  let message = document.getElementById("message");
  let namePattern = /^[A-Za-z\- åäö]+$/;
  let phonePattern = /^\d+$/;

  //-------valideringsfunktion för att lägga till kontakt-------
  function validateInput(name, phone) {
    if (!name.length || !phone.length) {
      errorMessage.textContent = "Hörru! Namn och Telefonnummer TACK!";
      errorMessage.style.display = "block";
      return false;
    } else if (validName(name) && validPhone(phone)) {
      errorMessage.style.display = "none";
      return true;
    } else {
      errorMessage.style.display = "none";
      return false;
    }
  }

  // -------knappfunktion-------
  function btnModes(event) {
    event.preventDefault();
    let name = nameInput.value;
    let phone = phoneInput.value;
    errorMessage.style.display = "none";

    if (validateInput(name, phone)) {
      addContact(name, phone);
      resetInputs();
    }
  }

  addBtn.addEventListener("click", btnModes);

  //-------namnruta-------
  function validName(name) {
    // valideringsfunktion för namnruta
    if (!namePattern.test(name)) {
      errorMessage.textContent = "Vänligen använd bokstäver";
      errorMessage.style.display = "block";
      return false;
    } else {
      errorMessage.style.display = "none"; 
      return true;
    }
  }
  nameInput.addEventListener("input", () => {
    //event för namnruta
    if (nameInput.value === "") {
      errorMessage.style.display = "none";
    } else {
      validName(nameInput.value);
    }
  });

  //-------telefonruta-------
  function validPhone(phone) {
    //valideringsfunktion för telefonruta
    if (!phonePattern.test(phone)) {
      errorMessage.textContent = "Vänligen använd siffror";
      errorMessage.style.display = "block";
      return false;
    } else {
      errorMessage.style.display = "none"; // döljer error när inmatningen är giltig
      return true;
    }
  }
  phoneInput.addEventListener("input", () => {
    //event för telefonruta
    if (phoneInput.value === "") {
      errorMessage.style.display = "none";
    } else {
      validPhone(phoneInput.value);
    }
  });

  //-------funktion som återställer rutorna-------
  function resetInputs() {
    nameInput.value = "";
    phoneInput.value = "";
    errorMessage.style.display = "none";
  }

  //-------kontaktlistan som skapas när användaren trycker på lägg till-symbolen-------
  function addContact(name, phone) {
    //funktion som skapar namnruta, telefonruta, ändraknapp, raderaknapp
    let contactList = document.createElement("li"); //skapar kontaktlistan

    //-------namnruta-------
    let newNameInput = document.createElement("input");
    newNameInput.type = "text";
    newNameInput.value = name; 
    newNameInput.placeholder = "Namn";
    newNameInput.disabled = true;
    contactList.appendChild(newNameInput); //lägger till namnrutan i listan

    //-------telefonruta--------
    let newPhoneInput = document.createElement("input");
    newPhoneInput.type = "text";
    newPhoneInput.value = phone; 
    newPhoneInput.placeholder = "Telefonnummer";
    newPhoneInput.disabled = true;
    contactList.appendChild(newPhoneInput); //lägger till telefonrutan i listan

    //-------ändraknapp--------
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Ändra";
    editBtn.style.cursor = "pointer";
    editBtn.addEventListener("click", () => {
      editSaveMode(newNameInput, newPhoneInput, editBtn);
    });
    contactList.appendChild(editBtn);

    //------raderaknapp--------
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Radera";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", () => {
      deleteContact(contactList);
    });
    contactList.appendChild(deleteBtn);

    //lägger till kontaktlistan i globala 'list'
    list.appendChild(contactList);
  }

  //-------funktion för att spara/ändra-------
  function editSaveMode(nameInput, phoneInput, editBtn) {
    if (editBtn.innerHTML === "Ändra") {
      nameInput.disabled = false;
      phoneInput.disabled = false;
      editBtn.innerHTML = "Spara";
      message.style.display = "none";
    } else if (editBtn.innerHTML === "Spara") {
      if (validateInput(nameInput.value, phoneInput.value)) {
        nameInput.disabled = true;
        phoneInput.disabled = true;
        editBtn.innerHTML = "Ändra";
        message.style.display = "none";
      } else {
        message.style.display = "block";
        message.innerHTML =
          "Fyll i korrekta kontaktuppgifter!<br>Du kan inte spara en tom kontakt.";
      }
    }
  }

  //-------funktion för att radera enskild kontakt (med popup)-------
  function deleteContact(contactList) {
    if (confirm("Är du säker på att du vill radera kontakten?")) {
      list.removeChild(contactList);
      errorMessage.style.display = "none";
      message.style.display = "none";
      nameInput.value = "";
      phoneInput.value = "";
    }
  }

  //-------funktion för att radera hela listan (med popup)-------
  function deleteAllContacts() {
    if (confirm("Är du säker på att du vill radera ALLA dina kontakter?")) {
      let contacts = document.querySelectorAll("li");
      contacts.forEach((contact) => {
        list.removeChild(contact);
      });
      nameInput.value = "";
      phoneInput.value = "";
    }
  }

  deleteAllBtn.addEventListener("click", deleteAllContacts);
});
