import { Book } from "./book.js";

/**
 * @class Library
 * @extends Book
 * @property {Array} books - Array of books
 * @method {function} addBook - Adds a book to the library
 * @method {function} emptyLibrary - Removes all books from the library
 * @method {function} findBookById - Finds a book by its id
 * @method {function} removeBookById - Removes a book by its id
 * @method {function} toggleReadStatus - Toggles the read status of a book
 * @method {function} updateAndDisplayBooks - Updates and displays the books in the library
 * @method {function} bookTemplate - Returns a template for a book
 */
class Library extends Book {
  constructor() {
    super();
    this.books = [];
  }

  addBook(book) {
    const bookExists = this.books.some((_book) => _book.title === book.title);

    if (!bookExists) {
      book = new Book(book.title, book.author, book.pages, book.read);
      this.books.push(book);
    } else {
      alert("Book already exists!");
    }
  }

  emptyLibrary() {
    this.books = [];
  }

  findBookById(id) {
    return this.books.find((book) => book.id === id);
  }

  removeBookById(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }

  toggleReadStatus(id) {
    const book = this.findBookById(id);
    book.read = !book.read;
  }

  updateAndDisplayBooks(bookContainer) {
    bookContainer.innerHTML = "";
    this.books.forEach((book) => {
      bookContainer.innerHTML += this.bookTemplate(book);
    });
  }

  bookTemplate(book) {
    return `
    <article class="book bg-gray-200 transition-all duration-500 hover:scale-110  rounded-lg 
    flex flex-col flex-nowrap p-4 shadow-2xl border-l-8 border-amber-800"  data-bookid=${
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
}

export default Library;
