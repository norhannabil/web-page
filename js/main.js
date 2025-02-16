function navigateToPage(page) {
  if (page === "home") {
    window.location.href = "index.html";
  } else if (page === "products") {
    window.location.href = "products.html";
  } else if (page === "about") {
    window.location.href = "about.html";
  } else if (page === "collection") {
    window.location.href = "collection.html";
  } else if (page === "contact") {
    window.location.href = "contact.html";
  }
  else if (page === "cart"){
    window.location.href = "cart.html";
  }
  else if ( page === "6 months"){
    window.location.href = "6 months.html";
  }
  else if ( page === "12 months"){
    window.location.href = "12 months.html";
  }
  else if ( page === "3 years"){
    window.location.href = "3 years.html";
  }
  else if ( page === "6 years"){
    window.location.href = "6 years.html";
  }
}
/* searchbar */

let searchBtn = document.querySelector("#search-btn")
let searchForm = document.querySelector("#search-form")

function showbar(){
    searchBtn.classList.toggle("fa-times")
    searchForm.classList.toggle("active")
}


/*toggleMenu  */
let toggleMenu = document.querySelector("#toggle-Menu")
let ul = document.querySelector(".header ul")

function show(){
    toggleMenu.classList.toggle("fa-times")
}
    
toggleMenu.addEventListener("click" , ()=>{
   ul.classList.toggle("showData");
   
});

document.addEventListener('click' 
 , function  () {
    if (showData.style.display === 'block'){
      showData.style.display = 'none';
    }
  }
);





fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        handleData(data)
})

let cartItemCount = 0;


const productElements = [];


// Get DOM elements
const productsContainer = document.querySelector("#products-container")
const searchInput = document.querySelector("#search")
const cartCount = document.querySelector("#cart-count")
const filterContainer = document.querySelector("#filter-container")
const checkboxes = document.querySelectorAll('.check');


/*product*/
function handleData(products){
    products.forEach(product => {
        const productElement = createProductElement(product)
        productsContainer.appendChild(productElement)
        productElements.push(productElement)
    })
}

function createProductElement(product){
    const productElement = document.createElement('div')
    productElement.innerHTML = `
        <div class="item bg-gray-100 flex justify-center relative border rounded-xl overflow-hidden cursor-pointer group"
            data-category = "${product.category}"
            data-name = "${product.name}"
        >
        
            <img src="${product.image}" alt="product" class="w-full h-full object-cover">
            <button class="status bg-black absolute bottom-0 left-0 right-0 py-2 translate-y-full group-hover:translate-y-0 transition text-white">
                إضافة إلى السلة
            </button>
        </div>
        <p class="text-xl">${product.name}</p>
        <strong>${product.price}$</strong> 
    `;
    productElement.querySelector('.status').addEventListener('click', updateCart)
    return productElement;
};


/*updatecart*/
function updateCart(e){
    const btn = e.target;
    if (btn.classList.contains('added')) {
        btn.classList.remove('added')
        btn.classList.add('bg-gray-800')
        btn.classList.remove('bg-red-600')
        btn.innerText = 'إضافة إلى السلة'
        cartItemCount--;
    } else {
        btn.classList.add('added')
        btn.classList.remove('bg-gray-800')
        btn.classList.add('bg-red-600')
        btn.innerText = 'حذف من السلة'
        cartItemCount++;
    }
    cartCount.innerText = cartItemCount;
}

/*fillter*/
filterContainer.addEventListener("change", filterProducts);
searchInput.addEventListener("input", filterProducts);

function filterProducts() {
    const searchTerm = searchInput.value;
    const selectednames = Array.from(checkboxes)
        .filter((check) => check.checked)
        .map((check) => check.id);
    
    productElements.forEach((el) => {
        const name = el.firstElementChild.dataset.name;
        const nameFilter =
            selectednames.length === 0 || selectednames.includes(name);
        
        const isSearchTerm = el.firstElementChild.dataset.name.includes(searchTerm)

        console.log(isSearchTerm);
        
    
        if (isSearchTerm && nameFilter) {
            el.classList.remove("hidden");
         } else {
            el.classList.add("hidden");
        }
  });
}
//-----------------------------------------------------


