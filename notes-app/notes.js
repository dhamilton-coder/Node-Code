const fs = require('fs')
const { title } = require('process')
const chalk = require('chalk')


const getNotes = function() {
    return 'your Notes...'
}

const addNote = function (title, body) {
    const notes = loadNote()
    const dupe = notes.find((note) => note.title === title) 
       
    if (!dupe) {
notes.push({
    title: title,
    body: body
})
saveNotes(notes)
console.log(chalk.blue.inverse('New Note Added...'))
   }
   else {
       console.log(chalk.yellow.inverse('Note Title Taken'))
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


const listNote = function () {
    const notes = loadNote()
    if (notes.length === 0) {
        console.log(chalk.inverse.red('You have no notes!'))
    } else 
    console.log(chalk.inverse.white('Your Notes...'))
    notes.forEach(function (note)   {
        console.log(chalk.blue(note.title))
    })
}


const readNote = function(title, body) {
    const notes = loadNote()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse.white(note.title))
        console.log(note.body)
        
     } else { 
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
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}