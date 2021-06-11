let myLibrary = []

const newBookButton = document.querySelector('#new-book-button');
newBookButton.addEventListener('click', showForm);

const closeNewBookFormButton = document.querySelector('#close-form-button');
closeNewBookFormButton.addEventListener('click', hideForm);

const formSubmitButton = document.querySelector('#submit-button');
formSubmitButton.addEventListener('click', addNewBook);

const newBookForm = document.querySelector('#new-book-form');
const titleInput = document.querySelector('#title-input'),
    authorInput = document.querySelector('#author-input'),
    yearInput = document.querySelector('#year-input'),
    numPageInput = document.querySelector('#num-page-input');


const newBookFormModal = document.querySelector('.modal');
const newBookFormModalBG = document.querySelector('.bg-modal');

const UNKOWN_VARIABLE = 'Unknown';

function Book(title = UNKOWN_VARIABLE, author = UNKOWN_VARIABLE, pageNum = 0, isRead = false) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function addNewBook(e) {
    if (document.querySelector('#title-input').value != '') {
        let newBook = new Book(
            document.querySelector('#title-input').value,
            document.querySelector('#author-input').value,
            document.querySelector('#year-input').value,
            document.querySelector('#num-page-input').value,
            document.querySelector('#read-button').checked
        );
        myLibrary.push(newBook);
    }
    console.log(myLibrary);
}

function displayBooksInLibrary() {
    console.log();
}

function showForm(e) {
    console.log('show form');
    newBookFormModalBG.style.display = 'flex';
}

function hideForm(e) {
    newBookFormModalBG.style.display = 'none';
}

function main() {
    let testBook1 = new Book('Harry Porter', 'Lady Bird',122, false);
    let testBook2 = new Book('The Greatest Book Of All', 'John Doe',6622, true);
    addBookToLibrary(testBook1);
    addBookToLibrary(testBook2);
}

main()