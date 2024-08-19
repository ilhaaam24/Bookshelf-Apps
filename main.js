/**
 * [
 *    {
 *      id: <string || number>
 *      JUDUL: <string>
 *      PENULIS: <string>
 *      TANGGAL: <string>
 *      COMPLETE : <boolean>
 *    }
 * ]
 */
const api_url = 'http://localhost:9000/books';

const BOOKS = [];
const STORAGE_KEY = "BOOKS_APPS";
const SAVED_EVENT = "SAVED-BOOKS";
const CHANGE_EVENT = "CHANGE_BOOKS";

const confirmButton = document.getElementById("save");
const cancelButton = document.getElementById("close");
const textDialog = document.getElementById("text-dialog");
const judulBuku = document.getElementById("cari-buku");

const submitForm = document.getElementById("inputBook");
submitForm.addEventListener('submit', function (event) {
   const name = document.getElementById("name").value;
   const author = document.getElementById("author").value;
   const summary = document.getElementById("summary").value;
   const publisher = document.getElementById("publisher").value;
   const pageCount = document.getElementById("pageCount").value;
   const readPage = document.getElementById("readPage").value;
   const year = document.getElementById("year").value;
   const isComplete = document.getElementById("readingYes");
   const notComplete = document.getElementById("readingNo");
   let reading = false;
   console.log(name, author, summary, publisher, pageCount, readPage, year, reading);

   if (isComplete.checked) {
     reading = true;
   } else if (notComplete.checked) {
     reading = false;
   }
   const newBook ={
     name,
     author,
     summary,
     publisher,
     pageCount,
     readPage,
     year,
     reading,
   }

  event.preventDefault();
  fetch('http://localhost:9000/books', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBook)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
})

// document.addEventListener("DOMContentLoaded", function () {
//   const submitForm = document.getElementById("inputBook");

//   submitForm.addEventListener("submit", function (event) {
//     event.preventDefault();
//     addBook();
//     event.target.reset();
//   });

//   if (isStorageExist()) {
//     loadDataFromStorage();
//   }
// });

// function isStorageExist() {
//   if (typeof Storage === undefined) {
//     alert("Browser kamu tidak mendukung local storage");
//     return false;
//   }
//   return true;
// }

// function saveData() {
//   if (isStorageExist()) {
//     const parsed = JSON.stringify(BOOKS);
//     localStorage.setItem(STORAGE_KEY, parsed);
//     document.dispatchEvent(new Event(SAVED_EVENT));
//   }
// }

// function addBook() {
//   const name = document.getElementById("name").value;
//   const author = document.getElementById("author").value;
//   const summary = document.getElementById("summary").value;
//   const publisher = document.getElementById("publisher").value;
//   const pageCount = document.getElementById("pageCount").value;
//   const readCount = document.getElementById("readPage").value;
//   const year = document.getElementById("year").value;
//   const isComplete = document.getElementById("readingYes");
//   const notComplete = document.getElementById("readingNo");
//   let reading = false;
//   console.log(name, author, summary, publisher, pageCount, readCount, year, reading);

//   if (isComplete.checked) {
//     reading = true;
//   } else if (notComplete.checked) {
//     reading = false;
//   }

//   const newBook = generateNewBook(name, author, summary, publisher, pageCount, readCount, year, reading);
//   BOOKS.push(newBook);
//   document.dispatchEvent(new Event(CHANGE_EVENT));
//   saveData();
// }
// function findBook(bookId) {
//   for (const todoItem of BOOKS) {
//     if (todoItem.id === bookId) {
//       return todoItem;
//     }
//   }
//   return null;
// }
// function findBookIndex(bookId) {
//   for (const index in BOOKS) {
//     if (BOOKS[index].id === bookId) {
//       return index;
//     }
//   }

//   return -1;
// }

// function addBookCompleted(bookId) {
//   const bookTarget = findBook(bookId);

//   if (bookTarget == null) return;

//   bookTarget.isComplete = true;
//   document.dispatchEvent(new Event(CHANGE_EVENT));
//   saveData();
// }

// function removeBookFromCompleted(bookId) {
//   const bookTarget = findBookIndex(bookId);

//   if (bookTarget === -1) return;

//   BOOKS.splice(bookTarget, 1);
//   document.dispatchEvent(new Event(CHANGE_EVENT));
//   saveData();
// }

// function removeBookFromunCompleted(bookId) {
//   const bookTarget = findBookIndex(bookId);

//   if (bookTarget === -1) return;

//   BOOKS.splice(bookTarget, 1);
//   document.dispatchEvent(new Event(CHANGE_EVENT));
//   saveData();
// }
// //
// function undoBookFromCompleted(bookId) {
//   const bookTarget = findBook(bookId);

//   if (bookTarget == null) return;

//   bookTarget.isComplete = false;
//   document.dispatchEvent(new Event(CHANGE_EVENT));
//   saveData();
// }

