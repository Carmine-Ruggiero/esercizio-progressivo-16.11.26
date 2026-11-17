// 1. Seleziono gli elementi del DOM
const formLibro = document.getElementById('form-libro');
const inputTitolo = document.getElementById('titolo');
const inputAutore = document.getElementById('autore');
const inputAnno = document.getElementById('anno');
const selectFormato = document.getElementById('formato');

const listaLibri = document.getElementById('lista-libri');
const contatore = document.getElementById('contatore');
const btnSvuotaTutto = document.getElementById('svuota-tutto');

let libri = JSON.parse(localStorage.getItem('libri')) || [];

// Funzione per salvare nel localStorage e aggiornare la grafica
function salvaEAggiorna() {
    localStorage.setItem('libri', JSON.stringify(libri));
    renderLibri();
}

// 3. Funzione per disegnare i libri nella pagina
function renderLibri() {
    listaLibri.innerHTML = '';
    contatore.textContent = libri.length;

    libri.forEach((libro) => {
        const card = document.createElement('div');
        card.className = 'card shadow-sm';

        // Stile diverso se il libro è già stato letto
        const stileTitolo = libro.letto ? 'text-decoration-line-through text-muted' : '';
        const testoBottoneLetto = libro.letto ? 'Segna come non letto' : 'Segna come letto';
        const classeBottoneLetto = libro.letto ? 'btn-outline-secondary' : 'btn-outline-success';

        card.innerHTML = `
            <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title mb-1 ${stileTitolo}">${libro.titolo}</h5>
                    <p class="card-text text-muted small mb-0">
                        ${libro.autore} · ${libro.anno} · <span class="text-capitalize">${libro.formato}</span>
                    </p>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm ${classeBottoneLetto}" onclick="toggleLetto('${libro.id}')">
                        ${testoBottoneLetto}
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminaLibro('${libro.id}')">
                        Elimina
                    </button>
                </div>
            </div>
        `;

        listaLibri.appendChild(card);
    });
}

// 4. Aggiunta di un nuovo libro dal form
formLibro.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita il ricaricamento della pagina

    const nuovoLibro = {
        id: crypto.randomUUID(), // Genera un ID unico come nello screenshot
        titolo: inputTitolo.value.trim(),
        autore: inputAutore.value.trim(),
        anno: inputAnno.value,
        formato: selectFormato.value,
        letto: false
    };

    libri.push(nuovoLibro);
    salvaEAggiorna();
    formLibro.reset(); // Pulisce i campi del form
});

// 5. Funzioni globali per i pulsanti delle card
window.toggleLetto = function(id) {
    libri = libri.map((libro) => {
        if (libro.id === id) {
            return { ...libro, letto: !libro.letto };
        }
        return libro;
    });
    salvaEAggiorna();
};

window.eliminaLibro = function(id) {
    libri = libri.filter((libro) => libro.id !== id);
    salvaEAggiorna();
};

// 6. Pulsante "Svuota tutto"
if (btnSvuotaTutto) {
    btnSvuotaTutto.addEventListener('click', () => {
        libri = [];
        salvaEAggiorna();
    });
}

// Mostro i libri appena si apre la pagina
renderLibri();




