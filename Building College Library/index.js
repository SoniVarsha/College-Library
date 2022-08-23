//Constructor
function Book(serialNo, name, author, type) {
  this.serialNo = serialNo
  this.name = name;
  this.author = author;
  this.type = type;
}

// Display Constructor
function Display() {


}

//Add methods to display Constructor
//Implement the add function
Display.prototype.add = function (book) {
  let tableBody = document.getElementById("tableBody")
  let uiString = `<tr>
                      <td>${book.serialNo}</td>
                       <td>${book.name}</td>
                       <td>${book.author}</td>
                      <td>${book.type}</td>
         </tr>`;
  tableBody.innerHTML += uiString;
}
//Implement the clear function
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm")
  libraryForm.reset()
}

//Implement the validate function
Display.prototype.validate = function (book) {
  if (book.name.length < 1 || book.author.length < 1) {
    return false
}
else {
    return true;
}
}

//Implement the show function
Display.prototype.show = function (type,displayMessage) {
 let msg = document.getElementById("message")

 msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
 <strong>${boldText}:</strong> ${displayMessage}
 <button type="button" class="close" data-dismiss="alert" aria-label="Close">
 <span aria-hidden="true">×</span>
 </button>
</div>`
  

setTimeout(()=>{
   msg.innerHTML = ""
},2000)
}


//Add submit event Listener to libraryForm  
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