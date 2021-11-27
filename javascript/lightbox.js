/**
 * Creates a lightbox fonctionality for an existing HTML lightbox element
 */
import { addSourceToVideo } from "./source-video-adder.js";
import { tabindexAdder } from "./tabindex.js";

 export function lightbox() {
   // DOM elements
   const closeBtn = document.getElementById("lightbox-close");
   const nextBtn = document.getElementById("lightbox-next");
   const prevBtn = document.getElementById("lightbox-prev");
   const lightbox = document.getElementById("lightbox");
   const lightboxHeading = document.getElementById("lightbox-title");
   const mediaContainer = document.getElementById("lightbox-container");
   const mediasDOM = document.querySelectorAll(".media > img, video");
   let prevActiveElement;
 
   // launch lightbox
   mediasDOM.forEach((element, index) =>  element.addEventListener("click", function displayLightbox() {
     
     console.log("image clicked")
     prevActiveElement = document.activeElement;
     lightbox.style.display = "flex";
     document.querySelectorAll(".lightbox__container img").forEach(n => n.remove());
     const media = document.createElement(element.localName);
     if (media.localName == "video") {
      addSourceToVideo(media, element.src, "video/mp4")
      media.setAttribute("aria-label", element.getAttribute("aria-label"));
      media.play()
    }
    else {
      media.setAttribute("aria-label", element.getAttribute("alt"));
      media.src = element.src;
    }
     media.setAttribute("id", "lightbox-media");
     mediaContainer.appendChild(media);
     lightboxHeading.innerHTML = element.nextSibling.firstChild.innerHTML;
     let e = index;
     lightbox.setAttribute("tabindex", 1);
     lightbox.focus();
     
     // tab focus keyboard cycle
     closeBtn.classList.add("tab-element-lightbox");
     media.classList.add("tab-element-lightbox");
     nextBtn.classList.add("tab-element-lightbox");
     prevBtn.classList.add("tab-element-lightbox");
     
     
     tabindexAdder(".tab-element-lightbox");
 
     // next media
     function next() {
 
        if (mediasDOM[e + 1] !== undefined) {
          document.getElementById("lightbox-media").remove();
          const nextMedia = document.createElement(mediasDOM[e +1].localName);
          if (nextMedia.localName == "video") {
            addSourceToVideo(nextMedia, mediasDOM[e +1].src, "video/mp4")
            nextMedia.setAttribute("aria-label", mediasDOM[e +1].getAttribute("aria-label"));
            nextMedia.play()
          }
          else {
            nextMedia.setAttribute("aria-label", mediasDOM[e +1].getAttribute("alt"));
            nextMedia.src = mediasDOM[e +1].src;
          }

          mediaContainer.appendChild(nextMedia);
          nextMedia.setAttribute("id", "lightbox-media");
          nextMedia.classList.add("tab-element-lightbox");
          nextMedia.setAttribute("aria-live", "polite");
          lightboxHeading.innerHTML = mediasDOM[e +1].nextSibling.firstChild.innerHTML;
          e++
        }

        else {
          e = 0;
          document.getElementById("lightbox-media").remove();
          const nextMedia = document.createElement(mediasDOM[e].localName);
          if (nextMedia.localName == "video") {
            addSourceToVideo(nextMedia, mediasDOM[e].src, "video/mp4")
            nextMedia.setAttribute("aria-label", mediasDOM[e].getAttribute("aria-label"));
            nextMedia.play()
          }
          else {
            nextMedia.setAttribute("aria-label", mediasDOM[e].getAttribute("alt"));
            nextMedia.src = mediasDOM[e].src;
          }
      
          mediaContainer.appendChild(nextMedia);
          nextMedia.setAttribute("id", "lightbox-media");
          nextMedia.classList.add("tab-element-lightbox");
          nextMedia.setAttribute("aria-live", "polite");
          lightboxHeading.innerHTML = mediasDOM[e].nextSibling.firstChild.innerHTML;
        }
    }
 
     // previous media
     function previous() {
       
       if (mediasDOM[e - 1] !== undefined) {
         document.getElementById("lightbox-media").remove();
         const prevMedia = document.createElement(mediasDOM[e -1].localName);
         if (prevMedia.localName == "video") {
          addSourceToVideo(prevMedia, mediasDOM[e -1].src, "video/mp4")
          prevMedia.setAttribute("aria-label", mediasDOM[e -1].getAttribute("aria-label"));
          prevMedia.play()
        }
        else {
          prevMedia.setAttribute("aria-label", mediasDOM[e -1].getAttribute("alt"));
          prevMedia.src = mediasDOM[e -1].src;
        }

         mediaContainer.appendChild(prevMedia);
         prevMedia.setAttribute("id", "lightbox-media");
         prevMedia.classList.add("tab-element-lightbox");
         prevMedia.setAttribute("aria-live", "polite");
         lightboxHeading.innerHTML = mediasDOM[e -1].nextSibling.firstChild.innerHTML;
         e--
       }
       
       else {
         e = mediasDOM.length - 1;
         document.getElementById("lightbox-media").remove();
         const prevMedia = document.createElement(mediasDOM[e].localName);
         if (prevMedia.localName == "video") {
          addSourceToVideo(prevMedia, mediasDOM[e].src, "video/mp4")
          prevMedia.setAttribute("aria-label", mediasDOM[e].getAttribute("aria-label"));
          prevMedia.play()
        }
        else {
          prevMedia.setAttribute("aria-label", mediasDOM[e].getAttribute("alt"));
          prevMedia.src = mediasDOM[e].src;
        }

         mediaContainer.appendChild(prevMedia);
         prevMedia.setAttribute("id", "lightbox-media");
         prevMedia.classList.add("tab-element-lightbox");
         prevMedia.setAttribute("aria-live", "polite");
         lightboxHeading.innerHTML = mediasDOM[e].nextSibling.firstChild.innerHTML;
         e = mediasDOM.length;
         e--
       }
     }

    // close lightbox
   function closeLightbox() {
      lightbox.style.display = "none";
      mediaContainer.removeChild(document.getElementById("lightbox-media"));
      tabindexAdder(".tab-element");
      prevActiveElement.focus();
    }
         
     // click listeners
     nextBtn.addEventListener("click", next);
     prevBtn.addEventListener("click", previous);

     closeBtn.addEventListener("click", closeLightbox);
     document.getElementById("blocker").addEventListener("click", closeLightbox);
     
     
     //  keyboard listeners
     window.addEventListener("keydown", function (event) {
       console.log(event)
       if (event.defaultPrevented) {
         return // Ne devrait rien faire si l'événement de la touche était déjà consommé.
       }
     
       switch (event.key) {
         case "ArrowLeft":
           prevBtn.click();
           break;
         case "ArrowRight":
           nextBtn.click();
           break;
         case "Escape":
           closeBtn.click();
           break;
         case "Enter":
           event.preventDefault()
           break;
         
         default:
           return; // Quitter lorsque cela ne gère pas l'événement touche.
       }
       // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
       event.preventDefault();
     }, true);
 
   })
   )
 }
 