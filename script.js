// =============================================
// بيانات المنتجات المميزة (اللي هتظهر في الرئيسية)
// =============================================
const featuredProducts = [
    { id: 1, name: "جينز كلاسيك نحيف", price: 650, size: "30-38", color: "أزرق غامق", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop" },
    { id: 4, name: "جينز مريح", price: 690, size: "30-38", color: "أزرق فاتح", image: "https://images.unsplash.com/photo-1584865288642-420a9d2d4f3c?w=400&h=500&fit=crop" },
    { id: 5, name: "تيشيرت أبيض Basic", price: 350, size: "M-XL", color: "أبيض", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop" },
    { id: 6, name: "تيشيرت أسود Basic", price: 350, size: "M-XL", color: "أسود", image: "https://images.unsplash.com/photo-1503342394126-c6e7f1d3c7b9?w=400&h=500&fit=crop" },
    { id: 8, name: "سويتبانتس رياضي", price: 590, size: "M-XL", color: "رمادي", image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&h=500&fit=crop" },
    { id: 10, name: "سويتبانتس واسح", price: 670, size: "M-XL", color: "بيج", image: "https://images.unsplash.com/photo-1516478177764-9fe0bd37531a?w=400&h=500&fit=crop" }
];

let cart = [];

// =============================================
// دالة عرض المنتجات (شغالة للرئيسية والأقسام)
// =============================================
function renderProducts(productsArray, containerId = 'productsContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!productsArray || productsArray.length === 0) {
        container.innerHTML = '<p class="text-gray-400 text-center">لا توجد منتجات في هذا القسم حالياً</p>';
        return;
    }
    container.innerHTML = productsArray.map(p => {
        // تحديد خيارات المقاسات بناءً على النطاق
        let sizeOptions = '';
        if (p.size === "30-38") {
            for (let i = 30; i <= 38; i+=2) {
                sizeOptions += `<option value="${i}">مقاس ${i}</option>`;
            }
        } else {
            const sizes = ['M', 'L', 'XL'];
            sizes.forEach(s => sizeOptions += `<option value="${s}">مقاس ${s}</option>`);
        }

        return `
        <div class="product-card bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-800">
            <img src="${p.image}" alt="${p.name}" class="w-full h-64 object-cover" />
            <div class="p-4">
                <h4 class="text-lg font-bold text-white">${p.name}</h4>
                <p class="text-sm text-gray-400">اللون: ${p.color}</p>
                <div class="flex items-center gap-2 mt-2">
                    <label class="text-xs text-gray-400">المقاس:</label>
                    <select id="size_${p.id}" class="size-select text-sm">
                        ${sizeOptions}
                    </select>
                </div>
                <div class="flex justify-between items-center mt-3">
                    <span class="text-xl font-bold text-[#D4AF37]">${p.price} ج.م</span>
                    <button onclick="addToCart(${p.id})" class="bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold px-4 py-2 rounded-full text-sm transition flex items-center gap-1">
                        <i class="fas fa-plus"></i> أضف للسلة
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
}

// =============================================
// منطق العربة (مع المقاس)
// =============================================
function addToCart(productId) {
    // البحث عن المنتج في أي مصفوفة (عامة أو مميزة)
    let product = window.products ? window.products.find(p => p.id === productId) : null;
    if (!product) product = featuredProducts.find(p => p.id === productId);
    if (!product) return;

    const sizeSelect = document.getElementById(`size_${productId}`);
    const selectedSize = sizeSelect ? sizeSelect.value : 'غير محدد';

    const existing = cart.find(item => item.id === productId && item.size === selectedSize);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, size: selectedSize, quantity: 1 });
    }
    updateCartUI();

    // تأثير اهتزاز للزر
    const btn = document.querySelector(`button[onclick="addToCart(${productId})"]`);
    if(btn) { btn.style.transform = 'scale(0.9)'; setTimeout(() => btn.style.transform = 'scale(1)', 150); }
}

function removeFromCart(index) { cart.splice(index, 1); updateCartUI(); }
function increaseQty(index) { cart[index].quantity += 1; updateCartUI(); }
function decreaseQty(index) {
    if (cart[index].quantity > 1) cart[index].quantity -= 1;
    else cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;

    const container = document.getElementById('cartItems');
    if (cart.length === 0) {
        container.innerHTML = `<p class="text-gray-500 text-center">السلة فارغة</p>`;
    } else {
        container.innerHTML = cart.map((item, index) => `
            <div class="flex items-center gap-3 bg-gray-800 p-2 rounded-lg border border-gray-700">
                <img src="${item.image}" class="w-12 h-12 rounded object-cover" />
                <div class="flex-1">
                    <p class="text-sm font-bold text-white">${item.name}</p>
                    <p class="text-xs text-gray-400">مقاس: ${item.size}</p>
                    <p class="text-xs text-[#D4AF37]">${item.price} ج.م</p>
                </div>
                <div class="flex items-center gap-1">
                    <button onclick="decreaseQty(${index})" class="bg-gray-700 text-white w-6 h-6 rounded hover:bg-red-600">-</button>
                    <span class="text-white w-6 text-center">${item.quantity}</span>
                    <button onclick="increaseQty(${index})" class="bg-gray-700 text-white w-6 h-6 rounded hover:bg-green-600">+</button>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-600"><i class="fas fa-trash"></i></button>
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

// =============================================
// زرار واتساب السحري (إتمام الطلب)
// =============================================
function whatsappCheckout() {
    if (cart.length === 0) {
        alert('السلة فارغة! أضف بعض المنتجات أولاً.');
        return;
    }
    let message = 'أهلاً Pantalon 👋، حابب أطلب المنتجات دي:%0a';
    cart.forEach(item => {
        message += `- ${item.name} (مقاس: ${item.size}) × ${item.quantity} = ${item.price * item.quantity} ج.م%0a`;
    });
    const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    message += `%0aالإجمالي: ${total.toFixed(2)} ج.م%0a`;
    message += `%0aاسم العميل: [ ]%0aالعنوان للتوصيل: [ ]`;

    const url = `https://wa.me/201080787739?text=${message}`;
    window.open(url, '_blank');
}

// =============================================
// تشغيل العرض عند تحميل الصفحة
// =============================================
// لو في بيانات عامة (في صفحات الأقسام)، ارسمها
if (window.products && window.products.length > 0) {
    renderProducts(window.products, 'productsContainer');
} 
// لو في صفحة رئيسية وفيها كونتينر مميز، ارسم المميزات
else if (document.getElementById('featuredContainer')) {
    renderProducts(featuredProducts, 'featuredContainer');
}
// لو في صفحة رئيسية وفيها كونتينر عادي، ارسم المميزات برضه (للأمان)
else if (document.getElementById('productsContainer')) {
    renderProducts(featuredProducts, 'productsContainer');
}
