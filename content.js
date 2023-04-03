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
    const loopStartButton = document.getElementById("loop-start");
    const loopEndButton = document.getElementById("loop-end");
    const loopToggleButton = document.getElementById("loop-toggle");
    
    let isDraggingStart = false;
    let isDraggingEnd = false;
    let startOffsetX = 0;
    let endOffsetX = 0;
    
    loopStartButton.addEventListener("mousedown", (event) => {
      isDraggingStart = true;
      startOffsetX = event.offsetX;
    });
    
    loopEndButton.addEventListener("mousedown", (event) => {
      isDraggingEnd = true;
      endOffsetX = event.offsetX;
    });

    document.addEventListener("mousemove", (event) => {
      if (isDraggingStart) {
        loopStartButton.style.left = `${event.clientX - startOffsetX}px`;
      }
      if (isDraggingEnd) {
        loopEndButton.style.left = `${event.clientX - endOffsetX}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      if (isDraggingStart) {
        loopStart = videoPlayer.currentTime + (loopStartButton.offsetLeft / loopStartButton.parentElement.offsetWidth) * videoPlayer.duration;
        isDraggingStart = false;
      }
      if (isDraggingEnd) {
        loopEnd = videoPlayer.currentTime + (loopEndButton.offsetLeft / loopEndButton.parentElement.offsetWidth) * videoPlayer.duration;
        isDraggingEnd = false;
      }
    });

    loopToggleButton.addEventListener("click", () => {
      if (isLooping) {
        // Disable loop
        videoPlayer.currentTime = loopStart;
        videoPlayer.loop = false;
        isLooping = false;
        loopToggleButton.innerText = "Loop";
      } else {
        // Enable loop
        videoPlayer.currentTime = loopStart;
        videoPlayer.loop = true;
        isLooping = true;
        loopToggleButton.innerText = "Stop";
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
