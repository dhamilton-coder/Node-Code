const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')






//yargs: version of app
yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'adds a title',
            demandOption: true,
            type: 'string',

        body: { 
            describe:'Note body',
            demandOption: true,
            type: 'string'
        }
        }
    },
    handler: function(argv) {
     notes.addNote(argv.title, argv.body)
    }
})


yargs.command({
    command: 'remove',
    describe: 'removes a note',
    handler: function(argv){
        notes.removeNote(argv.title)
    }
    
})

yargs.command({
    command: 'read',
    describe: 'reads notes',
    handler: function(){
        console.log('Reading..')
    }    
})

yargs.command({
    command:'list',
    describe:'lists Notes',
    handler: function() { 
        console.log('listing..')
    }
})


console.log(process.argv)
console.log(yargs.argv)



