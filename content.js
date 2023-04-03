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
      <input id="loop-start" type="number" min="0" step="0.1" placeholder="Start (s)">
      <input id="loop-end" type="number" min="0" step="0.1" placeholder="End (s)">
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

    // Add event listener to toggle loop
    document.getElementById("loop-toggle").addEventListener("click", () => {
      if (isLooping) {
        // Disable loop
        videoPlayer.currentTime = loopStart;
        videoPlayer.loop = false;
        isLooping = false;
        document.getElementById("loop-toggle").innerText = "Loop";
        loopStart = 0;
        loopEnd = 0;
        document.getElementById("loop-start").value = "";
        document.getElementById("loop-end").value = "";
      } else {
        // Enable loop
        if (loopStart === 0 || loopEnd === 0) {
          // Prompt user to select loop points
          alert("Please select loop start and end points.");
        } else {
          videoPlayer.currentTime = loopStart;
          videoPlayer.loop = true;
          isLooping = true;
          document.getElementById("loop-toggle").innerText = "Stop Looping";
        }
      }
    });

    // Add event listener to set loop start point
    document.getElementById("loop-start").addEventListener("change", () => {
      loopStart = parseFloat(document.getElementById("loop-start").value);
    });

    // Add event listener to set loop end point
    document.getElementById("loop-end").addEventListener("change", () => {
      loopEnd = parseFloat(document.getElementById("loop-end").value);
    });

    // Add event listener to reset loop when video ends
    videoPlayer.addEventListener("ended", () => {
      if (isLooping) {
        videoPlayer.currentTime = loopStart;
      }
    });
  }
}, 500);