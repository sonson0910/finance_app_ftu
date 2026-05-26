const Charts = (() => {
  const registry = new Map();
  let curSym = '₫';
  let fmtCur = v => new Intl.NumberFormat('vi-VN').format(Math.round(v)) + ' ₫';
  let fmtCurShort = v => {
    v = Number(v) || 0;
    if (v >= 1e12) return (v / 1e12).toFixed(1) + ' T';
    if (v >= 1e9)  return (v / 1e9).toFixed(1)  + ' Tỷ';
    if (v >= 1e6)  return (v / 1e6).toFixed(0)  + ' Tr';
    return new Intl.NumberFormat('vi-VN').format(Math.round(v));
  };

  const C = {
    orange: '#f05a28', blue: '#1e90ff', teal: '#00d4aa', red: '#ff4757',
    purple: '#a855f7', yellow: '#fbbf24', muted: '#7a9ab5',
    grid: 'rgba(255,255,255,0.05)', tooltip: '#0d1e2e',
  };

  const CAT_COLORS = {
    // Income — Core Revenue
    'Product Sales': '#0ea5e9', 'Service Revenue': '#10b981',
    'Subscription & Recurring Revenue': '#8b5cf6', 'Project-Based Revenue': '#f59e0b',
    'Licensing & Royalties': '#ec4899',
    // Income — Secondary Revenue
    'Commission & Agency Fees': '#f97316', 'Consulting Fees': '#06b6d4',
    'Rental Income': '#84cc16', 'Franchise Fees': '#eab308',
    // Income — Financial Income
    'Interest Income': '#4ade80', 'Dividend Income': '#38bdf8',
    'Investment Gains': '#a78bfa', 'Foreign Exchange Gains': '#fde047',
    // Income — Other Income
    'Government Grants & Subsidies': '#67e8f9', 'Insurance Claims': '#c4b5fd',
    'Asset Disposal Gains': '#fb923c', 'Miscellaneous Income': '#9ca3af',
    // Expense — Operating
    'Cost of Goods Sold (COGS)': '#f59e0b', 'Salaries & Wages': '#ef4444',
    'Rent & Office Expenses': '#3b82f6', Utilities: '#06b6d4',
    'Marketing & Advertising': '#ec4899', 'Travel & Transportation': '#38bdf8',
    'Software & Subscriptions': '#8b5cf6', 'Office Supplies': '#84cc16',
    // Expense — Financial
    'Interest on Loans': '#f97316', 'Bank Fees': '#94a3b8', 'Tax & Compliance': '#fde047',
    // Expense — Capital
    'Equipment & Machinery': '#10b981', 'Furniture & Fixtures': '#a78bfa', Vehicle: '#fb923c',
    // Expense — Other
    Insurance: '#e879f9', 'Training & Development': '#4ade80',
    'Legal & Consulting Fees': '#67e8f9', 'Depreciation & Amortization': '#c4b5fd',
    Miscellaneous: '#9ca3af',
  };

  function setCurrency(s) {
    curSym = s || '₫';
    if (curSym === '₫') {
      fmtCur = v => new Intl.NumberFormat('vi-VN').format(Math.round(v)) + ' ₫';
      fmtCurShort = v => {
        v = Number(v) || 0;
        if (v >= 1e12) return (v / 1e12).toFixed(1) + ' T';
        if (v >= 1e9)  return (v / 1e9).toFixed(1)  + ' Tỷ';
        if (v >= 1e6)  return (v / 1e6).toFixed(0)  + ' Tr';
        return new Intl.NumberFormat('vi-VN').format(Math.round(v));
      };
    } else {
      fmtCur = v => curSym + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(v);
      fmtCurShort = v => {
        v = Number(v) || 0;
        if (v >= 1e9) return curSym + (v / 1e9).toFixed(1) + 'B';
        if (v >= 1e6) return curSym + (v / 1e6).toFixed(0) + 'M';
        if (v >= 1e3) return curSym + (v / 1e3).toFixed(0) + 'K';
        return curSym + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(v);
      };
    }
  }

  function destroy(id) {
    if (registry.has(id)) { registry.get(id).destroy(); registry.delete(id); }
  }

  function grad(ctx, c1, c2) {
    const g = ctx.createLinearGradient(0, 0, 0, 300);
    g.addColorStop(0, c1); g.addColorStop(1, c2);
    return g;
  }

  function baseOpts() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 700, easing: 'easeInOutQuart' },
      layout: { padding: { left: 10 } },
      plugins: {
        legend: { labels: { color: C.muted, font: { family: 'Inter', size: 12 }, boxWidth: 12, padding: 16 } },
        tooltip: {
          backgroundColor: C.tooltip, borderColor: C.orange, borderWidth: 1,
          titleColor: '#e8eef4', bodyColor: C.muted, padding: 12,
          callbacks: { label: ctx => ` ${fmtCur(ctx.parsed.y ?? ctx.parsed)}` },
        },
      },
      scales: {
        x: { grid: { color: C.grid, drawBorder: false }, ticks: { color: C.muted, font: { family: 'Inter', size: 11 } } },
        y: { grid: { color: C.grid, drawBorder: false }, ticks: { color: C.muted, font: { family: 'Inter', size: 11 }, maxTicksLimit: 6, callback: v => fmtCur(v) } },
      },
    };
  }

  function make(id, config) {
    destroy(id);
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const chart = new Chart(canvas.getContext('2d'), config);
    registry.set(id, chart);
    return chart;
  }

  function dashboardOverview(id, labels, incomeData, expenseData) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    make(id, {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Revenue (Thu nhập)',   data: incomeData,  borderColor: '#22c55e', backgroundColor: grad(ctx, 'rgba(34,197,94,0.1)', 'rgba(34,197,94,0)'), fill: true, tension: 0.4, pointBackgroundColor: '#22c55e', pointBorderColor: '#22c55e', pointRadius: 4, pointHoverRadius: 7, borderWidth: 2 },
          { label: 'Expenses (Chi phí)', data: expenseData, borderColor: C.orange, backgroundColor: grad(ctx, 'rgba(240,90,40,0.22)', 'rgba(240,90,40,0)'), fill: true, tension: 0.4, pointBackgroundColor: C.orange, pointRadius: 4, pointHoverRadius: 7, borderWidth: 2 },
        ],
      },
      options: baseOpts(),
    });
  }

  function monthlyBar(id, labels, data, color, label, bgColor) {
    make(id, {
      type: 'bar',
      data: { labels, datasets: [{ label, data, backgroundColor: bgColor || color + 'bb', borderColor: color, borderWidth: 1, borderRadius: 6, borderSkipped: false }] },
      options: baseOpts(),
    });
  }

  function categoryDonut(id, labels, data, colorMap) {
    const total = data.reduce((a, b) => a + b, 0);
    const renderData = total > 0 ? data : data.map(() => 1);
    const baseColors = labels.map(l => (colorMap && colorMap[l]) || CAT_COLORS[l] || C.muted);
    const colors = total > 0 ? baseColors : baseColors.map(() => 'rgba(255,255,255,0.1)');
    make(id, {
      type: 'doughnut',
      data: { labels, datasets: [{ data: renderData, backgroundColor: colors, borderColor: colors, borderWidth: 2, hoverOffset: total > 0 ? 8 : 0 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 700, easing: 'easeInOutQuart' },
        cutout: '65%',
        plugins: {
          legend: { position: 'right', labels: { color: C.muted, font: { family: 'Inter', size: 12 }, boxWidth: 12, padding: 14 } },
          tooltip: {
            backgroundColor: C.tooltip, borderColor: C.orange, borderWidth: 1,
            titleColor: '#e8eef4', bodyColor: C.muted, padding: 12,
            callbacks: {
              label: ctx => {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const pct   = total > 0 ? Math.round(ctx.parsed / total * 100) : 0;
                return ` ${fmtCur(ctx.parsed)} (${pct}%)`;
              },
            },
          },
        },
      },
    });
  }

  function simStockDonut(id, labels, data, colors) {
    make(id, {
      type: 'doughnut',
      data: { labels, datasets: [{ data, backgroundColor: colors, borderColor: colors, borderWidth: 2, hoverOffset: 8 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 700, easing: 'easeInOutQuart' },
        cutout: '62%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: C.tooltip, borderColor: C.orange, borderWidth: 1,
            titleColor: '#e8eef4', bodyColor: C.muted, padding: 12,
            callbacks: {
              label: ctx => {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const pct   = total > 0 ? Math.round(ctx.parsed / total * 100) : 0;
                return ` ${fmtCur(ctx.parsed)} (${pct}%)`;
              },
            },
          },
        },
      },
    });
  }

  function cashFlowBar(id, labels, data) {
    make(id, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Net Cash Flow (Dòng tiền ròng)',
          data,
          backgroundColor: data.map(v => v >= 0 ? C.teal + '99' : C.red + '99'),
          borderColor:     data.map(v => v >= 0 ? C.teal       : C.red),
          borderWidth: 1, borderRadius: 6, borderSkipped: false,
        }],
      },
      options: baseOpts(),
    });
  }

  function cumulativeArea(id, labels, data) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    make(id, {
      type: 'line',
      data: { labels, datasets: [{ label: 'Cumulative Balance (Số dư tích lũy)', data, borderColor: C.teal, backgroundColor: grad(ctx, 'rgba(0,212,170,0.35)', 'rgba(0,212,170,0)'), fill: true, tension: 0.4, pointBackgroundColor: C.teal, pointRadius: 4, pointHoverRadius: 7, borderWidth: 2 }] },
      options: baseOpts(),
    });
  }

  function dailyStackedBar(id, dayLabels, days, dayMap, catColors) {
    const allCats = [...new Set(days.flatMap(d => (dayMap[d] || []).map(t => t.category)))].sort();
    const dayTotals = days.map(d => (dayMap[d] || []).reduce((s, t) => s + t.amount, 0));

    const datasets = allCats.map(cat => ({
      label: cat,
      data: days.map(d => (dayMap[d] || []).filter(t => t.category === cat).reduce((s, t) => s + t.amount, 0)),
      backgroundColor: (catColors[cat] || C.muted) + 'cc',
      borderColor: catColors[cat] || C.muted,
      borderWidth: 1, borderRadius: 3, stack: 'daily',
    }));

    const opts = baseOpts();
    opts.plugins.tooltip = {
      backgroundColor: C.tooltip, borderColor: C.orange, borderWidth: 1,
      titleColor: '#e8eef4', bodyColor: C.muted, padding: 12,
      filter: (item) => item.parsed.y !== 0,
      callbacks: {
        label: (ctx) => `  ${ctx.dataset.label}: ${fmtCur(ctx.parsed.y)}`,
        footer: (items) => `Total (Tổng): ${fmtCur(dayTotals[items[0].dataIndex])}`,
      },
    };
    opts.scales.x.stacked = true;
    opts.scales.y.stacked = true;

    make(id, {
      type: 'bar',
      data: { labels: dayLabels, datasets },
      options: opts,
    });
  }

  function dailyBar(id, labels, data, color, perDayTxs) {
    const opts = baseOpts();
    opts.plugins.legend = { display: false };
    opts.plugins.tooltip = {
      backgroundColor: C.tooltip, borderColor: color, borderWidth: 1,
      titleColor: '#e8eef4', bodyColor: C.muted, padding: 12,
      callbacks: {
        label: (ctx) => {
          const txs = perDayTxs[ctx.dataIndex] || [];
          return txs.map(t => `  ${t.category}${t.note ? ' · ' + t.note : ''}: ${fmtCur(t.amount)}`);
        },
        footer: (items) => `Total (Tổng): ${fmtCur(data[items[0].dataIndex])}`,
      },
    };
    make(id, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: '', data,
          backgroundColor: color + 'bb', borderColor: color,
          borderWidth: 1, borderRadius: 6, borderSkipped: false,
        }],
      },
      options: opts,
    });
  }

  function simulatorGrowth(id, labels, contributed, gains) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const opts = baseOpts();
    opts.scales.y.stacked = true;
    make(id, {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Investment Gains (Lợi nhuận gộp)',     data: gains,       borderColor: C.orange, backgroundColor: grad(ctx, 'rgba(240,90,40,0.45)',   'rgba(240,90,40,0.05)'),   fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2, stack: 'portfolio' },
          { label: 'Contributed Capital (Vốn gốc tích lũy)',  data: contributed, borderColor: C.blue,   backgroundColor: grad(ctx, 'rgba(30,144,255,0.45)', 'rgba(30,144,255,0.05)'), fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2, stack: 'portfolio' },
        ],
      },
      options: opts,
    });
  }

  function simGrowthLine(id, labels, contributed, gains) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const opts = baseOpts();
    opts.scales.y.ticks.callback = fmtCurShort;
    opts.scales.y.stacked = true;
    opts.plugins.tooltip = {
      backgroundColor: C.tooltip, borderColor: C.orange, borderWidth: 1,
      titleColor: '#e8eef4', bodyColor: C.muted, padding: 12,
      callbacks: {
        label: ctx => ` ${ctx.dataset.label}: ${fmtCur(ctx.parsed.y)}`,
        footer: items => `Total (Tổng): ${fmtCur(items.reduce((s, it) => s + it.parsed.y, 0))}`,
      },
    };
    make(id, {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Gains (Lợi nhuận)',      data: gains,       borderColor: C.orange, backgroundColor: grad(ctx, 'rgba(240,90,40,0.40)',   'rgba(240,90,40,0.04)'),   fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2, stack: 'sim' },
          { label: 'Capital (Vốn gốc)',    data: contributed, borderColor: '#f5f0e0', backgroundColor: grad(ctx, 'rgba(245,240,224,0.40)', 'rgba(245,240,224,0.04)'), fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2, stack: 'sim' },
        ],
      },
      options: opts,
    });
  }

  function simStockMilestone(id, milestoneLabels, stocksData) {
    const PALETTE = ['#1e90ff', '#00d4aa', '#a855f7', '#fbbf24', '#f472b6'];
    const datasets = stocksData.map((s, i) => ({
      label: s.label,
      data:  s.data,
      backgroundColor: PALETTE[i % PALETTE.length] + 'bb',
      borderColor:     PALETTE[i % PALETTE.length],
      borderWidth: 1, borderRadius: 6, borderSkipped: false,
    }));
    const opts = baseOpts();
    opts.scales.y.ticks.callback = fmtCurShort;
    opts.plugins.tooltip = {
      backgroundColor: C.tooltip, borderColor: C.orange, borderWidth: 1,
      titleColor: '#e8eef4', bodyColor: C.muted, padding: 12,
      callbacks: { label: ctx => ` ${ctx.dataset.label}: ${fmtCur(ctx.parsed.y)}` },
    };
    make(id, { type: 'bar', data: { labels: milestoneLabels, datasets }, options: opts });
  }

  function simPortfolioArea(id, labels, datasets) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function hexRgba(hex, a) {
      const h = hex.replace('#', '');
      return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${a})`;
    }
    const opts = baseOpts();
    opts.scales.y.ticks.callback = fmtCurShort;
    opts.plugins.tooltip = {
      mode: 'index',
      backgroundColor: C.tooltip, borderColor: C.orange, borderWidth: 1,
      titleColor: '#e8eef4', bodyColor: C.muted, padding: 12,
      callbacks: {
        label: ctx => ` ${ctx.dataset.label}: ${fmtCurShort(ctx.parsed.y)}`,
      },
    };
    make(id, {
      type: 'line',
      data: {
        labels,
        datasets: datasets.map(d => ({
          label: d.label,
          data:  d.data,
          borderColor: d.color,
          backgroundColor: hexRgba(d.color, 0.08),
          fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2,
        })),
      },
      options: opts,
    });
  }

  function registerColor(name, color) { CAT_COLORS[name] = color; }
  function unregisterColor(name) { delete CAT_COLORS[name]; }

  return { dashboardOverview, monthlyBar, dailyBar, dailyStackedBar, categoryDonut, simStockDonut, cashFlowBar, cumulativeArea, simulatorGrowth, simGrowthLine, simStockMilestone, simPortfolioArea, destroy, CAT_COLORS, setCurrency, registerColor, unregisterColor, formatCurrency: v => fmtCur(v), formatCurrencyShort: v => fmtCurShort(v) };
})();
