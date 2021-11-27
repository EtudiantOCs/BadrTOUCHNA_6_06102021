/**
 * Add like to media like count
 * @param {Array} targetArray array of medias
 */

export function like(targetArray) {
  const likeCounts = document.querySelectorAll(".media__heading-like-counter");
  const currentmediaElements = document.querySelectorAll(".media > img, video");
  document.querySelectorAll(".media-like").forEach((likeBtn, index) => (likeBtn.onclick = function addLike() {
        for (let e = 0; e < targetArray.length; e++) {
          if (currentmediaElements[index].textContent == targetArray[e].location) {
            if (targetArray[e].liked == true) {
              targetArray[e].likes -= 1;
              likeCounts[index].textContent = targetArray[e].likes;
              targetArray[e].liked = false;
            } else {
              targetArray[e].likes += 1;
              likeCounts[index].textContent = targetArray[e].likes;
              targetArray[e].liked = true;
            }
          }
        }

        totalLikeCounter(targetArray);
      })
  );
}

/**
 * totalize and displays photographer total-likes counter
 * @param {Array} targetArray array of medias
 */
export function totalLikeCounter(targetArray) {
  let totalLikes = [];
  targetArray.forEach((media) => {
    totalLikes.push(media.likes);
  });
  document.querySelector("#total-likes > p").textContent = totalLikes.reduce(
    (a, b) => a + b,
    0
  );
  document.querySelector("#total-likes > p").setAttribute("aria-label", "nombre total de like :" + document.querySelector("#total-likes > p").textContent)
}
