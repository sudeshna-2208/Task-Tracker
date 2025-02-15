const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})


document.getElementById("addft").addEventListener("click", () => {
  window.location.href = "addTask.html"
});