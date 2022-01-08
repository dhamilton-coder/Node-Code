const fs = require('fs')
const { title } = require('process')
const chalk = require('chalk')


const getNotes = function() {
    return 'your Notes...'
}

const addNote = function (title, body) {
    const notes = loadNote()
    const dupe = notes.filter(function (note) {
        return note.title === title

    })
   if (dupe.length === 0) {
notes.push({
    title: title,
    body: body
})
saveNotes(notes)
console.log('New Note Added.........')
   }
   else {
       console.log('Note Title Taken')
   }
}


const removeNote = function (title) {
    const notes = loadNote()
    const keep = notes.filter(function (note) {
        return note.title !== title
    })
    if (notes.length > keep.length) {
    saveNotes(keep)
        console.log(chalk.green.inverse('Note Removed!')) }
    else {
        console.log(chalk.red.inverse('No Note Found!'))
    }

    
    }



const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}



const loadNote = function () {

try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
}catch(e) {
    return []
}
    
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}