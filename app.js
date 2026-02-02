let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){
  cart.push({name, price});
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Aggiunto al carrello");
}

if(document.getElementById("cart")){
  let box = document.getElementById("cart");
  cart.forEach(p=>{
    box.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>€${p.price}</p>
      </div>`;
  });
}

async function checkout(){
  const res = await fetch("/checkout",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({items:cart})
  });
  const data = await res.json();
  window.location.href = data.url;
}