/*class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
	
    }

    displayProduct() {
        console.log(`Product: ${this.name}`);
        console.log(`Price: $${this.price.toFixed(2)}`);
    }

    calculateTotal(salesTax) {
        return this.price + (this.price * salesTax);
    }
}

const salesTax = 0.05;

const product1 = new Product('Shirt', 19.90);
const product2 = new Product('Trousers', 29.90);
const product3 = new Product('Underwear', 39.90);

product2.displayProduct();
const total = product2.calculateTotal(salesTax);
console.log(`Total price (with taxes): $${total.toFixed(2)}`);

















/*const studentList = document.querySelector('#studentList');
const registerForm = document.querySelector('form');
const newName = document.querySelector('#newName');
const newSurname = document.querySelector('#newSurname');
const newAge = document.querySelector('#newAge');
const newFrequency = document.querySelector('#newFrequency');

const newStudents = [];

class Student {
	#id; // INCAPSULAMENTO: La variabile esiste ESCLUSIVAMENTE all'interno della classe, può essere definita e letta ESCLUSIVAMENTE dentro la classe (vedi this.#id a riga 27)
	constructor(_studentName, _studentSurname, _studentAge, _frequency) {
		this.#id = crypto.randomUUID();
		this.studentName = _studentName;
		this.studentSurname = _studentSurname;
		this.studentAge = _studentAge;
		if (_frequency === 'true') {
			this.frequency = true;
		} else {
			this.frequency = false;
		}
	}

	printStudent() {
		const isFrequency = this.frequency ? 'Sì' : 'No';
		const newLi = document.createElement('li');
		newLi.textContent += `Student ${ this.studentName } ${ this.studentSurname } di anni ${ this.studentAge }, frequentante: ${ isFrequency }, ID studente: ${ this.#id }`;
		studentList.appendChild(newLi);
	}
}

registerForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const newStudent = new Student(
		newName.value,
		newSurname.value,
		newAge.value,
		newFrequency.value,
	);
	console.log(newStudent);
	newStudent.printStudent();
	newStudents.push(newStudent);
	registerForm.reset();
	console.log(newStudents);
});

class Person {
	personNumber = 0;
	constructor(_name, _surname) {
		this.name = _name;
		this.surname = _surname;
	}

	regards() {
		this.personNumber++;
		return `Ciao, sono ${ this.name } ${ this.surname } e sono l'iscritto numero ${this.personNumber}`;
	}
}

const newPerson = new Person('Paolino', 'Paperino');
console.log(newPerson.regards());

newPerson.name = 'Mario';
console.log(newPerson.regards());

const otherPerson = new Person('Aldo', 'Bianchi');
console.log(newPerson.regards());
console.log(otherPerson.regards());

console.log(newPerson);
console.log(Person);

class Book {
	// superclasse per classi che ereditano gli stessi proprietà e metodi
	constructor(_title, _author) {
		this.title = _title;
		this.author = _author;
	}

	printBook() {
		console.log(`${this.title} di ${this.author}`);
	}
}

class BookFormat extends Book {
	// EREDITARIETÀ: Sottoclasse che aggiunge proprietà singole alle proprietà EREDITATE dalla superclasse
	constructor(_title, _author, _format) {
		super(_title, _author);
		this.format = _format;
	}

	printBook() {
		// POLIMORFISMO: una sottoclasse può modificare il metodo presente nella superclasse
		console.log(
			`Il libro ${this.title} di ${this.author} è in formato ${this.format}`,
		);
	}
}

const newBook = new Book('Il nome della rosa', 'Umberto Eco');
newBook.printBook();

const otherBook = new BookFormat('Novecento', 'Alessandro Baricco', 'digitale');
otherBook.printBook();

class Music {
	// Superclasse che servirà SOLO da modello
	constructor(_title, _author, _year) {
		this.title = _title;
		this.author = _author;
		this.year = _year;
	}

	print() {
		return `Il disco ${this.title} di ${this.author} del ${this.year}`;
	}
}

class Vynil extends Music {
	constructor(_title, _author, _year, _length) {
		super(_title, _author, _year);
		this.length = _length;
	}

	print() {
		return (
			super.print() + ` è in formato vinile di grandezza ${this.length}"`
		);
	}
}

class CompactDisc extends Music {
	constructor(_title, _author, _year, _format) {
		super(_title, _author, _year);
		this.format = _format;
	}

	print() {
		return super.print() + ` è in formato CD ${this.format}`;
	}
}

class Digital extends Music {
	constructor(_title, _author, _year, _format, _dimension) {
		super(_title, _author, _year);
		this.format = _format;
		this.dimension = _dimension;
	}
	print() {
		return (
			super.print() +
			` è in formato digitale ${this.format} di dimensioni ${this.dimension}`
		);
	}
}

const myVynil1 = new Vynil('The Wall', 'Pink Floyd', 1978, '33');
console.log(myVynil1.print());

const myCD1 = new CompactDisc('AfterMath', 'Rolling Stones', 1967, 'SACD');
console.log(myCD1.print());

const myDigital1 = new Digital(
	'Space Cowboy',
	'Jamiroquai',
	1997,
	'FLAC',
	'240MB',
);
console.log(myDigital1.print()); */


