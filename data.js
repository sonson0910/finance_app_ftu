const DB = (() => {
  let _uid = null;
  function setCurrentUser(id) { _uid = id || null; }

  const K = {
    get transactions()     { return _uid ? `finera_transactions_${_uid}`     : 'finera_transactions'; },
    get settings()         { return _uid ? `finera_settings_${_uid}`         : 'finera_settings'; },
    get customCategories() { return _uid ? `finera_custom_categories_${_uid}` : 'finera_custom_categories'; },
    get simSnapshots()     { return _uid ? `finera_sim_snaps_${_uid}`        : 'finera_sim_snaps'; },
    get allocSnapshots()   { return _uid ? `finera_alloc_snaps_${_uid}`      : 'finera_alloc_snaps'; },
    auth: 'finera_auth',
  };

  const DEFAULT_SETTINGS = { currency: '₫', dateFormat: 'DD/MM/YYYY' };

  const INCOME_CATEGORIES  = [
    'Product Sales', 'Service Revenue', 'Subscription & Recurring Revenue', 'Project-Based Revenue', 'Licensing & Royalties',
    'Commission & Agency Fees', 'Consulting Fees', 'Rental Income', 'Franchise Fees',
    'Interest Income', 'Dividend Income', 'Investment Gains', 'Foreign Exchange Gains',
    'Government Grants & Subsidies', 'Insurance Claims', 'Asset Disposal Gains', 'Miscellaneous Income',
  ];
  const EXPENSE_CATEGORIES = [
    'Cost of Goods Sold (COGS)', 'Salaries & Wages', 'Rent & Office Expenses', 'Utilities',
    'Marketing & Advertising', 'Travel & Transportation', 'Software & Subscriptions', 'Office Supplies',
    'Interest on Loans', 'Bank Fees', 'Tax & Compliance',
    'Equipment & Machinery', 'Furniture & Fixtures', 'Vehicle',
    'Insurance', 'Training & Development', 'Legal & Consulting Fees',
    'Depreciation & Amortization', 'Miscellaneous',
  ];

  const get  = key => { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; } };
  const set  = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  function getTransactions() { return get(K.transactions) || []; }
  function saveTransactions(txs) { set(K.transactions, txs); }

  function addTransaction(tx) {
    const txs = getTransactions();
    const newTx = { ...tx, id: crypto.randomUUID() };
    txs.push(newTx);
    saveTransactions(txs);
    return newTx;
  }

  function updateTransaction(id, data) {
    const txs = getTransactions();
    const idx = txs.findIndex(t => t.id === id);
    if (idx === -1) return null;
    txs[idx] = { ...txs[idx], ...data };
    saveTransactions(txs);
    return txs[idx];
  }

  function deleteTransaction(id) { saveTransactions(getTransactions().filter(t => t.id !== id)); }

  function getSettings() { return { ...DEFAULT_SETTINGS, ...(get(K.settings) || {}) }; }
  function saveSettings(s) { set(K.settings, s); }

  function clearAll() { localStorage.removeItem(K.transactions); localStorage.removeItem(K.settings); }

  function getSimSnapshots()  { return get(K.simSnapshots)   || {}; }
  function getSimSnapshot(k)  { return getSimSnapshots()[k]  || null; }
  function setSimSnapshot(k, data) {
    const s = getSimSnapshots(); s[k] = { ...data, savedAt: new Date().toISOString() };
    set(K.simSnapshots, s);
  }
  function deleteSimSnapshot(k) {
    const s = getSimSnapshots(); delete s[k]; set(K.simSnapshots, s);
  }

  function getAllocSnapshots()  { return get(K.allocSnapshots)   || {}; }
  function getAllocSnapshot(k)  { return getAllocSnapshots()[k]   || null; }
  function setAllocSnapshot(k, data) {
    const s = getAllocSnapshots(); s[k] = { ...data, savedAt: new Date().toISOString() };
    set(K.allocSnapshots, s);
  }
  function deleteAllocSnapshot(k) {
    const s = getAllocSnapshots(); delete s[k]; set(K.allocSnapshots, s);
  }

  // Google Auth
  function getUser() { return get(K.auth); }
  function setUser(u) { set(K.auth, u); }
  function clearUser() { localStorage.removeItem(K.auth); }

  function getCustomCategories() { return get(K.customCategories) || { income: [], expense: [] }; }
  function saveCustomCategories(cats) { set(K.customCategories, cats); }
  function addCustomCategory(type, name, color) {
    const cats = getCustomCategories();
    if (!cats[type]) cats[type] = [];
    cats[type].push({ name, color });
    saveCustomCategories(cats);
  }
  function deleteCustomCategory(type, name) {
    const cats = getCustomCategories();
    cats[type] = (cats[type] || []).filter(c => c.name !== name);
    saveCustomCategories(cats);
  }
  function getAllIncomeCategories()  { return [...INCOME_CATEGORIES,  ...getCustomCategories().income.map(c => c.name)]; }
  function getAllExpenseCategories() { return [...EXPENSE_CATEGORIES, ...getCustomCategories().expense.map(c => c.name)]; }

  function seedDemoData() {
    const existing = getTransactions();
    if (existing.length > 0) {
      const incomeCats = new Set(existing.filter(t => t.type === 'income').map(t => t.category));
      if (incomeCats.has('Product Sales') && incomeCats.has('Service Revenue')) return;
      localStorage.removeItem(K.transactions);
    }
    const txs = [];
    const now  = new Date();
    const pad  = n => String(n).padStart(2, '0');
    const rnd  = (min, max) => Math.round(min + Math.random() * (max - min));

    // months index 5,4,3 = older (positive flow); 2,1,0 = recent (mix of negative)
    const negativeMonths = new Set([2, 1]);

    for (let m = 5; m >= 0; m--) {
      const d  = new Date(now.getFullYear(), now.getMonth() - m, 1);
      const y  = d.getFullYear();
      const mo = d.getMonth() + 1;
      const dt = (day) => `${y}-${pad(mo)}-${pad(day)}`;
      const isNeg = negativeMonths.has(m);

      // Income: lower in negative months
      txs.push({ id: crypto.randomUUID(), type: 'income', date: dt(1),            category: 'Product Sales',                  amount: isNeg ? rnd(9000000, 12000000) : rnd(15000000, 22000000), note: 'Doanh thu bán sản phẩm tháng' });
      txs.push({ id: crypto.randomUUID(), type: 'income', date: dt(rnd(3, 8)),    category: 'Service Revenue',                amount: rnd(2000000, 6000000),  note: 'Doanh thu cung cấp dịch vụ' });
      if (!isNeg) txs.push({ id: crypto.randomUUID(), type: 'income', date: dt(rnd(25, 28)), category: 'Subscription & Recurring Revenue', amount: rnd(1500000, 4000000), note: 'Thu nhập thuê bao định kỳ' });
      if (!isNeg && Math.random() > 0.3) txs.push({ id: crypto.randomUUID(), type: 'income', date: dt(rnd(10, 18)), category: 'Project-Based Revenue', amount: rnd(2000000, 7000000), note: 'Dự án khách hàng doanh nghiệp' });
      if (Math.random() > 0.4) txs.push({ id: crypto.randomUUID(), type: 'income', date: dt(15),           category: 'Dividend Income',    amount: rnd(300000,  1500000), note: 'Cổ tức chứng khoán nhận được' });
      if (!isNeg && Math.random() > 0.6) txs.push({ id: crypto.randomUUID(), type: 'income', date: dt(rnd(1, 28)), category: 'Rental Income', amount: rnd(2000000, 5000000), note: 'Cho thuê mặt bằng kinh doanh' });
      if (!isNeg && Math.random() > 0.5) txs.push({ id: crypto.randomUUID(), type: 'income', date: dt(rnd(5, 20)), category: 'Consulting Fees', amount: rnd(1000000, 4000000), note: 'Phí tư vấn giải pháp tài chính' });

      // Expenses: higher in negative months
      txs.push({ id: crypto.randomUUID(), type: 'expense', date: dt(1),           category: 'Salaries & Wages',           amount: isNeg ? rnd(8000000, 11000000) : rnd(5000000,  8000000), note: 'Lương nhân viên hàng tháng' });
      txs.push({ id: crypto.randomUUID(), type: 'expense', date: dt(2),           category: 'Cost of Goods Sold (COGS)',   amount: isNeg ? rnd(4000000,  7000000) : rnd(2500000,  5000000), note: 'Giá vốn hàng hóa sản xuất' });
      txs.push({ id: crypto.randomUUID(), type: 'expense', date: dt(3),           category: 'Rent & Office Expenses',      amount: rnd(2000000,  4000000), note: 'Chi phí thuê văn phòng làm việc' });
      txs.push({ id: crypto.randomUUID(), type: 'expense', date: dt(5),           category: 'Utilities',                   amount: rnd(500000,   1500000), note: 'Tiền điện, nước, internet văn phòng' });
      txs.push({ id: crypto.randomUUID(), type: 'expense', date: dt(8),           category: 'Travel & Transportation',     amount: rnd(800000,   2000000), note: 'Công tác phí ban giám đốc' });
      txs.push({ id: crypto.randomUUID(), type: 'expense', date: dt(10),          category: 'Tax & Compliance',            amount: isNeg ? rnd(2000000,  4000000) : rnd(500000,   1200000), note: 'Thuế thu nhập doanh nghiệp' });
      txs.push({ id: crypto.randomUUID(), type: 'expense', date: dt(12),          category: 'Software & Subscriptions',    amount: isNeg ? rnd(1500000,  3000000) : rnd(600000,   1800000), note: 'Chi phí phần mềm SaaS vận hành' });
      txs.push({ id: crypto.randomUUID(), type: 'expense', date: dt(20),          category: 'Marketing & Advertising',     amount: rnd(1500000,  4000000), note: 'Chi phí chạy quảng cáo Facebook/Google' });
      if (isNeg) txs.push({ id: crypto.randomUUID(), type: 'expense', date: dt(rnd(12, 20)), category: 'Equipment & Machinery', amount: rnd(3000000, 6000000), note: 'Mua sắm trang thiết bị phần cứng' });
      if (isNeg) txs.push({ id: crypto.randomUUID(), type: 'expense', date: dt(rnd(5, 15)),  category: 'Legal & Consulting Fees', amount: rnd(1500000, 3500000), note: 'Phí tư vấn pháp lý dịch vụ' });
      if (Math.random() > 0.4) txs.push({ id: crypto.randomUUID(), type: 'expense', date: dt(rnd(18, 26)), category: 'Miscellaneous', amount: rnd(300000, 1500000), note: 'Chi phí lặt vặt phát sinh khác' });
    }
    saveTransactions(txs);
  }

  return {
    INCOME_CATEGORIES, EXPENSE_CATEGORIES,
    getTransactions, saveTransactions, addTransaction, updateTransaction, deleteTransaction,
    getSettings, saveSettings,
    getCustomCategories, saveCustomCategories, addCustomCategory, deleteCustomCategory,
    getAllIncomeCategories, getAllExpenseCategories,
    clearAll, seedDemoData,
    getUser, setUser, clearUser,
    setCurrentUser,
    getSimSnapshots, getSimSnapshot, setSimSnapshot, deleteSimSnapshot,
    getAllocSnapshots, getAllocSnapshot, setAllocSnapshot, deleteAllocSnapshot,
  };
})();
