const checkForPlayer = setInterval(() => {
  const playerContainer = document.getElementById("movie_player");
  if (playerContainer && playerContainer.querySelector("video")) {
    clearInterval(checkForPlayer);
    // Create loop controls
    const loopControls = document.createElement("div");
    loopControls.style.position = "absolute";
    loopControls.style.top = "10px";
    loopControls.style.left = "10px";
    loopControls.style.zIndex = "9999";
    loopControls.innerHTML = `
      <label for="loop-start-time">Start Time:</label>
      <input type="text" id="loop-start-time">
      <button id="loop-start">Set Start Time</button>
      <br>
      <label for="loop-end-time">End Time:</label>
      <input type="text" id="loop-end-time">
      <button id="loop-end">Set End Time</button>
      <br>
      <button id="loop-toggle">Loop</button>
    `;

    // Add loop controls to player container
    playerContainer.appendChild(loopControls);

    // Get video player
    const videoPlayer = playerContainer.querySelector("video");

    // Initialize loop variables
    let loopStart = 0;
    let loopEnd = 0;
    let isLooping = false;

    // Add event listeners to loop controls
    document.getElementById("loop-start").addEventListener("click", () => {
      loopStart = videoPlayer.currentTime;
      document.getElementById("loop-start-time").value = formatTime(loopStart);
    });
    document.getElementById("loop-end").addEventListener("click", () => {
      loopEnd = videoPlayer.currentTime;
      document.getElementById("loop-end-time").value = formatTime(loopEnd);
    });
    document.getElementById("loop-toggle").addEventListener("click", () => {
      if (isLooping) {
        // Disable loop
        videoPlayer.currentTime = loopStart;
        videoPlayer.loop = false;
        isLooping = false;
        document.getElementById("loop-toggle").innerText = "Loop";
      } else {
        // Enable loop
        videoPlayer.currentTime = loopStart;
        videoPlayer.loop = true;
        isLooping = true;
        document.getElementById("loop-toggle").innerText = "Stop";
      }
    });

    // Add event listener to reset loop when video ends
    videoPlayer.addEventListener("ended", () => {
      if (isLooping) {
        videoPlayer.currentTime = loopStart;
      }
    });

    // Format time as mm:ss
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  }
}, 500);
