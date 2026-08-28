/**
 * Firoze Store - Core Client Script
 * Pure Vanilla JS, No Build Step Required
 */

// Initial Seed Products Catalog Data
const DEFAULT_PRODUCTS_DATA = [
  {
    id: "prod-1",
    title: "تونیک",
    category: "poshak",
    categoryLabel: "پوشاک زنانه",
    price: 1200000,
    priceFormatted: "۱,۲۰۰,۰۰۰ تومان",
    image: "assets/images/geometric_tunic_1787934970772.jpg",
    badge: "کالکشن جدید",
    badgeType: "primary",
    description: "تونیک زنانه آستین بلند با پترن خطی و ژئومتریک مدرن سیاه و سفید، بافته شده از پارچه استرچ اعلا با تن‌خور اسلیم، راحت و جذاب.",
    specs: [
      "جنس: نخ پنبه استرچ با کشسانی بالا و دوام عالی",
      "طرح: پترن ژئومتریک مدرن انتزاعی سیاه و سفید",
      "آستین: آستین بلند",
      "سایزبندی: ۳۸ تا ۴۴",
      "مناسب: استفاده روزمره، دورهمی‌ها و استایل‌های شیک"
    ],
    reviews: [
      { name: "ناهید ع.", rating: 5, comment: "تن‌خور فوق‌العاده شیک و راحتی داره، طرحش هم دقیقاً مثل عکسه." }
    ]
  },
  {
    id: "prod-2",
    title: "شلوار زنانه طرح گل (فلورال)",
    category: "poshak",
    categoryLabel: "پوشاک زنانه",
    price: 600000,
    priceFormatted: "۶۰۰,۰۰۰ تومان",
    image: "assets/images/floral_pants_1787934568679.jpg",
    badge: "طرح‌های متنوع",
    badgeType: "tertiary",
    description: "شلوار زنانه راحتی و بیرونی با پارچه نخی و پترن گلدار بسیار شیک، تن‌خور آزاد، لطیف و خنک. (توجه: طرح‌های دیگر و رنگ‌بندی‌های متنوع نیز موجود است؛ جهت مشاهده مدل‌های بیشتر در تلگرام پیام دهید).",
    specs: [
      "جنس: نخی پنبه‌ای بسیار لطیف و تنفس‌پذیر",
      "طرح: گلدار فلورال (طرح‌های دیگر نیز موجود است)",
      "کمر: کشی راحت با دوام بالا",
      "سایزبندی: فری سایز مناسب ۳۸ تا ۴۸",
      "تنوع: امکان سفارش در طرح‌ها و پترن‌های متنوع"
    ],
    reviews: [
      { name: "سمیرا ط.", rating: 5, comment: "خیلی راحت و شیکه، جنس پارچه‌ش هم برای تو خونه و هم بیرون عالیه." }
    ]
  },
  {
    id: "prod-3",
    title: "تیشرت زنانه طرح گل اسلیم‌فیت (سیاه و سفید)",
    category: "poshak",
    categoryLabel: "پوشاک زنانه",
    price: 800000,
    priceFormatted: "۸۰۰,۰۰۰ تومان",
    image: "assets/images/bw_floral_tshirt_1787934582644.jpg",
    badge: "کالکشن جدید",
    badgeType: "secondary",
    description: "تیشرت زنانه با پترن گلدار مونوکروم سیاه و سفید، دوخت بسیار تمیز و پارچه نخ پنبه سوپر با کشسانی بالا و فرم‌دهی عالی به اندام.",
    specs: [
      "جنس: نخ پنبه سوپر اعلا با بافت خنک",
      "طرح: پترن انتزاعی گل و برگ سیاه و سفید",
      "فرم یقه: یقه گرد استاندارد",
      "سایزبندی: مناسب ۳۸ تا ۴۴",
      "شستشو: ضد حساسیت و مقاوم در برابر شستشو"
    ],
    reviews: [
      { name: "الهام ر.", rating: 5, comment: "طرح سیاه و سفیدش فوق‌العاده خاصه و با هر شلواری ست میشه." }
    ]
  },
  {
    id: "prod-4",
    title: "تیشرت زنانه طرح پلنگی",
    category: "poshak",
    categoryLabel: "پوشاک زنانه",
    price: 800000,
    priceFormatted: "۸۰۰,۰۰۰ تومان",
    image: "assets/images/leopard_tshirt_1787934598039.jpg",
    badge: "ترند سال",
    badgeType: "primary",
    description: "تیشرت زنانه کژوال و شیک با طرح پلنگی ریز و جلوه مدرن، بافته شده از نخ ویسکوز لطیف با حس خنکی و راحتی مضاعف برای استفاده روزمره و دورهمی‌ها.",
    specs: [
      "جنس: ویسکوز اعلا با کشسانی مناسب",
      "طرح: انیمال پرینت پلنگی ریز",
      "تن‌خور: استاندارد و فیت خوش‌فرم",
      "سایزبندی: فیری سایز (۳۸ تا ۴۴)"
    ],
    reviews: [
      { name: "نگار س.", rating: 5, comment: "پارچه نرم و لطیف، طرح پلنگی خیلی قشنگ روی تن می‌شینه." }
    ]
  },
  {
    id: "prod-5",
    title: "تیشرت زنانه مشکی یقه هفت نگین‌دار",
    category: "poshak",
    isDiscounted: true,
    originalPrice: 600000,
    originalPriceFormatted: "۶۰۰,۰۰۰ تومان",
    categoryLabel: "تخفیف ویژه",
    price: 500000,
    priceFormatted: "۵۰۰,۰۰۰ تومان",
    image: "assets/images/black_vneck_tshirt_1787932313187.jpg",
    badge: "تخفیف ویژه",
    badgeType: "error",
    description: "تیشرت مجلسی زنانه مشکی با یقه هفت کار شده با نگین‌های متراکم درخشان و دوخت صنعتی بدون ریزش نگین، بافته شده از نخ پنبه ویسکوز اعلا و بسیار لطیف (قیمت اصلی ۶۰۰,۰۰۰ تومان با تخفیف ویژه ۵۰۰,۰۰۰ تومان).",
    specs: [
      "جنس: نخ پنبه ویسکوز کشسان درجه یک",
      "طرح یقه: یقه هفت کارشده با نگین حرارتی ضد ریزش",
      "قد تیشرت: ۶۵ سانتی‌متر",
      "سایزبندی: فیری سایز مناسب ۳۸ تا ۴۶",
      "تخفیف: ۱۰۰,۰۰۰ تومان تخفیف ویژه روی قیمت محصول"
    ],
    reviews: [
      { name: "رویا ت.", rating: 5, comment: "نگین‌هاش خیلی تمیز و براق کار شدن، تخفیفش هم عالیه واقعاً ارزش خرید داره." }
    ]
  },
  {
    id: "prod-6",
    title: "دامن نخی ساحلی فلورال",
    category: "poshak",
    categoryLabel: "پوشاک زنانه",
    price: 750000,
    priceFormatted: "۷۵۰,۰۰۰ تومان",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoW5IRHgl1GbPbGAnedT_VysgnGuuH-Apq4p3q2HA9lS7I_gsdPYU6WJWwG3AtNtshXk15oERW_wFo_9SyjbKrtGb5VV1vA1r14Y3Zzwx9VUCj6kP9Q5x73wZutHCzVuH-Zw25TcSNJRnI3gjFZRkHctYdVCHmmsF786RhJQok1mTQ3CTBAtAfZT13-_E5j0ugjWR4Ufp-Mg6ohlNX2--dqAmkvi18xKiqN-jMPQVdZH6_GwEWEtkP5IfQI2fUq-Lfk6DnOflKtr_E2r4",
    badge: "محبوب",
    badgeType: "primary",
    description: "دامن بلند نخی بسیار سبک و خنک با پترن انتزاعی مدرن، مناسب فصول بهار و تابستان و استایل‌های روزمره کژوال و شیک.",
    specs: [
      "جنس: ۱۰۰٪ پنبه طبیعی با بافت خنک و تنفس‌پذیر",
      "قد دامن: ۹۵ سانتی‌متر",
      "کمربند: کشی کشباف ضد حساسیت",
      "رنگ‌بندی: سرمه‌ای مشکی با نقوش سپید"
    ],
    reviews: [
      { name: "نیلوفر ع.", rating: 5, comment: "خیلی خنک و سبکه، برای تابستون عالیه." }
    ]
  }
];

