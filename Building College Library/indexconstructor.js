class Book {
    constructor(serialNo, name, author, type) {
        this.serialNo = serialNo
        this.name = name;
        this.author = author;
        this.type = type;
    }
}


// create a class library and implement the following:
// constructor must take the book list as an argument
// getBookList()
// issueBook(bookname, user)
// returnBook(bookname)
class Library{
    constructor(bookList){
        this.bookList = bookList;
        this.issuedBooks = {}
    }

    getBookList(){
        this.bookList.array.forEach(element => {
            console.log(element)
        });
    }


    issueBook(bookname, user){
        if (this.issuedBooks[bookname] ==undefined){
        this.issuedBooks[bookname] =  user;
        }
        else{
            console.log("This book is already issued!");
        }
    }

    returnBook(bookname){
     delete this.issuedBooks[bookname]
    }
}

class Display {
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
        <td>${book.serialNo}</td>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm")
libraryForm.addEventListener("submit", onSubmitHandler)

function onSubmitHandler(e) {

  let name = document.getElementById("bookName").value
  let serialNo = document.getElementById("index").value
  let author = document.getElementById("author").value

  let type;
  let fiction = document.getElementById('fiction');
  let programming = document.getElementById('programming');
  let cooking = document.getElementById('cooking');

  if (fiction.checked) {
    type = fiction.value;
  }
  else if (programming.checked) {
    type = programming.value;
  }
  else if (cooking.checked) {
    type = cooking.value;
  }



  let book = new Book(serialNo, name, author, type)
  console.log(book)
  e.preventDefault()

  let display = new Display()
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show('success', 'Your book has been successfully added')
  }
  else {
    // Show error to the user
    display.show('danger', 'Sorry you cannot add this book');
  }
}