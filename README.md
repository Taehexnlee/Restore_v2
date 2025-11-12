# Restore v2

Restore v2 is a modern e-commerce sample that pairs an **ASP.NET Core 8** API with a **React 19 + Vite** front-end. It demonstrates a complete workflow that covers catalog browsing, baskets, checkout with **Stripe**, and order management backed by SQL Server and ASP.NET Identity.

---

## Highlights
- Full-stack store: product catalog, basket persistence via cookies, checkout, orders, and admin roles seeded on startup.
- ASP.NET Core 8 Web API + Entity Framework Core + SQL Server with Identity API endpoints and custom middleware.
- React 19 + Vite, MUI, RTK Query, Redux Toolkit, React Router 7, and Stripe Elements for the client experience.
- Secure-by-default local dev setup (HTTPS + cookies) powered by `vite-plugin-mkcert` and Identity cookie auth.
- Shared deployment story: `npm run build` writes static assets to `API/wwwroot`, so `dotnet publish` ships both API + SPA.

---

## Repository Layout
```
Restore/
├─ API/                      # ASP.NET Core Web API + Identity + EF Core context
│  ├─ Controllers/           # Products, Basket, Account, Orders, Payments, etc.
│  ├─ Data/                  # StoreContext, migrations, DbInitializer (seed)
│  ├─ Entities/              # Products, Basket, Order aggregate, Identity user
│  └─ wwwroot/               # Vite build output served by ASP.NET Core
├─ client/                   # React + Vite front-end
│  ├─ src/                   # Feature-based React app (RTK Query + MUI)
│  └─ scripts/sync-wwwroot.js# Copies built assets to client/dist when needed
├─ docker-compose.yml        # SQL Server 2022 container for local dev
└─ Restore.sln               # Solution that loads the API project
```

---

## Prerequisites
- **.NET SDK 8.0.x** (`dotnet --version` ≥ 8.0)
- **Node.js 20 LTS** (18+ works, 20 recommended) and npm
- **SQL Server 2022** (local install or Docker; compose file provided)
- **mkcert** (optional but recommended) to issue local HTTPS certificates for Vite
- **Stripe test account** to supply Publishable, Secret, and Webhook signing keys

---

## Getting Started

### 1. Configure the API
1. Copy `API/appsettings.Development.json` (already tracked) and update the secrets:

   ```json
   {
     "Logging": {
       "LogLevel": {
         "Default": "Information",
         "Microsoft.AspNetCore": "Information"
       }
     },
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost,1435;Database=Shop;User ID=sa;Password=Password@1;Encrypt=True;TrustServerCertificate=True;"
     },
     "StripeSettings": {
       "PublishableKey": "pk_test_xxx",
       "SecretKey": "sk_test_xxx",
       "WhSecret": "whsec_xxx"
     }
   }
   ```

   > You can also keep secrets out of source control by using environment variables such as `ConnectionStrings__DefaultConnection`, `StripeSettings__SecretKey`, and `StripeSettings__WhSecret`.

2. (Optional) If you use the provided Docker SQL instance, leave the connection string as-is (`localhost,1435`). Otherwise point it at your SQL Server.
3. Trust the ASP.NET Core dev certificate if you have not already:

   ```bash
   dotnet dev-certs https --trust
   ```

4. Install tooling (first run only) and start the API:

   ```bash
   cd API
   dotnet tool install --global dotnet-ef   # skip if already installed
   dotnet restore
   dotnet ef database update                 # applies migrations + seeds
   dotnet watch run                          # https://localhost:5001 by default
   ```

   The `DbInitializer` seeds sample products plus two users:
   - `bob@test.com` / `Pa$$w0rd` (Member)
   - `admin@test.com` / `Pa$$w0rd` (Member + Admin)

### 2. Configure the client
1. Install dependencies:

   ```bash
   cd client
   npm install
   ```

2. Create `client/.env` with the values that match your API + Stripe setup:

   ```bash
   VITE_API_URL=https://localhost:5001
   VITE_STRIPE_PK=pk_test_xxx
   ```

   - When `VITE_API_URL` is omitted, the client falls back to same-origin `/api`, which is useful once the SPA is served by ASP.NET Core after a production build.
   - `VITE_STRIPE_PK` is required so Stripe Elements can load.

3. (HTTPS dev) Install certificates once so the Vite dev server can run on `https://localhost:3001`:

   ```bash
   npx vite-plugin-mkcert install
   ```

4. Start the client:

   ```bash
   npm run dev
   ```

   The dev server runs on `https://localhost:3001`. CORS for this origin has already been enabled in `API/Program.cs`.

### 3. (Optional) Run SQL Server via Docker
Use the provided compose file if you do not have SQL Server installed locally.

```bash
docker compose up sql -d
```

- Exposes SQL on host port **1435**. Match the same port in `DefaultConnection`.
- Persisted data lives in the `sql-data` volume. Stop with `docker compose down` (add `-v` to wipe data).

### 4. Stripe webhook testing
Use the Stripe CLI (or dashboard) to forward events to the API:

```bash
stripe listen --forward-to https://localhost:5001/api/payments/webhook
```

Set `StripeSettings:WhSecret` (or `StripeSettings__WhSecret`) with the signing secret that the CLI prints so events can be authenticated.

---

## Build & Deploy
1. Build the client. Vite writes straight into `API/wwwroot`, after which `scripts/sync-wwwroot.js` copies a copy into `client/dist` for previewing.
   ```bash
   cd client
   npm run build
   ```
2. Publish the API (which now contains the SPA):
   ```bash
   cd API
   dotnet publish -c Release -o ../publish
   ```
   The `publish` folder can be deployed to any IIS, Azure App Service, container image, etc.

When serving the SPA from the API, the `VITE_API_URL` variable can be removed so the client uses same-origin `/api` requests.

---

## Useful Commands
- **API**
  - `dotnet restore && dotnet build` – restore and compile
  - `dotnet watch run` – hot reload while developing
  - `dotnet ef migrations add <Name>` – add a migration (requires `dotnet-ef` tool)
- **Client**
  - `npm run dev` – HTTPS dev server on port 3001
  - `npm run lint` – ESLint (React, hooks, TS)
  - `npm run build` – type-check + Vite build + sync static assets
  - `npm run preview` – serve the production build from `client/dist`

---

## Troubleshooting
- **Client cannot reach the API:** double-check `VITE_API_URL`, verify the API is using HTTPS, and confirm `https://localhost:3001` is listed in CORS (`Program.cs`).
- **Database connection failures:** ensure SQL Server listens on the port you configured (1435 if using Docker) and that the login/password satisfy the SQL password policy.
- **Stripe payment intent errors:** confirm both the client publishable key and API secret key are in sync, and that the webhook signing secret matches the one returned by `stripe listen`.
- **Mixed-content or certificate warnings:** run `dotnet dev-certs https --trust` and `npx vite-plugin-mkcert install` so both servers present trusted certificates locally.

---

Happy building! If you add new services (e.g., background workers or admin tooling) remember to update both this README and the GitHub Actions workflows to keep everything in sync.
