import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://sphqnxeersxfskmzzlkt.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwaHFueGVlcnN4ZnNrbXp6bGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzODIxOTMsImV4cCI6MjA5Njk1ODE5M30.2lYmJDkTuWNyDBlPjNu0GJ_XY9hJ1WhW0q2rpZ_lZaQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── STOCK ──

async function getStock() {
  const { data, error } = await supabase.from("stock").select("*").order("id", { ascending: false });
  if (error) { console.error("getStock error:", error); return []; }
  return data;
}

async function addToStock(item) {
  const { error } = await supabase.from("stock").insert([item]);
  if (error) { console.error("addToStock error:", error); return false; }
  return true;
}

async function removeFromStock(id) {
  const { error } = await supabase.from("stock").delete().eq("id", id);
  if (error) { console.error("removeFromStock error:", error); return false; }
  return true;
}

// ── REQUESTS ──

async function getRequests() {
  const { data, error } = await supabase.from("requests").select("*").order("id", { ascending: false });
  if (error) { console.error("getRequests error:", error); return []; }
  return data;
}

async function addRequest(request) {
  const { error } = await supabase.from("requests").insert([request]);
  if (error) { console.error("addRequest error:", error); return false; }
  return true;
}

async function removeRequest(id) {
  const { error } = await supabase.from("requests").delete().eq("id", id);
  if (error) { console.error("removeRequest error:", error); return false; }
  return true;
}

// ── RENDER STOREFRONT ──

async function renderStock() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.innerHTML = `<p style="color:gray;">Loading...</p>`;
  const stock = await getStock();
  grid.innerHTML = "";

  if (stock.length === 0) {
    grid.innerHTML = `<p style="color:gray; padding: 1rem 0;">No items in stock right now. Check back soon!</p>`;
    return;
  }

  stock.forEach(i => {
    grid.innerHTML += `
      <div class="product-card">
        <div class="product-img">🛒</div>
        <div class="product-info">
          <span class="product-tag tag-available">In Stock</span>
          <p class="product-name">${i.name}</p>
          <p class="product-desc">${i.description || ""} ${i.quality ? "· Condition: " + i.quality : ""}</p>
          <div class="product-footer">
            <span class="product-price">$${parseFloat(i.price).toFixed(2)}</span>
            <a href="#contact" class="btn btn-primary btn-sm">Buy Now</a>
          </div>
        </div>
      </div>
    `;
  });
}

export { getStock, addToStock, removeFromStock, getRequests, addRequest, removeRequest, renderStock };
