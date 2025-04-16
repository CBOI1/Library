const myLibrary = new Array();

function Book(title, author, pageCount) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pageCount} pages`;
};

function addBookToLibrary(title, author, pageCount) {
    let newBook = new Book(title, author, pageCount);
    myLibrary.push(newBook);
    return newBook;
}

let bookContainer = document.querySelector(".book-container");

function displayBook(book) {
    let card = document.createElement("div");
    card.classList.add("book");
    card.textContent = book.info();
    bookContainer.appendChild(card);
}

function displayBooks() {
    for (let book of myLibrary) {
        displayBook(book)
    }
}

newBookBtn = document.querySelector(".new-book");
confirmBtn = document.querySelector(".confirm-btn");
closeBtn = document.querySelector(".close-btn");
dialog = document.querySelector("dialog");

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

confirmBtn.addEventListener("click", () => {
    //get user input
    title = document.querySelector("input#title").value;
    author = document.querySelector("input#author").value;
    pageCount = document.querySelector("input#page-count").value;
    book = addBookToLibrary(title, author, pageCount);
    displayBook(book);
    dialog.close();
});

closeBtn.addEventListener("click", () => {
    dialog.close();
});


window.addEventListener("load", () => {
    displayBooks();
})