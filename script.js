// =============================================
// بيانات المنتجات
// =============================================
const products = [
    { id: 1, name: "جينز كلاسيك نحيف", price: 650, size: "30-38", color: "أزرق غامق", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop" },
    { id: 2, name: "جينز واسح مريح", price: 720, size: "30-38", color: "رمادي", image: "https://images.unsplash.com/photo-1582555172866-f73bb12f2ab3?w=400&h=500&fit=crop" },
    { id: 3, name: "تيشيرت قطني أبيض", price: 350, size: "M-XL", color: "أبيض", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop" },
    { id: 4, name: "هودي ثقيل أسود", price: 850, size: "M-XL", color: "أسود", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop" },
    { id: 5, name: "تيشيرت جينز طويل", price: 420, size: "M-XL", color: "نيلي", image: "https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=400&h=500&fit=crop" },
    { id: 6, name: "سويتبانتس رياضي", price: 590, size: "M-XL", color: "رمادي غامق", image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&h=500&fit=crop" }
];

let cart = [];
const container = document.getElementById('productsContainer');

// =============================================
// عرض المنتجات
// =============================================
function renderProducts() {
    container.innerHTML = products.map(p => `
        <div class="product-card bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-800">
            <img src="${p.image}" alt="${p.name}" class="w-full h-64 object-cover" />
            <div class="p-4">
                <h4 class="text-lg font-bold text-white">${p.name}</h4>
                <p class="text-sm text-gray-400">المقاس: ${p.size} | اللون: ${p.color}</p>
                <div class="flex justify-between items-center mt-3">
                    <span class="text-xl font-bold text-[#D4AF37]">${p.price} ج.م</span>
                    <button onclick="addToCart(${p.id})" class="bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold px-4 py-2 rounded-full text-sm transition flex items-center gap-1">
                        <i class="fas fa-plus"></i> أضف للسلة
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// =============================================
// منطق العربة
// =============================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    const btn = document.querySelector(`button[onclick="addToCart(${productId})"]`);
    if(btn) { btn.style.transform = 'scale(0.9)'; setTimeout(() => btn.style.transform = 'scale(1)', 150); }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function increaseQty(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) item.quantity += 1;
    updateCartUI();
}

function decreaseQty(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) removeFromCart(productId);
        else updateCartUI();
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;

    const container = document.getElementById('cartItems');
    if (cart.length === 0) {
        container.innerHTML = `<p class="text-gray-500 text-center">السلة فارغة</p>`;
    } else {
        container.innerHTML = cart.map(item => `
            <div class="flex items-center gap-3 bg-gray-800 p-2 rounded-lg border border-gray-700">
                <img src="${item.image}" class="w-12 h-12 rounded object-cover" />
                <div class="flex-1">
                    <p class="text-sm font-bold text-white">${item.name}</p>
                    <p class="text-xs text-[#D4AF37]">${item.price} ج.م</p>
                </div>
                <div class="flex items-center gap-1">
                    <button onclick="decreaseQty(${item.id})" class="bg-gray-700 text-white w-6 h-6 rounded hover:bg-red-600">-</button>
                    <span class="text-white w-6 text-center">${item.quantity}</span>
                    <button onclick="increaseQty(${item.id})" class="bg-gray-700 text-white w-6 h-6 rounded hover:bg-green-600">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-400 hover:text-red-600 text-xs"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2) + ' ج.م';
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('open');
}

// تحميل المنتجات عند فتح الصفحة
renderProducts();
