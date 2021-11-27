import { tabindexAdder } from "./tabindex.js";

// DOM Elements
const contactForm = document.getElementById("form-contact");
const form = document.querySelector(".form-contact, form");
const confirmationModal = document.getElementById("form-sent");

const contactBtn = document.getElementById("contact-me");
const closeBtn = document.getElementById("close-form");
const submitBtn = document.getElementById("form-btn");
const closeBtnConfirmation = document.getElementById("close-confirmation");
const confirmationMsgContainer = document.getElementById("confirmation-msg");
let prevActiveElement;

// display photographer name in form title
function displayTitle() {
  document.getElementById("form-title").innerHTML = `Contactez-moi </br>${
    document.querySelector(".photographer-profile__heading").innerHTML
  }`;
}

// sorts formDatas as objects
const formFields = [
  {
    container: document.getElementById("form-firstname-container"),
    location: document.getElementById("form-firstname"),
    errorMsg: "Veuillez entrer un prénom d'au moins 2 caractères",
  },
  {
    container: document.getElementById("form-lastname-container"),
    location: document.getElementById("form-lastname"),
    errorMsg: "Veuillez entrer un nom d'au moins 2 caractères",
  },
  {
    container: document.getElementById("form-email-container"),
    location: document.getElementById("form-email"),
    errorMsg: "Veuillez entrer un email valide",
  },
  {
    container: document.getElementById("form-msg-container"),
    location: document.getElementById("form-msg"),
    errorMsg: "Votre message doit contenir un minimum de 50 caractères",
  },
];

// launch modal
contactBtn.addEventListener("click", () => {
  displayTitle();
  contactForm.style.display = "block";
  tabindexAdder(".tab-element-modal");
  contactForm.setAttribute("tabindex", 1);
  prevActiveElement = document.activeElement;
  contactForm.focus()
})

// close modal
function closeContactModal() {
  contactForm.style.display = "none";
  tabindexAdder(".tab-element");
  prevActiveElement.focus()
}

closeBtn.addEventListener("click", closeContactModal);

// close confirmation modal
function closeConfirmationModal() {
  confirmationModal.style.display = "none";
  tabindexAdder(".tab-element");
}

closeBtnConfirmation.addEventListener("click", closeConfirmationModal);

// close both modals on esc keyboard                      
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeContactModal()
    closeConfirmationModal()
  }
})

// error message
function errorMsgDisplay(formField) {
  if (!formField.location.validity.valid || formField.location.validity.valueMissing) {
    formField.container.setAttribute("data-error", formField.errorMsg);
    formField.container.setAttribute("data-error-visible", "true");
    formField.location.setAttribute("aria-invalid", "true")
  } else {
    formField.container.setAttribute("data-error", "");
    formField.container.setAttribute("data-error-visible", "");
    formField.location.setAttribute("aria-invalid", "false")
  }
}

formFields.forEach((field) => {
  field.location.addEventListener("change", () => {
    errorMsgDisplay(field);
  });
})

// validation
const validationMsg = "Merci, votre message a bien été envoyé";

// inspects if entire form is valid
function isValid() {
  for (let i = 0; i < formFields.length; i += 1) {
    if (!formFields[i].location.validity.valid) {
      return false;
    }
  }
  return true;
}

function validate() {
  if (isValid()) {
    contactForm.style.display = "none";
    
    confirmationModal.style.display = "block";
    tabindexAdder(".tab-element-confirmation-modal");
    form.reset();
    confirmationMsgContainer.innerHTML = validationMsg;
  } else {
    formFields.forEach((field) => {
      field.location.addEventListener("change", () => {
        errorMsgDisplay(field);
      });
    });
  }
}

submitBtn.onclick = validate;

