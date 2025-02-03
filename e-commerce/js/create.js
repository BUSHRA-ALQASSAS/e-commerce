// Select values from inputs


const sendBtn = document.querySelector('#send-btn')
const form = document.querySelector('#form')

form.addEventListener('submit', function (event) {

    const product = {
        title: document.querySelector('[name="title"]').value,
        price: document.querySelector('[name="price"]').value,
        description: document.querySelector('[name="desc"]').value,
        category: document.querySelector('[name="product-category"]').value
    }

    // prevent sending data by form tag (default behavior)
    event.preventDefault()

    console.log(product)

    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
        .then(res => {



            return res.json()
        }

        )
        .then(res => {
            console.log(res)

            // show success message
            document.getElementById('msg').style.display = 'block'

            setTimeout(function () {
                document.getElementById('msg').style.display = 'none'
            }, 2000)

            document.querySelector('#product-form').reset()

        })
})


// send data -- fetch



// Categories fetch

const select = document.querySelector('[name="product-category"]')

fetch('https://dummyjson.com/products/categories')
    .then((res) => res.json())
    .then((categories) => {
        categories.forEach(category => {
            // const option = document.createElement('option')
            
            // option.value = category.slug
            // option.textContent = category.name
        
            // select.appendChild(option)

            const option = `<option value="${category.slug}">${category.name}</option>`
            select.innerHTML += option
        });

    }
)