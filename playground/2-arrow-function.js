//const square  = function (x) {
  //  return x * x
//}

//const square = (x) => {
  //  return x * x
//}

//const square = (x) => x * x



//const res = square(5)
//console.log(res)

const event = {
    name: 'Party',
    GuestList: ['John', 'Johnny', 'Big John'],
    Guests() {
        console.log('')
        console.log(`Guests for ${this.name}:`)
        console.log('')
        this.GuestList.forEach(function (guest) {
            console.log(`${guest} is attending`)
        console.log('')
        }) 

        }
    }



event.Guests()