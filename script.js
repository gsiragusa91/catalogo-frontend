const API_URL = "https://catalogo-api-5jrm.onrender.com";

async function cargarProductos() {
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();
  renderizar(data);
}

async function buscar() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return cargarProductos();
  const res = await fetch(`${API_URL}/products/search?name=${query}`);
  const data = await res.json();
  renderizar(data);
}

function renderizar(productos) {
  const lista = document.getElementById("productList");
  lista.innerHTML = "";

  if (!productos.length) {
    lista.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${p.title}</h3>
      <p><strong>Categoría:</strong> ${p.category}</p>
      <p><strong>Precio:</strong> $${p.price}</p>
      <p><strong>Stock:</strong> ${p.stock}</p>
      <p>${p.description}</p>
      <img src="${p.image_url}" width="150">
    `;
    lista.appendChild(div);
  });
}

window.onload = cargarProductos;
