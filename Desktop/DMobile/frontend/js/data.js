/* D.MOBILE Inventory System — demo data layer (localStorage) */
(function () {
  const KEY = "dmobile_db_v1";

  const seed = {
    users: [
      { id: 1, name: "Derrick Ndifor", email: "owner@dmobile.cm", password: "owner123", role: "Super Admin", active: true, created: "2026-01-12" },
      { id: 2, name: "Grace Etonde", email: "manager@dmobile.cm", password: "manager123", role: "Admin", active: true, created: "2026-02-03" },
      { id: 3, name: "Samuel Ako", email: "staff@dmobile.cm", password: "staff123", role: "Staff", active: true, created: "2026-03-19" },
      { id: 4, name: "Linda Mbua", email: "linda@dmobile.cm", password: "staff123", role: "Staff", active: false, created: "2026-04-02" }
    ],
    products: [
      { id: 101, name: "iPhone 15 Pro Max", brand: "Apple", model: "A2849", imei: "356938035643809", category: "Phones", cost: 620000, price: 745000, qty: 6 },
      { id: 102, name: "iPhone 13", brand: "Apple", model: "A2482", imei: "356938035641122", category: "Phones", cost: 320000, price: 395000, qty: 3 },
      { id: 103, name: "Samsung Galaxy S24", brand: "Samsung", model: "SM-S921B", imei: "354829110023456", category: "Phones", cost: 480000, price: 575000, qty: 2 },
      { id: 104, name: "Samsung A15", brand: "Samsung", model: "SM-A155F", imei: "354829110099871", category: "Phones", cost: 95000, price: 128000, qty: 11 },
      { id: 105, name: "Google Pixel 8", brand: "Google", model: "GKWS6", imei: "351122334455667", category: "Phones", cost: 350000, price: 430000, qty: 0 },
      { id: 106, name: "Tecno Spark 20", brand: "Tecno", model: "KJ5", imei: "352200114477889", category: "Phones", cost: 62000, price: 85000, qty: 14 },
      { id: 201, name: "20W Fast Charger", brand: "Apple", model: "MHJE3", imei: "", category: "Accessories", cost: 6500, price: 12000, qty: 42 },
      { id: 202, name: "Silicone Phone Case", brand: "Generic", model: "SC-01", imei: "", category: "Accessories", cost: 1200, price: 3500, qty: 5 },
      { id: 203, name: "Oraimo 20000mAh Power Bank", brand: "Oraimo", model: "OPB-20", imei: "", category: "Accessories", cost: 14000, price: 22500, qty: 18 },
      { id: 204, name: "Bluetooth Earbuds", brand: "Oraimo", model: "FreePods 4", imei: "", category: "Accessories", cost: 9000, price: 17000, qty: 1 },
      { id: 205, name: "Tempered Glass Screen Guard", brand: "Generic", model: "TG-9H", imei: "", category: "Accessories", cost: 500, price: 2000, qty: 60 }
    ],
    sales: [
      { id: "RC-1042", date: "2026-07-29T09:14:00", staff: "Samuel Ako", payment: "Cash", items: [{ pid: 106, name: "Tecno Spark 20", qty: 1, price: 85000, cost: 62000 }, { pid: 205, name: "Tempered Glass Screen Guard", qty: 1, price: 2000, cost: 500 }] },
      { id: "RC-1041", date: "2026-07-29T11:02:00", staff: "Grace Etonde", payment: "MTN MoMo", items: [{ pid: 101, name: "iPhone 15 Pro Max", qty: 1, price: 745000, cost: 620000 }] },
      { id: "RC-1040", date: "2026-07-28T16:41:00", staff: "Samuel Ako", payment: "Orange Money", items: [{ pid: 203, name: "Oraimo 20000mAh Power Bank", qty: 2, price: 22500, cost: 14000 }] },
      { id: "RC-1039", date: "2026-07-27T13:20:00", staff: "Samuel Ako", payment: "Cash", items: [{ pid: 104, name: "Samsung A15", qty: 1, price: 128000, cost: 95000 }, { pid: 201, name: "20W Fast Charger", qty: 1, price: 12000, cost: 6500 }] },
      { id: "RC-1038", date: "2026-07-25T10:05:00", staff: "Grace Etonde", payment: "Cash", items: [{ pid: 103, name: "Samsung Galaxy S24", qty: 1, price: 575000, cost: 480000 }] },
      { id: "RC-1037", date: "2026-07-22T15:33:00", staff: "Samuel Ako", payment: "MTN MoMo", items: [{ pid: 102, name: "iPhone 13", qty: 1, price: 395000, cost: 320000 }] },
      { id: "RC-1036", date: "2026-07-14T12:12:00", staff: "Samuel Ako", payment: "Cash", items: [{ pid: 201, name: "20W Fast Charger", qty: 3, price: 12000, cost: 6500 }] },
      { id: "RC-1035", date: "2026-07-06T17:48:00", staff: "Grace Etonde", payment: "Cash", items: [{ pid: 106, name: "Tecno Spark 20", qty: 2, price: 85000, cost: 62000 }] }
    ],
    logs: [
      { id: 1, date: "2026-07-29T11:03:00", user: "Grace Etonde", action: "Recorded sale RC-1041 (XAF 745,000)" },
      { id: 2, date: "2026-07-29T09:15:00", user: "Samuel Ako", action: "Recorded sale RC-1042 (XAF 87,000)" },
      { id: 3, date: "2026-07-28T08:30:00", user: "Derrick Ndifor", action: "Set low-stock threshold to 4 units" },
      { id: 4, date: "2026-07-27T18:02:00", user: "Grace Etonde", action: "Stock adjustment: Pixel 8 -1 (damaged unit)" },
      { id: 5, date: "2026-07-26T10:44:00", user: "Derrick Ndifor", action: "Created staff account: Linda Mbua" }
    ],
    settings: { lowStock: 4, currency: "XAF", shop: "D.MOBILE", phone: "654823918", location: "Opposite Burj Khalfa - Buea" }
  };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* fall through to seed */ }
    localStorage.setItem(KEY, JSON.stringify(seed));
    return JSON.parse(JSON.stringify(seed));
  }

  const DB = {
    data: load(),
    save() { localStorage.setItem(KEY, JSON.stringify(this.data)); },
    reset() { localStorage.removeItem(KEY); this.data = load(); }
  };

  window.DB = DB;
})();
