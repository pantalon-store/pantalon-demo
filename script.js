// =============================================
// PLACEHOLDER GENERATOR (شيك من غير صور)
// =============================================
function createPlaceholderSVG(name, category = 'PRODUCT') {
    const cleanName = name || 'PANTALON';
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#141414"/><stop offset="100%" stop-color="#0a0a0a"/></linearGradient><pattern id="tex" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="none" stroke="#222" stroke-width="0.5"/></pattern></defs><rect width="400" height="500" fill="url(#bg)"/><rect width="400" height="500" fill="url(#tex)"/><text x="200" y="210" font-family="'Helvetica Neue', sans-serif" font-size="26" font-weight="900" fill="${encodeURIComponent('#D4AF37')}" text-anchor="middle" letter-spacing="6">PANTALON</text><text x="200" y="255" font-family="'Helvetica Neue', sans-serif" font-size="12" font-weight="300" fill="${encodeURIComponent('#666')}" text-anchor="middle" letter-spacing="4">${category.toUpperCase()}</text><line x1="80" y1="280" x2="320" y2="280" stroke="${encodeURIComponent('#2a2a2a')}" stroke-width="1"/><text x="200" y="320" font-family="'Helvetica Neue', sans-serif" font-size="16" font-weight="500" fill="${encodeURIComponent('#888')}" text-anchor="middle" letter-spacing="2">${cleanName.toUpperCase()}</text></svg>`;
}

// =============================================
// DATA (كل المنتجات مع Fit و Placeholder)
// =============================================
const allProducts = [
    { id: 1, name: "Classic Baggy Jeans", category: "jeans", fit: "Baggy", price: 899, oldPrice: 999, colors: ["Black", "Blue", "Grey"], sizes: ["30", "32", "34", "36", "38"], description: "High-quality denim with a relaxed baggy fit.", image: createPlaceholderSVG("Baggy Jeans", "Jeans"), images: [createPlaceholderSVG("Baggy Jeans", "Jeans")], isBestSeller: true, isNew: false },
    { id: 2, name: "Slim Fit Denim Jeans", category: "jeans", fit: "Slim", price: 750, oldPrice: null, colors: ["Dark Blue", "Black"], sizes: ["30", "32", "34", "36"], description: "Slim fit jeans for a modern silhouette.", image: createPlaceholderSVG("Slim Jeans", "Jeans"), images: [createPlaceholderSVG("Slim Jeans", "Jeans")], isBestSeller: false, isNew: true },
    { id: 7, name: "Straight Leg Jeans", category: "jeans", fit: "Straight", price: 820, oldPrice: 920, colors: ["Light Blue", "Black"], sizes: ["30", "32", "34"], description: "Classic straight leg jeans for a timeless look.", image: createPlaceholderSVG("Straight Jeans", "Jeans"), images: [createPlaceholderSVG("Straight Jeans", "Jeans")], isBestSeller: false, isNew: true },
    // T-Shirts (No fit)
    { id: 3, name: "Oversized T-Shirt", category: "tshirts", fit: null, price: 499, oldPrice: 650, colors: ["White", "Black", "Beige"], sizes: ["M", "L", "XL"], description: "Premium cotton oversized t-shirt.", image: createPlaceholderSVG("Oversized Tee", "T-Shirt"), images: [createPlaceholderSVG("Oversized Tee", "T-Shirt")], isBestSeller: true, isNew: false },
    { id: 4, name: "Classic Black T-Shirt", category: "tshirts", fit: null, price: 350, oldPrice: null, colors: ["Black"], sizes: ["M", "L", "XL"], description: "The perfect classic black tee.", image: createPlaceholderSVG("Black Tee", "T-Shirt"), images: [createPlaceholderSVG("Black Tee", "T-Shirt")], isBestSeller: false, isNew: true },
    { id: 8, name: "Beige Oversized Tee", category: "tshirts", fit: null, price: 450, oldPrice: null, colors: ["Beige"], sizes: ["M", "L", "XL"], description: "Premium beige oversized t-shirt.", image: createPlaceholderSVG("Beige Tee", "T-Shirt"), images: [createPlaceholderSVG("Beige Tee", "T-Shirt")], isBestSeller: false, isNew: false },
    // Sweatpants (No fit)
    { id: 5, name: "Cargo Sweatpants", category: "sweatpants", fit: null, price: 690, oldPrice: 850, colors: ["Grey", "Black", "Olive"], sizes: ["M", "L", "XL"], description: "Comfortable cargo sweatpants with multiple pockets.", image: createPlaceholderSVG("Cargo Sweat", "Sweatpants"), images: [createPlaceholderSVG("Cargo Sweat", "Sweatpants")], isBestSeller: true, isNew: false },
    { id: 6, name: "Essential Sweatpants", category: "sweatpants", fit: null, price: 590, oldPrice: null, colors: ["Navy", "Grey"], sizes: ["M", "L", "XL"], description: "Minimalist sweatpants with a perfect fit.", image: createPlaceholderSVG("Essential Sweat", "Sweatpants"), images: [createPlaceholderSVG("Essential Sweat", "Sweatpants")], isBestSeller: false, isNew: true }
];

