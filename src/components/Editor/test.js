let distanceThresholdScroll = 0.04;
let scrollAmount = 500;
let currentScrollY = 0;
let currentScrollX = 0;
let newScrollY = 0;
let newScrollX = 0;
let scrolling0 = false;
let zMultiplier = 1;

const onResults = (results) => {
    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, windowWidth, windowHeight);

    if (results.multiHandLandmarks[0]) {
      const indexFingerTip = results.multiHandLandmarks[0][8];
      const thumbTip = results.multiHandLandmarks[0][4];
      const middleTip = results.multiHandLandmarks[0][12];

      const distance = Math.sqrt(
        (indexFingerTip.x - thumbTip.x) ** 2 +
          (indexFingerTip.y - thumbTip.y) ** 2,
      );

      if (distance < distanceThresholdClick) {
        clicking0 = true;
        canvasRef.current.style.visibility = "hidden";
        const rotation = {
          x: indexFingerTip.y * 6,
          y: indexFingerTip.x * 6,
        };
        console.log("Rotation", rotation);
        setAiRotation(rotation);
      }

      if (distance > distanceThresholdClick) {
        clicking0 = false;
      }

      canvasRef.current.style.visibility = "visible";

      const airCursor0 = { x: 0, y: 0 };
      handToScreenCoordinates(airCursor0, indexFingerTip.x, indexFingerTip.y);
      if (clicking0)
        drawCircle(
          canvasCtx,
          airCursor0.x,
          airCursor0.y,
          20,
          "yellow",
          "red",
          2,
        );
      else
        drawCircle(canvasCtx, airCursor0.x, airCursor0.y, 10, "red", "red", 2);

      if (scrolling0)
        drawCircle(
          canvasCtx,
          airCursor0.x,
          airCursor0.y,
          20,
          "green",
          "red",
          2,
        );

      //compute distance between index finger tip and thumb tip
      let distanceClick =
        Math.hypot(
          indexFingerTip.x - thumbTip.x,
          indexFingerTip.y - thumbTip.y,
        ) / zMultiplier;

      //compute distance between middle finger tip and thumb tip
      let distanceScroll =
        Math.hypot(middleTip.x - thumbTip.x, middleTip.y - thumbTip.y) /
        zMultiplier;

      //scroll logic
      if (distanceScroll < distanceThresholdScroll) {
        scrolling0 = true;
        canvasRef.current.style.visibility = "hidden";
        let verticalMagnitude = middleTip.y - 0.5;
        let horizontalMagnitude = middleTip.x - 0.5;
        currentScrollY = document.documentElement.scrollTop;
        currentScrollX = document.documentElement.scrollLeft;

        //vertical scrolling
        if (verticalMagnitude > 0 && currentScrollY >= newScrollY) {
          newScrollY = Math.floor(
            currentScrollY + scrollAmount * Math.abs(verticalMagnitude),
          );
          window.scrollTo(newScrollX, newScrollY);
        }
        if (verticalMagnitude < 0 && currentScrollY <= newScrollY) {
          newScrollY = Math.floor(
            currentScrollY - scrollAmount * Math.abs(verticalMagnitude),
          );
          window.scrollTo(newScrollX, newScrollY);
        }

        //horizontal scrolling (logic is inverted for horizontal axys because the camera coordinates are flipped)
        if (horizontalMagnitude > 0 && currentScrollX <= newScrollX) {
          newScrollX = Math.floor(
            currentScrollX - scrollAmount * Math.abs(horizontalMagnitude),
          );
          window.scrollTo(newScrollX, newScrollY);
        }
        if (horizontalMagnitude < 0 && currentScrollX >= newScrollX) {
          newScrollX = Math.floor(
            currentScrollX + scrollAmount * Math.abs(horizontalMagnitude),
          );
          window.scrollTo(newScrollX, newScrollY);
        }
      }
      if (distanceScroll > distanceThresholdScroll) {
        scrolling0 = false;
      }
      canvasRef.current.style.visibility = "visible";

      //click logic
      if (distanceClick < distanceThresholdClick && !clicking0) {
        clicking0 = true;
        canvasRef.current.style.visibility = "hidden";
        //subtracting windowWidht for horizontal axys because the camera coordinates are flipped
        let elementToClick = document.elementFromPoint(
          windowWidth - airCursor0.x,
          airCursor0.y,
        );
        if (elementToClick) {
          elementToClick.click();
        }
      }
      if (distanceClick > distanceThresholdClick) {
        clicking0 = false;
      }
      canvasRef.current.style.visibility = "visible";
    }

    if (!results.multiHandLandmarks[0]) {
      canvasRef.current.style.visibility = "hidden";
    }

    canvasCtx.restore();
  };