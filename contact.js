class UI {
  addContactToList(contact) {
    const list = document.getElementById("contact-list");

    var html = `
      <tr>
         <td>${contact.contactId}</td>
         <td>${contact.name}</td>
         <td>${contact.email}</td>
         <td>${contact.phone}</td>
         <td>${contact.message}</td>
         <td><a href="#" id="delete-btn" data-id="${contact.contactId}" class="btn-dlt  delete "><span></span><span></span><span></span><span></span>Delete</a></td>
    
      </tr>   
      `;

    list.innerHTML += html;
  }

  showAlert(message, alertClass) {
    const alert = `
      <div class="alert alert-${alertClass}">${message}</div>    
      `;

    const alertMessage = document.querySelector(".alert-message");
    alertMessage.insertAdjacentHTML("afterbegin", alert);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteContact(element) {
    element.parentElement.parentElement.remove();
  }
}

class Storage {
  static getContacts() {
    let contacts;
    if (localStorage.getItem("contacts") === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem("contacts"));
    }
    return contacts;
  }

  static displayContacts() {
    const contacts = Storage.getContacts();
    const ui = new UI();

    contacts.forEach((contact) => {
      ui.addContactToList(contact);
    });
  }

  static deleteContact(element) {
    if (element.classList.contains("delete")) {
      const id = element.getAttribute("data-id");
      const contacts = Storage.getContacts();
      const ui = new UI();

      contacts.forEach((contact, index) => {
        if (contact.contactId == id) {
          contacts.splice(index, 1);
          ui.deleteContact(element);
          ui.showAlert("The item is deleted successfully.", "danger");
        }
      });
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }
}

loadedStorage();

function loadedStorage() {
  Storage.displayContacts();
  document
    .getElementById("contact-list")
    .addEventListener("click", function (e) {
      Storage.deleteContact(e.target);
    });
}
