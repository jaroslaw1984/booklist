"use strict";

export default class Validate {
  constructor() {
    // select input fields
    this.title = document.getElementById("title");
    this.author = document.getElementById("author");
    this.year = document.getElementById("year");
    this.number = document.getElementById("book_number");
    this.cover = document.getElementById("book_link");
    this.submitBtn = document.querySelector(".submit_btn");

    // select warning fileds
    this.validTitle = document.getElementById("validTitle");
    this.validAuthor = document.getElementById("validAuthor");
    this.validYear = document.getElementById("validYear");
    this.validIsbn = document.getElementById("validIsbn");
    this.validLink = document.getElementById("validLink");

    // select form container
    this.wrapper = document.querySelector(".wrapper");

    // select block of current form
    this.bookFormTitle = document.querySelector(".book__form__title");
    this.bookFormAuthor = document.querySelector(".book__form__author");
    this.bookFormYear = document.querySelector(".book__form__year");
    this.bookFormIsbn = document.querySelector(".book__form__isbn");
  }

  validate() {
    // reference
    const title = this.title;
    const author = this.author;
    const submitBtn = this.submitBtn;
    const year = this.year;
    const isbn = this.number;
    const link = this.cover;

    // listeners on inputs
    this.title.addEventListener("input", validateTitle);
    this.author.addEventListener("input", validateAuthor);
    this.year.addEventListener("input", validateYear);
    this.number.addEventListener("input", validateIsbn);
    this.cover.addEventListener("input", validateLink);

    // check if all inputs are correct filled
    let titleValid = false;
    let authorValid = false;
    let yearValid = false;
    let isbnValid = false;
    let linkValid = false;

    if (this.wrapper.classList.contains("edit")) {
      titleValid = true;
      authorValid = true;
      yearValid = true;
      isbnValid = true;
      linkValid = true;
    }

    function validateTitle() {
      const validTitle = document.getElementById("validTitle");

      // regular expresion validation
      if (title.value && !/^[a-zA-Z]{2,}/.test(title.value)) {
        // check if any number are typed
        if (/\d/.test(title.value)) {
          validTitle.innerHTML = "The numbers are not allowed here.";
          submitBtn.disabled = true;
          submitBtn.classList.add("disabled");
          titleValid = false;
          return;
        } else {
          validTitle.innerHTML =
            "The title is too short, it must contain at least two letters";
          submitBtn.disabled = true;
          submitBtn.classList.add("disabled");
          titleValid = false;
          return;
        }
      } else {
        validTitle.innerHTML = "";
        titleValid = true;
        submitBtn.classList.remove("disabled");
        submitBtn.disabled = false;
        checkFields();
      }
    }

    function validateAuthor() {
      const validAuthor = document.getElementById("validAuthor");

      if (author.value && !/^[a-zA-Z]{2,}/.test(author.value)) {
        if (/\d/.test(author.value)) {
          validAuthor.innerHTML = "The numbers are not allowed here.";
          submitBtn.disabled = true;
          submitBtn.classList.add("disabled");
          authorValid = false;
          return false;
        } else {
          validAuthor.innerHTML =
            " The title is too short, it must contain at least two letters";
          submitBtn.disabled = true;
          submitBtn.classList.add("disabled");
          authorValid = false;
          return false;
        }
      } else {
        validAuthor.innerHTML = "";
        submitBtn.classList.remove("disabled");
        submitBtn.disabled = false;
        authorValid = true;
        checkFields();
      }
    }

    function validateYear() {
      const validYear = document.getElementById("validYear");

      if (year.value && !/^[0-9]{1,4}$/.test(year.value)) {
        if (/^[a-zA-Z]/.test(year.value)) {
          validYear.innerHTML = "Letters are not allowed here.";
          submitBtn.disabled = true;
          submitBtn.classList.add("disabled");
          yearValid = false;
          return false;
        } else {
          validYear.innerHTML = "You enter wrong year. For example '1984'";
          submitBtn.disabled = true;
          submitBtn.classList.add("disabled");
          yearValid = false;
          return false;
        }
      } else {
        validYear.innerHTML = "";
        submitBtn.classList.remove("disabled");
        submitBtn.disabled = false;
        yearValid = true;
        checkFields();
      }
    }

    function validateIsbn() {
      const validIsbn = document.getElementById("validIsbn");

      if (isbn.value && !/^[0-9]{1,}$/.test(isbn.value)) {
        if (/^[a-zA-Z]/.test(isbn.value)) {
          validIsbn.innerHTML = "Letters are not allowed here.";
          submitBtn.disabled = true;
          submitBtn.classList.add("disabled");
          isbnValid = false;
          return false;
        } else {
          validIsbn.innerHTML = "You enter wrong ISBN number";
          submitBtn.disabled = true;
          submitBtn.classList.add("disabled");
          isbnValid = false;
          return false;
        }
      } else {
        validIsbn.innerHTML = "";
        submitBtn.classList.remove("disabled");
        submitBtn.disabled = false;
        isbnValid = true;
        checkFields();
      }
    }

    function validateLink() {
      const validLink = document.getElementById("validLink");

      if (link.value && !/^https?:\/\/[\w.\/]+/i.test(link.value)) {
        validLink.innerHTML =
          "The link should start with 'http://...' , 'https://...' or leave the field empty.";
        submitBtn.disabled = true;
        submitBtn.classList.add("disabled");
        linkValid = false;
        return false;
      } else {
        validLink.innerHTML = "";
        submitBtn.classList.remove("disabled");
        submitBtn.disabled = false;
        linkValid = true;
        checkFields();
      }
    }

    function checkFields() {
      if (titleValid && authorValid && yearValid && isbnValid && linkValid) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("disabled");
        console.log(titleValid, authorValid, yearValid, isbnValid);
      }
    }
  }
  clearValidFields() {
    this.validTitle.innerHTML = "";
    this.validAuthor.innerHTML = "";
    this.validYear.innerHTML = "";
    this.validIsbn.innerHTML = "";
    this.validLink.innerHTML = "";
    this.submitBtn.classList.remove("disabled");
    this.submitBtn.disabled = false;
  }
}
