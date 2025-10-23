# 🧩 Base Next.js Starter Kit

This project serves as a **base template** for future web applications and as a **learning playground** for exploring new technologies and best practices in modern frontend development.

---

## 🚀 Purpose

- 🧱 Provide a **scalable and maintainable base kit** for future projects.  
- 🧠 Serve as a **training and experimentation environment** for learning new frameworks and libraries.  

---

## 🛠️ Tech Stack

| Technology | Description |
|-------------|--------------|
| **[Next.js](https://nextjs.org/)** | React framework for hybrid rendering (SSR & CSR) and improved SEO performance. |
| **[Shadcn/UI](https://ui.shadcn.com/)** | Beautifully designed, accessible components built on **Radix UI**, easy to customize and scale. |
| **[React Hook Form](https://react-hook-form.com/)** | Efficient form management with excellent integration with Shadcn UI components. |
| **[Zod](https://zod.dev/)** | Type-safe schema validation for forms and API payloads. |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first CSS framework for fast and responsive UI styling. |
| **[Axios](https://axios-http.com/)** | Promise-based HTTP client for making API requests. |
| **[TanStack Query](https://tanstack.com/query)** | Data fetching, caching, and synchronization layer for React applications. |
| **[Zustand](https://zustand-demo.pmnd.rs/)** | Lightweight state management library for client-side global state. |

---

## 🛠️ Folder structure

[src]/
├── [app]/ # Next.js route directory (App Router)
│
├── [components]/ # UI components organized by atomic design principles
│ ├── `atoms`/ # Reusable atomic components built from Shadcn UI
│ ├── `molecules`/ # Composite components combining multiple atoms
│ ├── `providers`/ # Application-level context providers
│ ├── `shadcn-ui`/ # Base Shadcn UI components
│ ├── `templates`/ # Layout and template components for dynamic UI
│ └── `ui`/ # Reusable UI sections such as Header, Footer, Hero, ProductList, etc.
│
├── [lib]/
│ ├── [core]/ # Core configurations and utilities
│ │ ├── `config`/ # Global configuration (e.g., fonts, environment settings)
│ │ ├── `database`/ # MongoDB configuration, connection setup, and instance management
│ │ └── `utils`/ # Utility functions (e.g., cn, JWT helpers)
│ │
│ ├── [feature]/ # Feature-based modules following domain-driven design
│ │ ├── [auth]/
│ │ │ ├── `actions`/ # Server actions (e.g., loginAction with validation)
│ │ │ ├── `api`/ # API route definitions (e.g., authApi.login)
│ │ │ ├── `data`/ # Database access logic (CRUD operations)
│ │ │ ├── `domain`/ # Domain models, repository, and service interfaces
│ │ │ ├── `hooks`/ # Feature-specific hooks (e.g., useLogin, useProfile)
│ │ │ └── `services`/ # Business logic and service implementation
│ │ ├── [orders]/ # Order management feature module
│ │ └── [products]/ # Product management feature module
│ │
│ ├── [infrastructure]/ # Application infrastructure setup
│ │ ├── `api`/ # Axios instance, interceptors, and request configuration
│ │ ├── `middleware`/ # Common middleware (e.g., withAuth, withRateLimit)
│ │ └── `query`/ # QueryClient instance and query key management for TanStack Query
│ │
│ ├── [shared]/ # Shared utilities and global definitions
│ │ ├── `constants`/ # Application-wide constants
│ │ ├── `hooks`/ # Common reusable hooks
│ │ ├── `schema`/ # Shared Zod schemas for validation and data parsing
│ │ └── `types`/ # Global and shared TypeScript types
│ │
│ └── [store]/ # Zustand store for global client-side state management

---

## 💡 Key Features

- **Type-safe architecture** powered by TypeScript.  
- **Server and Client Components** following Next.js App Router best practices.  
- **Form validation** and **error handling** with React Hook Form + Zod.  
- **Optimized API interaction** with Axios and TanStack Query.  
- **Scalable folder structure** for long-term maintainability.  

---

## 🧭 Goals

- Build a **reusable, opinionated starter** for future Next.js projects.  
- Create a **sandbox environment** for experimenting with new frontend features and patterns.  

---

## ⚙️ Setup & Development

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo.git

# Navigate into the project directory
cd your-repo

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
