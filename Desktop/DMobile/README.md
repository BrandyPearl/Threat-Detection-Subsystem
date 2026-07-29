# D.MOBILE — Inventory Management System (Frontend)

Pure **HTML + CSS + JavaScript**. No frameworks, no build step, no backend required.
Data is stored in the browser's `localStorage` so the prototype behaves like a real system
(adding a product, recording a sale, and stock decrementing all persist).

## Run it

Open `index.html` in any modern browser (or serve the folder with any static server).

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Super Admin (Owner) | owner@dmobile.cm | owner123 |
| Admin (Manager) | manager@dmobile.cm | manager123 |
| Staff (Sales Attendant) | staff@dmobile.cm | staff123 |

## Pages

| File | Purpose | Roles |
| --- | --- | --- |
| `index.html` | Login | all |
| `reset.html` | Password reset request | all |
| `dashboard.html` | KPIs, 7-day chart, top products, low-stock list, recent sales | Super Admin, Admin |
| `inventory.html` | Add/edit/delete products, filters, manual stock adjustment with logged reason | Super Admin, Admin |
| `sales.html` | POS-style sale entry, cart, payment method, printable receipt, auto stock decrement | all |
| `stock.html` | Read-only available goods listing | Staff |
| `my-sales.html` | Staff's own sales history | Staff |
| `reports.html` | Daily/weekly/monthly revenue, cost, profit, staff performance, payment split | Super Admin, Admin |
| `query.html` | Direct queries: revenue / profit / loss / units / stock value, shop-wide or per product | Super Admin |
| `users.html` | Create, edit, deactivate, delete accounts; low-stock threshold setting | Super Admin |
| `logs.html` | Activity log (who did what, when) + demo data reset | Super Admin |

## Structure

```
dmobile/
├── index.html, reset.html, dashboard.html, inventory.html,
│   sales.html, stock.html, my-sales.html, reports.html,
│   query.html, users.html, logs.html
├── css/styles.css      design system (D.MOBILE blue #1a2ad4, red #ec1c24, white)
├── js/data.js          seed data + localStorage persistence layer
├── js/app.js           session, role permissions, shell (sidebar/topbar), helpers
└── img/logo.jpg        D.MOBILE logo
```

## Notes

Role gating here is UI-level only, as it is a frontend prototype. When the MySQL backend is added,
enforce roles and hash passwords server-side, and replace `js/data.js` with API calls.
