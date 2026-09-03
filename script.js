// =============================================
// البيانات (منتجات حقيقية)
// =============================================
const allProducts = [
    {
        id: 1,
        name: "Classic Baggy Jeans",
        category: "jeans",
        price: 899,
        oldPrice: 999,
        colors: ["Black", "Blue", "Grey"],
        sizes: ["30", "32", "34", "36", "38"],
        description: "High-quality denim with a relaxed baggy fit. Perfect for everyday streetwear style.",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=700&fit=crop",
            "https://images.unsplash.com/photo-1582555172866-f73bb12f2ab3?w=600&h=700&fit=crop",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=700&fit=crop"
        ],
        isBestSeller: true,
        isNew: false
    },
    {
        id: 2,
        name: "Slim Fit Denim Jeans",
        category: "jeans",
        price: 750,
        oldPrice: null,
        colors: ["Dark Blue", "Black"],
        sizes: ["30", "32", "34", "36"],
        description: "Slim fit jeans that offer a modern silhouette without compromising on comfort.",
        image: "https://images.unsplash.com/photo-1584865288642-420a9d2d4f3c?w=400&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1584865288642-420a9d2d4f3c?w=600&h=700&fit=crop",
            "https://images.unsplash.com/photo-1582555172866-f73bb12f2ab3?w=600&h=700&fit=crop"
        ],
        isBestSeller: false,
        isNew: true
    },
    {
        id: 3,
        name: "Oversized T-Shirt",
        category: "tshirts",
        price: 499,
        oldPrice: 650,
        colors: ["White", "Black", "Beige"],
        sizes: ["M", "L", "XL"],
        description: "Premium cotton oversized t-shirt. A staple piece for any modern wardrobe.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop",
            "https://images.unsplash.com/photo-1503342394126-c6e7f1d3c7b9?w=600&h=700&fit=crop"
        ],
        isBestSeller: true,
        isNew: false
    },
    {
        id: 4,
        name: "Classic Black T-Shirt",
        category: "tshirts",
        price: 350,
        oldPrice: null,
        colors: ["Black"],
        sizes: ["M", "L", "XL"],
        description: "The perfect classic black tee. Soft, durable, and versatile for any occasion.",
        image: "https://images.unsplash.com/photo-1503342394126-c6e7f1d3c7b9?w=400&h=500&fit=crop",
        images: ["https://images.unsplash.com/photo-1503342394126-c6e7f1d3c7b9?w=600&h=700&fit=crop"],
        isBestSeller: false,
        isNew: true
    },
    {
        id: 5,
        name: "Cargo Sweatpants",
        category: "sweatpants",
        price: 690,
        oldPrice: 850,
        colors: ["Grey", "Black", "Olive"],
        sizes: ["M", "L", "XL"],
        description: "Comfortable cargo sweatpants with multiple pockets. Great for lounging or streetwear.",
        image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&h=700&fit=crop",
            "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&h=700&fit=crop"
        ],
        isBestSeller: true,
        isNew: false
    },
    {
        id: 6,
        name: "Essential Sweatpants",
        category: "sweatpants",
        price: 590,
        oldPrice: null,
        colors: ["Navy", "Grey"],
        sizes: ["M", "L", "XL"],
        description: "Minimalist sweatpants with a perfect fit. Made from ultra-soft fleece.",
        image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=400&h=500&fit=crop",
        images: ["https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&h=700&fit=crop"],
        isBestSeller: false,
        isNew: true
    },
    {
        id: 7,
        name: "Straight Leg Jeans",
        category: "jeans",
        price: 820,
        oldPrice: 920,
        colors: ["Light Blue", "Black"],
        sizes: ["30", "32", "34"],
        description: "Classic straight leg jeans for a timeless look. Comfortable and stylish.",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=700&fit=crop"],
        isBestSeller: false,
        isNew: true
    },
    {
        id: 8,
        name: "Beige Oversized Tee",
        category: "tshirts",
        price: 450,
        oldPrice: null,
        colors: ["Beige"],
        sizes: ["M", "L", "XL"],
        description: "Premium beige oversized t-shirt. A must-have neutral piece.",
        image: "https://images.unsplash.com/photo-1519638831568-d9854f47c9e1?w=400&h=500&fit=crop",
        images: ["https://images.unsplash.com/photo-1519638831568-d9854f47c9e1?w=600&h=700&fit=crop"],
        isBestSeller: false,
        isNew: false
    }
];

