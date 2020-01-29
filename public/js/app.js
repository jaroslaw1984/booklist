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
  const delBtn = document.getElementById("books");
  delBtn.addEventListener("click", deleteBook);

  // edit a book
  const editBtn = document.getElementById("books");
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

  // passing all values to the data object
  const data = {
    title,
    author,
    year,
    number
  };

  // prevent to adding empty value to data
  if (title === "" || author === "" || year === "" || number === "") {
    ui.alerts(" Some field are empty! ", "attention");
    ui.dbclick();
  } else {
    // adding a book when validation pass
    http
      .post(localhost, data)
      .then(() => {
        // showing a popup that book is added
        ui.alerts(`Book "${title}" is added`, "success");
        // clears the field after book is added
        ui.clearInputs();
        // geting added books
        getBooks();
      })
      .catch(error =>
        // when connection faild with json server
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

  // check if selected element have class
  const editBtn = e.target.parentElement.classList.contains("edit");

  if (editBtn) {
    // pass element id
    const dataId = e.target.parentElement.dataset.id;

    // select title text from a book
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.previousElementSibling
        .textContent;

    // select author text from a book
    const author =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.textContent;

    // select year text from a book
    const year = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent.match(
      /\(([^)]+)\)/
    )[1];

    // select isbn number from a book
    const isbn = e.target.parentElement.previousElementSibling.previousElementSibling.textContent.match(
      /\d+/
    );

    // passing all selected values to a data object
    const data = {
      title,
      author,
      year,
      isbn,
      dataId
    };

    // function that fills the fields in form, from data object
    ui.getData(data);
  }
}
