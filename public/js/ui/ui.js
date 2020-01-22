"use strict";

export default class Ui {
  constructor() {
    this.bookList = document.querySelector(".book_list");
    this.titleInput = document.getElementById("title");
    this.authorInput = document.getElementById("author");
    this.numberInput = document.getElementById("book_number");
    this.submitBtn = document.querySelector(".submit_btn");
  }
  showBooks(books) {
    console.log(this.bookList);
  }
}
