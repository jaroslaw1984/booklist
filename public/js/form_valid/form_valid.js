"use strict";

export default class Validate {
  constructor() {
    // select input fields
    this.title = document.getElementById("title");
    this.author = document.getElementById("author");
    this.year = document.getElementById("year");
    this.number = document.getElementById("book_number");
    this.submitBtn = document.querySelector(".submit_btn");

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

    // listeners on inputs
    this.title.addEventListener("input", validateTitle);
    this.author.addEventListener("input", validateAuthor);
    this.year.addEventListener("input", validateYear);
    this.number.addEventListener("input", validateIsbn);

    function validateTitle() {
      const validTitle = document.getElementById("validTitle");

      if (!/^[a-zA-Z]{2,}/.test(title.value)) {
        if (/\d/.test(title.value)) {
          validTitle.innerHTML = "The numbers are not allowed here.";
          submitBtn.disabled = true;
          console.log("nie przeszedłem");
          return;
        } else {
          validTitle.innerHTML =
            "The title is too short, it must contain at least two letters";
          submitBtn.disabled = true;
          console.log("nie przeszedłem");
          return;
        }
      } else {
        validTitle.innerHTML = "";
        submitBtn.disabled = false;
        console.log("przeszedłem");
        return;
      }
    }

    function validateAuthor() {
      const validAuthor = document.getElementById("validAuthor");

      if (!/^[a-zA-Z]{2,}/.test(author.value)) {
        if (/\d/.test(author.value)) {
          validAuthor.innerHTML = "The numbers are not allowed here.";
          submitBtn.disabled = true;
          return false;
        } else {
          validAuthor.innerHTML =
            " The title is too short, it must contain at least two letters";
          submitBtn.disabled = true;
          return false;
        }
      } else {
        validAuthor.innerHTML = "";
        submitBtn.disabled = false;
        return true;
      }
    }

    function validateYear() {
      const validYear = document.getElementById("validYear");

      if (!/^[0-9]{1,4}$/.test(year.value)) {
        if (/^[a-zA-Z]/.test(year.value)) {
          validYear.innerHTML = "Letters are not allowed here.";
          submitBtn.disabled = true;
          return false;
        } else {
          validYear.innerHTML = "You enter wrong year. For example '1984'";
          submitBtn.disabled = true;
          return false;
        }
      } else {
        validYear.innerHTML = "";
        submitBtn.disabled = false;
        return true;
      }
    }

    function validateIsbn() {
      const validIsbn = document.getElementById("validIsbn");

      if (!/^[0-9]{1,}$/.test(isbn.value)) {
        if (/^[a-zA-Z]/.test(isbn.value)) {
          validIsbn.innerHTML = "Letters are not allowed here.";
          submitBtn.disabled = true;
          return false;
        } else {
          validIsbn.innerHTML = "You enter wrong ISBN number";
          submitBtn.disabled = true;
          return false;
        }
      } else {
        validIsbn.innerHTML = "";
        submitBtn.disabled = false;
        return true;
      }
    }
  }
}
