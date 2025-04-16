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

function createRemoveBtn(cardElement) {
    removeBtn = document.createElement("button");
    removeBtn.setAttribute("type", "button");
    removeBtn.textContent = "Remove From Library";
    removeBtn.addEventListener("click", (e) => {
        //Remove book from library array
        let indexToRemove = myLibrary.findIndex((book) => book.id === cardElement.dataset.id);
        if (indexToRemove !== -1) {
            myLibrary.splice(indexToRemove, 0);
            //Remove element from card element from the DOM
            bookContainer.removeChild(cardElement);
        }
    });
    return removeBtn;
}

function displayBook(book) {
    let card = document.createElement("div");
    card.classList.add("book");
    card.textContent = book.info();
    card.setAttribute("data-id", book.id);
    card.appendChild(document.createElement("br"));
    card.appendChild(createRemoveBtn(card));
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
    let title = document.querySelector("input#title").value;
    let author = document.querySelector("input#author").value;
    let pageCount = document.querySelector("input#page-count").value;
    let book = addBookToLibrary(title, author, pageCount);
    displayBook(book);
    dialog.close();
});

closeBtn.addEventListener("click", () => {
    dialog.close();
});


window.addEventListener("load", () => {
    addBookToLibrary("Don Quixote", "Miguel De Cervantes", 1072);
    addBookToLibrary("Count of Monte Cristo", "Alexandre Dumas", 1276);
    addBookToLibrary("My Beloved World", "Sonia Sotomayor", 336);
    addBookToLibrary("The Brothers Karamazov", "Fyodor Dostoevsky", 1336);
    addBookToLibrary("Anna Karenina", "Leo Tolstoy", 864);
    displayBooks();
})