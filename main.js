const myLibrary = new Array();

function Book(title, author, pageCount, read = false) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.id = crypto.randomUUID();
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pageCount} pages`;
};

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pageCount) {
    let newBook = new Book(title, author, pageCount);
    myLibrary.push(newBook);
    return newBook;
}

const bookContainer = document.querySelector(".book-container");

function createRemoveBtn(cardElement) {
    removeBtn = document.createElement("button");
    removeBtn.setAttribute("type", "button");
    removeBtn.textContent = "Remove From Library";
    removeBtn.addEventListener("click", () => {
        //Remove book from library array
        const indexToRemove = myLibrary.findIndex((book) => book.id === cardElement.dataset.id);
        if (indexToRemove !== -1) {
            myLibrary.splice(indexToRemove, 0);
            //Remove element from container element of the DOM
            bookContainer.removeChild(cardElement);
        }
    });
    return removeBtn;
}

function createReadToggleBtn(cardElement) {
    toggleBtn = document.createElement("button");
    toggleBtn.setAttribute("type", "button");
    toggleBtn.textContent = "Read";
    toggleBtn.addEventListener("click", () => {
        //Remove book from library array
        const book = myLibrary.find((book) => book.id === cardElement.dataset.id);
        if (book) {
            book.toggleRead();
            const color = (book.read) ? "green" : "red";
            cardElement.style.boxShadow = `0px 0px 5px 5px ${color}`;
        }
    });
    return toggleBtn;
}


function displayBook(book) {
    let card = document.createElement("div");
    card.classList.add("book");
    card.textContent = book.info();
    card.setAttribute("data-id", book.id);
    card.appendChild(document.createElement("br"));
    card.appendChild(createRemoveBtn(card));
    card.appendChild(document.createElement("br"));
    card.appendChild(createReadToggleBtn(card));
    bookContainer.appendChild(card);

}

function displayBooks() {
    for (const book of myLibrary) {
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
    const book = addBookToLibrary(title, author, pageCount);
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