// ---------
// Get Product Details
// ---------


function getIdFromUrl(url) {
  return url.split('id=')[1]; // http://127.0.0.1:5500/list.html?id=1
}


const targetId = getIdFromUrl(window.location.href); // http://local.com?id=4


fetch('https://dummyjson.com/products/1')
.then(res => res.json()).then((res) => {
  console.log(res)

  const productObj = res

  createProductHtml(productObj)

})

console.log(targetId)

const product = document.querySelector('#product-details');
function createProductHtml(productObj) {
  const productTitle = `<h1 class="title">${productObj.title}</h1>`;
  product.innerHTML = productTitle;
  const tags = document.createElement('div');
  tags.classList.add('tags');
  const tag = document.createElement('div')
  tag.textContent = productObj.category;
  tags.appendChild(tag)

  product.appendChild(tags);

  // Price
  const productPrice = document.createElement('p'); // Node
  productPrice.classList.add('subtitle', 'mt-3');

  const productPriceContent = document.createElement('strong');
  productPriceContent.textContent = `$${productObj.price}`;

  productPrice.appendChild(productPriceContent);
  product.appendChild(productPrice);

  const productDetails = document.createElement('p');
  productDetails.textContent = productObj.description;
  productDetails.classList.add('content');

  product.appendChild(productDetails);

  // Products Images Section
  const productImages = document.querySelector('#product-images');

  const mainFigure = document.createElement('figure');
  mainFigure.classList.add('image', 'is-3by2');
  const mainImg = document.createElement('img');
  mainImg.src = productObj.images[0];
  mainImg.setAttribute('alt', `${productObj.title} image`);

  mainFigure.appendChild(mainImg);
  productImages.appendChild(mainFigure);

  const gallery = document.createElement('div');
  gallery.classList.add('columns', 'is-mobile', 'mt-2');

  //https://placehold.co/64x64
  productObj.images.forEach((item) => {
    const galleryImageContent = `<div class="column is-one-fifth">
                           <figure class="image is-64x64">
                               <img name="galleryImg" src="${item}" alt="Thumbnail">
                           </figure>
                       </div>`;

    gallery.innerHTML += galleryImageContent;
  });

  productImages.appendChild(gallery);

  const galleryImages = document.querySelectorAll('[name="galleryImg"]');

  galleryImages.forEach((item) => {
    item.addEventListener('click', (event) => {
      galleryImages.forEach((img) => (img.style.border = 'unset'));
      item.style.border = '2px solid black';

      mainImg.src = event.target.src;
    });

    item.style.border = 'unset';
  });
}
