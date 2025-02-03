
let products = [];

fetch('https://dummyjson.com/products?limit=10&skip=10').then(res => res.json()).then((res) => {
  products = res.products
  console.log(res);
  createProductsHtml(products)

  if (products.length == 0) {
    document.querySelector('#empty-msg').style.display = 'block'
  }

}).catch(error => {

})

function createProductsHtml(arr) {
  const container = document.querySelector('#products-container');
  container.innerHTML = '';

  for (const product of arr) {
    container.innerHTML += `<div class="column is-one-quarter">
                <div class="card">
                    ${product.shippingInformation}
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img src="${product.images[0]}" alt="Product Image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <p class="title is-5"><a href="/details.html?id=${product.id}">${product.title}</a></p>
                        <p class="subtitle is-6">${product.price}</p>
                        <span class="tag is-success">${product.availabilityStatus}</span>
                        <button class="button is-primary is-fullwidth mt-3">Add to Cart</button>
                    </div>
                </div>
            </div>`;
  }
}

// Filter Products
const searchBtn = document.querySelector('#btn');
const searchText = document.querySelector('[name="search"]');

searchBtn.addEventListener('click', filterProducts);

function filterProducts() {
  let filteredProducts = [];

  fetch(`https://dummyjson.com/products/search?q=${searchText.value}`)
    .then(res => res.json()).then(res => {

      filteredProducts = res.products

      createProductsHtml(filteredProducts)
    })

}
