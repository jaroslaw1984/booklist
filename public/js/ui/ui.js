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

    // it checks is alert contains attention class name
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

  // clear hidden input field
  clearHiddenIdField() {
    this.idInput.value = "";
  }

  // close form
  closeForm(selectClass) {
    let select = document.querySelector(`.${selectClass}`);
    const wrapper = document.querySelector(".wrapper");

    console.log(select);

    select.addEventListener("click", () => {
      const check = wrapper.classList.contains("show");
      console.log(check);
      if (check) {
        wrapper.classList.remove("show");
      }
    });
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

  // get data passed in data attribute about book title, author, year and ISBN number
  getData(data) {
    this.titleInput.value = data.title;
    this.authorInput.value = data.author;
    this.yearInput.value = data.year;
    this.numberInput.value = data.isbn;
    this.idInput.value = data.dataId;

    // initial method with attribute "edit" that will create cancel btn and change button value.
    this.changeState("edit");
  }

  changeState(type) {
    if (type === "edit") {
      // changes a value when editing a book
      this.submitBtn.value = "Update book";
      // remember to create a class that change a update look btn
      // this.submitBtn.className = "update";

      // Create cancel input btn
      const cancelBtn = document.createElement("input");
      cancelBtn.type = "button";
      cancelBtn.value = "Cancel";
      cancelBtn.className = "cancel";

      // Insert cancel btn in DOM
      const div = document.querySelector(".action");
      div.insertBefore(cancelBtn, this.submitBtn);
    } else if (type === "add") {
      // Remove cancel btn
      const cancelBtn = document.querySelector(".cancel");

      // check if cancel button it is there
      if (cancelBtn) {
        // back to orginal form
        this.submitBtn.value = "Add Book";
        // remember to create a class that change a update look btn
        // this.submitBtn.className = "update";
        cancelBtn.remove();
        this.clearInputs();
        this.clearHiddenIdField();
      }
    }
  }
}