// =============================================
// إدارة العربة (LocalStorage)
// =============================================
let cart = JSON.parse(localStorage.getItem('pantalon_cart')) || [];

function saveCart() {
    localStorage.setItem('pantalon_cart', JSON.stringify(cart));
    updateCartUI();
}

// =============================================
// عرض المنتجات (مع فلتر، بحث، ترتيب)
// =============================================
function renderProducts(productsArray, containerId = 'productsContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // منتجات مميزة للرئيسية
    let displayProducts = productsArray;

    // تطبيق الفلاتر العامة (لو موجودة في الصفحة)
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sizeFilter = document.getElementById('sizeFilter');
    const colorFilter = document.getElementById('colorFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (searchInput) {
        const query = searchInput.value.toLowerCase();
        if (query) displayProducts = displayProducts.filter(p => p.name.toLowerCase().includes(query) || p.category.includes(query));
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
        container.innerHTML = `<p class="text-gray-400 text-center col-span-full">No products found.</p>`;
        return;
    }

    container.innerHTML = displayProducts.map(p => {
        // تحديد أول لون وأول مقاس للـ Quick Add
        const defaultSize = p.sizes[0];
        const defaultColor = p.colors[0];
        const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
        let badgeHTML = '';
        if (p.isBestSeller) badgeHTML = `<span class="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">🔥 BEST SELLER</span>`;
        else if (p.isNew) badgeHTML = `<span class="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">✨ NEW</span>`;

        return `
            <div class="product-card bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-800 relative group">
                ${badgeHTML}
                <div onclick="window.location.href='product.html?id=${p.id}'" class="cursor-pointer">
                    <img src="${p.image}" alt="${p.name}" class="w-full h-64 object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div class="p-4">
                    <div onclick="window.location.href='product.html?id=${p.id}'" class="cursor-pointer">
                        <h4 class="text-lg font-bold text-white hover:text-[#D4AF37] transition">${p.name}</h4>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-xl font-bold text-[#D4AF37]">${p.price} EGP</span>
                            ${p.oldPrice ? `<span class="text-sm text-gray-500 line-through">${p.oldPrice} EGP</span>` : ''}
                            ${discount > 0 ? `<span class="text-xs text-green-400 font-bold">-${discount}%</span>` : ''}
                        </div>
                        <div class="flex items-center gap-1 mt-2 flex-wrap">
                            ${p.colors.map(c => `<span class="w-4 h-4 rounded-full border border-gray-600 inline-block" style="background-color: ${c.toLowerCase() === 'black' ? '#111' : c.toLowerCase() === 'white' ? '#fff' : c.toLowerCase() === 'blue' ? '#2563eb' : c.toLowerCase() === 'grey' ? '#6b7280' : c.toLowerCase() === 'beige' ? '#f5f5dc' : c.toLowerCase() === 'olive' ? '#556b2f' : c.toLowerCase() === 'navy' ? '#0a192f' : c.toLowerCase() === 'dark blue' ? '#1e3a8a' : c.toLowerCase() === 'light blue' ? '#93c5fd' : '#ccc' }"></span>`).join('')}
                        </div>
                        <div class="flex items-center gap-2 mt-2">
                            <select id="size_${p.id}" class="size-select text-xs bg-gray-800 text-white border border-gray-600 rounded px-2 py-1">
                                ${p.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
                            </select>
                            <select id="color_${p.id}" class="size-select text-xs bg-gray-800 text-white border border-gray-600 rounded px-2 py-1">
                                ${p.colors.map(c => `<option value="${c}">${c}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <button onclick="addToCart(${p.id})" class="w-full mt-3 bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold py-2 rounded-full transition text-sm flex items-center justify-center gap-2">
                        <i class="fas fa-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// =============================================
// إضافة للسلة (مع اختيار المقاس واللون)
// =============================================
function addToCart(productId) {
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
    // تأثير الزر
    const btn = document.querySelector(`button[onclick="addToCart(${productId})"]`);
    if (btn) { btn.style.transform = 'scale(0.9)'; setTimeout(() => btn.style.transform = 'scale(1)', 150); }
}

// =============================================
// دوال العربة (UI)
// =============================================
function removeFromCart(index) { cart.splice(index, 1); saveCart(); }
function increaseQty(index) { cart[index].quantity += 1; saveCart(); }
function decreaseQty(index) {
    if (cart[index].quantity > 1) cart[index].quantity -= 1;
    else cart.splice(index, 1);
    saveCart();
}

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
                <div class="flex-1">
                    <p class="text-sm font-bold text-white">${item.name}</p>
                    <p class="text-xs text-gray-400">${item.color} | ${item.size}</p>
                    <p class="text-xs text-[#D4AF37]">${item.price} EGP</p>
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
    document.querySelectorAll('#cartTotal').forEach(el => el.textContent = total.toFixed(2) + ' EGP');
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('open');
}

// =============================================
// واتساب الذكي
// =============================================
function whatsappCheckout() {
    if (cart.length === 0) { alert('Your cart is empty!'); return; }
    let message = 'Hello Pantalon 👋,%0aI would like to order:%0a';
    cart.forEach(item => {
        message += `• ${item.name} - ${item.color} - ${item.size} - ${item.quantity} x ${item.price} EGP = ${item.price * item.quantity} EGP%0a`;
    });
    const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    message += `%0aTotal: ${total.toFixed(2)} EGP%0a`;
    message += `%0aName: [ ]%0aPhone: [ ]%0aAddress: [ ]`;
    window.open(`https://wa.me/201080787739?text=${message}`, '_blank');
}

// =============================================
// تشغيل العرض عند تحميل الصفحة
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    // لو في صفحة رئيسية وفيها كونتينر مميز، ارسم المميزات
    if (document.getElementById('featuredContainer')) {
        const featured = allProducts.filter(p => p.isBestSeller || p.isNew).slice(0, 4);
        renderProducts(featured, 'featuredContainer');
    }
    // لو في صفحة الأقسام (jeans, basics, sweatpants) او الصفحة الرئيسية للكل
    if (document.getElementById('productsContainer') && !document.getElementById('featuredContainer')) {
        // تصفية حسب الفئة من الـ URL أو الـ default
        const path = window.location.pathname;
        let cat = null;
        if (path.includes('jeans')) cat = 'jeans';
        else if (path.includes('basics')) cat = 'tshirts';
        else if (path.includes('sweatpants')) cat = 'sweatpants';
        if (cat) {
            const filtered = allProducts.filter(p => p.category === cat);
            renderProducts(filtered, 'productsContainer');
        } else {
            renderProducts(allProducts, 'productsContainer');
        }
    }
    // لو في صفحة تفاصيل المنتج
    if (document.getElementById('productDetail')) {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get('id'));
        renderProductDetail(id);
    }
    // تحديث واجهة العربة
    updateCartUI();

    // ربط الفلاتر والبحث (لو موجودة)
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sizeFilter = document.getElementById('sizeFilter');
    const colorFilter = document.getElementById('colorFilter');
    const sortFilter = document.getElementById('sortFilter');

    const applyFilters = () => {
        const container = document.getElementById('productsContainer');
        if (container) renderProducts(allProducts, 'productsContainer');
    };

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (sizeFilter) sizeFilter.addEventListener('change', applyFilters);
    if (colorFilter) colorFilter.addEventListener('change', applyFilters);
    if (sortFilter) sortFilter.addEventListener('change', applyFilters);
});

