"use strict";

export default class Form {
  constructor() {
    this.bookList = document.querySelector("#books");
    this.titleInput = document.getElementById("title");
    this.authorInput = document.getElementById("author");
    this.yearInput = document.getElementById("year");
    this.numberInput = document.getElementById("book_number");
    this.submitBtn = document.querySelector(".submit_btn");
    this.alert = document.querySelector(".alert");
    this.idInput = document.getElementById("id");
  }
  showBooks(books) {
    let list = "";

    books.forEach(book => {
      list += `
      <div class="content">
        <div class="body">
          <h2>${book.title}</h4>
          <h4>${book.author}</h4> 
          <p>(<span>${book.year}</span>)</p>
          <p>Number ISBN: <span>${book.number}</span></p>
          <a href="#" class="delete" title="Delete" data-id="${book.id}">
            <i class="far fa-trash-alt"></i>
          </a>
          <a href="#" class="edit" title="Edit" data-id="${book.id}">
            <i class="fas fa-pencil-alt"></i>
          </a>
        </div>
      </div>
        `;
    });

    this.bookList.innerHTML = list;
  }

  // Show alert if book is added, delete or modify
  alerts(message, className) {
    this.dbclick;
    const span = document.createElement("span");
    const attention = `<i class="fas fa-exclamation-triangle"></i>`;
    const check = `<i class="fas fa-check"></i>`;

    span.appendChild(document.createTextNode(message));

    this.alert.innerHTML += className === "attention" ? attention : check;
    this.alert.appendChild(span);

    setTimeout(() => {
      this.alert.classList = `alert ${className}`;
    }, 500);
    setTimeout(() => {
      this.alert.classList = "alert hide";
    }, 4000);
    setTimeout(() => {
      span.parentNode.removeChild(span);
      this.alert.classList = "alert";
      this.alert.innerHTML = "";
    }, 4500);
  }

  // clear input fields form when book is added
  clearInputs() {
    this.titleInput.value = "";
    this.authorInput.value = "";
    this.yearInput.value = "";
    this.numberInput.value = "";
  }

  // prevent for multitime submiting the form
  dbclick() {
    this.submitBtn.disabled = true;
    this.submitBtn.value = "Checking";

    setTimeout(() => {
      this.submitBtn.disabled = false;
      this.submitBtn.value = "Add Book";
    }, 4500);
  }

  // get data about book title, author, year and ISBN number
  getData(data) {
    this.titleInput.value = data.title;
    this.authorInput.value = data.author;
    this.yearInput.value = data.year;
    this.numberInput.value = data.isbn;
    this.idInput.value = data.dataId;
  }
}
