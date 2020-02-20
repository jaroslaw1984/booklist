"use strict";

import "../sass/index.scss";
import { RequestHTTP } from "./asyn/http";
import Ui from "./ui/ui";
import throwError from "./asyn/error";
import Validate from "./form_valid/form_valid";

// Global variables
const ui = new Ui();
const http = new RequestHTTP();
const validate = new Validate();

// localhost address for json server
const localhost = "http://localhost:3000/books";

// initial listeners
(function init() {
  // DOM load
  document.addEventListener("DOMContentLoaded", getBooks);

  // listener for a btn to show form
  const showFormBtn = document.getElementById("add_book");
  showFormBtn.addEventListener("click", showForm);

  // check if submit_btn exist, if so start listen
  if (document.querySelector(".submit_btn")) {
    // submit by adding book
    const subBtn = document.querySelector(".submit_btn");
    subBtn.addEventListener("click", addBook);

    // form validation
    checkFormValid();
  }
  // delete a book. Check the function on what is listener is set it.
  const delBtn = document.getElementById("books");
  delBtn.addEventListener("click", deleteBook);

  // edit a book
  const editBtn = document.getElementById("books");
  editBtn.addEventListener("click", editBook);
})();

// show form to add a new book by pressing plus
function showForm() {
  const wrapper = document.querySelector(".wrapper");
  let closeBtn = document.querySelector(".close");

  // adding class to active form
  wrapper.className += " show";

  // start listen on close from btn when form will be open
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const check = wrapper.classList.contains("show");
      if (check) {
        wrapper.classList.remove("show");
        ui.clearInputs();
      }
    });
  }
}

// check form validation
function checkFormValid() {
  return validate.validate();
}

// function check if cancel button is active while editing
function listenCancelBtn() {
  const cancelBtn = document.querySelector("input.cancel");
  // if cancel btn is present then start listent
  if (cancelBtn) {
    // listent cancel btn
    cancelBtn.addEventListener("click", cancelEdit);
  }
}

// Request to get a books from a json server
function getBooks() {
  http
    .get(localhost)
    .then(data => ui.showBooks(data))
    // ok let's check if json file is empty by getting data to array or object and see if data have some length. Need that to show if any book is in data.
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
  const id = document.getElementById("id").value;

  // passing all values to the data object
  const data = {
    title,
    author,
    year,
    number
  };
  checkFormValid();
  // prevent to adding empty value to data
  if (title === "" || author === "" || year === "" || number === "") {
    ui.alerts(" You can not add empty fileds! ", "attention");
    ui.dbclick();
  } else {
    // check if input has any value
    if (id === "") {
      // if it is create a new book
      http
        .post(localhost, data)
        .then(() => {
          // showing a popup that book is added
          ui.alerts(`Book "${title}" is added`, "success");

          // close form after adding a book
          ui.closeForm();

          // clears the field after book is added
          ui.clearInputs();

          // geting added books
          getBooks();
        })
        .catch(error =>
          // when connection faild with json server
          throwError(`Something went wrong! \n Error information: ${error}`)
        );
    } else {
      // if value is not empty start put request
      http
        .put(localhost + "/" + id, data)
        .then(() => {
          // showing a popup that book is added
          ui.alerts(`Book "${title}" is update`, "attention");

          // initial method with attribute "add" that will remove cancel btn and change button value to the orginal state also it will clear the fields.
          ui.changeState("add");

          // geting added books
          getBooks();
        })
        .catch(error =>
          // when connection faild with json server
          throwError(`Something went wrong! \n Error information: ${error}`)
        );
    }
  }
}

// This function allow to delete a single book
function deleteBook(e) {
  e.preventDefault();

  // if event is clicked on icon but condition must contains a delete class.
  const delBtn = e.target.parentElement.classList.contains("delete");
  // getting dataset from attribute metadata data-id
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
    // run form
    showForm();

    ui.clearHiddenIdField();

    // pass element id
    const dataId = e.target.parentElement.dataset.id;

    // select title text from a HTML
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.previousElementSibling
        .textContent;

    // select author text from a HTML
    const author =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.textContent;

    // select year text from a HTML
    const year = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent.match(
      /\(([^)]+)\)/
    )[1];

    // select isbn number from a HTML
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

    // when pressing on edit button it will start listen
    listenCancelBtn();
  }
}
// cancel the edit btn
function cancelEdit(e) {
  e.preventDefault();

  if (e.target.classList.contains("cancel")) {
    // initial method with attribute "add" that will remove cancel btn and change button value to the orginal state also it will clear the fields.
    ui.changeState("add");
    ui.alerts("Editing was cancel", "attention");
    // ui.closeForm("cancel");
  }
}
