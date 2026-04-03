/* LOAD PRODUCTS */
let products = JSON.parse(localStorage.getItem("products")) || [
{name:"Watch",price:5000,img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30",stock:true},
{name:"Shoes",price:3000,img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff",stock:true}
];

let cart=[];

/* SAVE */
function saveProducts(){
localStorage.setItem("products", JSON.stringify(products));
}

/* RENDER PRODUCTS */
function render(){
let html="";

products.forEach((p,i)=>{
const inCart = cart.find(item=>item.name===p.name);

html+=`
<div class="card">
<img src="${p.img}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>

${
p.stock
? `<button onclick="add(${i},this)" ${inCart?'disabled':''} class="${inCart?'added':''}">
${inCart?'Added':'Add to Cart'}
</button>`
: `<button class="added" disabled>Out of Stock</button>`
}

</div>`;
});

document.getElementById("products").innerHTML=html;
}

/* ADD TO CART */
function add(i,btn){
cart.push(products[i]);
btn.innerText="Added";
btn.classList.add("added");
btn.disabled=true;
update();
}

/* UPDATE COUNT */
function update(){
document.getElementById("count").innerText=cart.length;
}

/* CART */
function openCart(){
document.getElementById("cartModal").style.display="block";
renderCart();
}

function renderCart(){
let html="";
let total=0;

cart.forEach((item,i)=>{
total+=item.price;

html+=`
${item.name} ₹${item.price}
<button onclick="removeItem(${i})">X</button><br>`;
});

document.getElementById("cartItems").innerHTML=html;
document.getElementById("total").innerText=total;
}

/* REMOVE */
function removeItem(i){
cart.splice(i,1);
renderCart();
render();
update();
}

/* CHECKOUT */
function goCheckout(){
document.getElementById("cartModal").style.display="none";
document.getElementById("checkoutModal").style.display="block";
}

function backCart(){
document.getElementById("checkoutModal").style.display="none";
openCart();
}

/* PLACE ORDER */
function placeOrder(){
const name=document.getElementById("name").value;

if(!name){
alert("Fill details");
return;
}

alert("Order placed!");
cart=[];
location.reload();
}

/* ADMIN */
function addProduct(){
const name=document.getElementById("pname").value;
const price=document.getElementById("pprice").value;
const img=document.getElementById("pimg").value;

products.push({
name:name,
price:Number(price),
img:img,
stock:true
});

saveProducts();
render();
renderAdmin();
}

function deleteProduct(i){
products.splice(i,1);
saveProducts();
render();
renderAdmin();
}

function toggleStock(i){
products[i].stock = !products[i].stock;
saveProducts();
render();
renderAdmin();
}

function renderAdmin(){
let html="";

products.forEach((p,i)=>{
html+=`
${p.name} ₹${p.price} (${p.stock?'In Stock':'Out of Stock'})
<br>
<button onclick="toggleStock(${i})">Toggle Stock</button>
<button onclick="deleteProduct(${i})">Delete</button>
<hr>`;
});

document.getElementById("adminList").innerHTML=html;
}

/* INIT */
render();
renderAdmin();