// =============================================
// صفحة تفاصيل المنتج
// =============================================
function renderProductDetail(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) {
        document.getElementById('productDetail').innerHTML = '<p class="text-center text-gray-400">Product not found.</p>';
        return;
    }

    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

    // صور المعرض
    const galleryHTML = product.images.map((img, idx) => `
        <img src="${img}" alt="${product.name}" class="w-20 h-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-[#D4AF37] transition" onclick="changeMainImage(this.src)" />
    `).join('');

    document.getElementById('productDetail').innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <img id="mainImage" src="${product.images[0]}" alt="${product.name}" class="w-full h-96 object-cover rounded-2xl border border-gray-700" />
                <div class="flex gap-2 mt-4 overflow-x-auto pb-2">
                    ${galleryHTML}
                </div>
            </div>
            <div>
                <h1 class="text-3xl font-bold text-white">${product.name}</h1>
                <div class="flex items-center gap-3 mt-2">
                    <span class="text-2xl font-bold text-[#D4AF37]">${product.price} EGP</span>
                    ${product.oldPrice ? `<span class="text-lg text-gray-500 line-through">${product.oldPrice} EGP</span>` : ''}
                    ${discount > 0 ? `<span class="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">-${discount}%</span>` : ''}
                </div>
                <p class="text-gray-400 mt-4 text-sm leading-relaxed">${product.description}</p>
                
                <div class="mt-4">
                    <label class="text-sm text-gray-400 block mb-1">Color:</label>
                    <div class="flex gap-2 flex-wrap">
                        ${product.colors.map(c => `<button onclick="selectColor(this, '${c}')" class="px-4 py-1 border border-gray-600 rounded-full text-xs hover:border-[#D4AF37] transition ${c === product.colors[0] ? 'border-[#D4AF37] bg-[#D4AF37]/10' : ''}">${c}</button>`).join('')}
                    </div>
                </div>

                <div class="mt-4">
                    <label class="text-sm text-gray-400 block mb-1">Size:</label>
                    <div class="flex gap-2 flex-wrap">
                        ${product.sizes.map(s => `<button onclick="selectSize(this, '${s}')" class="px-4 py-1 border border-gray-600 rounded-full text-xs hover:border-[#D4AF37] transition ${s === product.sizes[0] ? 'border-[#D4AF37] bg-[#D4AF37]/10' : ''}">${s}</button>`).join('')}
                    </div>
                </div>

                <button onclick="addToCartDetail(${product.id})" class="w-full mt-6 bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold py-3 rounded-full transition flex items-center justify-center gap-2">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
        <div class="mt-16 border-t border-gray-800 pt-8">
            <h3 class="text-2xl font-bold text-white mb-4">✨ You May Also Like</h3>
            <div id="similarProducts" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"></div>
        </div>
    `;

    // عرض المنتجات المشابهة (نفس الفئة)
    const similar = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const simContainer = document.getElementById('similarProducts');
    if (simContainer) {
        simContainer.innerHTML = similar.map(p => `
            <div onclick="window.location.href='product.html?id=${p.id}'" class="bg-gray-900 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition border border-gray-800">
                <img src="${p.image}" class="w-full h-48 object-cover" />
                <div class="p-3">
                    <h4 class="text-sm font-bold text-white">${p.name}</h4>
                    <p class="text-[#D4AF37] font-bold">${p.price} EGP</p>
                </div>
            </div>
        `).join('');
    }

    // متغيرات لتخزين الاختيارات في صفحة التفاصيل
    window._detailColor = product.colors[0];
    window._detailSize = product.sizes[0];
}

// دوال مساعدة لصفحة التفاصيل
function changeMainImage(src) {
    document.getElementById('mainImage').src = src;
}
function selectColor(el, color) {
    document.querySelectorAll('#productDetail .border-gray-600').forEach(b => b.classList.remove('border-[#D4AF37]', 'bg-[#D4AF37]/10'));
    el.classList.add('border-[#D4AF37]', 'bg-[#D4AF37]/10');
    window._detailColor = color;
}
function selectSize(el, size) {
    document.querySelectorAll('#productDetail .border-gray-600').forEach(b => b.classList.remove('border-[#D4AF37]', 'bg-[#D4AF37]/10'));
    el.classList.add('border-[#D4AF37]', 'bg-[#D4AF37]/10');
    window._detailSize = size;
}
function addToCartDetail(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    const selectedSize = window._detailSize || product.sizes[0];
    const selectedColor = window._detailColor || product.colors[0];
    const existing = cart.find(item => item.id === productId && item.size === selectedSize && item.color === selectedColor);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, size: selectedSize, color: selectedColor, quantity: 1 });
    saveCart();
    alert('Product added to cart!');
}