// Add a fake Wide Leg product for demo
allProducts.push({ id: 9, name: "Wide Leg Denim", category: "jeans", fit: "Wide", price: 940, oldPrice: 1100, colors: ["Black", "Blue"], sizes: ["30", "32", "34", "36"], description: "Bold wide leg denim for a striking streetwear look.", image: createPlaceholderSVG("Wide Leg", "Jeans"), images: [createPlaceholderSVG("Wide Leg", "Jeans")], isBestSeller: false, isNew: true });

let cart = JSON.parse(localStorage.getItem('pantalon_cart')) || [];
let currentFitFilter = 'All';

function saveCart() { localStorage.setItem('pantalon_cart', JSON.stringify(cart)); updateCartUI(); }

// =============================================
// FILTER BY FIT
// =============================================
function filterByFit(fit) {
    currentFitFilter = fit;
    // Update button active state
    document.querySelectorAll('.fit-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.fit-btn[data-fit="${fit}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    renderProducts(allProducts, 'productsContainer');
}

// =============================================
// RENDER PRODUCTS (مع Hover Actions)
// =============================================
function renderProducts(productsArray, containerId = 'productsContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;

    let displayProducts = [...productsArray];

    // Apply Fit Filter (if not 'All')
    if (currentFitFilter !== 'All' && containerId === 'productsContainer') {
        displayProducts = displayProducts.filter(p => p.fit === currentFitFilter);
    }

    // Apply Search & Filters (global logic)
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sizeFilter = document.getElementById('sizeFilter');
    const colorFilter = document.getElementById('colorFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (searchInput) {
        const q = searchInput.value.toLowerCase();
        if (q) displayProducts = displayProducts.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q));
    }
    if (categoryFilter && categoryFilter.value) {
        displayProducts = displayProducts.filter(p => p.category === categoryFilter.value);
    }
    if (sizeFilter && sizeFilter.value) {
        displayProducts = displayProducts.filter(p => p.sizes.includes(sizeFilter.value));
    }
    if (colorFilter && colorFilter.value) {
        displayProducts = displayProducts.filter(p => p.colors.some(c => c.toLowerCase().includes(colorFilter.value.toLowerCase())));
    }
    if (sortFilter && sortFilter.value) {
        if (sortFilter.value === 'newest') displayProducts.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        else if (sortFilter.value === 'price-low') displayProducts.sort((a, b) => a.price - b.price);
        else if (sortFilter.value === 'price-high') displayProducts.sort((a, b) => b.price - a.price);
    }

    if (displayProducts.length === 0) {
        container.innerHTML = `<p class="text-gray-400 text-center col-span-full py-10">No products found.</p>`;
        return;
    }

    container.innerHTML = displayProducts.map(p => {
        const defaultSize = p.sizes[0];
        const defaultColor = p.colors[0];
        const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
        let badgeHTML = '';
        if (p.isBestSeller) badgeHTML = `<span class="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">🔥 BEST SELLER</span>`;
        else if (p.isNew) badgeHTML = `<span class="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">✨ NEW</span>`;

        return `
            <div class="product-card bg-gray-900 rounded-2xl overflow-hidden shadow-xl transition-all border border-gray-800 relative group">
                ${badgeHTML}
                <div onclick="window.location.href='product.html?id=${p.id}'" class="cursor-pointer relative">
                    <img src="${p.image}" alt="${p.name}" class="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div class="p-3 md:p-4">
                    <div onclick="window.location.href='product.html?id=${p.id}'" class="cursor-pointer">
                        <h4 class="text-sm md:text-lg font-bold text-white group-hover:text-[#D4AF37] transition">${p.name}</h4>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-base md:text-xl font-bold text-[#D4AF37]">${p.price} EGP</span>
                            ${p.oldPrice ? `<span class="text-xs text-gray-500 line-through">${p.oldPrice} EGP</span>` : ''}
                            ${discount > 0 ? `<span class="text-[10px] text-green-400 font-bold">-${discount}%</span>` : ''}
                        </div>
                        <div class="flex items-center gap-1 mt-2 flex-wrap">${p.colors.map(c => `<span class="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-600 inline-block" style="background-color: ${c.toLowerCase() === 'black' ? '#111' : c.toLowerCase() === 'white' ? '#fff' : c.toLowerCase() === 'blue' ? '#2563eb' : c.toLowerCase() === 'grey' ? '#6b7280' : c.toLowerCase() === 'beige' ? '#f5f5dc' : c.toLowerCase() === 'olive' ? '#556b2f' : c.toLowerCase() === 'navy' ? '#0a192f' : c.toLowerCase() === 'dark blue' ? '#1e3a8a' : c.toLowerCase() === 'light blue' ? '#93c5fd' : '#ccc'}"></span>`).join('')}</div>
                        <div class="flex items-center gap-2 mt-2">
                            <select id="size_${p.id}" class="size-select text-xs bg-gray-800 text-white border border-gray-600 rounded px-1 md:px-2 py-1">${p.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}</select>
                            <select id="color_${p.id}" class="size-select text-xs bg-gray-800 text-white border border-gray-600 rounded px-1 md:px-2 py-1">${p.colors.map(c => `<option value="${c}">${c}</option>`).join('')}</select>
                        </div>
                    </div>
                    <!-- Hover Actions -->
                    <div class="hover-actions mt-3 flex flex-col gap-2">
                        <button onclick="quickAddToCart(${p.id})" class="w-full bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold py-2 rounded-full transition text-xs md:text-sm flex items-center justify-center gap-2">
                            <i class="fas fa-plus"></i> QUICK ADD
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// =============================================
// QUICK ADD (من غير ما يفتح تفاصيل)
// =============================================
function quickAddToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    const sizeSelect = document.getElementById(`size_${productId}`);
    const colorSelect = document.getElementById(`color_${productId}`);
    const selectedSize = sizeSelect ? sizeSelect.value : product.sizes[0];
    const selectedColor = colorSelect ? colorSelect.value : product.colors[0];
    const existing = cart.find(item => item.id === productId && item.size === selectedSize && item.color === selectedColor);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, size: selectedSize, color: selectedColor, quantity: 1 });
    saveCart();
    // Animation & Toast
    bounceCartIcon();
    showToast(`✓ ${product.name} added!`);
}

// =============================================
// CART FUNCTIONS
// =============================================
function removeFromCart(index) { cart.splice(index, 1); saveCart(); }
function increaseQty(index) { cart[index].quantity += 1; saveCart(); }
function decreaseQty(index) { if (cart[index].quantity > 1) cart[index].quantity -= 1; else cart.splice(index, 1); saveCart(); }

function updateCartUI() {
    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => el.textContent = totalItems);
    const container = document.getElementById('cartItems');
    if (!container) return;
    if (cart.length === 0) container.innerHTML = `<p class="text-gray-500 text-center">Cart is empty</p>`;
    else {
        container.innerHTML = cart.map((item, index) => `
            <div class="flex items-center gap-3 bg-gray-800 p-2 rounded-lg border border-gray-700">
                <img src="${item.image}" class="w-12 h-12 rounded object-cover" />
                <div class="flex-1"><p class="text-sm font-bold text-white">${item.name}</p><p class="text-xs text-gray-400">${item.color} | ${item.size}</p><p class="text-xs text-[#D4AF37]">${item.price} EGP</p></div>
                <div class="flex items-center gap-1"><button onclick="decreaseQty(${index})" class="bg-gray-700 text-white w-6 h-6 rounded hover:bg-red-600">-</button><span class="text-white w-6 text-center">${item.quantity}</span><button onclick="increaseQty(${index})" class="bg-gray-700 text-white w-6 h-6 rounded hover:bg-green-600">+</button></div>
                <button onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-600"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }
    const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    document.querySelectorAll('#cartTotal').forEach(el => el.textContent = total.toFixed(2) + ' EGP');
}

function toggleCart() { document.getElementById('cartSidebar').classList.toggle('open'); document.getElementById('overlay').classList.toggle('open'); }

// =============================================
// WHATSAPP SMART ORDER
// =============================================
function whatsappCheckout() {
    if (cart.length === 0) { alert('Your cart is empty!'); return; }
    let message = 'Hello Pantalon 👋,%0aI would like to order:%0a';
    cart.forEach(item => { message += `• ${item.name} - ${item.color} - ${item.size} - ${item.quantity} x ${item.price} EGP = ${item.price * item.quantity} EGP%0a`; });
    const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    message += `%0aTotal: ${total.toFixed(2)} EGP%0a%0aName: [ ]%0aPhone: [ ]%0aAddress: [ ]`;
    window.open(`https://wa.me/201080787739?text=${message}`, '_blank');
}

// =============================================
// PRODUCT DETAIL PAGE LOGIC (مع Placeholder)
// =============================================
function renderProductDetail(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) { document.getElementById('productDetail').innerHTML = '<p class="text-center text-gray-400">Product not found.</p>'; return; }
    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    const galleryHTML = product.images.map((img, idx) => `<img src="${img}" alt="${product.name}" class="w-16 h-16 md:w-20 md:h-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-[#D4AF37] transition" onclick="changeMainImage(this.src)" />`).join('');

    document.getElementById('productDetail').innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div><img id="mainImage" src="${product.images[0]}" alt="${product.name}" class="w-full h-72 md:h-96 object-cover rounded-2xl border border-gray-700" /><div class="flex gap-2 mt-4 overflow-x-auto pb-2">${galleryHTML}</div></div>
            <div>
                <h1 class="text-2xl md:text-3xl font-bold text-white">${product.name}</h1>
                <div class="flex items-center gap-3 mt-2"><span class="text-2xl font-bold text-[#D4AF37]">${product.price} EGP</span>${product.oldPrice ? `<span class="text-lg text-gray-500 line-through">${product.oldPrice} EGP</span>` : ''}${discount > 0 ? `<span class="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">-${discount}%</span>` : ''}</div>
                <p class="text-gray-400 mt-4 text-sm leading-relaxed">${product.description}</p>
                <div class="mt-4"><label class="text-sm text-gray-400 block mb-1">Color:</label><div class="flex gap-2 flex-wrap" id="colorOptions">${product.colors.map(c => `<button onclick="selectColor(this, '${c}')" class="px-4 py-1 border border-gray-600 rounded-full text-xs hover:border-[#D4AF37] transition">${c}</button>`).join('')}</div></div>
                <div class="mt-4"><label class="text-sm text-gray-400 block mb-1">Size:</label><div class="flex gap-2 flex-wrap" id="sizeOptions">${product.sizes.map(s => `<button onclick="selectSize(this, '${s}')" class="px-4 py-1 border border-gray-600 rounded-full text-xs hover:border-[#D4AF37] transition">${s}</button>`).join('')}</div></div>
                <button onclick="addToCartDetail(${product.id})" class="w-full mt-6 bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold py-3 rounded-full transition"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                <p id="detailError" class="text-red-400 text-xs mt-2 text-center hidden">⚠️ Please select a color and size first!</p>
            </div>
        </div>
        <div class="mt-16 border-t border-gray-800 pt-8"><h3 class="text-2xl font-bold text-white mb-4">✨ You May Also Like</h3><div id="similarProducts" class="grid grid-cols-2 md:grid-cols-4 gap-4"></div></div>
    `;
    const similar = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const simContainer = document.getElementById('similarProducts');
    if (simContainer) simContainer.innerHTML = similar.map(p => `<div onclick="window.location.href='product.html?id=${p.id}'" class="bg-gray-900 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition border border-gray-800"><img src="${p.image}" class="w-full h-36 md:h-48 object-cover" /><div class="p-2 md:p-3"><h4 class="text-xs md:text-sm font-bold text-white">${p.name}</h4><p class="text-[#D4AF37] font-bold text-sm">${p.price} EGP</p></div></div>`).join('');
    window._detailColor = null; window._detailSize = null;
    const firstColor = document.querySelector('#colorOptions button'); if (firstColor) { firstColor.classList.add('border-[#D4AF37]', 'bg-[#D4AF37]/10'); window._detailColor = product.colors[0]; }
    const firstSize = document.querySelector('#sizeOptions button'); if (firstSize) { firstSize.classList.add('border-[#D4AF37]', 'bg-[#D4AF37]/10'); window._detailSize = product.sizes[0]; }
}

function changeMainImage(src) { document.getElementById('mainImage').src = src; }
function selectColor(el, color) { document.querySelectorAll('#colorOptions button').forEach(b => b.classList.remove('border-[#D4AF37]', 'bg-[#D4AF37]/10')); el.classList.add('border-[#D4AF37]', 'bg-[#D4AF37]/10'); window._detailColor = color; document.getElementById('detailError')?.classList.add('hidden'); }
function selectSize(el, size) { document.querySelectorAll('#sizeOptions button').forEach(b => b.classList.remove('border-[#D4AF37]', 'bg-[#D4AF37]/10')); el.classList.add('border-[#D4AF37]', 'bg-[#D4AF37]/10'); window._detailSize = size; document.getElementById('detailError')?.classList.add('hidden'); }

function addToCartDetail(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    if (!window._detailColor || !window._detailSize) { const err = document.getElementById('detailError'); if (err) { err.classList.remove('hidden'); err.textContent = '⚠️ Please select a color and size first!'; } return; }
    const existing = cart.find(item => item.id === productId && item.size === window._detailSize && item.color === window._detailColor);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, size: window._detailSize, color: window._detailColor, quantity: 1 });
    saveCart();
    bounceCartIcon();
    showToast(`✓ ${product.name} added!`);
}

// =============================================
// BOOT / INIT
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    // Remove Loader after 0.8s
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('fade-out');
    }, 800);

    // Render sections
    if (document.getElementById('featuredContainer')) {
        const featured = allProducts.filter(p => p.isBestSeller || p.isNew).slice(0, 4);
        renderProducts(featured, 'featuredContainer');
    }
    if (document.getElementById('newArrivalsContainer')) {
        const newArrivals = allProducts.filter(p => p.isNew).slice(0, 4);
        renderProducts(newArrivals, 'newArrivalsContainer');
    }
    if (document.getElementById('bestSellersContainer')) {
        const bestSellers = allProducts.filter(p => p.isBestSeller).slice(0, 4);
        renderProducts(bestSellers, 'bestSellersContainer');
    }
    if (document.getElementById('productsContainer') && !document.getElementById('featuredContainer')) {
        const path = window.location.pathname;
        let cat = null;
        if (path.includes('jeans')) cat = 'jeans';
        else if (path.includes('basics')) cat = 'tshirts';
        else if (path.includes('sweatpants')) cat = 'sweatpants';
        if (cat) { const filtered = allProducts.filter(p => p.category === cat); renderProducts(filtered, 'productsContainer'); } 
        else { renderProducts(allProducts, 'productsContainer'); }
    }
    if (document.getElementById('productDetail')) {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get('id'));
        renderProductDetail(id);
    }
    updateCartUI();

    // Filters binding
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
