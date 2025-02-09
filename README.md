# 🛍️ HopOasis - E-commerce Store (Frontend)

## 🚀 Project Description

HopOasis is an e-commerce platform that allows users to easily search, browse, and purchase products. The project includes a wide range of features for both users and administrators, such as product search and sorting, a shopping cart with checkout functionality, a responsive design, an authentication system, and an admin panel.

The core features include:
- Product search by name and keywords
- Sorting by price and rating
- Pagination for easy navigation
- Filtering by categories and price range
- Order history without time limitations
- Integration with the Stripe payment system
- User authentication and Google OAuth login
- Shopping cart and order placement
- Review system with admin moderation
- Discounts, promo codes, and special offers
- Automated email notifications for order status

---

## 🛠️ Tech Stack

- **Angular 18**
- **TypeScript**
- **RxJS**
- **NGXS (State Management)**
- **REST API Integration**

---

## 👷‍♀️ Local Setup Instructions

### 1️⃣ Install Node.js and npm

**Recommended version: Node.js 18+**

#### Linux:
```sh
sudo apt update && sudo apt install nodejs npm
node -v   # Verify installation
```

#### Windows:
```sh
winget install OpenJS.NodeJS
node -v
```

#### macOS:
```sh
brew install node
node -v
```

---

### 2️⃣ Install Angular CLI
```sh
npm install -g @angular/cli@18
ng version # Verify installation
```

---

### 3️⃣ Download and install VSCode

[Download VSCode](https://code.visualstudio.com/)

---

### 4️⃣ Go to the directory where you want to clone the repository
```sh
cd folder/folder
```

---

### 5️⃣ Clone the Repository
```sh
git clone https://github.com/hopOasis/hop_fr_angular.git
cd hop_fr_angular
```

---

### 6️⃣ Install Dependencies
```sh
npm install
```

---

### 7️⃣ Open VSCode & add project folder to workspace

---

### 8️⃣ Request Environment Configuration from PM

Ask the PM for the `.env` file containing environment variables. Once received:
1. Create a `.env` file in the root directory of the project.
2. Copy and paste the received variables into `.env`.

---

### 9️⃣ Run the Local Server
```sh
npm start
```
The frontend will be available at: [http://localhost:4200](http://localhost:4200)

---

## 🔄 Git Workflow Guidelines

### 📌 Creating a New Branch
- A new branch should be created from `main`.
- The branch name should be descriptive (e.g., `feature/add-product-filter`).

---

### 📝 Commits
- Write clear and concise commit messages.
- It is recommended to limit commits to **5 per task**.
- Example:
```sh
feat: added product filtering form
```

---

### 🔀 Pull Request (PR)
- After completing a task, create a **Pull Request**.
- A PR is considered approved after receiving **2 approvals** (one from a developer and one from the PM).
- Approved branches are merged into `main`.

---

## ✅ Production Build

To create an optimized production build, run:
```sh
npm run build
```
The build will be saved in the `dist/` folder and will be ready for deployment.

---

Happy coding! 🚀
