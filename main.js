document.addEventListener('DOMContentLoaded', appStart)
let notes = []

function appStart(){
    addNewNote();
    const newNoteSubmit = document.querySelector('#newNoteSubmit')
    newNoteSubmit.addEventListener('click', addNewNote)
    notes = JSON.parse(localStorage.getItem('notes')) || []
    notes.forEach(note => {
        addNotesToContainer(note)
        console.log(localStorage.key(0));
    })
}

let drag, pointX, pointY;

function onDragStart(e) {
    if(e.target.className.indexOf('dateArea') === -1) {
        return;
    }
    drag = this;
    
    let movingNote = drag.getBoundingClientRect();
    pointX = movingNote.left - e.clientX;
    pointY = movingNote.top - e.clientY;
}

function onDrag(e) {
    if(!drag) {
        return;
    }
    let posX = e.clientX + pointX, posY = e.clientY + pointY;
    drag.style.transform = "translateX(" + posX +
    "px) translateY(" + posY + "px)";
};

function onDragEnd() {
    drag = null;
    pointX = null;
    pointY = null;
}

document.addEventListener('mousemove', onDrag, false);
document.addEventListener('mouseup', onDragEnd, false);

function addNewNote() {
    const area = document.createElement('div'),
        bar = document.createElement('div'),
        title = document.createElement('div'),
        changeColorButton = document.createElement('button'),
        textArea = document.createElement('textarea');

    title.setAttribute('contenteditable', "true");

    let note = new Note(area, bar, title, textArea, changeColorButton);
    notes.push(note)
//    updateLocalStorage()

    addNotesToContainer(note);
    note.bar.addEventListener('mousedown', onDragStart);
    note.area.addEventListener('mousedown', onDragStart);
}

function addNotesToContainer(note){
    const dateArea = document.createElement('div');
    dateArea.classList.add('dateArea');
    dateArea.innerHTML = noteDate(note.id);

    note.area.classList.add('note');
    note.bar.classList.add('title');
    note.changeColorButton.classList.add('changeColorBtn');
    note.bar.appendChild(note.title);
    note.area.appendChild(note.bar);
    note.area.appendChild(note.changeColorButton);
    note.area.appendChild(note.textArea);
    document.body.appendChild(note.area);

    note.bar.innerHTML = '<div class="dateArea">' +
     noteDate(note.id) + '</div><div class="editableBar" contenteditable="true"'+
     'placeholder="Title"></div>';
}

function noteDate(noteId) {
    const date = new Date(noteId);
    const noteDateTime = date.getHours() + ":" +
     date.getMinutes() + " " + date.getDate() +
     "/" + date.getMonth() + "/" + date.getFullYear();

    return noteDateTime;
}

function updateLocalStorage(){
    localStorage.setItem('notes', JSON.stringify(notes));
}

function Note(area, bar, title, textArea, changeColorButton){
    this.area = area;
    this.bar = bar;
    this.title = title;
    this.changeColorButton = changeColorButton;
    this.textArea = textArea;
    this.id = Date.now();
}