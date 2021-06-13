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
        addBookToDisplay(newBook);
    }
    hideForm();
    console.log(myLibrary);
}

function addBookToDisplay(newBook) {
    let newBookDiv = document.createElement('div');
    newBookDiv.className = 'book';
    let newBookTitle = document.createElement('h4');
    newBookDiv.appendChild(newBookTitle);
    newBookTitle.innerText = newBook.title;
    let newBookReadStatus = (newBook.isRead) ? 'Finished' : 'Unfinished';
    newBookDiv.innerHTML += 'by ' + newBook.author.italics() +  '<br />'
        + 'Total pages: ' + newBook.pageNum + ' pgs' +  '<br />'
        + 'Read status: ' + newBookReadStatus;
    
    bookshelf.appendChild(newBookDiv);
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

function main() {
    let testBook1 = new Book('Harry Porter', 'Lady Bird',122, false);
    let testBook2 = new Book('The Greatest Book Of All', 'John Doe',6622, true);
    myLibrary.push(testBook1);
    myLibrary.push(testBook2);
    addBookToDisplay(testBook1);
    addBookToDisplay(testBook2);

}

main()