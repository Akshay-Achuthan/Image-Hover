const imageContainer = document.querySelector(".image-container");
const image = document.querySelector(".image");
const lens = document.querySelector(".lens");
const result = document.querySelector(".result");

const containerRect = imageContainer.getBoundingClientRect();
// console.log(containerRect);
const imageRect = image.getBoundingClientRect();
// console.log(imageRect);
const lensRect = lens.getBoundingClientRect();
// console.log(lensRect);
const resultRect = result.getBoundingClientRect();
// console.log(resultRect);

imageContainer.addEventListener("mousemove", zoomImage);

result.style.backgroundImage = `url(${image.src})`;

function zoomImage(e) {
  // console.log(e.clientX, e.clientY);
  const { x, y } = getMousePos(e);
  console.log(getMousePos(e));

  lens.style.left = x + "px";
  lens.style.top = y + "px";

  let fx = resultRect.width / lensRect.width;
  // console.log(fx);
  let fy = resultRect.height / lensRect.height;
  // console.log(fy);

  result.style.backgroundSize = `${imageRect.width * fx}px ${
    imageRect.height * fy
  }px`;

  result.style.backgroundPosition = `-${x * fx}px -${y * fy}px`;
}

function getMousePos(e) {
  let x = Math.trunc(e.clientX - containerRect.left - lensRect.width / 2);
  // console.log("value of x", x);
  let y = Math.trunc(e.clientY - containerRect.top - lensRect.height / 2);
  // console.log("value of y", y);

  let minX = 0;
  let minY = 0;
  let maxX = containerRect.width - lensRect.width;
  let maxY = containerRect.height - lensRect.height;

  if (x <= minX) {
    x = minX;
  } else if (x >= maxX) {
    x = maxX;
  }

  if (y <= minY) {
    y = minY;
  } else if (y >= maxY) {
    y = maxY;
  }

  return { x, y };
}
