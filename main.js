document.addEventListener('DOMContentLoaded', appStart)
let notes = []
//after page padge load, on start
function appStart(){
    addNewNote();
    const newNoteSubmit = document.querySelector('#newNoteSubmit')
    newNoteSubmit.addEventListener('click', addNewNote)
    notes = JSON.parse(localStorage.getItem('notes')) || []
    getNotesFromStorage(notes);
}
//get notes from storage
function getNotesFromStorage(notes)
{
    notes.forEach(note => {
        addNotesToContainer(note)
        console.log(localStorage.key(0));
    });
}

let drag, pointX, pointY;
//move notes when mouse down
function onDragStart(e) {
    if(e.target.className.indexOf('dateArea') === -1) {
        return;
    }
    drag = this;
    
    let movingNote = drag.getBoundingClientRect();
    pointX = movingNote.left - e.clientX;
    pointY = movingNote.top - e.clientY;
}
//while is moving
function onDrag(e) {
    if(!drag) {
        return;
    }
    let posX = e.clientX + pointX, posY = e.clientY + pointY;
    drag.style.transform = "translateX(" + posX +
    "px) translateY(" + posY + "px)";
};

//when release the button
function onDragEnd() {
    drag = null;
    pointX = null;
    pointY = null;
}

document.addEventListener('mousemove', onDrag, false);
document.addEventListener('mouseup', onDragEnd, false);

//create new note and push it to local storage
function addNewNote() {
    let area = document.createElement('div'),
        bar = document.createElement('div'),
        title = document.createElement('div'),
        changeColorButton = document.createElement('button'),
        textArea = document.createElement('textarea');

        note = new Note(area, bar, title, textArea, changeColorButton);
        notes.push(note)
 //       updateLocalStorage()

        title.setAttribute('contenteditable', "true");

        addNotesToContainer(note);
        note.bar.addEventListener('mousedown', onDragStart);
        note.area.addEventListener('mousedown', onDragStart);
    }
    
// function getNoteToSaveLocal(note){
//         let textContent = note.querySelector('textarea')
// }

//fill note with data and create appearance
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
//date on creation time
function noteDate(noteId) {
    const date = new Date(noteId);
    const noteDateTime = date.getHours() + ":" +
     date.getMinutes() + " " + date.getDate() +
     "/" + date.getMonth() + "/" + date.getFullYear();

    return noteDateTime;
}

function updateLocalStorage(){
    localStorage.setItem('notes', JSON.stringify(note));
}

//note constructor
function Note(area, bar, title, textArea, changeColorButton){
    this.area = area;
    this.bar = bar;
    this.title = title;
    this.changeColorButton = changeColorButton;
    this.textArea = textArea;
    this.id = Date.now();
}