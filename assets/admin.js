/**
 * Firoze Store - Admin Panel Logic
 * Handles Authentication, Product CRUD, Image Uploads to Base64/URLs, and Live Sync.
 */

// Storage keys
const ADMIN_AUTH_KEY = "firoze_admin_auth";
const ADMIN_PWD_KEY = "firoze_admin_password";
const DEFAULT_ADMIN_PWD = "admin123";

// Helper to format Persian currency
function formatCurrency(num) {
  if (!num) return "۰ تومان";
  return Number(num).toLocaleString('fa-IR') + ' تومان';
}

class AdminManager {
  constructor() {
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.init();
  }

  init() {
    this.bindEvents();
    this.checkAuth();
  }

  getPassword() {
    return localStorage.getItem(ADMIN_PWD_KEY) || DEFAULT_ADMIN_PWD;
  }

  setPassword(newPwd) {
    localStorage.setItem(ADMIN_PWD_KEY, newPwd);
  }

  isAuthenticated() {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
  }

  setAuthenticated(status) {
    if (status) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
    } else {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    }
  }

  checkAuth() {
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const logoutBtn = document.getElementById('logout-btn');

    if (this.isAuthenticated()) {
      loginSection.classList.add('hidden');
      dashboardSection.classList.remove('hidden');
      logoutBtn.classList.remove('hidden');
      this.renderTable();
    } else {
      loginSection.classList.remove('hidden');
      dashboardSection.classList.add('hidden');
      logoutBtn.classList.add('hidden');
    }
  }

  bindEvents() {
    // Login Form
    const loginForm = document.getElementById('admin-login-form');
    const pwdInput = document.getElementById('admin-password-input');
    const errorMsg = document.getElementById('login-error-msg');
    const togglePwdBtn = document.getElementById('toggle-pwd-btn');

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const entered = pwdInput.value.trim();
        if (entered === this.getPassword()) {
          errorMsg.classList.add('hidden');
          this.setAuthenticated(true);
          this.checkAuth();
          showToast("خوش آمدید مدیر گرامی! 🌸");
        } else {
          errorMsg.classList.remove('hidden');
          pwdInput.focus();
        }
      });
    }

    if (togglePwdBtn && pwdInput) {
      togglePwdBtn.addEventListener('click', () => {
        const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
        pwdInput.setAttribute('type', type);
        togglePwdBtn.querySelector('span').textContent = type === 'password' ? 'visibility' : 'visibility_off';
      });
    }

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.setAuthenticated(false);
        this.checkAuth();
        showToast("با موفقیت خارج شدید.");
      });
    }

    // Search and Filter
    const searchInput = document.getElementById('admin-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.renderTable();
      });
    }

    const catFilter = document.getElementById('admin-category-filter');
    if (catFilter) {
      catFilter.addEventListener('change', (e) => {
        this.currentFilter = e.target.value;
        this.renderTable();
      });
    }

    // Reset Defaults Button
    const resetBtn = document.getElementById('reset-default-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm("آیا مطمئنید می‌خواهید تمام محصولات به لیست اولیه کارخانه بازگردانی شوند؟")) {
          PRODUCTS_DATA = resetStoredProducts();
          this.renderTable();
          showToast("لیست محصولات با موفقیت بازنشانی شد.");
        }
      });
    }

    // Product Modal bindings
    this.bindProductModal();
    this.bindPasswordModal();
  }

  bindProductModal() {
    const modal = document.getElementById('product-modal');
    const overlay = document.getElementById('product-modal-overlay');
    const openBtn = document.getElementById('open-add-modal-btn');
    const closeBtn = document.getElementById('close-product-modal-btn');
    const cancelBtn = document.getElementById('cancel-product-modal-btn');
    const form = document.getElementById('product-form');
    const imageInput = document.getElementById('form-image');
    const imageFileInput = document.getElementById('form-image-file');
    const imagePreview = document.getElementById('form-image-preview');

    const openModal = (product = null) => {
      form.reset();
      if (product) {
        document.getElementById('modal-title').textContent = 'ویرایش مشخصات محصول';
        document.getElementById('modal-icon').textContent = 'edit';
        document.getElementById('submit-btn-label').textContent = 'به‌روزرسانی محصول';
        document.getElementById('form-product-id').value = product.id;
        document.getElementById('form-title').value = product.title || '';
        document.getElementById('form-category').value = product.category || 'poshak';
        document.getElementById('form-price').value = product.price || '';
        document.getElementById('form-original-price').value = product.originalPrice || '';
        document.getElementById('form-image').value = product.image || '';
        document.getElementById('form-image-preview').src = product.image || '';
        document.getElementById('form-badge').value = product.badge || '';
        document.getElementById('form-badge-type').value = product.badgeType || 'primary';
        document.getElementById('form-description').value = product.description || '';
        document.getElementById('form-specs').value = Array.isArray(product.specs) ? product.specs.join('\n') : '';
      } else {
        document.getElementById('modal-title').textContent = 'افزودن محصول جدید';
        document.getElementById('modal-icon').textContent = 'add_circle';
        document.getElementById('submit-btn-label').textContent = 'ذخیره محصول';
        document.getElementById('form-product-id').value = '';
        document.getElementById('form-image').value = 'assets/images/geometric_tunic_1787934970772.jpg';
        document.getElementById('form-image-preview').src = 'assets/images/geometric_tunic_1787934970772.jpg';
      }

      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.remove('opacity-0', 'scale-95');
        overlay.classList.remove('opacity-0');
      }, 10);
    };

    const closeModal = () => {
      modal.classList.add('opacity-0', 'scale-95');
      overlay.classList.add('opacity-0');
      setTimeout(() => {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
      }, 300);
    };

    if (openBtn) openBtn.addEventListener('click', () => openModal(null));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    // Live image preview from URL input
    if (imageInput && imagePreview) {
      imageInput.addEventListener('input', () => {
        if (imageInput.value.trim()) {
          imagePreview.src = imageInput.value.trim();
        }
      });
    }

    // Direct Image Upload (converts to Base64 Data URL)
    if (imageFileInput && imageInput && imagePreview) {
      imageFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          if (file.size > 2 * 1024 * 1024) {
            alert("حجم تصویر بالاست، لطفاً عکسی کمتر از ۲ مگابایت انتخاب کنید.");
            return;
          }
          const reader = new FileReader();
          reader.onload = function(evt) {
            const dataUrl = evt.target.result;
            imageInput.value = dataUrl;
            imagePreview.src = dataUrl;
            showToast("تصویر با موفقیت بارگذاری شد.");
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Save/Update Form Submit
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('form-product-id').value;
        const title = document.getElementById('form-title').value.trim();
        const category = document.getElementById('form-category').value;
        const price = parseInt(document.getElementById('form-price').value, 10);
        const originalPriceVal = document.getElementById('form-original-price').value.trim();
        const originalPrice = originalPriceVal ? parseInt(originalPriceVal, 10) : null;
        const image = document.getElementById('form-image').value.trim() || 'assets/images/geometric_tunic_1787934970772.jpg';
        const badge = document.getElementById('form-badge').value.trim() || (category === 'takhfif' ? 'تخفیف ویژه' : 'جدید');
        const badgeType = document.getElementById('form-badge-type').value;
        const description = document.getElementById('form-description').value.trim();
        const specsRaw = document.getElementById('form-specs').value.trim();
        const specs = specsRaw ? specsRaw.split('\n').map(s => s.trim()).filter(Boolean) : [];

        const categoryLabel = category === 'takhfif' ? 'تخفیف ویژه' : 'پوشاک زنانه';
        const priceFormatted = formatCurrency(price);
        const originalPriceFormatted = originalPrice ? formatCurrency(originalPrice) : null;

        if (id) {
          // Edit existing
          const index = PRODUCTS_DATA.findIndex(p => p.id === id);
          if (index !== -1) {
            PRODUCTS_DATA[index] = {
              ...PRODUCTS_DATA[index],
              title,
              category,
              categoryLabel,
              price,
              priceFormatted,
              originalPrice,
              originalPriceFormatted,
              isDiscounted: !!originalPrice || category === 'takhfif',
              image,
              badge,
              badgeType,
              description,
              specs
            };
            showToast(`محصول «${title}» با موفقیت ویرایش شد ✨`);
          }
        } else {
          // Create new
          const newId = "prod-" + Date.now();
          const newProduct = {
            id: newId,
            title,
            category,
            categoryLabel,
            price,
            priceFormatted,
            originalPrice,
            originalPriceFormatted,
            isDiscounted: !!originalPrice || category === 'takhfif',
            image,
            badge,
            badgeType,
            description,
            specs,
            reviews: []
          };
          PRODUCTS_DATA.unshift(newProduct);
          showToast(`محصول «${title}» اضافه شد ✨`);
        }

        saveStoredProducts(PRODUCTS_DATA);
        closeModal();
        this.renderTable();
      });
    }

    this.openEditModal = (id) => {
      const product = PRODUCTS_DATA.find(p => p.id === id);
      if (product) openModal(product);
    };
  }

  bindPasswordModal() {
    const modal = document.getElementById('pwd-modal');
    const overlay = document.getElementById('pwd-modal-overlay');
    const openBtn = document.getElementById('change-pwd-btn');
    const closeBtn = document.getElementById('close-pwd-modal-btn');
    const cancelBtn = document.getElementById('cancel-pwd-modal-btn');
    const form = document.getElementById('change-pwd-form');
    const msg = document.getElementById('pwd-modal-msg');

    const openModal = () => {
      form.reset();
      msg.className = "hidden text-xs p-2 rounded-xl text-center font-bold";
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.remove('opacity-0', 'scale-95');
        overlay.classList.remove('opacity-0');
      }, 10);
    };

    const closeModal = () => {
      modal.classList.add('opacity-0', 'scale-95');
      overlay.classList.add('opacity-0');
      setTimeout(() => {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
      }, 300);
    };

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const current = document.getElementById('current-pwd-input').value.trim();
        const newPwd = document.getElementById('new-pwd-input').value.trim();

        if (current !== this.getPassword()) {
          msg.textContent = "رمز عبور فعلی نادرست است!";
          msg.className = "text-xs p-2 rounded-xl text-center font-bold bg-error-container/20 text-error border border-error/30";
          return;
        }

        this.setPassword(newPwd);
        msg.textContent = "رمز عبور با موفقیت تغییر کرد!";
        msg.className = "text-xs p-2 rounded-xl text-center font-bold bg-primary-container/20 text-primary border border-primary/30";
        setTimeout(closeModal, 1500);
      });
    }
  }

  deleteProduct(id) {
    const product = PRODUCTS_DATA.find(p => p.id === id);
    if (!product) return;

    if (confirm(`آیا از حذف محصول «${product.title}» مطمئن هستید؟`)) {
      PRODUCTS_DATA = PRODUCTS_DATA.filter(p => p.id !== id);
      saveStoredProducts(PRODUCTS_DATA);
      this.renderTable();
      showToast(`محصول «${product.title}» با موفقیت حذف شد.`);
    }
  }

  renderTable() {
    const tbody = document.getElementById('products-table-body');
    const totalCountEl = document.getElementById('total-products-count');
    if (!tbody) return;

    if (totalCountEl) {
      totalCountEl.textContent = PRODUCTS_DATA.length.toLocaleString('fa-IR');
    }

    let filtered = PRODUCTS_DATA.filter(p => {
      const matchCat = (this.currentFilter === 'all' || 
                        (this.currentFilter === 'takhfif' && (p.category === 'takhfif' || p.isDiscounted)) ||
                        p.category === this.currentFilter);
      const matchSearch = p.title.toLowerCase().includes(this.searchQuery) ||
                          (p.categoryLabel && p.categoryLabel.toLowerCase().includes(this.searchQuery)) ||
                          (p.badge && p.badge.toLowerCase().includes(this.searchQuery));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-12 text-on-surface-variant">
            <span class="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-2">search_off</span>
            <p class="text-sm font-bold">هیچ محصولی با این مشخصات یافت نشد.</p>
          </td>
        </tr>
      `;
      return;
    }

    let html = '';
    filtered.forEach(p => {
      const badgeStyle = p.badgeType === 'error' ? 'bg-error-container/80 text-error border-error/30' :
                         p.badgeType === 'secondary' ? 'bg-secondary-container/80 text-secondary border-secondary/30' :
                         p.badgeType === 'tertiary' ? 'bg-tertiary-container/80 text-tertiary border-tertiary/30' :
                         'bg-primary-container/80 text-primary border-primary/30';

      const priceDisplay = p.originalPriceFormatted ? `
        <div class="flex flex-col">
          <span class="text-[10px] text-on-surface-variant/50 line-through">${p.originalPriceFormatted}</span>
          <span class="text-error font-bold">${p.priceFormatted}</span>
        </div>
      ` : `
        <span class="text-primary font-bold">${p.priceFormatted}</span>
      `;

      html += `
        <tr class="hover:bg-white/[0.02] transition-colors">
          <td class="py-3 px-4">
            <img src="${p.image}" alt="${p.title}" class="w-12 h-12 object-cover rounded-xl border border-white/10 bg-surface-container">
          </td>
          <td class="py-3 px-4">
            <div class="font-bold text-on-surface text-sm max-w-[200px] truncate">${p.title}</div>
            <div class="text-[10px] text-on-surface-variant/60">شناسه: ${p.id}</div>
          </td>
          <td class="py-3 px-4">
            <span class="bg-surface-variant/80 px-2.5 py-1 rounded-md text-on-surface-variant text-[11px] font-bold">
              ${p.category === 'takhfif' ? 'تخفیف ویژه' : 'پوشاک زنانه'}
            </span>
          </td>
          <td class="py-3 px-4 font-mono">
            ${priceDisplay}
          </td>
          <td class="py-3 px-4">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold border ${badgeStyle}">
              ${p.badge || 'بدون برچسب'}
            </span>
          </td>
          <td class="py-3 px-4">
            <div class="flex items-center justify-center gap-1.5">
              <a href="product-detail.html?id=${p.id}" target="_blank" class="p-2 rounded-lg glass-panel hover:text-primary transition-colors" title="مشاهده در سایت">
                <span class="material-symbols-outlined text-base">visibility</span>
              </a>
              <button onclick="admin.openEditModal('${p.id}')" class="p-2 rounded-lg bg-primary-container/30 text-primary hover:bg-primary-container/60 transition-colors" title="ویرایش محصول">
                <span class="material-symbols-outlined text-base">edit</span>
              </button>
              <button onclick="admin.deleteProduct('${p.id}')" class="p-2 rounded-lg bg-error-container/30 text-error hover:bg-error-container/60 transition-colors" title="حذف محصول">
                <span class="material-symbols-outlined text-base">delete</span>
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }
}

// Global Admin instance
let admin;
document.addEventListener('DOMContentLoaded', () => {
  admin = new AdminManager();
});
