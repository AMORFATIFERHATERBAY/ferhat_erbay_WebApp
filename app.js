class Contact {
  constructor(name, email, phone, message) {
    this.contactId = Math.floor(Math.random() * 100000);
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.message = message;
  }
}

class UI {
  clearControl() {
    var name = (document.getElementById("name").value = "");
    var email = (document.getElementById("email").value = "");
    var phone = (document.getElementById("phone").value = "");
    var message = (document.getElementById("message").value = "");
  }

  showAlert(message, alertClass) {
    const sendBtn = document.getElementById("send-btn");

    var alert = `
          <div class="alert alert-${alertClass}">${message}</div>
     `;
    sendBtn.insertAdjacentHTML("beforebegin", alert);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
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

  static addContact(contact) {
    const contacts = Storage.getContacts();
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
}

document.querySelector(".send").addEventListener("click", function (e) {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var message = document.getElementById("message").value;

  const contact = new Contact(name, email, phone, message);
  const ui = new UI();
  if (name == "" || phone == "" || email == "") {
    ui.showAlert("*Please fill in the form", "warning");
  } else {
    Storage.addContact(contact);
    ui.clearControl();
    ui.showAlert(
      "*Your contact information has been successfully added.",
      "success"
    );
  }
  e.preventDefault();
});
