
🛍️ HopOasis - E-commerce Store (Frontend)

🚀 Project Description

HopOasis is an e-commerce platform that allows users to easily search, browse, and purchase products. The project includes a wide range of features for both users and administrators, such as product search and sorting, a shopping cart with checkout functionality, a responsive design, an authentication system, and an admin panel.

The core features include product search by name and keywords, sorting by price and rating, pagination for easy navigation, filtering by categories and price range, order history without time limitations, and integration with the Stripe payment system. Users can register, log in via Google OAuth, add products to their cart, place orders, and leave reviews, which are moderated by the administrator. The platform also supports discounts, promo codes, and special offers, along with automated email notifications about order status.

🛠️ Tech Stack

Angular 18

TypeScript

RxJS

NGXS (State Management)

REST API Integration

👷‍♀️ Local Setup Instructions

1️⃣ Install Node.js and npm

Recommended version: Node.js 18+

Linux:

sudo apt update && sudo apt install nodejs npm
node -v   # Verify installation

Windows:

winget install OpenJS.NodeJS
node -v

macOS:

brew install node
node -v

2️⃣ Install Angular CLI

npm install -g @angular/cli@18
ng version # Verify installation

3️⃣ Clone the Repository

git clone https://github.com/hopOasis/hopOasis_fe.git
cd hopOasis_fe

4️⃣ Install Dependencies

npm install

5️⃣ Request Environment Configuration from PM

Ask the PM for the .env file containing environment variables. Once received:

Create a .env file in the root directory of the project.

Copy and paste the received variables into .env.

6️⃣ Run the Local Server

npm start

The frontend will be available at: http://localhost:4200

🔄 Git Workflow Guidelines

📌 Creating a New Branch

A new branch should be created from main.

The branch name should be descriptive (e.g., feature/add-product-filter).

📝 Commits

Write clear and concise commit messages.

It is recommended to limit commits to 5 per task.

Example: feat: added product filtering form.

🔀 Pull Request (PR)

After completing a task, create a Pull Request.

A PR is considered approved after receiving 2 approvals (one from a developer and one from the PM).

Approved branches are merged into main.

✅ Production Build

To create an optimized production build, run:

npm run build

The build will be saved in the dist/ folder and will be ready for deployment.

Happy coding! 🚀

