"use strict";

export default class Form {
  constructor() {
    this.bookList = document.querySelector(".book_list");
    this.titleInput = document.getElementById("title");
    this.authorInput = document.getElementById("author");
    this.yearInput = document.getElementById("year");
    this.numberInput = document.getElementById("book_number");
    this.submitBtn = document.querySelector(".submit_btn");
  }
  showBooks(books) {
    let list = "";

    books.forEach(book => {
      // list += `
      // <div class="content">
      //   <div class="body">
      //     <h4>${book.title}</h4>
      //     <p>${book.author} <span>(${book.year})</span></p>
      //     <p>ISBN ${book.number}</p>
      //     <a href="#" class="delete" data-id="${book.id}">
      //       <i class="far fa-trash-alt"></i>
      //     </a>
      //     <a href="#" class="edit" data-id="${book.id}">
      //       <i class="fas fa-pencil-alt"></i>
      //     </a>
      //   </div>
      // </div>
      //   `;
      const divContent = document.createElement("div");
      const divBody = document.createElement("div");
      const h4 = document.createElement("h4");
      const pAuthor = document.createElement("p");
      const pISBN = document.createElement("p");
      const span = document.createElement("span");
      const aDelete = document.createElement("a");
      const aEdit = document.createElement("a");

      divContent.className = "content";
      divBody.className = "body";

      divContent.appendChild(divBody);
      divBody.appendChild(h4, pAuthor, pISBN, aDelete, aEdit);
      pAuthor.appendChild(span);

      h4.appendChild(document.createTextNode(book.year));
      pAuthor.appendChild(document.createTextNode(book.author));
    });

    this.bookList.insertAdjacentHTML("beforeend", list);
  }

  alerts(message, className) {}

  clearInputs() {
    this.titleInput.value = "";
    this.authorInput.value = "";
    this.yearInput.value = "";
    this.numberInput.value = "";
  }
}
