import Library from "./library.js";

// HTML elements ---------------------------------------------
const clearAllBtn = document.getElementById("clear-all-button");
const form = document.getElementById("form");
const bookContainer = document.getElementById("books-container");

// Library instance --------------------------------------------------
const library = new Library();

// Test data --------------------------------------------------

library.addBook({
  title: "The Hobbits",
  author: "J.R.R. Tolkien",
  pages: 295,
  read: true,
});

library.addBook({
  title: "The Lord of the Rings",
  author: "J.R.R. Tolkien",
  pages: 1137,
  read: false,
});

library.addBook({
  title: "The Silmarillion",
  author: "J.R.R. Tolkien",
  pages: 365,
  read: false,
});

library.updateAndDisplayBooks(bookContainer);

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

  library.addBook(newBook);
  library.updateAndDisplayBooks(bookContainer);
  form.reset();
});

clearAllBtn.addEventListener("click", () => {
  library.emptyLibrary();
  library.updateAndDisplayBooks(bookContainer);
});

// Event functions --------------------------------------------------
function handleDeleteBook(e) {
  if (e.target.matches("#delete-button")) {
    const book = e.target.closest(".book");
    const bookId = parseInt(book.dataset.bookid);

    library.removeBookById(bookId);
    library.updateAndDisplayBooks(bookContainer);
  }
}

function toggleReadStatus(e) {
  if (e.target.matches("#toggle-read-button")) {
    const book = e.target.closest(".book");
    const bookId = parseInt(book.dataset.bookid);

    library.toggleReadStatus(bookId);
    library.updateAndDisplayBooks(bookContainer);
  }
}
