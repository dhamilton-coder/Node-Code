console.log('Client side Javascript File is Loaded!!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageA = document.querySelector('#mA')
const messageB = document.querySelector('#mB')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const loca = search.value

    fetch('/weather?address=' + loca).then((response) => {
        response.json().then((data) => {
           if (data.error) {
            messageA.textContent = 'Error'
            messageB.textContent = data.error
           }else {
            messageA.textContent = data.location
            messageB.textContent = data.forecast
            
           }
        })
})



   
})





