/** 
 * @param {string} name name of the filter
 * @param {Array} photographers photographers having this filter
 * @param {String} classname classes of the filter
 */

 export class Filter {

  constructor(name, photographers, classname) {
    this.name = name;
    this.photographers = photographers;
    this.classname = classname;
  }

  // adds filter tags in navigation 
  static displayTag(filters) {
    filters.forEach((filter) => {
      const tag = document.createElement("li");
      document.querySelector(".nav-tag-list").appendChild(tag);
      const tagnode = document.createTextNode("#"+filter.name);
      tag.appendChild(tagnode);
      tag.className = filter.classname;
      tag.setAttribute("filter", filter.name);
      }
    )
  }

  // adds filter tags in photographer profile cards
  static displayProfileTags(photographers, filters) {
    photographers.forEach((photographer, index) => {
      filters.forEach((filter) => {
        if (filter.photographers.includes(photographer.name)) {
          const tag = document.createElement("li");
          document.querySelector(`[photographer="${photographer.name}"]`).appendChild(tag);
          const tagnode = document.createTextNode("#"+filter.name);
          tag.appendChild(tagnode);
          tag.className = filters[index].classname;
          tag.setAttribute("filter", filter.name);
        }
      })
    })
  }

  /**
   * Displays on and off photographers profile cards filtered by tag
   * @param {Array} filters array of DOM elements (filters already displayed)
   * @param {Array} photographers array of DOM elements (photographers already displayed) 
   */
  static tagToggle(filters, photographers) {

    const homeUrl = new URL(window.location);
    let search = homeUrl.search;

    // sticks CSS attributes and filter profiles page
    filters.forEach((filter) => filter.addEventListener("click", () => {
      
      if (filter.getAttribute("my-tag") !== "true") {
          filters.forEach((filter) => {
            filter.setAttribute("my-tag", "false");
            filter.setAttribute("aria-checked", "false")
          });
          filter.setAttribute("my-tag", "true");
          filter.setAttribute("aria-checked", "true")
          search = "?filter=" +filter.getAttribute("filter");
          window.history.pushState({}, "", search)
      }
      
      // resets tag selection
      else {
          filters.forEach((filter) => filter.setAttribute("my-tag", ""));
            photographers.forEach((photographer) => {
              photographer.removeAttribute("tag-selected")
            })
            search = "";
            window.history.replaceState({}, "", "index.html")
      }

      // filters page out of url params
      Filter.filterByTag(search.substring(8), photographers);
    }))
  }

  /**
   * Displays filtered profiles
   * This function is made to be used inside @function tagToggle
   * @param {Array} id identifier of filter
   * @param {Array} photographers array of photographers already displayed on DOM
   */
  static filterByTag(id, photographers) {
  
    photographers.forEach((photographer) => {
        if (!photographer.getAttribute("class").includes(id)) {
            photographer.setAttribute("tag-selected", "false")
        }
        else {
            photographer.setAttribute("tag-selected", "true")
        }
    })
  }

  /**
   * Adds filter functionality for photographer card tags
   * @param {Array} profileFilters Array of filter tags inside photographer profile cards 
   */
  static profileFilterTags(profileFilters) {

    profileFilters.forEach((filter) => filter.addEventListener("click", () => {
      const tag = filter.getAttribute("filter");
      document.querySelector(".nav-tag-list > ." + tag).click()
    })
    )
  }

  // add filter when user is brought up home after photographer.html tag click
  static urlParamCheck() {
    const url = window.location;
    const searchParam = url.search.substring(8);
    document.querySelector(".nav-tag-list > ." + searchParam).click()
  }


}
