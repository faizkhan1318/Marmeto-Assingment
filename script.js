
const title = document.getElementById("title");
const vendor = document.getElementById("vendor")
const price = document.getElementById("price");
const strikedPrice = document.getElementById("striked-price");
const colours = document.getElementById("colours");
const size = document.getElementById("size");
const thumbnailImages = document.getElementById("thumbnail-images");
const description = document.getElementById("description");
let product = {};

const images = [
    "assets/Rectangle 8.png",
    "assets/Rectangle 5.png",
    "assets/Rectangle 6.png",
    "assets/Rectangle 7.png"
]

// fetchdata
async function fetchData() {

    let response = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448");
    response = await response.json();
    // console.log(response);
    let colourValues = response.product.options[0].values;
    let sizeValues = response.product.options[1].values;
    // let images = response.product.images;

    vendor.innerHTML = `<p>${response.product.vendor}</p>`
    title.innerHTML = `<p>${response.product.title}</p>`
    price.innerHTML = `${response.product.price}`
    strikedPrice.innerHTML = `<strike>${response.product.compare_at_price}</strike>`

    let col = ["Yellow", "Green", "Blue", "Pink"];
    let index = 0;
    for (let values of colourValues) {
        //   console.log(Object.keys(values)[0])
        let elem = document.createElement('div');
        elem.id = Object.keys(values)[0] + "";
        elem.classList.add("colors")
        elem.style.width = "50px";
        elem.style.height = "50px";
        elem.style.marginRight = "15px";
        elem.style.backgroundColor = colourValues[index][col[index]];
        index++;
        colours.appendChild(elem)
    }

    description.innerHTML = response.product.description;

    thumbnailImages.innerHTML = ""

    images.forEach(image => {
        const img = document.createElement("img");
        img.src = image;
        img.className = image;
        img.style.width = "90px"
        img.style.height = "90px"
        img.addEventListener("click", () => {
            document.querySelector("#product-image > img").src = img.src;
        })
        thumbnailImages.appendChild(img);
    })
}
fetchData();


//cart button

const addToCart = document.getElementById("addToCartBtn");

let selectedSize;
let selectedColor;

addToCart.addEventListener("click", (e) => {
    console.log("i am in")
    let sizeInput = document.getElementsByClassName("chooseSize");
    for (let inputs of sizeInput) {

        if (inputs.checked) {
            selectedSize = inputs.value;

        }
    }
    if (selectedSize && selectedColor) {
        console.log(selectedSize)
        const message = document.getElementById("message");
        message.innerHTML = `Embrace Sideboard with Color ${selectedColor} and Size ${selectedSize} added to cart`;
        if (message.classList.contains("displayNone")) {
            message.classList.remove("displayNone");
        }
        message.classList.add("displayBlock");
    }
})

//color selection
document.addEventListener("click", (e) => {
    let colourss = e.target.id;
    console.log(colourss)
    switch (colourss) {
        case "Yellow":
            clearBorder()
            let yellowColor = document.getElementById("Yellow");
            yellowColor.classList.add("border")
            selectedColor = "Yellow"
            return;
        case "Green":
            clearBorder()
            let greenColor = document.getElementById("Green");
            greenColor.classList.add("border")
            selectedColor = "Green"
            return;
        case "Blue":
            clearBorder()
            let blueColor = document.getElementById("Blue");
            blueColor.classList.add("border")
            selectedColor = "Blue"
            return;
        case "Pink":
            clearBorder()
            let pinkColor = document.getElementById("Pink");
            pinkColor.classList.add("border")
            selectedColor = "Pink"
            return;
        default:
            return
    }
    
})

function clearBorder(){
    let colors = document.getElementsByClassName("colors");
    for(let color of colors){
        if(color.classList.contains("border")){
            color.classList.remove("border");
        }
    }
}

// Quantity
let decreaseBtn = document.getElementById("decrementBtn")
let quantity = document.getElementById("countValue").innerText;
let quantitySpan = document.getElementById("countValue");
let increaseBtn = document.getElementById("incrementBtn");

increaseBtn.addEventListener("click", ()=>{
    quantity = parseInt(quantity) + 1;
    console.log(quantity)
    quantitySpan.innerHTML = `${quantity}`;
})

decreaseBtn.addEventListener("click", ()=>{
    
    if(quantity > 1){
        quantity = parseInt(quantity) - 1;
        quantitySpan.innerHTML = `${quantity}`;
    }
    
})

// Calculate discount
function calculateDiscountPercentage(price, comparePrice) {
    const discount = ((comparePrice - price) / comparePrice) * 100;
    return Math.round(discount);
}