// Product Store with LocalStorage Persistence
const PRODUCT_STORAGE_KEY = "firoze_products_v2";

function getStoredProducts() {
  try {
    const raw = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS_DATA));
      return DEFAULT_PRODUCTS_DATA;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PRODUCTS_DATA;
  } catch (e) {
    return DEFAULT_PRODUCTS_DATA;
  }
}

function saveStoredProducts(products) {
  try {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error("Error saving products:", e);
  }
}

function resetStoredProducts() {
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS_DATA));
  return DEFAULT_PRODUCTS_DATA;
}

// Active dynamic products reference
let PRODUCTS_DATA = getStoredProducts();

// Telegram Bot Username
const TELEGRAM_BOT_USERNAME = "firozehstorebot";

// Cart Store
class CartManager {
  constructor() {
    this.storageKey = "firoze_cart_items";
    this.items = this.load();
  }

  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
      this.updateBadges();
    } catch (e) {
      console.error(e);
    }
  }

  addItem(productId, qty = 1) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const existing = this.items.find(item => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: product.priceFormatted,
        image: product.image,
        qty: qty
      });
    }
    this.save();
    showToast(`«${product.title}» به سبد خرید اضافه شد ✨`);
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
    this.renderCartModal();
  }

  updateQty(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.removeItem(productId);
    } else {
      this.save();
      this.renderCartModal();
    }
  }

  clear() {
    this.items = [];
    this.save();
    this.renderCartModal();
  }

  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  getCount() {
    return this.items.reduce((count, item) => count + item.qty, 0);
  }

  updateBadges() {
    const count = this.getCount();
    const badges = document.querySelectorAll('.cart-badge-count');
    badges.forEach(badge => {
      if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    });

    const dotIndicators = document.querySelectorAll('.cart-dot-indicator');
    dotIndicators.forEach(dot => {
      if (count > 0) {
        dot.classList.remove('hidden');
      } else {
        dot.classList.add('hidden');
      }
    });
  }

  generateTelegramOrderUrl(product = null) {
    let message = "";
    if (product) {
      message = `سلام! قصد سفارش این محصول را از سایت فیروزه دارم:\n\n🛍️ نام محصول: ${product.title}\n💰 قیمت: ${product.priceFormatted}\n🔗 کد کالا: ${product.id}\n\nلطفاً راهنمایی بفرمایید.`;
    } else if (this.items.length > 0) {
      const itemsList = this.items.map((it, idx) => `${idx + 1}. ${it.title} (تعداد: ${it.qty}) - ${(it.price * it.qty).toLocaleString('fa-IR')} تومان`).join("\n");
      const totalFormatted = this.getTotalPrice().toLocaleString('fa-IR') + " تومان";
      message = `سلام! لیست سبد خرید من از سایت فیروزه استور:\n\n${itemsList}\n\n💳 جمع کل: ${totalFormatted}\n\nلطفاً برای تکمیل پرداخت و ارسال راهنمایی بفرمایید.`;
    } else {
      message = `سلام! برای مشاوره و خرید محصولات فروشگاه فیروزه پیام می‌دهم.`;
    }

    const encoded = encodeURIComponent(message);
    return `https://t.me/${TELEGRAM_BOT_USERNAME}?text=${encoded}`;
  }

  renderCartModal() {
    const modalContent = document.getElementById('cart-modal-items');
    const modalTotal = document.getElementById('cart-modal-total');
    const checkoutBtn = document.getElementById('cart-modal-checkout-btn');
    if (!modalContent) return;

    if (this.items.length === 0) {
      modalContent.innerHTML = `
        <div class="py-12 flex flex-col items-center justify-center text-center text-on-surface-variant/70 gap-3">
          <span class="material-symbols-outlined text-5xl text-primary/40">shopping_cart_off</span>
          <p class="font-title-md">سبد خرید شما در حال حاضر خالی است.</p>
          <a href="products.html" class="mt-4 px-6 py-2 rounded-full glass-panel text-primary text-sm font-bold hover:bg-white/5 transition-colors">
            مشاهده محصولات
          </a>
        </div>
      `;
      if (modalTotal) modalTotal.textContent = "۰ تومان";
      if (checkoutBtn) {
        checkoutBtn.classList.add('opacity-50', 'pointer-events-none');
        checkoutBtn.href = "#";
      }
    } else {
      let html = '<div class="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">';
      this.items.forEach(item => {
        const itemTotal = (item.price * item.qty).toLocaleString('fa-IR');
        html += `
          <div class="glass-panel p-3 rounded-xl flex items-center justify-between gap-3">
            <img src="${item.image}" alt="${item.title}" class="w-16 h-16 rounded-lg object-cover bg-surface-container-low shrink-0">
            <div class="flex-1 min-w-0">
              <h4 class="font-title-md text-sm text-on-surface truncate">${item.title}</h4>
              <span class="text-xs text-secondary font-semibold block mt-1">${itemTotal} تومان</span>
            </div>
            <div class="flex items-center gap-2 bg-surface-container-low px-2 py-1 rounded-lg border border-white/10 shrink-0">
              <button onclick="cart.updateQty('${item.id}', -1)" class="text-on-surface-variant hover:text-primary active:scale-90 text-sm">
                <span class="material-symbols-outlined text-base">remove</span>
              </button>
              <span class="text-xs font-bold w-4 text-center text-primary">${item.qty}</span>
              <button onclick="cart.updateQty('${item.id}', 1)" class="text-on-surface-variant hover:text-primary active:scale-90 text-sm">
                <span class="material-symbols-outlined text-base">add</span>
              </button>
            </div>
            <button onclick="cart.removeItem('${item.id}')" class="text-error/70 hover:text-error active:scale-90 p-1" title="حذف">
              <span class="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        `;
      });
      html += '</div>';
      modalContent.innerHTML = html;

      if (modalTotal) {
        modalTotal.textContent = this.getTotalPrice().toLocaleString('fa-IR') + " تومان";
      }
      if (checkoutBtn) {
        checkoutBtn.classList.remove('opacity-50', 'pointer-events-none');
        checkoutBtn.href = this.generateTelegramOrderUrl();
      }
    }
  }
}

