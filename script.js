const Library=[];
let leido=''
function Book(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.id=crypto.randomUUID()

    this.bookinfo= function(title,author,pages,read){
        if (this.read){
            leido="a été lu"
        }
        else{
            leido="n'a pas été lu"
        }
        return `${this.title}, ecrit par ${this.author}, ${this.pages} pages, ${leido},`

    }
}

/*const libro1 = new Book("Tokio Blues","Haruki Murakami",150,true)
const libro2 = new Book("1984", "George Orwell",230, false )
const libro3 = new Book("Le petit prince", "Antoine de Saint-Exupery", 120, true)*/

function addBookToLibrary(libro){
    Library.push(libro)
}


const container = document.querySelector("#library")
const add = document.querySelector("#add")
add.textContent="+ Add Book"
container.appendChild(add)



function renderBooks(){
    container.innerHTML='';
    container.appendChild(add)

    for (let i=0; i<Library.length; i++){

        const card= document.createElement("div")
        card.classList.add('card')
        container.appendChild(card)
    for (let key in Library[i]){
        if (typeof Library[i][key] !== 'function' && Library[i][key]!==Library[i]['id']){
            if (Library[i][key]==Library[i]['title']){
                const title=document.createElement("h3")
                const del=document.createElement("button")
                del.textContent="Delete"
                del.addEventListener("click",()=>{
                    card.remove()
                })
                title.textContent=Library[i].title
                card.appendChild(title)
                card.appendChild(del)
            }
            else{
            const prop=document.createElement("p")
            prop.textContent=`${key}: ${Library[i][key]}`
            card.appendChild(prop)}}
    }
    }   

}

add.addEventListener("click", () => {

    //Create Form
    const formulario=document.createElement('form')
    formulario.id='nameform'
    formulario.className='formulario-estilo'
    document.body.appendChild(formulario)

    // Name Input
    const inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.id = 'nombre';
    inputNombre.name = 'nombre';
    inputNombre.placeholder = 'Title';
    inputNombre.className='nombre'

    const labelNombre = document.createElement('label');
    labelNombre.htmlFor = 'nombre';

    formulario.appendChild(labelNombre);
    formulario.appendChild(inputNombre);

    // Author Input
    const inputAuthor = document.createElement('input');
    inputAuthor.type = 'text';
    inputAuthor.id = 'author';
    inputAuthor.name = 'author';
    inputAuthor.placeholder = 'Author';
    inputAuthor.className='nombre'

    const labelAuthor = document.createElement('label');
    labelAuthor.htmlFor = 'author';

    formulario.appendChild(labelAuthor);
    formulario.appendChild(inputAuthor);

    // Pages Input

    const inputPages = document.createElement('input');
    inputPages.type = 'number';
    inputPages.id = 'pages';
    inputPages.name = 'pages';
    inputPages.placeholder = 'Pages';
    inputPages.className='nombre'

    const labelPages = document.createElement('label');
    labelPages.htmlFor = 'pages';

    formulario.appendChild(labelPages);
    formulario.appendChild(inputPages);

    // Read Checkbox
    const Checkbox = document.createElement('input');
    Checkbox.type = 'checkbox';
    Checkbox.id = 'read';
    Checkbox.name = 'read';

    const labelRead = document.createElement('label');
    labelRead.htmlFor = 'read';
    labelRead.textContent = 'Read or not';

    formulario.appendChild(labelRead);
    formulario.appendChild(Checkbox);

    //Submit button
    const submit=document.createElement('button');
    submit.textContent='Submit'
    formulario.appendChild(submit)
    submit.className='submit'

    submit.addEventListener("click", ()=>{
       let title=inputNombre.value
       let author=inputAuthor.value
       let pages=inputPages.value
       let read=Checkbox.checked

       const libro = new Book(title,author,pages,read)
       addBookToLibrary(libro)
       formulario.remove()
        renderBooks();
    })

  });


