let myLibrary = []

const newBookButton = document.querySelector('#new-book-button');
newBookButton.addEventListener('click', showForm);
const newBookForm = document.querySelector('#new-book-form');

function Book(title = 'Unknown Title', author = 'Unknown Author', pageNum = 0, isRead = false) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead;
}
  
function addBookToLibrary(newBook) {
    
    myLibrary.push(newBook);
}

function showForm(e) {
    console.log('show form');
    newBookForm.style.display = 'flex';
}

function hideForm(e) {
    newBookForm.style.display = 'none';
}

function displayBooks() {

}

function main() {
    let testBook1 = new Book('Harry Porter', 'Lady Bird',122, false);
    let testBook2 = new Book('The Greatest Book Of All', 'John Doe',6622, true);
    addBookToLibrary(testBook1);
    addBookToLibrary(testBook2);
}

main()