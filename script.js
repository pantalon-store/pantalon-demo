// =============================================
// PLACEHOLDER GENERATOR (محسّن)
// =============================================
function createPlaceholderSVG(name, category = 'PRODUCT') {
    const cleanName = name || 'PANTALON';
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1a1a1a"/><stop offset="100%" stop-color="#0a0a0a"/></linearGradient><pattern id="tex" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="none" stroke="#222" stroke-width="0.5"/></pattern></defs><rect width="400" height="500" fill="url(#bg)"/><rect width="400" height="500" fill="url(#tex)"/><text x="200" y="200" font-family="'Helvetica Neue', sans-serif" font-size="28" font-weight="900" fill="${encodeURIComponent('#D4AF37')}" text-anchor="middle" letter-spacing="8">PANTALON</text><text x="200" y="250" font-family="'Helvetica Neue', sans-serif" font-size="14" font-weight="300" fill="${encodeURIComponent('#888')}" text-anchor="middle" letter-spacing="6">${category.toUpperCase()}</text><line x1="60" y1="280" x2="340" y2="280" stroke="${encodeURIComponent('#333')}" stroke-width="1"/><text x="200" y="330" font-family="'Helvetica Neue', sans-serif" font-size="20" font-weight="600" fill="${encodeURIComponent('#aaa')}" text-anchor="middle" letter-spacing="4">${cleanName.toUpperCase()}</text></svg>`;
}

// =============================================
// DATA
// =============================================
const allProducts = [
    { id: 1, name: "Classic Baggy Jeans", category: "jeans", fit: "Baggy", price: 899, oldPrice: 999, colors: ["Black", "Blue", "Grey"], sizes: ["30", "32", "34", "36", "38"], description: "High-quality denim with a relaxed baggy fit.", image: createPlaceholderSVG("Baggy Jeans", "Jeans"), images: [createPlaceholderSVG("Baggy Jeans", "Jeans")], isBestSeller: true, isNew: false },
    { id: 2, name: "Slim Fit Denim Jeans", category: "jeans", fit: "Slim", price: 750, oldPrice: null, colors: ["Dark Blue", "Black"], sizes: ["30", "32", "34", "36"], description: "Slim fit jeans for a modern silhouette.", image: createPlaceholderSVG("Slim Jeans", "Jeans"), images: [createPlaceholderSVG("Slim Jeans", "Jeans")], isBestSeller: false, isNew: true },
    { id: 7, name: "Straight Leg Jeans", category: "jeans", fit: "Straight", price: 820, oldPrice: 920, colors: ["Light Blue", "Black"], sizes: ["30", "32", "34"], description: "Classic straight leg jeans for a timeless look.", image: createPlaceholderSVG("Straight Jeans", "Jeans"), images: [createPlaceholderSVG("Straight Jeans", "Jeans")], isBestSeller: false, isNew: true },
    { id: 9, name: "Wide Leg Denim", category: "jeans", fit: "Wide", price: 940, oldPrice: 1100, colors: ["Black", "Blue"], sizes: ["30", "32", "34", "36"], description: "Bold wide leg denim for a striking streetwear look.", image: createPlaceholderSVG("Wide Leg", "Jeans"), images: [createPlaceholderSVG("Wide Leg", "Jeans")], isBestSeller: false, isNew: true },
    { id: 3, name: "Oversized T-Shirt", category: "tshirts", fit: null, price: 499, oldPrice: 650, colors: ["White", "Black", "Beige"], sizes: ["M", "L", "XL"], description: "Premium cotton oversized t-shirt.", image: createPlaceholderSVG("Oversized Tee", "T-Shirt"), images: [createPlaceholderSVG("Oversized Tee", "T-Shirt")], isBestSeller: true, isNew: false },
    { id: 4, name: "Classic Black T-Shirt", category: "tshirts", fit: null, price: 350, oldPrice: null, colors: ["Black"], sizes: ["M", "L", "XL"], description: "The perfect classic black tee.", image: createPlaceholderSVG("Black Tee", "T-Shirt"), images: [createPlaceholderSVG("Black Tee", "T-Shirt")], isBestSeller: false, isNew: true },
    { id: 8, name: "Beige Oversized Tee", category: "tshirts", fit: null, price: 450, oldPrice: null, colors: ["Beige"], sizes: ["M", "L", "XL"], description: "Premium beige oversized t-shirt.", image: createPlaceholderSVG("Beige Tee", "T-Shirt"), images: [createPlaceholderSVG("Beige Tee", "T-Shirt")], isBestSeller: false, isNew: false },
    { id: 5, name: "Cargo Sweatpants", category: "sweatpants", fit: null, price: 690, oldPrice: 850, colors: ["Grey", "Black", "Olive"], sizes: ["M", "L", "XL"], description: "Comfortable cargo sweatpants with multiple pockets.", image: createPlaceholderSVG("Cargo Sweat", "Sweatpants"), images: [createPlaceholderSVG("Cargo Sweat", "Sweatpants")], isBestSeller: true, isNew: false },
    { id: 6, name: "Essential Sweatpants", category: "sweatpants", fit: null, price: 590, oldPrice: null, colors: ["Navy", "Grey"], sizes: ["M", "L", "XL"], description: "Minimalist sweatpants with a perfect fit.", image: createPlaceholderSVG("Essential Sweat", "Sweatpants"), images: [createPlaceholderSVG("Essential Sweat", "Sweatpants")], isBestSeller: false, isNew: true }
];

