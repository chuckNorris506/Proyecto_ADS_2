const checkbox = document.getElementById("check");
const box = document.getElementById("container");

checkbox.addEventListener("click", function handleClick() {
  if (checkbox.checked) {
    box.style.display = "none";
    box.style.transition = "all 0.5s";
  } else {
    box.style.display = "block";
    box.style.transition = "all 0.5s";
  }
});
