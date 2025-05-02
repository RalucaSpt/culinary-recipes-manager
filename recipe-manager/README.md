# 🍽️ Culinary Recipes Manager

Aplicație completă (frontend + backend) pentru gestionarea rețetelor culinare, cu suport pentru înregistrare, autentificare, adăugare, editare și ștergere de rețete.

## 📦 Tehnologii utilizate

- **Frontend**: Angular (cu standalone components, interceptors, guards)
- **Backend**: Node.js + Express
- **Bază de date**: PostgreSQL (Railway)
- **Autentificare**: sesiuni cu `express-session` + cookie-uri
- **Containerizare**: Docker (frontend și backend)

## ▶️ Funcționalități principale

### ✅ Autentificare și înregistrare
- Utilizatorii se pot înregistra și autentifica.
- Informațiile de sesiune sunt gestionate prin `express-session` și stocate în cookie-uri HTTP-only.

### 📖 Managementul rețetelor
- Vizualizare listă rețete.
- Vizualizare detalii rețetă (numai dacă ești autentificat).
- Creare, editare și ștergere rețetă (doar ca utilizator logat).

### 🧠 Protecție rută
- Rutele backend pentru detalii, adăugare și modificare rețete sunt protejate cu middleware-ul `isAuthenticated`.

## ⚙️ Instalare și rulare locală

### 1. Clonare repository
```bash
git clone https://github.com/<user>/<repo>.git
cd recipe-manager
```

### 2. Backend - configurare și pornire
```bash
cd backend
npm install
```

Asigură-te că ai setat corect conexiunea la PostgreSQL în `db.js`. Exemplu:
```js
const pool = new Pool({
  connectionString: 'postgresql://<user>:<password>@<host>:<port>/<database>',
  ssl: { rejectUnauthorized: false }
});
```

Apoi rulează:
```bash
node server.js
```

### 3. Frontend - configurare și pornire
```bash
cd frontend
npm install
ng serve
```

Aplicația va fi disponibilă la: [http://localhost:4200](http://localhost:4200)

## 🐳 Rulare cu Docker

### 1. Backend
```bash
cd backend
docker build -t recipe-backend .
docker run -p 3000:3000 recipe-backend
```

### 2. Frontend
```bash
cd frontend
docker build -t recipe-frontend .
docker run -p 4200:80 recipe-frontend
```


