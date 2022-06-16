//Object property shorthand
const name = 'David'
const userAge = '13'

const user = {
    name,
    Age: userAge,
    location: 'Bandon'
}

console.log(user)

//Object destructuring

const product = {
    label: 'red_Notebook',
    price: 3,
    stock: 205,
    salePrice: undefined
}

// const label = product.label
// const price = product.price

// const {label:productLabel, stock, rating = 5} = product
// console.log(productLabel)
// console.log(stock)
// console.log(rating)

const transaction = function(type, { label, stock = 0} = {}) {
    console.log(type, label, stock)
}

transaction('order', product)