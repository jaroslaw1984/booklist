"use strict";

export default class Form {
  constructor() {
    this.bookList = document.querySelector(".book_list");
    this.titleInput = document.getElementById("title");
    this.authorInput = document.getElementById("author");
    this.yearInput = document.getElementById("year");
    this.numberInput = document.getElementById("book_number");
    this.submitBtn = document.querySelector(".submit_btn");
    this.alert = document.querySelector(".alert");
  }
  showBooks(books) {
    let list = "";

    books.forEach(book => {
      list += `
      <div class="content">
        <div class="body">
          <h4>${book.title}</h4>
          <p>${book.author} <span>(${book.year})</span></p>
          <p>Numer ISBN: ${book.number}</p>
          <a href="#" class="delete" data-id="${book.id}">
            <i class="far fa-trash-alt"></i>
          </a>
          <a href="#" class="edit" data-id="${book.id}">
            <i class="fas fa-pencil-alt"></i>
          </a>
        </div>
      </div>
        `;
    });

    // this.bookList.insertAdjacentHTML("afterbegin", list);
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

  clearInputs() {
    this.titleInput.value = "";
    this.authorInput.value = "";
    this.yearInput.value = "";
    this.numberInput.value = "";
  }

  // prevent for multitime submiting the form
  dbclick() {
    this.submitBtn.disabled = true;
    this.submitBtn.value = "Sprawdzam";

    setTimeout(() => {
      this.submitBtn.disabled = false;
      this.submitBtn.value = "Dodaj";
    }, 4500);
  }
}
