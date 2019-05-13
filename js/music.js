myAudio = new Audio("../audio/menu-loop.mp3");
var checkbox = document.getElementById("pauseBtn");
myAudio.addEventListener(
  "ended",
  function() {
    this.currentTime = 0;
    this.play();
  },
  false
);

myAudio.play();
function pause() {
  checkbox.addEventListener("change", function() {
    if (this.checked) {
      gth = true;
    } else {
      gth = false;
    }

    if (gth) {
      myAudio.play();
    } else {
      myAudio.pause();
    }
  });
}
