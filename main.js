document.addEventListener('DOMContentLoaded', appstart)

let notes = []

function appStart(){
    const newNoteSubmit = document.querySelector('#newNoteSubmit')
    newNoteSubmit.addEventListener('click', addNewNote)
}

function addNewNote() {
    const title = document.querySelector('#newNoteName').value
    const content = document.querySelector('#newNoteContent').value
    if(title || content){
        notes.push(note)
        updateLocalStorage()
        addNoteToNotesContainer(note)
    }
}

function addNoteToNotesContainer(note){
    const noteDateTime = new Date(note.id)
    let noteDiv = document.createElement('#note')
    noteDiv.classList.add(note)
    noteDiv.innerHTML = '\
    '
}