// function generateNewBook(name, author, summary, publisher, pageCount, readCount, year, reading) {
//   return {
//     name,
//     author,
//     summary,
//     publisher,
//     pageCount,
//     readCount,
//     year,
//     reading,
//   };
// }
// //fungsi menghitung jumlah buku yang tersimpan
// function jumlahBuku() {
//   const jumlahBuku = document.getElementById("jumlah-buku");
//   jumlahBuku.innerText = BOOKS.length;
// }

// judulBuku.addEventListener("input", function () {
//   //fungsi cari buku
//   const judulBuku = document.getElementById("cari-buku").value;
//   const listBuku = document.querySelectorAll(".item");

//   for (let i = 0; i < listBuku.length; i++) {
//     if (listBuku[i].innerText.toLowerCase().indexOf(judulBuku) == 0) {
//       listBuku[i].classList.remove("hide");
//     } else {
//       listBuku[i].classList.add("hide");
//     }
//   }
// });

// //fungsi membuat list buku
// function makeBook(newBook) {
//   const nameBook = document.createElement("h2");
//   nameBook.innerText = newBook.name;
//   const authorBook = document.createElement("p");
//   authorBook.innerText = newBook.author;
//   const summaryBook = document.createElement("p");
//   summaryBook.innerText = newBook.summary;
//   const yearBook = document.createElement("p");
//   yearBook.innerText = newBook.year;

//   const textContainer = document.createElement("div");

//   textContainer.append(nameBook, authorBook, summaryBook, yearBook);

//   const container = document.createElement("div");
//   container.append(textContainer);

//   container.classList.add("item", "shadow");

//   if (newBook.isComplete) {
//     const undoButton = document.createElement("button");
//     undoButton.classList.add("undo-button");
//     undoButton.addEventListener("click", function () {
//       const popUp = document.getElementById("popup");
//       popUp.classList.add("popup-open");
//       textDialog.innerText = "Anda Yakin Mengembalikan Buku ke Daftar Belum DIbaca?";

//       confirmButton.addEventListener("click", function () {
//         undoBookFromCompleted(newBook.id);
//         popUp.classList.remove("popup-open");
//       });
//       cancelButton.addEventListener("click", function () {
//         popUp.classList.remove("popup-open");
//       });
//     });

//     const trashButton = document.createElement("button");
//     trashButton.classList.add("trash-button");
//     trashButton.addEventListener("click", function () {
//       const popUp = document.getElementById("popup");
//       popUp.classList.add("popup-open");
//       textDialog.innerText = "Anda Yakin Ingin Menghapus Buku?";

//       confirmButton.addEventListener("click", function () {
//         removeBookFromCompleted(newBook.id);
//         popUp.classList.remove("popup-open");
//       });
//       cancelButton.addEventListener("click", function () {
//         popUp.classList.remove("popup-open");
//       });
//     });

//     container.append(undoButton, trashButton);
//   } else {
//     const checkButton = document.createElement("button");
//     checkButton.classList.add("check-button");
//     checkButton.addEventListener("click", function () {
//       const popUp = document.getElementById("popup");
//       popUp.classList.add("popup-open");
//       textDialog.innerText = "Anda Yakin Ingin Memindahkan Buku ke Daftar Sudah DIbaca?";

//       confirmButton.addEventListener("click", function () {
//         addBookCompleted(newBook.id);
//         popUp.classList.remove("popup-open");
//       });

//       cancelButton.addEventListener("click", function () {
//         popUp.classList.remove("popup-open");
//       });
//     });

//     const trashButton = document.createElement("button");
//     trashButton.classList.add("trash-button");
//     trashButton.addEventListener("click", function () {
//       const confirm = document.getElementById('save');
//       confirm.classList.add('danger')
//       const popUp = document.getElementById("popup");
//       popUp.classList.add("popup-open");
//       textDialog.innerText = "Anda Yakin Ingin Menghapus Buku?";

//       confirmButton.addEventListener("click", function () {
//         removeBookFromunCompleted(newBook.id);
//         popUp.classList.remove("popup-open");
//       });
//       cancelButton.addEventListener("click", function () {
//         popUp.classList.remove("popup-open");
//       });
//     });

//     container.append(checkButton, trashButton);
//   }

//   return container;
// }

// function loadDataFromStorage() {
//   const serializedData = localStorage.getItem(STORAGE_KEY);
//   let data = JSON.parse(serializedData);

//   if (data !== null) {
//     for (const book of data) {
//       BOOKS.push(book);
//     }
//   }

//   document.dispatchEvent(new Event(CHANGE_EVENT));
// }

// //event untuk menambahkan buku ke list buku
// document.addEventListener(CHANGE_EVENT, function () {
//   const unReadBooksList = document.getElementById("books");
//   const readBookList = document.getElementById("books-item");

//   unReadBooksList.innerHTML = "";
//   readBookList.innerHTML = "";

//   for (const bookItem of BOOKS) {
//     const bookList = makeBook(bookItem);
//     if (bookItem.isComplete) {
//       readBookList.append(bookList);
//     } else {
//       unReadBooksList.append(bookList);
//     }
//   }
//   jumlahBuku();
// });
// document.addEventListener(SAVED_EVENT, function () {
//   console.log(localStorage.getItem(STORAGE_KEY));
// });
