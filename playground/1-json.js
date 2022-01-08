const fs = require('fs')


//const book = {
  //  title: 'Book1',
    //autor: 'author1'
//}

//const bookJSON = JSON.stringify(book)

//fs.writeFileSync('1-json.json', bookJSON)


const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const DataParsed = JSON.parse(dataJSON)
console.log(DataParsed.title)