![App Screenshot](https://boatpump.jcerme.com/media/other/boatpump-index.png)

# 🚢 BoatPump - Boat Renting Shop

This project is a sophisticated online store developed using Node.js, Express, React, Tailwind, and MongoDB. It showcases a range of advanced e-commerce features, ensuring a seamless and intuitive shopping experience.

## 🛠️ Skills Utilized

Node.js, Express, React, Tailwind, MongoDB, Passport for OAuth, Cookies, WebSockets, Mocha for testing, Nginx, SSL, PM2, Docker

## 👨🏻‍💻 Installation
1. Clone the repository
2. Go to 'frontend' folder and install dependencies
3. Make the .env.production file
4. Run build
```bash
  cd ./frontend
  npm install
  nano .env.production
  npm run build
```

5. Go to 'server' folder and install dependencies
6. Make the .env file
7. Copy the dist frontend folder to 'server'
8. Make files folder
9. Start the server
```bash
  mv ./dist ../server/
  cd ..
  cd ./server
  npm install
  nano .env
  cd ./dist
  mkdir files
  cd files
  mkdir avatars
  mkdir documents
  mkdir products
  cd ..
  npm start
```

## 📱 Features

### Backend (API)

- **Authentication:**
  - Standard login and registration.
  - OAuth login/registration with GitHub and Google.
  - Session maintenance using cookies.
  - Password reset functionality with email links.

- **Cart:**
  - Automatic cart creation upon user registration.
  - Functions to update, empty, add products, and manage quantities.

- **Logger:**
  - Error logging in `errors.log`.

- **Orders:**
  - Order creation and detailed view.
  - Admin functionalities for managing all orders.

- **Products:**
  - Product management capabilities for admins (create, update, delete).

![App Screenshot](https://boatpump.jcerme.com/media/other/boatpump-product.png)

### Frontend

- **Products:**
  - Product listing with advanced filters and search.
  - Detailed product view for adding to cart and viewing full details.

- **Cart:**
  - Cart management with real-time order summary updates.

- **Checkout:**
  - Personal and payment information forms.
  - Order summary and payment processing.

- **Account:**
  - Account details view with enhanced email security.

- **Chat:**
  - Real-time chat functionality using WebSockets.
 
![App Screenshot](https://boatpump.jcerme.com/media/other/boatpump-checkout.png)

## 💻 Deployment and Management

- Deployed on a VPS using Nginx.
- Custom route and port configurations.
- SSL certificate management.
- Cron jobs for maintenance.
- Server uptime management with PM2.
- Docker setup available but not currently in use.

## 📖  What I Have Learned?

This project has been a significant learning journey, enhancing my full-stack development skills, especially in technologies like Node.js, React, and MongoDB. The deployment on a VPS using Apache and Nginx was a valuable experience, teaching me about server management, SSL certificate setup, and the importance of regular maintenance through cron jobs. The use of PM2 for server uptime and exploring Docker's capabilities were also critical learning points.

## 🚀 About Me

I'm Jorge, also known as Cerme (JCerme). I am a CTO & Software Engineer with comprehensive expertise in both Back-end and Front-end development (Full-Stack Developer). My skill set also extends to Cybersecurity and UX/UI Design. Driven by a passion for technology, I strive to deliver a user experience that is not only reliable and secure but also engaging and intuitive.

Any suggestions or contributions are welcome.
You can contact me at:

[![portfolio](https://img.shields.io/badge/https://jcerme.com-5f17ce?style=for-the-badge&logo=ko-fi&logoColor=white)](https://jcerme.com/)
[![linkedin](https://img.shields.io/badge/jorge_cermeno-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/jorge-cermeno)
[![correo](https://img.shields.io/badge/contact@jcerme.com-red?style=for-the-badge&logo=gmail&logoColor=white)](mailto:contact@jcerme.com)
