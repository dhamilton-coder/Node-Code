setTimeout(() => {
    console.log('2 seconds!')

}, 2000);

const names = ['David', 'Andrew', 'Micheal', 'Leo', 'John']

const shortNames = names.filter( function (name) {
        console.log(name.length <= 4)
    })

    const geocode = (address, callback) => {
         setTimeout(() => {
        
            const data = {
                latitude: 0,
                longitude: 0,
            }

                callback(data)
        }, 2000);
        
    }

    geocode('Los Angeles', (data) => {
        console.log(data)
    })