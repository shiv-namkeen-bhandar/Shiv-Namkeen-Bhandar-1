const SHOP_WHATSAPP="919625985012";
<button type="button" onclick="sendGoogleOrder()">📊 Google Sheet Order</button>
const products=[
{id:1,name:"आलू भुजिया",price:240,cat:"namkeen",image:"assets/aloo-bhujia.png"},
{id:2,name:"नवरतन",price:240,cat:"mixture",image:"assets/navratan.png"},
{id:3,name:"केरला",price:240,cat:"mixture",image:"assets/kerala.png"},
{id:4,name:"आलू लच्छा",price:320,cat:"namkeen",image:"assets/aloo-lachha.png"},
{id:5,name:"चिप्स",price:320,cat:"snacks",image:"assets/chips.png"},
{id:6,name:"प्लेन भुजिया",price:240,cat:"namkeen",image:"assets/plain-bhujia.png"},
{id:7,name:"बीकानेरी भुजिया",price:240,cat:"namkeen",image:"assets/bikaneri.png"},
{id:8,name:"कानपुरी मिक्सचर",price:240,cat:"mixture",image:"assets/kanpuri.png"},
{id:9,name:"लाहौरी जीरा",price:240,cat:"snacks",image:"assets/lahori-jeera.png"},
{id:10,name:"मूंग दाल",price:240,cat:"snacks",image:"assets/moong-dal.png"},
{id:11,name:"पालक मिक्सचर",price:240,cat:"mixture",image:"assets/palak.png"},
{id:12,name:"काजू मिक्सचर",price:320,cat:"mixture",image:"assets/kaju.png"},
{id:13,name:"मोटा मिक्सचर",price:260,cat:"mixture",image:"assets/mota-mix.png"},
{id:14,name:"स्पेशल मिक्स",price:260,cat:"mixture",image:"assets/special-mix.png"},
{id:15,name:"फराली मिक्स",price:240,cat:"snacks",image:"assets/farali.png"}];
let cart=[];
const money=n=>"₹"+Math.round(n).toLocaleString("en-IN");
function renderProducts(list=products){document.getElementById("resultCount").textContent=`${list.length} products`;document.getElementById("productGrid").innerHTML=list.map(p=>`<article class="product"><div class="photo"><img src="${p.image}" alt="${p.name}"></div><h3>${p.name}</h3><div class="price">${money(p.price)} <span class="unit">/kg</span></div><div class="controls"><button onclick="changeGram(${p.id},-250)">−</button><input id="g${p.id}" class="grams" type="number" min="250" step="250" value="250"><button onclick="changeGram(${p.id},250)">+</button></div><button class="add-btn" onclick="addProduct(${p.id})">🛒 Add to Cart</button></article>`).join("")}
function changeGram(id,d){const i=document.getElementById("g"+id);i.value=Math.max(250,(Number(i.value)||250)+d)}
function addProduct(id){const p=products.find(x=>x.id===id),g=Math.max(250,Number(document.getElementById("g"+id).value)||250),e=cart.find(x=>x.id===id);if(e)e.grams+=g;else cart.push({...p,grams:g});renderCart();showToast(`${p.name} cart में add हो गया`)}
function renderCart(){const b=document.getElementById("cartItems");if(!cart.length)b.innerHTML='<p class="muted">Cart अभी खाली है।</p>';else b.innerHTML=cart.map((x,i)=>`<div class="cart-row"><div><b>${x.name}</b><br><small>${x.grams}g × ${money(x.price)}/kg</small></div><div style="text-align:right"><b>${money(x.price*x.grams/1000)}</b><br><button class="remove-btn" onclick="removeItem(${i})">Remove</button></div></div>`).join("");const total=cart.reduce((s,x)=>s+x.price*x.grams/1000,0),count=cart.reduce((s,x)=>s+x.grams/250,0);document.getElementById("total").textContent=money(total);document.getElementById("cartCount").textContent=count;document.getElementById("cartBadge").textContent=`${count} items`}
function removeItem(i){cart.splice(i,1);renderCart()} function clearCart(){cart=[];renderCart()}
function filterProducts(c,b){document.querySelectorAll(".category-bar button").forEach(x=>x.classList.remove("active"));if(b)b.classList.add("active");renderProducts(c==="all"?products:products.filter(p=>p.cat===c))}
function searchProducts(){const q=document.getElementById("searchInput").value.trim().toLowerCase();renderProducts(q?products.filter(p=>p.name.toLowerCase().includes(q)):products);document.getElementById("products").scrollIntoView({behavior:"smooth"})}
document.getElementById("searchInput").addEventListener("input",e=>{const q=e.target.value.trim().toLowerCase();renderProducts(q?products.filter(p=>p.name.toLowerCase().includes(q)):products)});
function openCart(){document.getElementById("order").scrollIntoView({behavior:"smooth"})}
function sendWhatsApp(){if(!cart.length){alert("पहले Cart में product जोड़ें।");return}const n=document.getElementById("name").value.trim(),ph=document.getElementById("phone").value.trim(),a=document.getElementById("address").value.trim(),pay=document.getElementById("payment").value;if(!n||!/^\d{10}$/.test(ph)||!a){alert("नाम, 10 digit mobile और पूरा address भरें।");return}const t=cart.reduce((s,x)=>s+x.price*x.grams/1000,0);let m=`*Shiv Namkeen Bhandar - New Order*%0A%0A`;cart.forEach(x=>m+=`• ${x.name} - ${x.grams}g - ${money(x.price*x.grams/1000)}%0A`);m+=`%0A*Total: ${money(t)}*%0APayment: ${pay}%0A%0A*Customer Details*%0AName: ${n}%0AMobile: ${ph}%0AAddress: ${a}`;window.open(`https://wa.me/${SHOP_WHATSAPP}?text=${m}`,"_blank")}
function showToast(m){const t=document.getElementById("toast");t.textContent=m;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),1800)}
renderProducts();renderCart();
