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
      <button id="loop-start">Start Loop</button>
      <button id="loop-end">End Loop</button>
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
    });
    document.getElementById("loop-end").addEventListener("click", () => {
      loopEnd = videoPlayer.currentTime;
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
  }
}, 500);