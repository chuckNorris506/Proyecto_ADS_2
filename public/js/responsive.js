/* Getting the elements from the HTML file. */
const checkbox = document.getElementById("check");
const box = document.getElementById("container");

/* Adding an event listener to the checkbox. When the checkbox is clicked, it will check if the
checkbox is checked. If it is checked, it will hide the box. If it is not checked, it will show the
box. */
checkbox.addEventListener("click", function handleClick() {
  if (checkbox.checked) {
    box.style.display = "none";
    box.style.transition = "all 0.5s";
  } else {
    box.style.display = "block";
    box.style.transition = "all 0.5s";
  }
});
