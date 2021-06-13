let myLibrary = []

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
        displayBooks();
    }
    hideForm();
    console.log(myLibrary);
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
    console.log('show form');
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
}

function removeBook(e) {
    let bookToBeRemoved = findBook(e.target.parentElement.children[0].innerHTML);
    console.log(myLibrary);
    myLibrary = myLibrary.filter(book => book !== bookToBeRemoved);
    displayBooks();
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

function main() {
    let testBook1 = new Book('Harry Porter', 'Lady Bird',122, false);
    let testBook2 = new Book('The Greatest Book Of All', 'John Doe',6622, true);
    myLibrary.push(testBook1);
    myLibrary.push(testBook2);
    displayBooks();
}

main()