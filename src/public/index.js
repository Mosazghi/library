import Book from "./book.js ";

// HTML elements ---------------------------------------------
const clearAllBtn = document.getElementById("clear-all-button");
const form = document.getElementById("form");
const bookContainer = document.getElementById("books-container");

// Variables --------------------------------------------------
let books = [];

// Test data --------------------------------------------------
books.push(new Book("The Hobbits", "J.R.R. Tolkien", 295, true));
books.push(new Book("The Lord of the Rings", "J.R.R. Tolkien", 1137, true));
books.push(new Book("The Silmarillion", "J.R.R. Tolkien", 365, false));
books.push(new Book("The Children of Húrin", "J.R.R. Tolkien", 313, true));
books.push(new Book("The Fall of Gondolin", "J.R.R. Tolkien", 304, false));
updateAndDisplayBooks();

// Event listeners --------------------------------------------
bookContainer.addEventListener("click", (e) => {
  handleDeleteBook(e);
  toggleReadStatus(e);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const newBook = {
    title: formData.get("title").toString(),
    author: formData.get("author").toString(),
    pages: parseInt(formData.get("pages"), 10),
    read: formData.get("read") === "on",
  };

  addToLibrary(newBook);
});

clearAllBtn.addEventListener("click", () => {
  books = [];
  updateAndDisplayBooks();
});

window.addEventListener("load", () => {
  if (books.length > 0) {
    clearAllBtn.classList.remove("hidden");
  }
});

function addToLibrary(book) {
  const bookExists = books.some((_book) => _book.title === book.title);

  if (!bookExists) {
    book = new Book(book.title, book.author, book.pages, book.read);
    books.push(book);
    bookContainer.innerHTML += bookTemplate(book);
    form.reset();
  } else {
    alert("Book already exists!");
  }
}

function handleDeleteBook(e) {
  if (e.target.matches("#delete-button")) {
    const book = e.target.closest(".book");
    const bookId = parseInt(book.dataset.bookid);

    books = books.filter((book) => book.id !== bookId);
    updateAndDisplayBooks();
  }
}

function toggleReadStatus(e) {
  if (e.target.matches("#toggle-read-button")) {
    const book = e.target.closest(".book");
    const bookId = parseInt(book.dataset.bookid);

    const bookIndex = books.findIndex((book) => book.id === bookId);
    books[bookIndex].read = !books[bookIndex].read;

    updateAndDisplayBooks();
  }
}

function updateAndDisplayBooks() {
  bookContainer.innerHTML = "";
  books.forEach((book) => {
    bookContainer.innerHTML += bookTemplate(book);
  });
}

function bookTemplate(book) {
  return `
  <article class="transition-all hover:scale-110  rounded-lg flex flex-col flex-nowrap p-4 shadow-2xl border-l-8 border-amber-950 book"  data-bookid=${
    book.id
  }>
    <h3 class="text-2xl  text-start text-gray-700"><strong>${
      book.title
    }</strong></h3>
    <div class="flex-1 my-4 transition-colors">
      <i class="fa-solid fa-feather fa-lg me-3"></i>
      <span class="text-lg hover:text-slate-600"> ${book.author} </span>
      <br />
      <i class="fa-solid fa-book-open fa-lg me-2  "></i>
      <span class="text-lg hover:text-slate-600">${book.pages} pages </span>
      <br />
      ${
        book.read
          ? `<i class="fa-solid fa-circle-check fa-lg me-3" style="color: green;" ></i>`
          : `<i class="fa-solid fa-circle-xmark fa-lg me-3" style="color: red;" ></i>`
      }
      
      <span class="text-lg hover:text-slate-800 cursor-pointer" id="toggle-read-button"> ${
        book.read ? "Read" : "Not Read"
      } </span>
      <br /> 
      </div>
      <button class=" text-lg hover:font-bold flex justify-start items-center gap-2 float-right hover:text-rose-600 hover:animate-shake  animate-once animate-duration-100 animate-ease-in" id="delete-button">
        <i class="fa-solid fa-trash fa-lg" ></i> Delete 
      </button>
  </article>`;
}
