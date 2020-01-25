import "../sass/index.scss";
import { RequestHTTP } from "./asyn/http";
import Ui from "./ui/ui";
import throwError from "./asyn/error";

// Global variables
const ui = new Ui();
const http = new RequestHTTP();

// localhost address to json server
const localhost = "http://localhost:3000/books";

// initial listeners
(function init() {
  const subBtn = document.querySelector(".submit_btn");

  document.addEventListener("DOMContentLoaded", getBooks);
  subBtn.addEventListener("click", addBook);
})();

// Request to get a books from a json server
function getBooks() {
  http
    .get(localhost)
    .then(data => ui.showBooks(data))
    .catch(error => {
      throwError(
        `Can not connect to the json:server. Make sure you have run npm run json:server at console! \n  Error type: ${error}`
      );
    });
}

// This function is adding the book
function addBook(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const number = document.getElementById("book_number").value;

  const data = {
    title,
    author,
    year,
    number
  };

  http
    .post(localhost, data)
    .then(() => {
      getBooks();
      ui.clearInputs();
    })
    .catch(error =>
      throwError(
        `Your book can't be added! Check the field \n Error Type: ${error}`
      )
    );
}
