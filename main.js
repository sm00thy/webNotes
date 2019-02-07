document.addEventListener('DOMContentLoaded', appStart)
let notes = []

function appStart(){
    const newNoteSubmit = document.querySelector('#newNoteSubmit')
    newNoteSubmit.addEventListener('click', addNewNote)
    notes = JSON.parse(localStorage.getItem('notes')) || []
    notes.forEach(note => {
        addNotesToContainer(note)
    })
}

(function() {
    let drag, onDragStart, onDrag, onDragEnd,
    pointX, pointY, addNoteButton;
    
    onDragStart = function(e) {
        if(e.target.className.indexOf('title') === -1) {
            return;
        }
        drag = this;
        
        let movingNote = drag.getBoundingClientRect();
        pointX = movingNote.left - e.clientX;
        pointY = movingNote.top - e.clientY;
    }
    
    onDrag = function(e) {
        if(!drag) {
            return;
        }
        let posX = e.clientX + pointX, posY = e.clientY + pointY;
        drag.style.transform = "translateX(" + posX +
         "px) translateY(" + posY + "px)";
    };

    onDragEnd = function() {
        drag = null;
        pointX = null;
        pointY = null;
    }
    document.addEventListener('mousemove', onDrag, false);
    document.querySelector('.note').addEventListener('mousedown', onDragStart, false)
    document.addEventListener('mouseup', onDragEnd)
    addNewNote();

    addNoteButton = document.querySelector('#newNoteSubmit');
    addNoteButton.addEventListener('click', addNewNote);
})();
    
function addNewNote() {
    const title = document.createElement('div'),
        content = document.createElement('div'),
        textArea = document.createElement('textarea');
    
    if(title || content){
        const note = new Note(title, content)
        notes.push(note)
        updateLocalStorage()
        addNoteToNotesContainer(note)
    }
}

function addNoteToNotesContainer(note){
    const noteDateTime = new Date(note.id)
    let noteDiv = document.createElement('div')
    noteDiv.classList.add(note)
    noteDiv.innerHTML = `<div class="note-title">${note.title}</div>
    <div class="note-content">${note.content}</div>
    <div class="note-datetime">${noteDateTime.content}</div>`
    const nodesContainer = document.querySelector("body")
    nodesContainer.appendChild(noteDiv)
}

function updateLocalStorage(){
    localStorage.setItem('notes', JSON.stringify(notes))
}

function Note(title = "", content = ""){
    this.title = title;
    this.content = content;
    this.id = Date.now()
}