"use strict";
import img from "../../assets/image/no_image.png";

export default class Form {
  constructor() {
    this.bookList = document.getElementById("books");
    this.titleInput = document.getElementById("title");
    this.authorInput = document.getElementById("author");
    this.yearInput = document.getElementById("year");
    this.numberInput = document.getElementById("book_number");
    this.submitBtn = document.querySelector(".submit_btn");
    this.alert = document.querySelector(".alert");
    this.idInput = document.getElementById("id");
    this.wrapper = document.querySelector(".wrapper");
    this.formTitle = document.querySelector(".book__form__header");
  }
  showBooks(books) {
    // clean inline styles when styles are added if all data from db.json will be delete.
    this.bookList.style.cssText = null;

    let list = "";

    books.forEach(book => {
      list += `
      <div class="content">
        <div class="content__body">
          <div class="content__body__image">
            <img srcset="${img} 1x" class="image">
          </div>
          <div class="content__body__text">
            <h1 class="title">${book.title}</h1>
            <h2 class="author">${book.author}</h2> 
            <p class="year">(<span>${book.year}</span>)</p>
            <p class="isbn">Number ISBN: <span>${book.number}</span></p>
            <div class="icons">
              <a href="#" class="delete" title="Delete" data-id="${book.id}">
                <i class="far fa-trash-alt"></i>
              </a>
              <a href="#" class="edit" title="Edit" data-id="${book.id}">
                <i class="fas fa-pencil-alt"></i>
              </a>
            </div>  
          </div>  
        </div>
      </div>
        `;
    });

    this.bookList.innerHTML = list;
  }

  // Show alert if book is added, delete or modify
  alerts(message, className) {
    // double click secure
    this.dbclick;
    // check if any other alert is displayed, if so, don't create another one
    if (
      this.alert.classList.contains(className) ||
      this.alert.classList.contains("hide")
    )
      return;

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

  // close form by removing a class name "show"
  closeForm() {
    // select all delete buttons
    const buttons = document.querySelectorAll(".delete");

    // remove class's when close form
    this.wrapper.classList.remove("show");
    this.wrapper.classList.remove("edit");

    // restore title form
    this.formTitle.textContent = "Add new book";

    // when book is editing, delete button is disabled
    [...buttons].map(btn => btn.removeAttribute("style"));
    // closed form to restore delete button to enabled
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
      this.wrapper.classList.add("edit");
      this.submitBtn.value = "Update book";

      // title form for update
      this.formTitle.textContent = "Edit a book";

      // check if cancel btn exist it prevent to create again
      if (document.querySelector(".cancel")) return;

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

        // restore title form
        this.formTitle.textContent = "Add new book";

        // close form
        this.closeForm();

        //it will remove cancel btn
        cancelBtn.remove();

        // clear inputs fields
        this.clearInputs();

        // clear hiddend id field
        this.clearHiddenIdField();
      }
    }
  }

  noData() {
    // cleaning div before create text with empty json file
    this.bookList.innerHTML = "";

    const h1 = document.createElement("h1");
    const text = "Sorry, but there are no books to showed. Please add one.";

    h1.appendChild(document.createTextNode(text));
    h1.classList.add("books__no__data");
    this.bookList.appendChild(h1);
    this.bookList.style.display = "flex";
    this.bookList.style.justifyContent = "center";
    this.bookList.style.alignItems = "center";
  }
}
