//Hacer que el boton del elimine el elemento del array, retocar detalles visuales y de flex

const Library=[];
let leido=''
function Book(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.id=crypto.randomUUID()
}

/*const libro1 = new Book("Tokio Blues","Haruki Murakami",150,true)
const libro2 = new Book("1984", "George Orwell",230, false )
const libro3 = new Book("Le petit prince", "Antoine de Saint-Exupery", 120, true)*/

function addBookToLibrary(libro){
    Library.push(libro)
}
function crearToggle(status,bookId) {
    // Crear contenedor principal
    const toggleContainer = document.createElement('div');
    toggleContainer.style.margin = '20px';
    toggleContainer.style.display = 'flex';
    toggleContainer.style.alignItems = 'center';
    toggleContainer.style.gap = '10px';
    
    // Crear el interruptor (toggle)
    const toggleSwitch = document.createElement('div');
    toggleSwitch.style.width = '60px';
    toggleSwitch.style.height = '30px';
    toggleSwitch.style.backgroundColor = '#ccc';
    toggleSwitch.style.borderRadius = '15px';
    toggleSwitch.style.position = 'relative';
    toggleSwitch.style.cursor = 'pointer';
    toggleSwitch.style.transition = 'background-color 0.3s';
    
    // Crear el círculo deslizante
    const toggleSlider = document.createElement('div');
    toggleSlider.style.width = '26px';
    toggleSlider.style.height = '26px';
    toggleSlider.style.backgroundColor = 'white';
    toggleSlider.style.borderRadius = '50%';
    toggleSlider.style.position = 'absolute';
    toggleSlider.style.top = '2px';
    toggleSlider.style.left = '2px';
    toggleSlider.style.transition = 'transform 0.3s';
    
    // Crear etiqueta de texto
    const toggleLabel = document.createElement('span');
    toggleLabel.textContent = 'reading status';
    toggleLabel.style.fontFamily = 'Arial, sans-serif';
    
    // Añadir elementos al contenedor
    toggleSwitch.appendChild(toggleSlider);
    toggleContainer.appendChild(toggleSwitch);
    toggleContainer.appendChild(toggleLabel);

    // Estado del toggle
    let isOn = status === 'read';
    
    // Función para actualizar el estado visual
    function updateToggle() {
        if (isOn) {
            toggleSwitch.style.backgroundColor = '#4CAF50';
            toggleSlider.style.transform = 'translateX(30px)';
            toggleLabel.textContent = 'read';
        } else {
            toggleSwitch.style.backgroundColor = '#ccc';
            toggleSlider.style.transform = 'translateX(0)';
            toggleLabel.textContent = 'not read';
        }
    }
    
    // Evento click
    toggleSwitch.addEventListener('click', function() {
        isOn = !isOn;
        updateToggle();

        // Actualizar el estado en el libro correspondiente
        const bookIndex = Library.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            Library[bookIndex].read = isOn;
        }

        console.log('Toggle state:', isOn);
    });
    
    // Inicializar
    updateToggle();
    
    return toggleContainer; // Devuelve el contenedor en lugar de añadirlo al body
}

const container = document.querySelector("#library")
const add = document.querySelector("#add")
add.textContent="+ Add Book"
container.appendChild(add)

function renderBooks() {
    container.innerHTML = '';
    container.appendChild(add);

    for (let i = 0; i < Library.length; i++) {
        const card = document.createElement("div");
        card.classList.add('card');
        container.appendChild(card);

        for (let key in Library[i]) {
            if (typeof Library[i][key] !== 'function' && key !== 'id') { 
                if (key === 'title') {
                    const title = document.createElement("h3");
                    title.textContent = Library[i].title;
                    card.appendChild(title);}
                else if(key === 'read'){

                    const toggle = crearToggle(
                        Library[i][key] ? 'read' : 'not read',
                        Library[i].id );
                    
                    
                    card.appendChild(toggle);
                }
                else{
                    const prop = document.createElement("p");
                    prop.textContent = `${key}: ${Library[i][key]}`;
                    card.appendChild(prop);
                }
            }
        }

        const del = document.createElement("button");
        del.textContent = "Delete";
        del.addEventListener("click", () => {

            const bookId = Library[i].id;
            const bookIndex = Library.findIndex(book => book.id === bookId);
            
            if (bookIndex !== -1) {
                Library.splice(bookIndex, 1);
            }
            
            card.remove();
            console.table(Library)

        });
        card.appendChild(del);
    }
}
add.addEventListener("click", () => {

    console.log(Library.length)


    
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
    inputPages.min = '1';

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

    submit.addEventListener("click", (e)=>{
       e.preventDefault();
       let title=inputNombre.value
       let author=inputAuthor.value
       let pages=inputPages.value
       let read=Checkbox.checked

       if (!title) {
        alert("Por favor ingresa el título del libro");
        inputNombre.focus();
        return;
    }
    
    if (!author) {
        alert("Por favor ingresa el autor del libro");
        inputAuthor.focus();
        return;
    }
    
     if (!pages) {
        alert("Por favor ingresa el número de páginas");
        inputPages.focus();
        return;
    }

       const libro = new Book(title,author,pages,read)
       addBookToLibrary(libro)
       formulario.remove()
       console.table(Library)
       renderBooks();
    })

  });


