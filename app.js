/**
 * مشويات السلطان | أصل المشويات على الفحم
 * ملف التطبيق الرئيسي — الإعدادات والمنيو والرقم في مكان واحد (RESTAURANT_CONFIG)
 * أمان كامل: بناء DOM بعناصر آمنة فقط، تحقق صارم من الرقم والكميات والـ localStorage، وروابط noopener.
 */
(function (root) {
  'use strict';

  /* ========================================================================
     1. إعدادات المطعم والرقم والمنيو (المصدر الوحيد للتعديل)
     ======================================================================== */
  const RESTAURANT_CONFIG = Object.freeze({
    name: 'مشويات السلطان',
    tagline: 'أصل المشويات على الفحم',
    whatsappNumber: '966501234567', // عدّل الرقم هنا بصيغة دولية بدون + أو أصفار بادئة
    currency: 'ر.س',
    deliveryFee: 15,
    freeDeliveryThreshold: 150,
    workingHours: 'يومياً من 12:00 ظهراً حتى 2:00 بعد منتصف الليل',
    maxItemQty: 20,
    maxCartDistinctItems: 30,
    maxNoteLength: 240,
    storageKey: 'sultan_grills_cart_v1',
    categories: Object.freeze([
      Object.freeze({ id: 'all', label: 'الكل' }),
      Object.freeze({ id: 'grills', label: 'مشويات الفحم' }),
      Object.freeze({ id: 'platters', label: 'أطباق السلطان' }),
      Object.freeze({ id: 'sandwiches', label: 'سندويتشات الجمر' }),
      Object.freeze({ id: 'mezze', label: 'مقبلات وسلطات' }),
      Object.freeze({ id: 'drinks', label: 'مشروبات' }),
    ]),
    menu: Object.freeze([
      Object.freeze({
        id: 'sultan-royal-platter',
        name: 'صينية السلطان الملكية المشكلة',
        category: 'platters',
        price: 165,
        portion: 'تكفي 3–4 أشخاص · 900 جم',
        description:
          'تشكيلة فاخرة من كباب الضاني وكفتة السلطان وشيش الطاووق والريش المشوية على جمر السنديان مع خبز محمّص ومقبلات.',
        image: './assets/dish-sultan-mixed-grill.jpg',
        featured: true,
      }),
      Object.freeze({
        id: 'charcoal-lamb-chops',
        name: 'ريش ضاني على الفحم',
        category: 'grills',
        price: 88,
        portion: '5 قطع طازجة · 350 جم',
        description:
          'ريش غنم طرية متبّلة بإكليل الجبل والبهارات الشرقية ومشوية حتى الكرملة، تُقدّم مع البصل بالسماق والليمون المشوي.',
        image: './assets/dish-lamb-chops.jpg',
        featured: true,
      }),
      Object.freeze({
        id: 'sultan-lamb-kebab',
        name: 'كباب السلطان المشوي',
        category: 'grills',
        price: 64,
        portion: '3 أسياخ · 300 جم',
        description:
          'لحم ضاني مفروم يدوياً مع الدهن الطبيعي والفلفل الحلبي، مشوي على جمر هادئ ويُقدّم فوق خبز السماق المحمّص.',
        image: './assets/dish-adana-kebab.jpg',
        featured: true,
      }),
      Object.freeze({
        id: 'shish-tawook-gold',
        name: 'شيش طاووق التتبيلة الذهبية',
        category: 'grills',
        price: 54,
        portion: '3 أسياخ · 300 جم',
        description:
          'مكعبات صدور دجاج طازجة منقوعة باللبن والزعفران والثوم، مشوية على الفحم وتُقدّم مع كريمة الثومية الأصلية.',
        image: './assets/dish-shish-tawook.jpg',
        featured: true,
      }),
      Object.freeze({
        id: 'spicy-adana-kofta',
        name: 'كفتة أضنة الحارة على الجمر',
        category: 'grills',
        price: 62,
        portion: '3 أسياخ · 300 جم',
        description:
          'كفتة لحم متبّلة بالفلفل الأحمر المشوي والكمون المحمّص، مشوية على أسياخ عريضة لنكهة فحم غنية ومتوازنة.',
        image: './assets/dish-adana-kebab.jpg',
        featured: false,
      }),
      Object.freeze({
        id: 'duo-grill-feast',
        name: 'طبق المشويات المشكل لشخصين',
        category: 'platters',
        price: 112,
        portion: 'يكفي شخصين · 550 جم',
        description:
          'سيخان كباب وسيخ شيش طاووق وقطعتان من الريش الضاني مع طماطم وفلفل مشوي وطحينة وحمص طازج.',
        image: './assets/dish-sultan-mixed-grill.jpg',
        featured: false,
      }),
      Object.freeze({
        id: 'kebab-saj-wrap',
        name: 'سندويتش كباب السلطان على الصاج',
        category: 'sandwiches',
        price: 28,
        portion: 'خبز صاج محمّص على الجمر',
        description:
          'سيخ كباب مشوي طازج ملفوف بخبز الصاج مع الطحينة الفاخرة والبصل بالسماق والمخلل والبطاطس المتبّلة.',
        image: './assets/dish-charcoal-sandwich.jpg',
        featured: true,
      }),
      Object.freeze({
        id: 'tawook-charcoal-wrap',
        name: 'سندويتش شيش طاووق بالجمر',
        category: 'sandwiches',
        price: 26,
        portion: 'خبز صاج مع ثومية',
        description:
          'قطع شيش طاووق مشوية مع ثومية السلطان الكريمية وخيار مخلل ولمسة فلفل مشوي داخل خبز صاج مقرمش.',
        image: './assets/dish-charcoal-sandwich.jpg',
        featured: false,
      }),
      Object.freeze({
        id: 'sultan-mezze-trio',
        name: 'تشكيلة مقبلات السلطان الشرقية',
        category: 'mezze',
        price: 36,
        portion: 'حمص · متبل · كبة · فتوش',
        description:
          'حمص كريمي بزيت الزيتون البكر ومتبل باذنجان مشوي على الفحم مع قطعتي كبة مقرمشة وسلطة فتوش بدبس الرمان.',
        image: './assets/dish-mezze-appetizers.jpg',
        featured: true,
      }),
      Object.freeze({
        id: 'smoked-mutabbal-hummus',
        name: 'متبل الباذنجان المدخّن على الجمر',
        category: 'mezze',
        price: 20,
        portion: 'طبق متوسط · 220 جم',
        description:
          'باذنجان مشوي مباشرة على فحم السنديان ومهروس مع الطحينة والليمون وحبوب الرمان الطازج وزيت الزيتون.',
        image: './assets/dish-mezze-appetizers.jpg',
        featured: false,
      }),
      Object.freeze({
        id: 'fresh-mint-lemonade',
        name: 'ليمون بالنعناع الطازج المثلج',
        category: 'drinks',
        price: 16,
        portion: '400 مل · معصور فور الطلب',
        description:
          'عصير ليمون طبيعي منعش مخفوق مع أوراق النعناع الطازج والثلج المجروش لموازنة نكهة المشويات.',
        image: './assets/dish-artisan-drinks.jpg',
        featured: false,
      }),
      Object.freeze({
        id: 'pomegranate-hibiscus-iced',
        name: 'كركديه الرمان البارد',
        category: 'drinks',
        price: 18,
        portion: '400 مل · بارد طبيعي',
        description:
          'منقوع زهور الكركديه الفاخر مع عصير الرمان الطبيعي ولمسة ماء الزهر، يُقدّم بارداً ومنعشاً.',
        image: './assets/dish-artisan-drinks.jpg',
        featured: false,
      }),
    ]),
  });

  /* ========================================================================
     2. دوال منطقية نقية وقابلة للاختبار والتحقق الأمني
     ======================================================================== */
  const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

  function buildMenuMap(menuList) {
    const map = new Map();
    if (!Array.isArray(menuList)) {
      return map;
    }
    for (const item of menuList) {
      if (item && typeof item.id === 'string' && item.id.length > 0) {
        map.set(item.id, item);
      }
    }
    return map;
  }

  function validateWhatsAppNumber(phone) {
    if (typeof phone !== 'string') {
      return { valid: false, sanitized: '', reason: 'رقم واتساب غير معرّف بشكل صحيح.' };
    }
    const trimmed = phone.trim();
    if (!/^[1-9]\d{7,14}$/.test(trimmed)) {
      return {
        valid: false,
        sanitized: '',
        reason: 'رقم واتساب المطعم غير صالح. يرجى التأكد من الرقم بصيغة دولية أرقام فقط.',
      };
    }
    return { valid: true, sanitized: trimmed, reason: '' };
  }

  function sanitizeQuantity(value, maxQty) {
    const limit = Number.isInteger(maxQty) && maxQty > 0 ? maxQty : RESTAURANT_CONFIG.maxItemQty;
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return 0;
    }
    const intVal = Math.trunc(value);
    if (intVal <= 0) {
      return 0;
    }
    return Math.min(intVal, limit);
  }

  function sanitizeNote(text, maxLen) {
    const limit =
      Number.isInteger(maxLen) && maxLen > 0 ? maxLen : RESTAURANT_CONFIG.maxNoteLength;
    if (typeof text !== 'string') {
      return '';
    }
    return text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, limit);
  }

  function sanitizeOrderType(orderType) {
    return orderType === 'pickup' ? 'pickup' : 'delivery';
  }

  function sanitizeCartData(raw, menuMap, maxQty, maxDistinct) {
    const qtyLimit = Number.isInteger(maxQty) && maxQty > 0 ? maxQty : RESTAURANT_CONFIG.maxItemQty;
    const distinctLimit =
      Number.isInteger(maxDistinct) && maxDistinct > 0
        ? maxDistinct
        : RESTAURANT_CONFIG.maxCartDistinctItems;

    const cleanItems = Object.create(null);
    let orderType = 'delivery';
    let note = '';

    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return { items: cleanItems, orderType, note };
    }

    orderType = sanitizeOrderType(raw.orderType);
    note = sanitizeNote(raw.note, RESTAURANT_CONFIG.maxNoteLength);

    const sourceItems =
      raw.items && typeof raw.items === 'object' && !Array.isArray(raw.items) ? raw.items : null;

    if (!sourceItems) {
      return { items: cleanItems, orderType, note };
    }

    let count = 0;
    for (const key of Object.keys(sourceItems)) {
      if (count >= distinctLimit) {
        break;
      }
      if (FORBIDDEN_KEYS.has(key) || !menuMap.has(key)) {
        continue;
      }
      const rawQty = sourceItems[key];
      const safeQty = sanitizeQuantity(rawQty, qtyLimit);
      if (safeQty > 0) {
        cleanItems[key] = safeQty;
        count += 1;
      }
    }

    return { items: cleanItems, orderType, note };
  }

  function normalizeArabicText(value) {
    if (typeof value !== 'string') {
      return '';
    }
    return value
      .toLowerCase()
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .trim();
  }

  function filterMenuItems(menuList, criteria) {
    if (!Array.isArray(menuList)) {
      return [];
    }
    const category = criteria && typeof criteria.category === 'string' ? criteria.category : 'all';
    const featuredOnly = Boolean(criteria && criteria.featuredOnly);
    const queryNorm = normalizeArabicText(criteria && criteria.query ? criteria.query : '');

    return menuList.filter((item) => {
      if (category !== 'all' && item.category !== category) {
        return false;
      }
      if (featuredOnly && !item.featured) {
        return false;
      }
      if (queryNorm.length > 0) {
        const haystack = normalizeArabicText(`${item.name} ${item.description} ${item.portion}`);
        return haystack.includes(queryNorm);
      }
      return true;
    });
  }

  function calculateTotals(itemsObj, menuMap, orderType, deliveryFee, freeThreshold) {
    let totalCount = 0;
    let subtotal = 0;
    const lines = [];

    if (itemsObj && typeof itemsObj === 'object') {
      for (const id of Object.keys(itemsObj)) {
        if (FORBIDDEN_KEYS.has(id) || !menuMap.has(id)) {
          continue;
        }
        const item = menuMap.get(id);
        const qty = sanitizeQuantity(itemsObj[id], RESTAURANT_CONFIG.maxItemQty);
        if (qty <= 0) {
          continue;
        }
        const lineTotal = qty * item.price;
        totalCount += qty;
        subtotal += lineTotal;
        lines.push({
          id: item.id,
          name: item.name,
          unitPrice: item.price,
          qty,
          lineTotal,
        });
      }
    }

    const safeType = sanitizeOrderType(orderType);
    const fee = Number.isFinite(deliveryFee) && deliveryFee >= 0 ? deliveryFee : 0;
    const threshold = Number.isFinite(freeThreshold) && freeThreshold > 0 ? freeThreshold : Infinity;

    let delivery = 0;
    if (totalCount > 0 && safeType === 'delivery') {
      delivery = subtotal >= threshold ? 0 : fee;
    }

    const remainingForFreeDelivery =
      safeType === 'delivery' && totalCount > 0 && subtotal < threshold
        ? Math.max(0, threshold - subtotal)
        : 0;

    return {
      lines,
      totalCount,
      subtotal,
      delivery,
      grandTotal: subtotal + delivery,
      remainingForFreeDelivery,
      orderType: safeType,
    };
  }

  function formatPrice(amount, currency) {
    const safeAmount = Number.isFinite(amount) ? Math.round(amount) : 0;
    const unit = typeof currency === 'string' && currency.trim() ? currency.trim() : 'ر.س';
    return `${safeAmount} ${unit}`;
  }

  function formatArabicItemCount(count) {
    const safeCount = Number.isFinite(count) ? Math.max(0, Math.trunc(count)) : 0;
    if (safeCount === 0) {
      return 'لا توجد أصناف';
    }
    if (safeCount === 1) {
      return 'صنف واحد';
    }
    if (safeCount === 2) {
      return 'صنفان';
    }
    if (safeCount <= 10) {
      return `${safeCount} أصناف`;
    }
    return `${safeCount} صنفاً`;
  }

  function buildWhatsAppOrderMessage(totals, note, config) {
    const cfg = config || RESTAURANT_CONFIG;
    if (!totals || !Array.isArray(totals.lines) || totals.lines.length === 0) {
      return '';
    }

    const lines = [];
    lines.push(`مرحباً ${cfg.name} (${cfg.tagline})`);
    lines.push('أرغب بتأكيد الطلب التالي:');
    lines.push('');

    for (const line of totals.lines) {
      lines.push(`• ${line.name} × ${line.qty} = ${formatPrice(line.lineTotal, cfg.currency)}`);
    }

    lines.push('');
    lines.push(
      `طريقة الاستلام: ${totals.orderType === 'pickup' ? 'استلام من الفرع' : 'توصيل للمنزل'}`
    );
    lines.push(`المجموع الفرعي: ${formatPrice(totals.subtotal, cfg.currency)}`);
    if (totals.orderType === 'delivery') {
      lines.push(
        `التوصيل: ${totals.delivery === 0 ? 'مجاني' : formatPrice(totals.delivery, cfg.currency)}`
      );
    }
    lines.push(`الإجمالي النهائي: ${formatPrice(totals.grandTotal, cfg.currency)}`);

    const safeNote = sanitizeNote(note, cfg.maxNoteLength);
    if (safeNote.length > 0) {
      lines.push('');
      lines.push(`ملاحظات / العنوان: ${safeNote}`);
    }

    return lines.join('\n');
  }

  function buildWhatsAppUrl(phone, message) {
    const phoneCheck = validateWhatsAppNumber(phone);
    if (!phoneCheck.valid) {
      return { valid: false, url: '', reason: phoneCheck.reason };
    }
    const trimmedMsg = typeof message === 'string' ? message.trim() : '';
    const base = `https://wa.me/${phoneCheck.sanitized}`;
    const url = trimmedMsg.length > 0 ? `${base}?text=${encodeURIComponent(trimmedMsg)}` : base;

    if (!url.startsWith('https://wa.me/')) {
      return { valid: false, url: '', reason: 'رابط واتساب غير صالح.' };
    }
    return { valid: true, url, reason: '' };
  }

  const coreApi = Object.freeze({
    RESTAURANT_CONFIG,
    buildMenuMap,
    validateWhatsAppNumber,
    sanitizeQuantity,
    sanitizeNote,
    sanitizeOrderType,
    sanitizeCartData,
    normalizeArabicText,
    filterMenuItems,
    calculateTotals,
    formatPrice,
    formatArabicItemCount,
    buildWhatsAppOrderMessage,
    buildWhatsAppUrl,
  });

  if (root) {
    root.__SULTAN_MENU_CORE__ = coreApi;
  }

  /* ========================================================================
     3. طبقة واجهة المستخدم والأحداث (تعمل في المتصفح فقط)
     ======================================================================== */
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  const menuMap = buildMenuMap(RESTAURANT_CONFIG.menu);
  const categoryLabelMap = new Map(RESTAURANT_CONFIG.categories.map((c) => [c.id, c.label]));
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const state = {
    category: 'all',
    query: '',
    featuredOnly: false,
    items: Object.create(null),
    orderType: 'delivery',
    note: '',
    drawerOpen: false,
    clearConfirmPending: false,
    clearConfirmTimer: null,
    lastFocusedElement: null,
  };

  function prefersReducedMotion() {
    return Boolean(reducedMotionQuery && reducedMotionQuery.matches);
  }

  /* تخزين آمن للـ localStorage مع التحقق من البيانات */
  function loadCartFromStorage() {
    try {
      const rawStr = window.localStorage.getItem(RESTAURANT_CONFIG.storageKey);
      if (!rawStr || rawStr.length > 12000) {
        return;
      }
      const parsed = JSON.parse(rawStr);
      const clean = sanitizeCartData(
        parsed,
        menuMap,
        RESTAURANT_CONFIG.maxItemQty,
        RESTAURANT_CONFIG.maxCartDistinctItems
      );
      state.items = clean.items;
      state.orderType = clean.orderType;
      state.note = clean.note;
    } catch {
      state.items = Object.create(null);
      state.orderType = 'delivery';
      state.note = '';
      try {
        window.localStorage.removeItem(RESTAURANT_CONFIG.storageKey);
      } catch {
        // تجاهل خطأ التخزين في الوضع الخاص
      }
    }
  }

  function saveCartToStorage() {
    try {
      const payload = {
        items: state.items,
        orderType: state.orderType,
        note: state.note,
      };
      window.localStorage.setItem(RESTAURANT_CONFIG.storageKey, JSON.stringify(payload));
    } catch {
      // تجاهل أخطاء امتلاء الذاكرة أو الوضع الخاص بهدوء
    }
  }

  /* تأثير استجابة فورية لضغطات المستخدم (يحترم prefers-reduced-motion) */
  function spawnTapRipple(targetEl, clientX, clientY) {
    if (!targetEl || prefersReducedMotion()) {
      return;
    }
    const rect = targetEl.getBoundingClientRect();
    const x = typeof clientX === 'number' && clientX > 0 ? clientX - rect.left : rect.width / 2;
    const y = typeof clientY === 'number' && clientY > 0 ? clientY - rect.top : rect.height / 2;

    const ripple = document.createElement('span');
    ripple.className = 'tap-ripple';
    ripple.setAttribute('aria-hidden', 'true');
    ripple.style.setProperty('--tap-x', `${Math.round(x)}px`);
    ripple.style.setProperty('--tap-y', `${Math.round(y)}px`);
    targetEl.appendChild(ripple);

    ripple.addEventListener(
      'animationend',
      () => {
        ripple.remove();
      },
      { once: true }
    );
  }

  function showToast(message) {
    const region = document.getElementById('toast-region');
    if (!region || !message) {
      return;
    }
    while (region.childElementCount >= 2) {
      region.firstElementChild.remove();
    }
    const item = document.createElement('div');
    item.className = 'toast-item';
    item.textContent = message;
    region.appendChild(item);

    window.setTimeout(() => {
      item.remove();
    }, 2600);
  }

  function bumpCartCount() {
    if (prefersReducedMotion()) {
      return;
    }
    const badge = document.getElementById('header-cart-count');
    if (!badge) {
      return;
    }
    badge.classList.remove('is-bumped');
    void badge.offsetWidth;
    badge.classList.add('is-bumped');
  }

  /* إدارة كميات الأصناف مع التحقق الصارم */
  function setItemQuantity(itemId, nextQty, announceLabel) {
    if (!menuMap.has(itemId)) {
      return;
    }
    const safeQty = sanitizeQuantity(nextQty, RESTAURANT_CONFIG.maxItemQty);
    const prevQty = state.items[itemId] || 0;

    if (safeQty === 0) {
      delete state.items[itemId];
    } else {
      const distinctCount = Object.keys(state.items).length;
      if (prevQty === 0 && distinctCount >= RESTAURANT_CONFIG.maxCartDistinctItems) {
        showToast('تم الوصول إلى الحد الأقصى لعدد الأصناف المختلفة في السلة.');
        return;
      }
      state.items[itemId] = safeQty;
    }

    resetClearConfirm();
    saveCartToStorage();
    renderMenuGrid();
    renderCart();

    if (safeQty > prevQty) {
      bumpCartCount();
    }

    if (announceLabel) {
      showToast(announceLabel);
    }
  }

  function resetClearConfirm() {
    state.clearConfirmPending = false;
    if (state.clearConfirmTimer !== null) {
      window.clearTimeout(state.clearConfirmTimer);
      state.clearConfirmTimer = null;
    }
    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
      clearBtn.classList.remove('is-confirming');
      clearBtn.textContent = 'تفريغ السلة';
    }
  }

  /* ========================================================================
     4. بناء واجهة الفلاتر وبطاقات الأصناف والسلة عبر DOM API الآمن فقط
     ======================================================================== */
  function renderCategoryTabs() {
    const container = document.getElementById('category-tabs');
    if (!container) {
      return;
    }
    container.replaceChildren();

    for (const cat of RESTAURANT_CONFIG.categories) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-tab';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('data-category', cat.id);
      const isSelected = state.category === cat.id;
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      btn.tabIndex = isSelected ? 0 : -1;
      btn.textContent = cat.label;

      btn.addEventListener('click', (event) => {
        spawnTapRipple(btn, event.clientX, event.clientY);
        state.category = cat.id;
        renderCategoryTabs();
        renderMenuGrid();
      });

      container.appendChild(btn);
    }
  }

  function createStepperElement(item, qty) {
    const wrapper = document.createElement('div');
    wrapper.className = 'qty-stepper';
    wrapper.setAttribute('role', 'group');
    wrapper.setAttribute('aria-label', `التحكم بكمية ${item.name}`);

    const incBtn = document.createElement('button');
    incBtn.type = 'button';
    incBtn.className = 'qty-btn';
    incBtn.textContent = '+';
    incBtn.setAttribute('aria-label', `زيادة كمية ${item.name}`);
    incBtn.disabled = qty >= RESTAURANT_CONFIG.maxItemQty;
    incBtn.addEventListener('click', (event) => {
      spawnTapRipple(incBtn, event.clientX, event.clientY);
      if (qty >= RESTAURANT_CONFIG.maxItemQty) {
        showToast(`الحد الأقصى للطلب من الصنف الواحد هو ${RESTAURANT_CONFIG.maxItemQty}.`);
        return;
      }
      setItemQuantity(item.id, qty + 1, `تمت زيادة ${item.name} إلى ${qty + 1}`);
    });

    const valSpan = document.createElement('span');
    valSpan.className = 'qty-value';
    valSpan.setAttribute('aria-live', 'polite');
    valSpan.textContent = String(qty);

    const decBtn = document.createElement('button');
    decBtn.type = 'button';
    decBtn.className = 'qty-btn';
    decBtn.textContent = '−';
    decBtn.setAttribute('aria-label', `إنقاص كمية ${item.name}`);
    decBtn.addEventListener('click', (event) => {
      spawnTapRipple(decBtn, event.clientX, event.clientY);
      const next = qty - 1;
      setItemQuantity(
        item.id,
        next,
        next > 0 ? `أصبحت كمية ${item.name} الآن ${next}` : `تمت إزالة ${item.name} من السلة`
      );
    });

    wrapper.appendChild(incBtn);
    wrapper.appendChild(valSpan);
    wrapper.appendChild(decBtn);
    return wrapper;
  }

  function createMenuCard(item) {
    const article = document.createElement('article');
    article.className = 'menu-card';
    article.setAttribute('data-item-id', item.id);

    const media = document.createElement('div');
    media.className = 'card-media';

    const img = document.createElement('img');
    img.className = 'card-image';
    img.src = item.image;
    img.alt = item.name;
    img.width = 640;
    img.height = 480;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.setAttribute('referrerpolicy', 'no-referrer');
    img.addEventListener('error', () => {
      media.classList.add('is-fallback');
    });

    const fallback = document.createElement('div');
    fallback.className = 'card-fallback';
    const fallbackName = document.createElement('span');
    fallbackName.textContent = item.name;
    fallback.appendChild(fallbackName);

    media.appendChild(img);
    media.appendChild(fallback);

    const body = document.createElement('div');
    body.className = 'card-body';

    const metaLine = document.createElement('p');
    metaLine.className = 'card-meta-line';
    const catSpan = document.createElement('span');
    catSpan.textContent = categoryLabelMap.get(item.category) || 'القائمة';
    metaLine.appendChild(catSpan);

    if (item.featured) {
      const sep = document.createElement('span');
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = '·';
      const featSpan = document.createElement('span');
      featSpan.className = 'card-meta-highlight';
      featSpan.textContent = 'الأكثر طلباً';
      metaLine.appendChild(sep);
      metaLine.appendChild(featSpan);
    }

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = item.name;

    const desc = document.createElement('p');
    desc.className = 'card-description';
    desc.textContent = item.description;

    const footer = document.createElement('div');
    footer.className = 'card-footer';

    const priceBlock = document.createElement('div');
    priceBlock.className = 'price-block';

    const priceEl = document.createElement('span');
    priceEl.className = 'card-price';
    priceEl.textContent = formatPrice(item.price, RESTAURANT_CONFIG.currency);

    const portionEl = document.createElement('span');
    portionEl.className = 'card-portion';
    portionEl.textContent = item.portion;

    priceBlock.appendChild(priceEl);
    priceBlock.appendChild(portionEl);

    const currentQty = state.items[item.id] || 0;
    let actionControl;
    if (currentQty > 0) {
      actionControl = createStepperElement(item, currentQty);
    } else {
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.className = 'add-btn';
      addBtn.textContent = 'أضف للسلة';
      addBtn.setAttribute('aria-label', `إضافة ${item.name} إلى السلة`);
      addBtn.addEventListener('click', (event) => {
        spawnTapRipple(addBtn, event.clientX, event.clientY);
        setItemQuantity(item.id, 1, `تمت إضافة ${item.name} إلى السلة`);
      });
      actionControl = addBtn;
    }

    footer.appendChild(priceBlock);
    footer.appendChild(actionControl);

    body.appendChild(metaLine);
    body.appendChild(title);
    body.appendChild(desc);
    body.appendChild(footer);

    article.appendChild(media);
    article.appendChild(body);
    return article;
  }

  function renderMenuGrid() {
    const grid = document.getElementById('menu-grid');
    const emptyEl = document.getElementById('empty-results');
    const countEl = document.getElementById('results-count');
    if (!grid || !emptyEl || !countEl) {
      return;
    }

    const filtered = filterMenuItems(RESTAURANT_CONFIG.menu, {
      category: state.category,
      query: state.query,
      featuredOnly: state.featuredOnly,
    });

    grid.replaceChildren();
    const fragment = document.createDocumentFragment();
    for (const item of filtered) {
      fragment.appendChild(createMenuCard(item));
    }
    grid.appendChild(fragment);

    emptyEl.hidden = filtered.length > 0;
    countEl.textContent =
      filtered.length === 0 ? 'لا توجد نتائج مطابقة' : `عرض ${formatArabicItemCount(filtered.length)}`;
  }

  function renderCart() {
    const totals = calculateTotals(
      state.items,
      menuMap,
      state.orderType,
      RESTAURANT_CONFIG.deliveryFee,
      RESTAURANT_CONFIG.freeDeliveryThreshold
    );

    const headerCount = document.getElementById('header-cart-count');
    const openCartBtn = document.getElementById('open-cart-btn');
    const mobileBar = document.getElementById('mobile-cart-bar');
    const mobileCount = document.getElementById('mobile-cart-count');
    const mobileTotal = document.getElementById('mobile-cart-total');

    const subtitle = document.getElementById('cart-item-summary');
    const emptyState = document.getElementById('cart-empty-state');
    const itemsList = document.getElementById('cart-items-list');
    const optionsBox = document.getElementById('cart-options');
    const footerBox = document.getElementById('cart-footer');

    const subtotalEl = document.getElementById('cart-subtotal');
    const deliveryEl = document.getElementById('cart-delivery');
    const grandTotalEl = document.getElementById('cart-grand-total');
    const deliveryHintEl = document.getElementById('delivery-hint');
    const validationMsgEl = document.getElementById('cart-validation-msg');
    const whatsappBtn = document.getElementById('whatsapp-order-btn');

    if (headerCount) {
      headerCount.textContent = String(totals.totalCount);
    }
    if (openCartBtn) {
      openCartBtn.setAttribute(
        'aria-label',
        `فتح سلة الطلبات (${formatArabicItemCount(totals.totalCount)})`
      );
    }

    if (mobileBar && mobileCount && mobileTotal) {
      mobileBar.hidden = totals.totalCount === 0;
      mobileCount.textContent = formatArabicItemCount(totals.totalCount);
      mobileTotal.textContent = formatPrice(totals.grandTotal, RESTAURANT_CONFIG.currency);
    }

    if (!itemsList || !emptyState || !optionsBox || !footerBox || !subtitle) {
      return;
    }

    itemsList.replaceChildren();

    if (totals.totalCount === 0) {
      subtitle.textContent = 'السلة فارغة حالياً';
      emptyState.hidden = false;
      optionsBox.hidden = true;
      footerBox.hidden = true;
      if (whatsappBtn) {
        whatsappBtn.setAttribute('aria-disabled', 'true');
        whatsappBtn.removeAttribute('href');
      }
      return;
    }

    subtitle.textContent = `${formatArabicItemCount(totals.totalCount)} في سلة الطلبات`;
    emptyState.hidden = true;
    optionsBox.hidden = false;
    footerBox.hidden = false;

    const fragment = document.createDocumentFragment();
    for (const line of totals.lines) {
      const menuItem = menuMap.get(line.id);
      if (!menuItem) {
        continue;
      }

      const li = document.createElement('li');
      li.className = 'cart-item-row';

      const info = document.createElement('div');
      info.className = 'cart-item-info';

      const nameEl = document.createElement('p');
      nameEl.className = 'cart-item-name';
      nameEl.textContent = line.name;

      const metaEl = document.createElement('p');
      metaEl.className = 'cart-item-meta';
      metaEl.textContent = `سعر الصنف: ${formatPrice(line.unitPrice, RESTAURANT_CONFIG.currency)}`;

      info.appendChild(nameEl);
      info.appendChild(metaEl);

      const controls = document.createElement('div');
      controls.className = 'cart-item-controls';

      const lineTotalEl = document.createElement('span');
      lineTotalEl.className = 'cart-item-line-total';
      lineTotalEl.textContent = formatPrice(line.lineTotal, RESTAURANT_CONFIG.currency);

      const actionsRow = document.createElement('div');
      actionsRow.className = 'cart-item-actions';

      const stepper = createStepperElement(menuItem, line.qty);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'remove-item-btn';
      removeBtn.textContent = 'حذف';
      removeBtn.setAttribute('aria-label', `حذف ${line.name} من السلة`);
      removeBtn.addEventListener('click', () => {
        setItemQuantity(line.id, 0, `تم حذف ${line.name} من السلة`);
      });

      actionsRow.appendChild(stepper);
      actionsRow.appendChild(removeBtn);

      controls.appendChild(lineTotalEl);
      controls.appendChild(actionsRow);

      li.appendChild(info);
      li.appendChild(controls);
      fragment.appendChild(li);
    }
    itemsList.appendChild(fragment);

    if (subtotalEl) {
      subtotalEl.textContent = formatPrice(totals.subtotal, RESTAURANT_CONFIG.currency);
    }
    if (deliveryEl) {
      if (totals.orderType === 'pickup') {
        deliveryEl.textContent = 'استلام مجاني';
      } else {
        deliveryEl.textContent =
          totals.delivery === 0
            ? 'مجاني'
            : formatPrice(totals.delivery, RESTAURANT_CONFIG.currency);
      }
    }
    if (grandTotalEl) {
      grandTotalEl.textContent = formatPrice(totals.grandTotal, RESTAURANT_CONFIG.currency);
    }

    if (deliveryHintEl) {
      if (totals.orderType === 'pickup') {
        deliveryHintEl.textContent = 'استلام مباشر من الفرع دون رسوم توصيل.';
      } else if (totals.remainingForFreeDelivery > 0) {
        deliveryHintEl.textContent = `أضف بقيمة ${formatPrice(
          totals.remainingForFreeDelivery,
          RESTAURANT_CONFIG.currency
        )} للحصول على توصيل مجاني.`;
      } else {
        deliveryHintEl.textContent = 'مبارك! طلبك مؤهل للتوصيل المجاني.';
      }
    }

    const orderMessage = buildWhatsAppOrderMessage(totals, state.note, RESTAURANT_CONFIG);
    const waResult = buildWhatsAppUrl(RESTAURANT_CONFIG.whatsappNumber, orderMessage);

    if (whatsappBtn && validationMsgEl) {
      if (waResult.valid) {
        whatsappBtn.setAttribute('href', waResult.url);
        whatsappBtn.setAttribute('rel', 'noopener noreferrer');
        whatsappBtn.setAttribute('target', '_blank');
        whatsappBtn.setAttribute('aria-disabled', 'false');
        validationMsgEl.hidden = true;
        validationMsgEl.textContent = '';
      } else {
        whatsappBtn.removeAttribute('href');
        whatsappBtn.setAttribute('aria-disabled', 'true');
        validationMsgEl.hidden = false;
        validationMsgEl.textContent = waResult.reason;
      }
    }

    syncOrderTypeButtons();
  }

  function syncOrderTypeButtons() {
    const deliveryBtn = document.getElementById('order-type-delivery');
    const pickupBtn = document.getElementById('order-type-pickup');
    if (!deliveryBtn || !pickupBtn) {
      return;
    }
    const isDelivery = state.orderType === 'delivery';
    deliveryBtn.classList.toggle('is-active', isDelivery);
    deliveryBtn.setAttribute('aria-pressed', isDelivery ? 'true' : 'false');
    pickupBtn.classList.toggle('is-active', !isDelivery);
    pickupBtn.setAttribute('aria-pressed', !isDelivery ? 'true' : 'false');
  }

  /* ========================================================================
     5. سلة جانبية مع حصر التركيز (Focus Trap) وإغلاق بلوحة المفاتيح
     ======================================================================== */
  function getFocusableElements(container) {
    if (!container) {
      return [];
    }
    const selector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll(selector)).filter((el) => {
      if (el.getAttribute('aria-disabled') === 'true') {
        return false;
      }
      return el.offsetParent !== null;
    });
  }

  function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    const openBtn = document.getElementById('open-cart-btn');
    const closeBtn = document.getElementById('close-cart-btn');
    if (!drawer || !backdrop) {
      return;
    }

    state.lastFocusedElement = document.activeElement;
    state.drawerOpen = true;
    drawer.hidden = false;
    backdrop.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    if (openBtn) {
      openBtn.setAttribute('aria-expanded', 'true');
    }

    window.requestAnimationFrame(() => {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-visible');
      if (closeBtn) {
        closeBtn.focus();
      }
    });
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    const openBtn = document.getElementById('open-cart-btn');
    if (!drawer || !backdrop || !state.drawerOpen) {
      return;
    }

    state.drawerOpen = false;
    resetClearConfirm();
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-visible');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
    if (openBtn) {
      openBtn.setAttribute('aria-expanded', 'false');
    }

    const finalizeHide = () => {
      if (!state.drawerOpen) {
        drawer.hidden = true;
        backdrop.hidden = true;
      }
    };

    if (prefersReducedMotion()) {
      finalizeHide();
    } else {
      window.setTimeout(finalizeHide, 240);
    }

    if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
      state.lastFocusedElement.focus();
    }
  }

  /* ========================================================================
     6. شرارات الفحم المتحركة (Canvas يحترم prefers-reduced-motion وvisibility)
     ======================================================================== */
  function initEmbersCanvas() {
    const canvas = document.getElementById('ember-canvas');
    if (!canvas || typeof canvas.getContext !== 'function') {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let embers = [];
    let rafId = null;

    function createEmber(randomY) {
      const palette = [
        'rgba(235, 208, 116,',
        'rgba(212, 175, 55,',
        'rgba(210, 138, 73,',
        'rgba(184, 115, 51,',
      ];
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + Math.random() * 40,
        radius: 1.1 + Math.random() * 2.2,
        speedY: 0.32 + Math.random() * 0.72,
        driftX: (Math.random() - 0.5) * 0.45,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.28 + Math.random() * 0.55,
        color: palette[Math.floor(Math.random() * palette.length)],
      };
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = Math.max(18, Math.min(44, Math.floor(width / 32)));
      embers = Array.from({ length: targetCount }, () => createEmber(true));
    }

    function drawStaticFrame() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < Math.min(14, embers.length); i += 1) {
        const e = embers[i];
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${e.color} ${(e.alpha * 0.65).toFixed(2)})`;
        ctx.fill();
      }
    }

    function step() {
      if (prefersReducedMotion() || document.hidden) {
        rafId = null;
        return;
      }
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < embers.length; i += 1) {
        const e = embers[i];
        e.y -= e.speedY;
        e.phase += 0.028;
        e.x += e.driftX + Math.sin(e.phase) * 0.3;

        if (e.y < -16 || e.x < -16 || e.x > width + 16) {
          embers[i] = createEmber(false);
          continue;
        }

        const heightRatio = Math.max(0, Math.min(1, e.y / height));
        const flicker = 0.72 + Math.sin(e.phase * 1.9) * 0.28;
        const opacity = e.alpha * flicker * Math.min(1, heightRatio * 1.4);

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${e.color} ${opacity.toFixed(3)})`;
        ctx.fill();
      }

      rafId = window.requestAnimationFrame(step);
    }

    function startOrStop() {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (prefersReducedMotion()) {
        drawStaticFrame();
      } else if (!document.hidden) {
        rafId = window.requestAnimationFrame(step);
      }
    }

    resize();
    startOrStop();

    window.addEventListener('resize', () => {
      resize();
      if (prefersReducedMotion()) {
        drawStaticFrame();
      }
    });

    document.addEventListener('visibilitychange', startOrStop);
    if (typeof reducedMotionQuery.addEventListener === 'function') {
      reducedMotionQuery.addEventListener('change', startOrStop);
    }
  }

  /* ========================================================================
     7. تهيئة الصفحة وربط الأحداث
     ======================================================================== */
  function initApp() {
    loadCartFromStorage();

    // مزامنة القيم الديناميكية من الإعداد الواحد
    const freeDeliveryValue = document.getElementById('hero-free-delivery-value');
    if (freeDeliveryValue) {
      freeDeliveryValue.textContent = formatPrice(
        RESTAURANT_CONFIG.freeDeliveryThreshold,
        RESTAURANT_CONFIG.currency
      );
    }

    const workingHoursText = document.getElementById('working-hours-text');
    if (workingHoursText) {
      workingHoursText.textContent = RESTAURANT_CONFIG.workingHours;
    }

    const footerWaLink = document.getElementById('footer-whatsapp-link');
    if (footerWaLink) {
      const contactWa = buildWhatsAppUrl(
        RESTAURANT_CONFIG.whatsappNumber,
        `مرحباً ${RESTAURANT_CONFIG.name}، لدي استفسار حول القائمة.`
      );
      if (contactWa.valid) {
        footerWaLink.setAttribute('href', contactWa.url);
      } else {
        footerWaLink.setAttribute('href', '#menu-section');
        footerWaLink.removeAttribute('target');
      }
    }

    const noteTextarea = document.getElementById('order-note');
    if (noteTextarea) {
      noteTextarea.value = state.note;
      noteTextarea.addEventListener('input', () => {
        state.note = sanitizeNote(noteTextarea.value, RESTAURANT_CONFIG.maxNoteLength);
        saveCartToStorage();
        renderCart();
      });
    }

    // ربط البحث اللحظي
    const searchInput = document.getElementById('menu-search');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    if (searchInput && clearSearchBtn) {
      searchInput.addEventListener('input', () => {
        state.query = searchInput.value.slice(0, 60);
        clearSearchBtn.hidden = state.query.trim().length === 0;
        renderMenuGrid();
      });

      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        state.query = '';
        clearSearchBtn.hidden = true;
        renderMenuGrid();
        searchInput.focus();
      });
    }

    // زر الأكثر طلباً فقط
    const featuredToggle = document.getElementById('featured-only-toggle');
    if (featuredToggle) {
      featuredToggle.addEventListener('click', (event) => {
        spawnTapRipple(featuredToggle, event.clientX, event.clientY);
        state.featuredOnly = !state.featuredOnly;
        featuredToggle.setAttribute('aria-pressed', state.featuredOnly ? 'true' : 'false');
        renderMenuGrid();
      });
    }

    // روابط الاختصار إلى "الأكثر طلباً"
    const quickFeaturedLinks = document.querySelectorAll('[data-quick-filter="featured"]');
    for (const link of quickFeaturedLinks) {
      link.addEventListener('click', () => {
        state.category = 'all';
        state.featuredOnly = true;
        if (featuredToggle) {
          featuredToggle.setAttribute('aria-pressed', 'true');
        }
        renderCategoryTabs();
        renderMenuGrid();
      });
    }

    // زر إعادة ضبط الفلاتر عند عدم وجود نتائج
    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', (event) => {
        spawnTapRipple(resetFiltersBtn, event.clientX, event.clientY);
        state.category = 'all';
        state.query = '';
        state.featuredOnly = false;
        if (searchInput) {
          searchInput.value = '';
        }
        if (clearSearchBtn) {
          clearSearchBtn.hidden = true;
        }
        if (featuredToggle) {
          featuredToggle.setAttribute('aria-pressed', 'false');
        }
        renderCategoryTabs();
        renderMenuGrid();
      });
    }

    // تنقل لوحة المفاتيح بالأسهم بين أزرار التصنيفات (WAI-ARIA Tabs)
    const tabsContainer = document.getElementById('category-tabs');
    if (tabsContainer) {
      tabsContainer.addEventListener('keydown', (event) => {
        const tabs = Array.from(tabsContainer.querySelectorAll('[role="tab"]'));
        const currentIndex = tabs.indexOf(document.activeElement);
        if (currentIndex === -1) {
          return;
        }
        let nextIndex = -1;
        if (event.key === 'ArrowLeft') {
          nextIndex = (currentIndex + 1) % tabs.length;
        } else if (event.key === 'ArrowRight') {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (event.key === 'Home') {
          nextIndex = 0;
        } else if (event.key === 'End') {
          nextIndex = tabs.length - 1;
        }
        if (nextIndex !== -1) {
          event.preventDefault();
          const nextTab = tabs[nextIndex];
          const nextCat = nextTab.getAttribute('data-category');
          if (nextCat) {
            state.category = nextCat;
            renderCategoryTabs();
            renderMenuGrid();
            const updatedTab = tabsContainer.querySelector(`[data-category="${nextCat}"]`);
            if (updatedTab) {
              updatedTab.focus();
            }
          }
        }
      });
    }

    // فتح وإغلاق السلة
    const openCartBtn = document.getElementById('open-cart-btn');
    const mobileOpenCartBtn = document.getElementById('mobile-open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const backdrop = document.getElementById('cart-backdrop');
    const emptyBrowseBtn = document.getElementById('empty-cart-browse-btn');

    if (openCartBtn) {
      openCartBtn.addEventListener('click', (event) => {
        spawnTapRipple(openCartBtn, event.clientX, event.clientY);
        openCartDrawer();
      });
    }
    if (mobileOpenCartBtn) {
      mobileOpenCartBtn.addEventListener('click', (event) => {
        spawnTapRipple(mobileOpenCartBtn, event.clientX, event.clientY);
        openCartDrawer();
      });
    }
    if (closeCartBtn) {
      closeCartBtn.addEventListener('click', closeCartDrawer);
    }
    if (backdrop) {
      backdrop.addEventListener('click', closeCartDrawer);
    }
    if (emptyBrowseBtn) {
      emptyBrowseBtn.addEventListener('click', () => {
        closeCartDrawer();
        const menuEl = document.getElementById('menu-section');
        if (menuEl) {
          menuEl.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        }
      });
    }

    // أزرار نوع الطلب (توصيل / استلام)
    const deliveryBtn = document.getElementById('order-type-delivery');
    const pickupBtn = document.getElementById('order-type-pickup');
    if (deliveryBtn && pickupBtn) {
      deliveryBtn.addEventListener('click', (event) => {
        spawnTapRipple(deliveryBtn, event.clientX, event.clientY);
        state.orderType = 'delivery';
        saveCartToStorage();
        renderCart();
      });
      pickupBtn.addEventListener('click', (event) => {
        spawnTapRipple(pickupBtn, event.clientX, event.clientY);
        state.orderType = 'pickup';
        saveCartToStorage();
        renderCart();
      });
    }

    // نسخ نص الطلب
    const copyOrderBtn = document.getElementById('copy-order-btn');
    if (copyOrderBtn) {
      copyOrderBtn.addEventListener('click', (event) => {
        spawnTapRipple(copyOrderBtn, event.clientX, event.clientY);
        const totals = calculateTotals(
          state.items,
          menuMap,
          state.orderType,
          RESTAURANT_CONFIG.deliveryFee,
          RESTAURANT_CONFIG.freeDeliveryThreshold
        );
        const message = buildWhatsAppOrderMessage(totals, state.note, RESTAURANT_CONFIG);
        if (!message) {
          return;
        }
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          navigator.clipboard
            .writeText(message)
            .then(() => {
              showToast('تم نسخ تفاصيل الطلب بنجاح.');
            })
            .catch(() => {
              showToast('تعذّر النسخ التلقائي، يمكنك إرسال الطلب مباشرة عبر واتساب.');
            });
        } else {
          showToast('المتصفح لا يدعم النسخ التلقائي، أرسل الطلب مباشرة عبر واتساب.');
        }
      });
    }

    // تفريغ السلة بتأكيد آمن داخل الزر (بدون window.confirm)
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', (event) => {
        spawnTapRipple(clearCartBtn, event.clientX, event.clientY);
        if (!state.clearConfirmPending) {
          state.clearConfirmPending = true;
          clearCartBtn.classList.add('is-confirming');
          clearCartBtn.textContent = 'تأكيد التفريغ؟';
          state.clearConfirmTimer = window.setTimeout(resetClearConfirm, 4000);
          return;
        }
        state.items = Object.create(null);
        state.note = '';
        if (noteTextarea) {
          noteTextarea.value = '';
        }
        resetClearConfirm();
        saveCartToStorage();
        renderMenuGrid();
        renderCart();
        showToast('تم تفريغ سلة الطلبات.');
      });
    }

    // تأثير لمس للأزرار الأساسية في الهيرو
    const heroBrowseBtn = document.getElementById('hero-browse-btn');
    const heroFeaturedBtn = document.getElementById('hero-featured-btn');
    for (const btn of [heroBrowseBtn, heroFeaturedBtn]) {
      if (btn) {
        btn.addEventListener('click', (event) => {
          spawnTapRipple(btn, event.clientX, event.clientY);
        });
      }
    }

    // إغلاق السلة بـ Escape وحصر التركيز داخلها
    document.addEventListener('keydown', (event) => {
      if (!state.drawerOpen) {
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        closeCartDrawer();
        return;
      }
      if (event.key === 'Tab') {
        const drawer = document.getElementById('cart-drawer');
        const focusables = getFocusableElements(drawer);
        if (focusables.length === 0) {
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    renderCategoryTabs();
    renderMenuGrid();
    renderCart();
    initEmbersCanvas();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp, { once: true });
  } else {
    initApp();
  }
})(typeof globalThis !== 'undefined' ? globalThis : window);
