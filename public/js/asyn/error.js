"use strict";

function throwError(message) {
  const h3 = document.createElement("h3");
  const bookList = document.querySelector(".book_list");

  h3.className = "error";
  h3.appendChild(document.createTextNode(message));
  bookList.appendChild(h3);
}

export default throwError;
