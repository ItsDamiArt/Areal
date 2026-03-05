# Aréal — Sistema di Prenotazioni per Ristorante / Restaurant Reservation System

---

## ITALIANO

### Descrizione del Progetto

**Aréal** è un'applicazione web full-stack per la gestione delle prenotazioni di un ristorante gastronomico. Permette agli utenti di registrarsi, accedere, creare e cancellare prenotazioni, consultare il menù e navigare il sito in italiano o in inglese.

---

### Struttura del Progetto

```
Areal/
├── backend/           # Server Express + TypeScript + MySQL
│   └── src/
│       ├── config/    # Configurazione database
│       ├── controllers/  # Logica dei controller
│       ├── db/migrations/ # Script di migrazione DB
│       ├── middleware/   # Middleware di autenticazione
│       ├── model/     # Modelli e query SQL
│       ├── routes/    # Definizione delle rotte
│       ├── types/     # Tipi personalizzati TypeScript
│       └── index.ts   # Entry point del server
└── frontend/          # Client React + TypeScript + Vite
    └── src/
        ├── api/       # Funzioni per le chiamate HTTP
        ├── components/ # Componenti riutilizzabili
        ├── context/   # Contesto React per l'autenticazione
        ├── hook/      # Hook personalizzati
        ├── lang/      # File di traduzione (IT/EN)
        ├── pages/     # Pagine dell'applicazione
        ├── provider/  # Provider del contesto auth
        ├── routes/    # Gestione rotte protette
        └── types/     # Tipi TypeScript e schemi Zod
```

---

### Tecnologie Utilizzate

#### Backend
| Tecnologia | Versione | Scopo |
|---|---|---|
| Express | 5.1.0 | Framework web |
| TypeScript | 5.9.3 | Tipizzazione statica |
| MySQL2 | 3.15.3 | Database |
| express-session | 1.18.2 | Gestione sessioni |
| bcrypt | 6.0.0 | Hashing password |
| zod | 4.1.12 | Validazione schemi |
| cors | 2.8.5 | CORS |
| dotenv | 17.2.3 | Variabili d'ambiente |

#### Frontend
| Tecnologia | Versione | Scopo |
|---|---|---|
| React | 19.2.0 | Libreria UI |
| TypeScript | 5.9.3 | Tipizzazione statica |
| Vite | 7.2.4 | Build tool |
| React Router DOM | 7.10.0 | Routing lato client |
| i18next + react-i18next | 25.7.1 / 16.3.5 | Internazionalizzazione |
| zod | 4.1.13 | Validazione runtime |

---

### Funzionalità

- **Autenticazione**: Registrazione e login con sessioni sicure lato server
- **Prenotazioni**: Creazione, visualizzazione ed eliminazione di prenotazioni (con modale di conferma)
- **Menù**: Visualizzazione del menù completo con prezzi; download del PDF via Google Drive
- **Multilingua**: Interfaccia disponibile in italiano e inglese con cambio lingua in tempo reale
- **Route protette**: Le pagine riservate sono accessibili solo agli utenti autenticati
- **Validazione**: Schemi Zod su frontend e backend per la validazione dei dati

---

### API Endpoints

#### Autenticazione (`/auth`)
| Metodo | Endpoint | Descrizione |
|---|---|---|
| POST | `/auth/register` | Registrazione nuovo utente |
| POST | `/auth/login` | Login utente |
| POST | `/auth/logout` | Logout utente |
| GET | `/auth/check` | Verifica sessione attiva |

#### Prenotazioni (`/reservations`) — Protette
| Metodo | Endpoint | Descrizione |
|---|---|---|
| GET | `/reservations/getreservation` | Lista prenotazioni dell'utente |
| POST | `/reservations/createreservation` | Crea nuova prenotazione |
| DELETE | `/reservations/deletereservation/:id` | Elimina prenotazione per ID |

#### Menù (`/menu`)
| Metodo | Endpoint | Descrizione |
|---|---|---|
| GET | `/menu/download` | Restituisce URL PDF del menù |

---

### Pagine Frontend

