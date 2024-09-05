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
const api_url = "http://localhost:9000/books";
const STORAGE_KEY = "BOOKS_APPS";
const SAVED_EVENT = "SAVED-BOOKS";
const CHANGE_EVENT = "CHANGE_BOOKS";

const confirmButton = document.getElementById("save");
const cancelButton = document.getElementById("close");
const textDialog = document.getElementById("text-dialog");
const judulBuku = document.getElementById("cari-buku");

const submitForm = document.getElementById("inputBook");
submitForm.addEventListener("submit", function (event) {
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
  const newBook = {
    name,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    year,
    reading,
  };

  event.preventDefault();
  fetch("http://localhost:9000/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    event.target.reset();
  });

  loadBooksFromServer();
});

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

//fungsi membuat list buku
function makeBooks(newBook) {
  const book = newBook.data.book;
  const nameBook = document.createElement("h2");
  nameBook.innerText = book.name;
  const authorBook = document.createElement("p");
  authorBook.innerText = book.publisher;
  const reading = document.createElement("p");
  reading.innerText = `Reading : ${book.reading}`;

  const textContainer = document.createElement("div");

  textContainer.append(nameBook, authorBook, reading);

  const container = document.createElement("div");
  container.append(textContainer);

  container.classList.add("item", "shadow");

  if (newBook.reading) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");
    undoButton.addEventListener("click", function () {
      const popUp = document.getElementById("popup");
      popUp.classList.add("popup-open");
      textDialog.innerText = "Anda Yakin Mengembalikan Buku ke Daftar Belum DIbaca?";

      confirmButton.addEventListener("click", function () {
        undoBookFromCompleted(newBook.id);
        popUp.classList.remove("popup-open");
      });
      cancelButton.addEventListener("click", function () {
        popUp.classList.remove("popup-open");
      });
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.addEventListener("click", function () {
      const popUp = document.getElementById("popup");
      popUp.classList.add("popup-open");
      textDialog.innerText = "Anda Yakin Ingin Menghapus Buku?";

      confirmButton.addEventListener("click", function () {
        removeBookFromCompleted(newBook.id);
        popUp.classList.remove("popup-open");
      });
      cancelButton.addEventListener("click", function () {
        popUp.classList.remove("popup-open");
      });
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");
    checkButton.addEventListener("click", function () {
      const popUp = document.getElementById("popup");
      popUp.classList.add("popup-open");
      textDialog.innerText = "Anda Yakin Ingin Memindahkan Buku ke Daftar Sudah DIbaca?";

      confirmButton.addEventListener("click", function () {
        addBookCompleted(newBook.id);
        popUp.classList.remove("popup-open");
      });

      cancelButton.addEventListener("click", function () {
        popUp.classList.remove("popup-open");
      });
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.addEventListener("click", function () {
      const confirm = document.getElementById("save");
      confirm.classList.add("danger");
      const popUp = document.getElementById("popup");
      popUp.classList.add("popup-open");
      textDialog.innerText = "Anda Yakin Ingin Menghapus Buku?";

      confirmButton.addEventListener("click", function () {
        removeBookFromunCompleted(newBook.id);
        popUp.classList.remove("popup-open");
      });
      cancelButton.addEventListener("click", function () {
        popUp.classList.remove("popup-open");
      });
    });

    container.append(checkButton, trashButton);
  }

  return container;
}


let books = []; // Pastikan variabel books dideklarasikan di sini

async function loadBooksFromServer() {
  try {
    const response = await fetch(api_url);
    const data = await response.json();
    console.log("Data berhasil diload dari server", data);

    // Pastikan untuk memeriksa struktur data sebelum menggunakan
    books = data.data.books; // Simpan array buku dari data
    document.dispatchEvent(new Event(CHANGE_EVENT)); // Trigger event untuk mengupdate UI
  } catch (error) {
    console.error("Error:", error);
  }
}

//event untuk menambahkan buku ke list buku
document.addEventListener(CHANGE_EVENT, async function () {
  const unReadBooksList = document.getElementById("books");
  const readBookList = document.getElementById("books-item");

  unReadBooksList.innerHTML = "";
  readBookList.innerHTML = "";

  for (const bookItem of books) {
    try {
      const response = await fetch(`http://localhost:9000/books/${bookItem.id}`);
      const data = await response.json();
      console.log("Book detail:", data);
      const book = data.data.book;

      const bookList = makeBooks(data); // Use detailed book data
      if (book.reading) {
        readBookList.append(bookList);
      } else {
        unReadBooksList.append(bookList);
      }
    } catch (error) {
      console.error("Error fetching book detail:", error);
    }
  }
});

async function deleteBook() {
  try {
    const response = await fetch("http://localhost:9000/books/jcy1xROz5m", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
