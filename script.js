const myLibrary = []

function Book(name, author, pages, status){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(){
    var name = document.getElementById('name').value;
    var author = document.getElementById('author').value;
    var pages = document.getElementById('pages').value;
    var status = document.getElementById('status');
    if(status.checked){
        status = "read";
    }
    else{
        status = "Not read";
    }
    if(name===""||author===""){
        alert("error, fill every formulary");
    }
    else{
        myLibrary.push(new Book(name, author, pages, status));
    }
    listBooks();
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    listBooks(); // Update the list after deleting a book
}

function listBooks(){
    const container = document.getElementById('bookContainer');
    container.innerHTML = ''; // Clear previous content

    for (let i = 0; i < myLibrary.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <h3>${myLibrary[i].name}</h3>
            <p>Author: ${myLibrary[i].author}</p>
            <p>Pages: ${myLibrary[i].pages}</p>
            <p>Status: ${myLibrary[i].status}</p>
            <button class="deleteButton" data-index="${i}">Delete</button>
        `;

        container.appendChild(card);
    }
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteBook(index);
        });
    });
}

document.getElementById('show').addEventListener('click', listBooks);

document.getElementById('submit').addEventListener('click', addBookToLibrary);