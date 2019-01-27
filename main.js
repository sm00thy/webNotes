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

function addNewNote() {
    const title = document.querySelector('#newNoteName').value
    const content = document.querySelector('#newNoteContent').value
    if(title || content){
        const note = new note(title, content)
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
    const nodesContainer = document.querySelector("#notesContainer")
    nodesContainer.appendChild(noteDiv)
}

function updateLocalStorage(){
    localStorage.setItem('notes', JSON.stringify(notes))
}

class note {
    constructor(title = '', content = '') {
        this.title = title;
        this.content = content;
        this.id = Date.now();
    }
}