| Percorso | Pagina | Protezione |
|---|---|---|
| `/` | Home | Pubblica |
| `/about` | Chi siamo | Pubblica |
| `/menu` | Menù | Pubblica |
| `/login` | Accedi | Pubblica |
| `/register` | Registrati | Pubblica |
| `/profile` | Area riservata | Autenticata |
| `/reservation` | Prenotazioni | Autenticata |
| `*` | 404 Not Found | — |

---

### Schema del Database

**Tabella `users`**
```sql
user_id     INT AUTO_INCREMENT PRIMARY KEY
name        VARCHAR(100)
surname     VARCHAR(100)
email       VARCHAR(150) UNIQUE
passwordHash VARCHAR(191)
```

**Tabella `reservations`**
```sql
res_id   INT AUTO_INCREMENT PRIMARY KEY
user_id  INT FOREIGN KEY -> users(user_id)
date     DATETIME
guests   INT
notes    VARCHAR(500) NULL
```

---

### Installazione e Avvio

#### Prerequisiti
- **Node.js** >= 18
- **MySQL** installato e in esecuzione

#### 1. Configurare le variabili d'ambiente

**`backend/.env`**
```env
DB_USER=root
DB_PASS=la_tua_password
DB_NAME=areal_db
MIA_CHIAVE_SEGRETA=chiave_segreta_qualsiasi
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:8080
VITE_API_URL_AUTH=http://localhost:8080/auth
VITE_API_URL_RES=http://localhost:8080/reservations
VITE_API_URL_MENU=http://localhost:8080/menu
```

#### 2. Inizializzare il database
```bash
cd backend
npm install
npm run setup-db
```

#### 3. Avviare il backend
```bash
cd backend
npm run dev
# Server in ascolto su http://localhost:8080
```

#### 4. Avviare il frontend
```bash
cd frontend
npm install
npm run dev
# App disponibile su http://localhost:5173
```

---

### Script Disponibili

#### Backend
| Script | Comando | Descrizione |
|---|---|---|
| `dev` | `nodemon src/index.ts` | Server di sviluppo con hot reload |
| `setup-db` | `ts-node src/db/migrations/001_user.ts` | Crea le tabelle nel database |

#### Frontend
| Script | Comando | Descrizione |
|---|---|---|
| `dev` | `vite` | Server di sviluppo con HMR |
| `build` | `tsc -b && vite build` | Build di produzione |
| `preview` | `vite preview` | Anteprima della build di produzione |
| `lint` | `eslint .` | Analisi statica del codice |

---

### Note sulla Sicurezza

- Le password sono hashate con **bcrypt** a 12 rounds
- Le sessioni sono gestite lato server con `express-session`
- Le rotte sensibili sono protette dal middleware `requireAuth`
- CORS configurato unicamente per l'origine del frontend
- Validazione degli input con **Zod** su entrambi i lati dello stack

---

---

## ENGLISH

### Project Description

**Aréal** is a full-stack web application for managing reservations at a gastronomic restaurant. It allows users to register, log in, create and delete reservations, browse the menu, and navigate the site in Italian or English.

---

### Project Structure

```
Areal/
├── backend/           # Express + TypeScript + MySQL server
│   └── src/
│       ├── config/    # Database configuration
│       ├── controllers/  # Controller logic
│       ├── db/migrations/ # DB migration scripts
│       ├── middleware/   # Authentication middleware
│       ├── model/     # Models and SQL queries
│       ├── routes/    # Route definitions
│       ├── types/     # Custom TypeScript types
│       └── index.ts   # Server entry point
└── frontend/          # React + TypeScript + Vite client
    └── src/
        ├── api/       # HTTP call functions
        ├── components/ # Reusable components
        ├── context/   # React auth context
        ├── hook/      # Custom hooks
        ├── lang/      # Translation files (IT/EN)
        ├── pages/     # Application pages
        ├── provider/  # Auth context provider
        ├── routes/    # Protected route handling
        └── types/     # TypeScript types and Zod schemas
```

---

### Technologies Used

