/**
 * Add a source for a video
 * Has to be call when lightbox has to display a video
 * @param {Node} element the video
 * @param {String} src path of the file
 * @param {String} type ex: "video/mp4"
 */

export function addSourceToVideo(element, src, type) {
  var source = document.createElement('source');

  source.src = src;
  source.type = type;

  element.appendChild(source);
}