let cart = JSON.parse(localStorage.getItem('pantalon_cart')) || [];
let currentFitFilter = 'All';

function saveCart() { localStorage.setItem('pantalon_cart', JSON.stringify(cart)); updateCartUI(); }

function filterFit(fit) {
    currentFitFilter = fit;
    document.querySelectorAll('.fit-btn').forEach(b => b.classList.remove('active', 'border-[#D4AF37]', 'text-[#D4AF37]'));
    const active = document.querySelector(`.fit-btn[onclick*="'${fit}'"]`);
    if (active) { active.classList.add('active', 'border-[#D4AF37]', 'text-[#D4AF37]'); }
    renderProducts(allProducts, 'productsContainer');
}

function renderProducts(productsArray, containerId = 'productsContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;
    let display = [...productsArray];
    // Fit filter
    if (currentFitFilter !== 'All' && containerId === 'productsContainer') {
        display = display.filter(p => p.fit === currentFitFilter);
    }
    // Search & filters
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sizeFilter = document.getElementById('sizeFilter');
    const colorFilter = document.getElementById('colorFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (searchInput) {
        const q = searchInput.value.toLowerCase();
        if (q) display = display.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q));
    }
    if (categoryFilter && categoryFilter.value) {
        display = display.filter(p => p.category === categoryFilter.value);
    }
    if (sizeFilter && sizeFilter.value) {
        display = display.filter(p => p.sizes.includes(sizeFilter.value));
    }
    if (colorFilter && colorFilter.value) {
        display = display.filter(p => p.colors.some(c => c.toLowerCase().includes(colorFilter.value.toLowerCase())));
    }
    if (sortFilter && sortFilter.value) {
        if (sortFilter.value === 'newest') display.sort((a,b) => (a.isNew===b.isNew)?0:a.isNew?-1:1);
        else if (sortFilter.value === 'price-low') display.sort((a,b) => a.price - b.price);
        else if (sortFilter.value === 'price-high') display.sort((a,b) => b.price - a.price);
    }

    if (display.length === 0) {
        container.innerHTML = `<p class="text-center text-[#666] col-span-full py-10">No products found.</p>`;
        return;
    }

    container.innerHTML = display.map(p => {
        const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
        let badge = '';
        if (p.isBestSeller) badge = `<span class="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">🔥 BEST SELLER</span>`;
        else if (p.isNew) badge = `<span class="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">✨ NEW</span>`;

        return `
        <div class="product-card relative group">
            ${badge}
            <div onclick="window.location.href='product.html?id=${p.id}'" class="cursor-pointer relative aspect-[3/4] overflow-hidden">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div class="p-3 md:p-4">
                <div onclick="window.location.href='product.html?id=${p.id}'" class="cursor-pointer">
                    <h4 class="text-sm md:text-lg font-bold text-[#F5F4F0] group-hover:text-[#D4AF37] transition">${p.name}</h4>
                    <div class="flex items-center gap-2 mt-1">
                        <span class="text-base md:text-xl font-bold text-[#D4AF37]">${p.price} EGP</span>
                        ${p.oldPrice ? `<span class="text-xs text-[#666] line-through">${p.oldPrice} EGP</span>` : ''}
                        ${discount > 0 ? `<span class="text-[10px] text-green-400 font-bold">-${discount}%</span>` : ''}
                    </div>
                    <div class="flex items-center gap-1 mt-2 flex-wrap">${p.colors.map(c => `<span class="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-600 inline-block" style="background-color: ${c.toLowerCase()==='black'?'#111':c.toLowerCase()==='white'?'#fff':c.toLowerCase()==='blue'?'#2563eb':c.toLowerCase()==='grey'?'#6b7280':c.toLowerCase()==='beige'?'#f5f5dc':c.toLowerCase()==='olive'?'#556b2f':c.toLowerCase()==='navy'?'#0a192f':c.toLowerCase()==='dark blue'?'#1e3a8a':c.toLowerCase()==='light blue'?'#93c5fd':'#ccc'}"></span>`).join('')}</div>
                    <div class="flex items-center gap-2 mt-2">
                        <select id="size_${p.id}" class="filter-select text-xs py-1 px-2">${p.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}</select>
                        <select id="color_${p.id}" class="filter-select text-xs py-1 px-2">${p.colors.map(c => `<option value="${c}">${c}</option>`).join('')}</select>
                    </div>
                </div>
                <div class="hover-actions mt-3 flex flex-col gap-2">
                    <button onclick="quickAdd(${p.id})" class="w-full bg-[#D4AF37] hover:bg-[#b8962e] text-[#0B0B0B] font-bold py-2 rounded-full transition text-xs md:text-sm"><i class="fas fa-plus"></i> QUICK ADD</button>
                </div>
            </div>
        </div>
    `}).join('');
}

