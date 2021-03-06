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

        hideForm();
        populateStorageLibrary();
        noBooksCheck();
    }
}

function displayBooks() {
    bookshelf.innerHTML = '';
    myLibrary.forEach(function(book) {
        let bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        let bookTitleContainer = document.createElement('div');
        bookTitleContainer.className = 'book-title-container';
        let bookTitle = document.createElement('h4');
        bookTitle.innerText = book.title;
        bookTitleContainer.appendChild(bookTitle);
        bookDiv.appendChild(bookTitleContainer);
        let bookInfoContainer = document.createElement('div');
        bookInfoContainer.className = 'book-info-container';
        let authorInfo = document.createElement('p1');
        authorInfo.innerHTML = 'by ' + book.author.italics();
        let numPageInfo = document.createElement('p1');
        numPageInfo.innerHTML = 'Total pages: ' + book.pageNum + ' pages';
        let readStatusInfo = document.createElement('p1');
        let bookReadStatus = (book.isRead) ? 'Finished' : 'Unfinished';
        let readStatusSpan = document.createElement('span');
        readStatusSpan.className = (book.isRead) ? 'read-status-span-finished' : 'read-status-span-unfinished';
        readStatusSpan.innerHTML = bookReadStatus;
        readStatusInfo.innerHTML = 'Read Status: ';
        readStatusInfo.appendChild(readStatusSpan);
        
        bookInfoContainer.appendChild(authorInfo);
        bookInfoContainer.appendChild(numPageInfo)
        bookInfoContainer.appendChild(readStatusInfo);
        bookDiv.appendChild(bookInfoContainer);
        
        let removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.innerHTML = 'Remove';
        removeButton.addEventListener('click', removeBook);
        let changeReadStatusButton = document.createElement('button');
        changeReadStatusButton.className = 'change-read-status-button';
        changeReadStatusButton.innerHTML = 'Read';
        changeReadStatusButton.addEventListener('click', changeReadStatus);
        let bookButtonsContainer = document.createElement('div');
        bookButtonsContainer.className = 'book-buttons-container';
        bookButtonsContainer.appendChild(removeButton);
        bookButtonsContainer.appendChild(changeReadStatusButton);
        bookDiv.appendChild(bookButtonsContainer);
        bookshelf.appendChild(bookDiv);
    });
}

function showForm(e) {
    newBookFormModalBG.classList.add('active');
    newBookFormModal.classList.add('active');
    console.log(newBookFormModal.classList);
}

function hideForm(e) {
    newBookFormModalBG.classList.remove('active');
    newBookFormModal.classList.remove('active');
    newBookForm.reset(); //Error not focusable
}

//Prevents submit button from refreshing
function handleForm(e) {
    e.preventDefault();
}

function changeReadStatus(e) {
    let bookToBeChanged = findBook(e.target.parentElement.parentElement.children[0].children[0].innerHTML);
    bookToBeChanged.isRead = !(bookToBeChanged.isRead); //TODO: make sure negate working
    displayBooks();
    populateStorageLibrary();
    updateStatistics(bookToBeChanged, 'change');
}

function removeBook(e) {
    let bookToBeRemoved = findBook(e.target.parentElement.parentElement.children[0].children[0].innerHTML);
    myLibrary = myLibrary.filter(book => book !== bookToBeRemoved);
    displayBooks();
    populateStorageLibrary();
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

function populateStorageLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function populateStorageBooksRead() {
    localStorage.setItem('numBooksRead', numBooksRead.innerHTML);
}

function countReadBooks() {
    let counter = 0;
    myLibrary.forEach(function(book) {
        if (book['isRead']) counter++;
    });
    return counter;
}

function updateStatistics(book, task) {
    numBooks.innerHTML = myLibrary.length;
    if (task === 'add' && book['isRead']) {
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
    populateStorageBooksRead();
}

function main() {
    if (!localStorage.getItem('myLibrary')) {
        populateStorageLibrary();
    } else {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    numBooks.innerHTML = myLibrary.length;
    if (!localStorage.getItem('numBooksRead')) {
        numBooksRead.innerHTML = localStorage.getItem('numBooksRead');
    } else {
        numBooksRead.innerHTML = countReadBooks();
    }
    displayBooks();
    noBooksCheck();
}

main();