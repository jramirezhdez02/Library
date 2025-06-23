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

const libro1 = new Book("Tokio Blues","Haruki Murakami",150,true)
const libro2 = new Book("1984", "George Orwell",230, false )
function addBookToLibrary(){
    Library.push(libro1)
    Library.push(libro2)

}
addBookToLibrary()
console.log(Library[1].bookinfo())

const container = document.querySelector("#library")


for (let i=0; i<2; i++){

    const card= document.createElement("div")
    card.classList.add('card')
    container.appendChild(card)
for (let key in Library[i]){
    if (typeof Library[i][key] !== 'function' && Library[i][key]!==Library[i]['id']){
        if (Library[i][key]==Library[i]['title']){
            const title=document.createElement("h3")
            title.textContent=Library[i].title
            card.appendChild(title)
        }
        else{
        const prop=document.createElement("p")
        prop.textContent=`${key}: ${Library[i][key]}`
        card.appendChild(prop)}}
}
}