#### Backend
| Technology | Version | Purpose |
|---|---|---|
| Express | 5.1.0 | Web framework |
| TypeScript | 5.9.3 | Static typing |
| MySQL2 | 3.15.3 | Database |
| express-session | 1.18.2 | Session management |
| bcrypt | 6.0.0 | Password hashing |
| zod | 4.1.12 | Schema validation |
| cors | 2.8.5 | CORS |
| dotenv | 17.2.3 | Environment variables |

#### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.0 | UI library |
| TypeScript | 5.9.3 | Static typing |
| Vite | 7.2.4 | Build tool |
| React Router DOM | 7.10.0 | Client-side routing |
| i18next + react-i18next | 25.7.1 / 16.3.5 | Internationalization |
| zod | 4.1.13 | Runtime validation |

---

### Features

- **Authentication**: Registration and login with secure server-side sessions
- **Reservations**: Create, view and delete reservations (with confirmation modal)
- **Menu**: Full menu display with prices; PDF download via Google Drive
- **Multilingual**: Interface available in Italian and English with real-time language switching
- **Protected routes**: Reserved pages accessible only to authenticated users
- **Validation**: Zod schemas on both frontend and backend for data validation

---

### API Endpoints

#### Authentication (`/auth`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |
| POST | `/auth/logout` | User logout |
| GET | `/auth/check` | Check active session |

#### Reservations (`/reservations`) — Protected
| Method | Endpoint | Description |
|---|---|---|
| GET | `/reservations/getreservation` | Get user's reservations |
| POST | `/reservations/createreservation` | Create new reservation |
| DELETE | `/reservations/deletereservation/:id` | Delete reservation by ID |

#### Menu (`/menu`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/menu/download` | Returns menu PDF URL |

---

### Frontend Pages

| Path | Page | Protection |
|---|---|---|
| `/` | Home | Public |
| `/about` | About | Public |
| `/menu` | Menu | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/profile` | Private area | Authenticated |
| `/reservation` | Reservations | Authenticated |
| `*` | 404 Not Found | — |

---

### Database Schema

**`users` table**
```sql
user_id     INT AUTO_INCREMENT PRIMARY KEY
name        VARCHAR(100)
surname     VARCHAR(100)
email       VARCHAR(150) UNIQUE
passwordHash VARCHAR(191)
```

**`reservations` table**
```sql
res_id   INT AUTO_INCREMENT PRIMARY KEY
user_id  INT FOREIGN KEY -> users(user_id)
date     DATETIME
guests   INT
notes    VARCHAR(500) NULL
```

---

### Installation and Setup

#### Prerequisites
- **Node.js** >= 18
- **MySQL** installed and running

#### 1. Configure environment variables

**`backend/.env`**
```env
DB_USER=root
DB_PASS=your_password
DB_NAME=areal_db
MIA_CHIAVE_SEGRETA=any_secret_key
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:8080
VITE_API_URL_AUTH=http://localhost:8080/auth
VITE_API_URL_RES=http://localhost:8080/reservations
VITE_API_URL_MENU=http://localhost:8080/menu
```

#### 2. Initialize the database
```bash
cd backend
npm install
npm run setup-db
```

#### 3. Start the backend
```bash
cd backend
npm run dev
# Server listening on http://localhost:8080
```

#### 4. Start the frontend
```bash
cd frontend
npm install
npm run dev
# App available at http://localhost:5173
```

---

### Available Scripts

#### Backend
| Script | Command | Description |
|---|---|---|
| `dev` | `nodemon src/index.ts` | Development server with hot reload |
| `setup-db` | `ts-node src/db/migrations/001_user.ts` | Creates database tables |

#### Frontend
| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Development server with HMR |
| `build` | `tsc -b && vite build` | Production build |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint .` | Static code analysis |

---

### Security Notes

- Passwords are hashed with **bcrypt** at 12 rounds
- Sessions are managed server-side with `express-session`
- Sensitive routes are protected by the `requireAuth` middleware
- CORS configured exclusively for the frontend origin
- Input validation with **Zod** on both sides of the stack


Developed by Federica Lecce - ItsDamiArt — Esercitazione 4