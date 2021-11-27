import { generateProfile } from "./profile.js";
import { tabindexAdder } from "./tabindex.js";
import { Filter } from "./filters.js"

const url = "https://etudiantocs.github.io/BadrTOUCHNA_6_06102021/";

// import (photographer profil) json data
fetch(url+'/JSON/photographer.json')
.then(function (response) {
  if (response.ok) {
    response.json().then(data => {
      let photographers = data["photographers"];

      // creates and gathers filter Objects in an array
      let filters = [];
      for (let photographer = 0; photographer < photographers.length; photographer++ ) {
        for (let tag = 0; tag < photographers[photographer].tags.length; tag++) {
            if (!filters.some(filter => filter["name"] === photographers[photographer].tags[tag])) {
                filters.push(new Filter(photographers[photographer].tags[tag], [], "tag tab-element " + photographers[photographer].tags[tag]))
            }
        }
      }

      // fill each filter Objects with its photographers
      filters.forEach((filter) => {
        photographers.forEach((photographer) => {
          if (photographer.tags.includes(filter.name)) {
            filter.photographers.push(photographer.name)
          }
         })
      });

      // displays all photographer profiles available
      for (let i = 0; i < photographers.length; i++) { generateProfile(photographers, i) }

      // displays filters in navigation
      Filter.displayTag(filters);

      // DOM Elements (navigation tags and photographer profile cards)
      let navTags =  document.querySelectorAll(".nav-tag-list > .tag");
      const photographerProfiles = document.querySelectorAll(".photographer-profile");

      // displays filter tags under photographer profile
      Filter.displayProfileTags(photographers, filters);

      // filters in and off the photographers chosen when filter tag switched
      Filter.tagToggle(navTags, photographerProfiles);

      // filters from profile card
      Filter.profileFilterTags(document.querySelectorAll(".profile-tag-list > .tag"));
     
      // cleans the DOM up and organize an order for the navigation by tab keyboard
      tabindexAdder(".tab-element");

      // toggles filter tag clicked on photographer.html
      Filter.urlParamCheck();


    })
  }
    else { 
        alert("Les données utilisateurs n'ont pas été chargées")
    }
});
