class Item {
  constructor(name, price, description, hasDisk, quality, brand) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.hasDisk = hasDisk;
    this.quality = quality;
    this.brand = brand;
  }
}

// Load stock from storage, or use defaults if nothing saved yet
function getStock() {
  const saved = localStorage.getItem("currentStock");
  if (saved) return JSON.parse(saved);

  // Default starting stock
  return [
    { id: 1, item: new Item("Framework Laptop", 499.99, "Framework Laptop", false, "Excellent", "Framework") },
    { id: 2, item: new Item("Gaming Mouse", 79.99, "RGB gaming mouse.", true, "Good", "Logitech") },
    { id: 3, item: new Item("Mechanical Keyboard", 129.99, "Cherry MX switches.", true, "Excellent", "Corsair") }
  ];
}

function saveStock(stock) {
  localStorage.setItem("currentStock", JSON.stringify(stock));
}

function renderStock() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;
  const stock = getStock();
  grid.innerHTML = "";

  if (stock.length === 0) {
    grid.innerHTML = `<p style="color: gray;">No items in stock right now.</p>`;
    return;
  }

  stock.forEach(entry => {
    const i = entry.item;
    grid.innerHTML += `
      <div class="product-card">
        <div class="product-img">🛒</div>
        <div class="product-info">
          <span class="product-tag tag-available">In Stock</span>
          <p class="product-name">${i.name}</p>
          <p class="product-desc">${i.description} — Condition: ${i.quality}</p>
          <div class="product-footer">
            <span class="product-price">$${i.price.toFixed(2)}</span>
            <a href="#contact" class="btn btn-primary btn-sm">Buy Now</a>
          </div>
        </div>
      </div>
    `;
  });
}
