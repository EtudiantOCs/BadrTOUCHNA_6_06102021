/**
  * Displays photographer profile in DOM
  * @param {Array} array array of photographer's objects
  * @param {Number} photographerIndex photographer id, highly suggested to call "getPhotographer()"
  */

const url = "https://etudiantocs.github.io/BadrTOUCHNA_6_06102021/";

export function generateProfile(array, photographerIndex) {

  // error msg if photographer not found 
  if (photographerIndex === undefined) {
    document.querySelector(".catalog").remove();
    document.querySelector(".gallery-container").remove();

    const error = document.createElement("p");
    const errornode = document.createTextNode("Photographer could not be found");
    error.appendChild(errornode);
    error.setAttribute("id", "error-not-found");
    error.setAttribute("role", "alert");
    document.querySelector("main").appendChild(error);
  }

  // photographer found get the DOM ready to display
  else {
    //creates HTML element
    const container = document.createElement("figure");
    const image = document.createElement("img");
    const headingContainer = document.createElement("header");
    const heading = document.createElement("h2");
    const adress = document.createElement("p");
    const tagline = document.createElement("p");
    const price = document.createElement("p");
    const tags = document.createElement("ul");
    const link = document.createElement("div");
    const headinglink = document.createElement("a");
  
    // creates a text to attach to the HTML element
    const adressnode = document.createTextNode(array[photographerIndex].city + ", " + array[photographerIndex].country);
    const headingnode = document.createTextNode(array[photographerIndex].name);
    const taglinenode = document.createTextNode(array[photographerIndex].tagline);
    const pricenode = document.createTextNode(array[photographerIndex].price + "€ /jour")
  
    // joins the textNodes to HTML element
    heading.appendChild(headingnode);
    adress.appendChild(adressnode);
    tagline.appendChild(taglinenode);
    price.appendChild(pricenode);
    
    // sets the new element to the DOM
    document.querySelector(".catalog").appendChild(container);
    container.appendChild(link);
    link.appendChild(image);
    container.appendChild(headingContainer);
    headingContainer.appendChild(headinglink);
    link.appendChild(heading);
    headingContainer.appendChild(adress);
    headingContainer.appendChild(tagline);
    headingContainer.appendChild(price);
    headingContainer.appendChild(tags);
  
    // sets attributes
    container.classList.add("photographer-profile");
    image.setAttribute("src", "images/Photographers ID Photos/" + array[photographerIndex].portrait);
    image.setAttribute("alt", "lien vers la page photographe de" + array[photographerIndex].name);
    image.setAttribute("role", "link");
    image.classList.add("photographer-profile__image");
    heading.classList.add("photographer-profile__heading");
    adress.classList.add("photographer-profile__location");
    tagline.classList.add("photographer-profile__tagline");
    price.classList.add("photographer-profile__price");
    tags.classList.add("tag-list", "profile-tag-list");
    tags.setAttribute("photographer", array[photographerIndex].name);
    link.classList.add("tab-element", "link");
    link.addEventListener("click", () => {
      window.location = url + "/photographer.html"+"?="+array[photographerIndex].id;
    })
  
    array[photographerIndex].tags.forEach(tag => {
      container.classList.add(tag)
    }) 

    // sets aria and role attributes
    container.setAttribute("aria-label", "profil du photographe");
    heading.setAttribute("aria-hidden", "true")
    adress.setAttribute("aria-label", "ville du photographe :" + array[photographerIndex].city)
    tagline.setAttribute("aria-label", "citation du photographe :" + array[photographerIndex].tagline)
    price.setAttribute("aria-label", "prix du photographe " + array[photographerIndex].price + "euros par jour")
    tags.setAttribute("aria-label", "thèmes du photographe");

    
    // add price if page allows it
    if (document.getElementById("photographer-price")) {
      document.getElementById("photographer-price").innerHTML = array[photographerIndex].price + "€/jour";
      document.getElementById("photographer-price").setAttribute("aria-label", "prix du photographe :" + array[photographerIndex].price + "€ par jour")
    }
    
  }


}