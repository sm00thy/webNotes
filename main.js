document.addEventListener('DOMContentLoaded', appstart)

const notes = []

function appstart(){
    const newNoteSubmit = document.querySelector('#newNoteSubmit')
    newNoteSubmit.addEventListener('click', addNewNote)
}

function addNewNote() {
    const title = document.querySelector('#newNoteName').value
    const content = document.querySelector('#newNoteContent').value
    if(title || content){
        
    }
}