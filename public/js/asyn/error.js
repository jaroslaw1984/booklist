"use strict";

function throwError(message) {
  const h3 = document.createElement("h3");
  const bookList = document.getElementById("books");
  const main = document.querySelector("main");

  h3.className = "error";
  h3.appendChild(document.createTextNode(message));
  bookList.before(h3);
  main.style.display = "flex";
  main.style.justifyContent = "center";
}

export default throwError;
