let myLibrary = []

const numBooks = document.querySelector('#num-books');
const numBooksRead = document.querySelector('#num-books-read');

const newBookButton = document.querySelector('#new-book-button');
newBookButton.addEventListener('click', showForm);

const closeNewBookFormButton = document.querySelector('#close-form-button');
closeNewBookFormButton.addEventListener('click', hideForm);

const formSubmitButton = document.querySelector('#submit-button');
formSubmitButton.addEventListener('click', addNewBook);

const newBookForm = document.querySelector('#new-book-form');
newBookForm.addEventListener('submit', handleForm);
const titleInput = document.querySelector('#title-input'),
    authorInput = document.querySelector('#author-input'),
    numPageInput = document.querySelector('#num-page-input');


const newBookFormModal = document.querySelector('.modal');
const newBookFormModalBG = document.querySelector('.bg-modal');

const bookshelf = document.querySelector('#bookshelf-container');

const noBookDisplay = document.querySelector('#no-book-indicator')
const UNKOWN_VARIABLE = 'Unknown';

function Book(title, author, pageNum, isRead = false) {
    this.title = title;
    this.author = (author === '') ? UNKOWN_VARIABLE : author;
    this.pageNum = (pageNum === '') ? 0 : pageNum;
    this.isRead = isRead;
}

function addNewBook(e) {
    if (document.querySelector('#title-input').value != '') {
        let newBook = new Book(
            document.querySelector('#title-input').value,
            document.querySelector('#author-input').value,
            document.querySelector('#num-page-input').value,
            document.querySelector('#read-button').checked
        );
        myLibrary.push(newBook);
        updateStatistics(newBook, 'add');
        displayBooks();
    }
    hideForm();
    populateStorage();
    noBooksCheck();
}

function displayBooks() {
    bookshelf.innerHTML = '';
    myLibrary.forEach(function(book) {
        let bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        let bookTitle = document.createElement('h4');
        bookTitle.innerText = book.title;
        bookDiv.appendChild(bookTitle);
        let bookReadStatus = (book.isRead) ? 'Finished' : 'Unfinished';
        bookDiv.innerHTML += 'by ' + book.author.italics() + '<br />'
            + 'Total pages: ' + book.pageNum + ' pgs' + '<br />'
            + 'Read status: ' + bookReadStatus + '<br />';
        let removeButton = document.createElement('button');
        removeButton.innerHTML = 'Remove';
        removeButton.addEventListener('click', removeBook);
        let changeReadStatusButton = document.createElement('button');
        changeReadStatusButton.innerHTML = 'Read';
        changeReadStatusButton.addEventListener('click', changeReadStatus);
        bookDiv.appendChild(removeButton);
        bookDiv.appendChild(changeReadStatusButton);
        bookshelf.appendChild(bookDiv);
    });
}

function showForm(e) {
    newBookFormModalBG.style.display = 'flex';
}

function hideForm(e) {
    newBookFormModalBG.style.display = 'none';
    newBookForm.reset(); //Error not focusable
}

//Prevents submit button from refreshing
function handleForm(e) {
    e.preventDefault();
}

function changeReadStatus(e) {
    let bookToBeChanged = findBook(e.target.parentElement.children[0].innerHTML);
    bookToBeChanged.isRead = (bookToBeChanged.isRead) ? false : true;
    displayBooks();
    populateStorage();
    updateStatistics(bookToBeChanged, 'change');
}

function removeBook(e) {
    let bookToBeRemoved = findBook(e.target.parentElement.children[0].innerHTML);
    myLibrary = myLibrary.filter(book => book !== bookToBeRemoved);
    displayBooks();
    populateStorage();
    updateStatistics(bookToBeRemoved, 'remove');
    noBooksCheck();
}

function findBook(bookTitle) {
    let foundBook = null;
    myLibrary.forEach(function(book) {
        if (book.title === bookTitle) {
            foundBook = book;
        }
    });
    return foundBook;
}

function noBooksCheck() {
    if (myLibrary.length == 0) {
        noBookDisplay.style.display = 'block';
    } else {
        noBookDisplay.style.display = 'none';
    }
}

function populateStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function updateStatistics(book, task) {
    numBooks.innerHTML = myLibrary.length;
    if (task === 'add' && book['isRead']) {
        console.log(book['isRead']);
        numBooksRead.innerHTML = parseInt(numBooksRead.innerHTML) + 1;
    } else if (task === 'remove' && book['isRead']) {
        numBooksRead.innerHTML = parseInt(numBooksRead.innerHTML) - 1;
    } else if (task === 'change') {
        if (book['isRead']) {
            numBooksRead.innerHTML = parseInt(numBooksRead.innerHTML) + 1;
        } else {
            numBooksRead.innerHTML = parseInt(numBooksRead.innerHTML) - 1;
        }
    }
}

function main() {
    if (!localStorage.getItem('myLibrary')) {
        populateStorage();
    } else {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    numBooks.innerHTML = myLibrary.length;
    numBooksRead.innerHTML = 0;
    displayBooks();
    noBooksCheck();
}

main()