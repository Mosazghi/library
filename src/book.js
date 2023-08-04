/**
 * @class Book
 * @property {string} title - The title of the book
 * @property {string} author - The author of the book
 * @property {number} pages - The number of pages in the book
 * @property {boolean} read - Whether or not the book has been read
 * @property {number} id - The id of the book
 */
export class Book {
  static lastId = 0;

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Book.lastId++;
  }
}