function quickAdd(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    const size = document.getElementById(`size_${productId}`)?.value || product.sizes[0];
    const color = document.getElementById(`color_${productId}`)?.value || product.colors[0];
    const existing = cart.find(i => i.id === productId && i.size === size && i.color === color);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, size, color, quantity: 1 });
    saveCart();
    bounceCartIcon();
    showToast(`✓ ${product.name} added!`);
}

function removeFromCart(idx) { cart.splice(idx,1); saveCart(); }
function increaseQty(idx) { cart[idx].quantity += 1; saveCart(); }
function decreaseQty(idx) {
    if (cart[idx].quantity > 1) cart[idx].quantity -= 1;
    else cart.splice(idx,1);
    saveCart();
}

function updateCartUI() {
    const totalItems = cart.reduce((s,i) => s + i.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => el.textContent = totalItems);
    const container = document.getElementById('cartItems');
    if (!container) return;
    if (cart.length === 0) container.innerHTML = `<p class="text-[#666] text-center">Cart is empty</p>`;
    else {
        container.innerHTML = cart.map((item, idx) => `
            <div class="flex items-center gap-3 bg-[#1a1a1a] p-2 rounded-lg border border-[#2a2a2a]">
                <img src="${item.image}" class="w-12 h-12 rounded object-cover" />
                <div class="flex-1">
                    <p class="text-sm font-bold text-[#F5F4F0]">${item.name}</p>
                    <p class="text-xs text-[#666]">${item.color} | ${item.size}</p>
                    <p class="text-xs text-[#D4AF37]">${item.price} EGP</p>
                </div>
                <div class="flex items-center gap-1">
                    <button onclick="decreaseQty(${idx})" class="bg-[#2a2a2a] text-[#F5F4F0] w-6 h-6 rounded hover:bg-red-600">-</button>
                    <span class="text-[#F5F4F0] w-6 text-center">${item.quantity}</span>
                    <button onclick="increaseQty(${idx})" class="bg-[#2a2a2a] text-[#F5F4F0] w-6 h-6 rounded hover:bg-green-600">+</button>
                </div>
                <button onclick="removeFromCart(${idx})" class="text-red-400 hover:text-red-600"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }
    const total = cart.reduce((s,i) => s + (i.price * i.quantity), 0);
    document.querySelectorAll('#cartTotal').forEach(el => el.textContent = total.toFixed(2) + ' EGP');
}

function toggleCart() { /* defined in index.html */ }
function whatsappCheckout() {
    if (cart.length === 0) { alert('Your cart is empty!'); return; }
    let msg = 'Hello Pantalon 👋,%0aI would like to order:%0a';
    cart.forEach(i => { msg += `• ${i.name} - ${i.color} - ${i.size} - ${i.quantity} x ${i.price} EGP = ${i.price * i.quantity} EGP%0a`; });
    const total = cart.reduce((s,i) => s + (i.price * i.quantity), 0);
    msg += `%0aTotal: ${total.toFixed(2)} EGP%0a%0aName: [ ]%0aPhone: [ ]%0aAddress: [ ]`;
    window.open(`https://wa.me/201080787739?text=${msg}`, '_blank');
}

// ===== BOOT =====
document.addEventListener('DOMContentLoaded', function() {
    // Render sections
    if (document.getElementById('featuredContainer')) {
        renderProducts(allProducts.filter(p => p.isBestSeller || p.isNew).slice(0,4), 'featuredContainer');
    }
    if (document.getElementById('newArrivalsContainer')) {
        renderProducts(allProducts.filter(p => p.isNew).slice(0,4), 'newArrivalsContainer');
    }
    if (document.getElementById('bestSellersContainer')) {
        renderProducts(allProducts.filter(p => p.isBestSeller).slice(0,4), 'bestSellersContainer');
    }
    if (document.getElementById('productsContainer') && !document.getElementById('featuredContainer')) {
        const path = window.location.pathname;
        let cat = null;
        if (path.includes('jeans')) cat = 'jeans';
        else if (path.includes('basics')) cat = 'tshirts';
        else if (path.includes('sweatpants')) cat = 'sweatpants';
        const source = cat ? allProducts.filter(p => p.category === cat) : allProducts;
        renderProducts(source, 'productsContainer');
    }
    if (document.getElementById('productDetail')) {
        const id = parseInt(new URLSearchParams(window.location.search).get('id'));
        renderProductDetail(id);
    }
    updateCartUI();

    // Bind filters
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sizeFilter = document.getElementById('sizeFilter');
    const colorFilter = document.getElementById('colorFilter');
    const sortFilter = document.getElementById('sortFilter');
    const applyFilters = () => {
        const container = document.getElementById('productsContainer');
        if (container) {
            const path = window.location.pathname;
            let cat = null;
            if (path.includes('jeans')) cat = 'jeans';
            else if (path.includes('basics')) cat = 'tshirts';
            else if (path.includes('sweatpants')) cat = 'sweatpants';
            const source = cat ? allProducts.filter(p => p.category === cat) : allProducts;
            renderProducts(source, 'productsContainer');
        }
    };
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (sizeFilter) sizeFilter.addEventListener('change', applyFilters);
    if (colorFilter) colorFilter.addEventListener('change', applyFilters);
    if (sortFilter) sortFilter.addEventListener('change', applyFilters);
});

// ===== PRODUCT DETAIL =====
function renderProductDetail(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) {
        document.getElementById('productDetail').innerHTML = '<p class="text-center text-[#666]">Product not found.</p>';
        return;
    }
    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    const gallery = product.images.map((img, i) => `<img src="${img}" class="w-16 h-16 md:w-20 md:h-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-[#D4AF37] transition" onclick="changeMainImage(this.src)" />`).join('');
    document.getElementById('productDetail').innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div><img id="mainImage" src="${product.images[0]}" class="w-full h-72 md:h-96 object-cover rounded-2xl border border-[#2a2a2a]" /><div class="flex gap-2 mt-4 overflow-x-auto pb-2">${gallery}</div></div>
            <div>
                <h1 class="text-2xl md:text-3xl font-bold text-[#111]">${product.name}</h1>
                <div class="flex items-center gap-3 mt-2">
                    <span class="text-2xl font-bold text-[#D4AF37]">${product.price} EGP</span>
                    ${product.oldPrice ? `<span class="text-lg text-[#666] line-through">${product.oldPrice} EGP</span>` : ''}
                    ${discount > 0 ? `<span class="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">-${discount}%</span>` : ''}
                </div>
                <p class="text-[#666] mt-4 text-sm">${product.description}</p>
                <div class="mt-4"><label class="text-sm text-[#666] block mb-1">Color:</label><div class="flex gap-2 flex-wrap" id="colorOptions">${product.colors.map(c => `<button onclick="selectColor(this,'${c}')" class="px-4 py-1 border border-[#D9D6CC] rounded-full text-xs hover:border-[#D4AF37] transition">${c}</button>`).join('')}</div></div>
                <div class="mt-4"><label class="text-sm text-[#666] block mb-1">Size:</label><div class="flex gap-2 flex-wrap" id="sizeOptions">${product.sizes.map(s => `<button onclick="selectSize(this,'${s}')" class="px-4 py-1 border border-[#D9D6CC] rounded-full text-xs hover:border-[#D4AF37] transition">${s}</button>`).join('')}</div></div>
                <button onclick="addToCartDetail(${product.id})" class="w-full mt-6 bg-[#D4AF37] hover:bg-[#b8962e] text-[#0B0B0B] font-bold py-3 rounded-full transition"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                <p id="detailError" class="text-red-400 text-xs mt-2 hidden">⚠️ Please select a color and size first!</p>
            </div>
        </div>
        <div class="mt-16 border-t border-[#D9D6CC] pt-8">
            <h3 class="text-2xl font-bold text-[#111] mb-4">✨ You May Also Like</h3>
            <div id="similarProducts" class="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
        </div>
    `;
    const similar = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0,4);
    document.getElementById('similarProducts').innerHTML = similar.map(p => `
        <div onclick="window.location.href='product.html?id=${p.id}'" class="bg-[#0B0B0B] rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition border border-[#2a2a2a]">
            <img src="${p.image}" class="w-full h-36 md:h-48 object-cover" />
            <div class="p-2 md:p-3"><h4 class="text-xs md:text-sm font-bold text-[#F5F4F0]">${p.name}</h4><p class="text-[#D4AF37] font-bold text-sm">${p.price} EGP</p></div>
        </div>
    `).join('');
    window._detailColor = null; window._detailSize = null;
    const firstColor = document.querySelector('#colorOptions button');
    if (firstColor) { firstColor.classList.add('border-[#D4AF37]', 'bg-[#D4AF37]/10'); window._detailColor = product.colors[0]; }
    const firstSize = document.querySelector('#sizeOptions button');
    if (firstSize) { firstSize.classList.add('border-[#D4AF37]', 'bg-[#D4AF37]/10'); window._detailSize = product.sizes[0]; }
}

function changeMainImage(src) { document.getElementById('mainImage').src = src; }
function selectColor(el, color) {
    document.querySelectorAll('#colorOptions button').forEach(b => b.classList.remove('border-[#D4AF37]', 'bg-[#D4AF37]/10'));
    el.classList.add('border-[#D4AF37]', 'bg-[#D4AF37]/10');
    window._detailColor = color;
    document.getElementById('detailError')?.classList.add('hidden');
}
function selectSize(el, size) {
    document.querySelectorAll('#sizeOptions button').forEach(b => b.classList.remove('border-[#D4AF37]', 'bg-[#D4AF37]/10'));
    el.classList.add('border-[#D4AF37]', 'bg-[#D4AF37]/10');
    window._detailSize = size;
    document.getElementById('detailError')?.classList.add('hidden');
}
function addToCartDetail(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    if (!window._detailColor || !window._detailSize) {
        const err = document.getElementById('detailError');
        if (err) { err.classList.remove('hidden'); err.textContent = '⚠️ Please select a color and size first!'; }
        return;
    }
    const existing = cart.find(i => i.id === productId && i.size === window._detailSize && i.color === window._detailColor);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, size: window._detailSize, color: window._detailColor, quantity: 1 });
    saveCart();
    bounceCartIcon();
    showToast(`✓ ${product.name} added!`);
}
