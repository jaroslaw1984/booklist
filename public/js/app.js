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

    // set date at footer
    const footer = document.querySelector("#footer > p");
    const date = new Date().getFullYear();
    footer.appendChild(document.createTextNode(` ${date}`));

    // form validation
    checkFormValid();
  }
  // delete a book. Check the function on what is listener is set it.
  const delBtn = document.getElementById("books");
  delBtn.addEventListener("click", deleteBook);

  // edit a book
  const editBtn = document.getElementById("books");
  editBtn.addEventListener("click", editBook);

  // when sort selection is change it will reload the json data
  const sort = document.getElementById("sort");
  sort.addEventListener("change", () => {
    getBooks();
  });

  // search bar
  const searchBar = document.getElementById("searchBar__input");
  searchBar.addEventListener("input", searchBook);
})();

// show form to add a new book by pressing plus
function showForm() {
  const wrapper = document.querySelector(".wrapper");
  let closeBtn = document.querySelector(".close");

  // adding class to active form
  wrapper.className += " show";

  // clear warning fields if alert still there
  validate.clearValidFields();

  // start listen on close from btn when form will be open
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const check = wrapper.classList.contains("show");
      const cancelBtn = document.querySelector(".cancel");
      const submitBtn = document.querySelector(".submit_btn");

      if (check) {
        // wrapper.classList.remove("show");
        ui.clearInputs();
        ui.clearHiddenIdField();
        ui.closeForm();
        // in case pressing close button when editing a book if cancel button exist remove it and return submit name to original value
        if (cancelBtn) {
          cancelBtn.remove();
          submitBtn.value = "Add Book";
          ui.alerts("Editing was canceled", "attention");
        }
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
    // check if json file isn't empty
    .then(data => (data.length === 0 ? ui.noData() : ui.showBooks(data)))

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
  const cover = document.getElementById("book_link").value;

  // passing all values to the data object
  const data = {
    title,
    author,
    year,
    number,
    cover
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
          ui.alerts("Book is added", "success");

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
          ui.alerts("Book is update", "attention");

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
    if (confirm("Do you wanna really delete this book ?")) {
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
}

// This function allow to edit a book
function editBook(e) {
  e.preventDefault();

  // check if selected element have class
  const editBtn = e.target.parentElement.classList.contains("edit");

  if (editBtn) {
    // get id of delete button of current book
    const delId = e.target.parentElement.previousElementSibling.dataset.id;
    // select delete icon of a book that is editing
    const delBtn = document.querySelector(`[data-id="${delId}"]`);

    // run form
    showForm();

    ui.clearHiddenIdField();

    delBtn.style.color = "gray";
    // disable delete button when editing a book
    delBtn.style.pointerEvents = "none";

    // pass element id
    const dataId = e.target.parentElement.dataset.id;

    // select title text from a HTML
    const title =
      e.target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.previousElementSibling.previousElementSibling
        .textContent;

    // select author text from a HTML
    const author =
      e.target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.previousElementSibling.textContent;

    // select year text from a HTML
    const year = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent.match(
      /\(([^)]+)\)/
    )[1];

    // select isbn number from a HTML
    const isbn = e.target.parentElement.parentElement.previousElementSibling.textContent.match(
      /\d+/
    );

    // select image link from a HTML
    const link =
      e.target.parentElement.parentElement.parentElement.parentElement
        .firstElementChild.firstElementChild.srcset;

    // passing all selected values to a data object
    const data = {
      title,
      author,
      year,
      isbn,
      link,
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
    ui.alerts("Editing was canceled", "attention");
    // ui.closeForm("cancel");
  }
}

// search bar
function searchBook(e) {
  const inputText = e.target.value.toLowerCase();
  const getAllBooks = document.querySelectorAll(".content");

  for (let i = 0; i < getAllBooks.length; i++) {
    if (
      !getAllBooks[
        i
      ].firstElementChild.lastElementChild.firstElementChild.firstChild.nodeValue
        .toLowerCase()
        .includes(inputText)
    ) {
      getAllBooks[i].style.display = "none";
    } else {
      getAllBooks[i].style.display = "flex";
    }
  }
}
