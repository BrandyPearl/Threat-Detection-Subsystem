/* D.MOBILE — shared UI logic */
const SESSION_KEY = "dmobile_session";

const PERMS = {
  "Super Admin": ["dashboard", "inventory", "sales", "reports", "query", "users", "logs"],
  "Admin": ["dashboard", "inventory", "sales", "reports"],
  "Staff": ["sales", "stock", "mysales"]
};

const NAV = [
  { key: "dashboard", href: "dashboard.html", label: "Dashboard", ic: "▤" },
  { key: "inventory", href: "inventory.html", label: "Inventory", ic: "▣" },
  { key: "stock", href: "stock.html", label: "Available Stock", ic: "▣" },
  { key: "sales", href: "sales.html", label: "Record Sale", ic: "▶" },
  { key: "mysales", href: "my-sales.html", label: "My Sales", ic: "≡" },
  { key: "reports", href: "reports.html", label: "Reports", ic: "◲" },
  { key: "query", href: "query.html", label: "Query Data", ic: "?" },
  { key: "users", href: "users.html", label: "User Management", ic: "☺" },
  { key: "logs", href: "logs.html", label: "Activity Logs", ic: "◷" }
];

function session() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY)); }
  catch (e) { return null; }
}
function logout() { sessionStorage.removeItem(SESSION_KEY); localStorage.removeItem(SESSION_KEY); location.href = "index.html"; }

function money(n) { return "XAF " + Number(n || 0).toLocaleString("en-US"); }
function num(n) { return Number(n || 0).toLocaleString("en-US"); }
function dt(s) { const d = new Date(s); return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }); }
function dtt(s) { const d = new Date(s); return dt(s) + " · " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }); }
function saleTotal(s) { return s.items.reduce((t, i) => t + i.price * i.qty, 0); }
function saleCost(s) { return s.items.reduce((t, i) => t + i.cost * i.qty, 0); }
function initials(name) { return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(); }

function toast(msg) {
  let el = document.querySelector(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 2600);
}

function stockState(p) {
  const t = DB.data.settings.lowStock;
  if (p.qty === 0) return { cls: "bad", text: "Out of stock" };
  if (p.qty <= t) return { cls: "warn", text: "Almost out" };
  return { cls: "ok", text: "In stock" };
}

/* Builds the sidebar + topbar. Call with the page key and title. */
function mountShell(pageKey, title, crumb) {
  const user = session();
  if (!user) { location.href = "index.html"; return null; }
  const allowed = PERMS[user.role] || [];
  if (!allowed.includes(pageKey)) {
    document.body.innerHTML = '<div style="padding:60px;text-align:center;font-family:Segoe UI,sans-serif">' +
      '<h2>Access denied</h2><p style="color:#6b7194;margin:10px 0 20px">Your role (' + user.role + ') cannot open this page.</p>' +
      '<a class="btn" href="' + (allowed[0] === "sales" ? "sales.html" : "dashboard.html") + '">Back to my area</a></div>';
    return null;
  }

  const links = NAV.filter(n => allowed.includes(n.key)).map(n =>
    '<a class="' + (n.key === pageKey ? "active" : "") + '" href="' + n.href + '"><span class="ic">' + n.ic + '</span>' + n.label + '</a>'
  ).join("");

  document.body.classList.add("app");
  document.body.innerHTML =
    '<div class="shell">' +
      '<aside class="sidebar">' +
        '<div class="logo"><img src="img/logo.jpg" alt="D.MOBILE logo"><div><strong>D.MOBILE</strong><span>EXPERIENCE THE BEST</span></div></div>' +
        '<div class="nav-group">MENU</div><nav>' + links + '</nav>' +
        '<div class="nav-group">ACCOUNT</div><nav>' +
          '<a href="#" id="navLogout"><span class="ic">⏻</span>Log out</a>' +
        '</nav>' +
        '<div style="margin-top:24px;font-size:11px;color:#8f98e0;line-height:1.7">Tel: 654823918<br>Opposite Burj Khalfa, Buea</div>' +
      '</aside>' +
      '<div class="main">' +
        '<header class="topbar">' +
          '<div><div class="crumb">' + (crumb || "D.MOBILE Inventory System") + '</div><h1>' + title + '</h1></div>' +
          '<div class="userbox"><div style="text-align:right"><div class="who">' + user.name + '</div><div class="role">' + user.role + '</div></div>' +
          '<div class="avatar">' + initials(user.name) + '</div></div>' +
        '</header>' +
        '<main class="content" id="content"></main>' +
      '</div>' +
    '</div>';

  document.getElementById("navLogout").onclick = function (e) { e.preventDefault(); logout(); };
  return user;
}