// Global Toast System
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// Global Drawer Controller
function initDrawer() {
  const menuBtns = document.querySelectorAll('.menu-toggle-btn');
  const closeBtn = document.getElementById('close-drawer-btn');
  const drawer = document.getElementById('nav-drawer');
  const overlay = document.getElementById('drawer-overlay');

  if (!drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
  }

  menuBtns.forEach(btn => btn.addEventListener('click', openDrawer));
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
}

// Cart Modal Controller
function initCartModal() {
  const cartTriggers = document.querySelectorAll('.cart-toggle-btn');
  const cartModal = document.getElementById('cart-modal');
  const cartOverlay = document.getElementById('cart-modal-overlay');
  const closeCartBtn = document.getElementById('close-cart-modal-btn');

  if (!cartModal || !cartOverlay) return;

  function openCart(e) {
    if (e) e.preventDefault();
    cart.renderCartModal();
    cartModal.classList.remove('hidden');
    cartOverlay.classList.remove('hidden');
    setTimeout(() => {
      cartModal.classList.remove('opacity-0', 'scale-95');
      cartOverlay.classList.remove('opacity-0');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartModal.classList.add('opacity-0', 'scale-95');
    cartOverlay.classList.add('opacity-0');
    setTimeout(() => {
      cartModal.classList.add('hidden');
      cartOverlay.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
  }

  cartTriggers.forEach(btn => btn.addEventListener('click', openCart));
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
}

// Accordions for FAQ
function initAccordions() {
  const accordionButtons = document.querySelectorAll('.accordion-toggle');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const content = parent.querySelector('.accordion-content');
      const icon = btn.querySelector('.accordion-icon');
      const isOpen = parent.classList.contains('active');

      // Close other accordions in the group
      document.querySelectorAll('.accordion-item.active').forEach(item => {
        if (item !== parent) {
          item.classList.remove('active');
          const itemContent = item.querySelector('.accordion-content');
          const itemIcon = item.querySelector('.accordion-icon');
          if (itemContent) {
            itemContent.style.maxHeight = null;
            itemContent.classList.add('opacity-0');
          }
          if (itemIcon) itemIcon.classList.remove('rotate-180');
        }
      });

      if (isOpen) {
        parent.classList.remove('active');
        if (content) {
          content.style.maxHeight = null;
          content.classList.add('opacity-0');
        }
        if (icon) icon.classList.remove('rotate-180');
      } else {
        parent.classList.add('active');
        if (content) {
          content.style.maxHeight = content.scrollHeight + "px";
          content.classList.remove('opacity-0');
        }
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

// Render dynamic featured products on homepage
function initHomeFeatured() {
  const container = document.getElementById('home-featured-products');
  if (!container) return;

  const featured = PRODUCTS_DATA.slice(0, 6);
  let html = '';

  featured.forEach(p => {
    const isDiscount = p.isDiscounted || p.category === 'takhfif' || p.badgeType === 'error';
    const badgeClass = p.badgeType === 'error' ? 'bg-error-container/90 text-error border-error/30 shadow-[0_0_15px_rgba(255,84,73,0.3)]' :
                       p.badgeType === 'secondary' ? 'bg-secondary-container/90 text-secondary border-secondary/30' :
                       p.badgeType === 'tertiary' ? 'bg-tertiary-container/90 text-tertiary border-tertiary/30' :
                       'bg-primary-container/90 text-primary border-primary/30';

    const borderClass = isDiscount ? 'border border-error/20 hover:shadow-[0_0_25px_rgba(255,84,73,0.2)]' : 'hover:shadow-[0_0_25px_rgba(191,193,255,0.15)]';
    const addBtnClass = isDiscount ? 'bg-error-container text-error hover:bg-error hover:text-white' : 'bg-primary-container text-white hover:bg-secondary-container';

    const priceHtml = p.originalPriceFormatted ? `
      <div class="flex items-center gap-2 mb-4">
        <span class="text-xs text-on-surface-variant/50 line-through">${p.originalPriceFormatted}</span>
        <span class="text-error font-bold text-sm">${p.priceFormatted}</span>
      </div>
    ` : `
      <div class="text-primary font-bold text-sm mb-4">${p.priceFormatted}</div>
    `;

    html += `
      <article class="glass-card rounded-2xl overflow-hidden flex flex-col group relative transition-all duration-300 hover:-translate-y-1 ${borderClass}">
        <div class="h-64 w-full relative overflow-hidden bg-surface-container-low">
          <span class="absolute top-3 right-3 z-20 ${badgeClass} text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1">
            ${isDiscount ? '<span class="material-symbols-outlined text-xs">local_fire_department</span>' : ''}
            <span>${p.badge || (isDiscount ? 'تخفیف ویژه' : 'کالکشن جدید')}</span>
          </span>
          <img src="${p.image}" 
               alt="${p.title}" 
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        </div>
        <div class="p-5 flex flex-col flex-1">
          <span class="text-xs ${isDiscount ? 'text-error' : 'text-secondary'} font-medium mb-1">${p.category === 'takhfif' ? 'تخفیف ویژه' : 'پوشاک زنانه'}</span>
          <h3 class="text-base font-bold text-on-surface mb-2 line-clamp-1">${p.title}</h3>
          ${priceHtml}
          <div class="mt-auto flex items-center gap-2">
            <a href="product-detail.html?id=${p.id}" class="flex-1 py-2.5 rounded-xl glass-panel text-center text-xs font-bold text-primary hover:bg-white/5 transition-colors">
              مشاهده جزئیات
            </a>
            <button onclick="cart.addItem('${p.id}')" class="p-2.5 rounded-xl ${addBtnClass} transition-colors active:scale-95" title="افزودن به سبد">
              <span class="material-symbols-outlined text-lg">add_shopping_cart</span>
            </button>
          </div>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
}

// Global Order Telegram Action Helper
function orderViaTelegram(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  const url = cart.generateTelegramOrderUrl(product);
  window.open(url, '_blank');
}

// Instantiate Cart
const cart = new CartManager();

// Global init on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initDrawer();
  initCartModal();
  initAccordions();
  initHomeFeatured();
  cart.updateBadges();

  // Telegram Quick Buy Headers
  const telegramBtns = document.querySelectorAll('.telegram-order-link');
  telegramBtns.forEach(btn => {
    btn.setAttribute('href', `https://t.me/${TELEGRAM_BOT_USERNAME}`);
    btn.setAttribute('target', '_blank');
  });
});
