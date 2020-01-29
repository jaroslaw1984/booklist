import "../sass/index.scss";
import { RequestHTTP } from "./asyn/http";
import Ui from "./ui/ui";
import throwError from "./asyn/error";

// Global variables
const ui = new Ui();
const http = new RequestHTTP();

// localhost address for json server
const localhost = "http://localhost:3000/books";

// initial listeners
(function init() {
  // DOM load
  document.addEventListener("DOMContentLoaded", getBooks);

  // add book
  const subBtn = document.querySelector(".submit_btn");
  subBtn.addEventListener("click", addBook);

  // delete a book
  const delBtn = document.querySelector(".book_list");
  delBtn.addEventListener("click", deleteBook);

  // edit a book
  const editBtn = document.querySelector(".book_list");
  editBtn.addEventListener("click", editBook);
})();

// Request to get a books from a json server
function getBooks() {
  http
    .get(localhost)
    .then(data => ui.showBooks(data))
    .catch(error => {
      throwError(
        `Can not connect to the json:server. Make sure you have run npm run json:server at console! \n  Error information: ${error}`
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
  const alert = document.querySelector(".alert");
  const submitBtn = document.querySelector(".submit_btn");

  const data = {
    title,
    author,
    year,
    number
  };

  if (title === "" || author === "" || year === "" || number === "") {
    ui.alerts(" Some field are empty! ", "attention");
    ui.dbclick();
  } else {
    http
      .post(localhost, data)
      .then(() => {
        ui.alerts(`Book "${title}" is added`, "success");
        ui.clearInputs();
        getBooks();
      })
      .catch(error =>
        throwError(`Something went wrong! \n Error information: ${error}`)
      );
  }
}

// This function allow to delete a single book
function deleteBook(e) {
  e.preventDefault();

  const delBtn = e.target.parentElement.classList.contains("delete");
  const dataId = e.target.parentElement.dataset.id;

  if (delBtn) {
    http
      .del(localhost + "/" + dataId)
      .then(() => {
        ui.alerts("You have delete this book!", "success");
        getBooks();
      })
      .catch(error =>
        throwError(`Something went wrong! \n Error information: ${error}`)
      );
  }
}

// This function allow to edit a book
function editBook(e) {
  e.preventDefault();

  const editBtn = e.target.parentElement.classList.contains("edit");
  const dataId = e.target.parentElement.dataset.id;

  if (editBtn) {
  }
}
