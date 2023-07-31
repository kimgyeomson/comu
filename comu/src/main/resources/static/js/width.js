// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Your JavaScript code here
  var innerWidth = window.innerWidth;
  console.log("Inner width of the browser window: " + innerWidth);

  var myDiv = document.getElementById("myDiv");
  myDiv.style.width = innerWidth + "px";
});
