# Movie App

Welcome to the **Movie App**, a web application that allows you to explore movies and TV shows from the ODMb API database. With this app, you can search for any movie, add it to your favorites, and manage your favorites list by removing movies and also navigate between light and dark modes.

 
## 🚀 Features

- **Dynamic Routing for Movie Details Pages**  
  Each movie has its own dedicated page using **Next.js dynamic routing**, enabling easy navigation and displaying detailed information for each movie.

- **Custom Fetch Wrapper**  
  A custom **fetch wrapper** around the native `fetch()` API is designed to be more powerful and flexible, handling both **server-side** and **client-side** fetches efficiently in **Next.js** applications.
  
- **Search Movies**  
  Search any movie using data fetched from the **OMDb API**.

- **Favorites Management (with Zustand + localStorage)**  
  - Add or remove movies from your favorites list.    
  - Favorites are **persisted in localStorage**, so they remain saved even after page reloads.  

- **Responsive UI with Burger Menu**  
  Fully responsive design with a mobile-friendly **burger menu** for intuitive navigation.

- **Dark and Light Modes**  
  Seamless theme switching between light and dark modes, giving users control over their preferred look and **persisted in localStorage**.

- **Styled with SCSS**  
  Custom styles are crafted using **SCSS** for modular, maintainable, and scalable styling.

- **Aliased Imports**  
  Clean and simplified import paths using **Next.js alias configuration** (`@/components`, `@/state`, etc.).

- **Conditional Rendering**  
  Hides the default movie list when search results are available for a cleaner interface.

- **Server-Side Rendering (SSR)**  
  Uses **Next.js SSR** to improve performance and SEO.

- **CI/CD & Deployment**  
  Deployed on **Vercel** with **CI/CD** integration for automatic updates via GitHub.

## 🛠️ Tech Stack

- **Next.js**: A React framework for building server-rendered applications.
- **Bun**: A fast all-in-one JavaScript runtime used as the package manager and runtime for this project.
- **OMDb API**: For fetching movie and TV show data.
- **Vercel**: For deployment and CI/CD integration.
- **GitHub**: For version control and repository hosting.
- **SCSS**: For styling, making it modular, maintainable, and scalable.
- **Zustand**: For state management in React.
  
## 📁 Project Structure

<p align="center">
  <img src="https://github.com/mahmoudsakrr/Next-Movie-App/blob/main/movie_app/imgs_readme/project_structure.png" alt="Project Structure" width="800"/>
</p>

## ⚙️ Prerequisites
Before getting started, make sure you have the following installed on your system:
1. **Node.js**  
   Download it from the official [Node.js website](https://nodejs.org/).
2. **npm** (Node Package Manager)  
   **npm** comes bundled with **Node.js**. Ensure you have the latest version of **npm** installed by running:
   ```bash
   npm install -g npm
   ```
3. **bun**
  Bun is a fast all-in-one JavaScript runtime used as the package manager and runtime for this project.
  You can install Bun by running:
   ```
   curl -fsSL https://bun.sh/install | bash
   bun --version
   ```
## 🖥️ How to Run the App Locally

To run the app locally, follow these steps:

1. **Install Bun**  
   If you don't have **Bun** installed, you can install it by following the instructions on the official [Bun website](https://bun.sh/).

2. **Clone the Repository**  
   Clone the project repository to your local machine:
   ```bash
   git clone https://github.com/your-username/MovieApp.git
   cd movie-app
   ```
3. **Install Dependencies**
Install the required dependencies using Bun:
```
bun install
```
Run the App
Start the development server:
```
bun run dev
```
Open the App
Copy the localhost URL provided in the terminal (e.g., http://localhost:3000). Paste it into your browser's address bar and press Enter

## 🚀 Deployment

The app is deployed and can be accessed live at the following URL:

**[Movie App - Live Demo](https://noonmovies.vercel.app/)**  
  ### https://noonmovies.vercel.app/
<p align="center">
  <img src="https://github.com/mahmoudsakrr/Next-Movie-App/blob/main/movie_app/imgs_readme/project_structure.png" width="400"/>
</p>


## Some UI from the website
### 🌗 Light and Dark Mode Views With Responsive Navigation

Below are screenshots of the MovieApp interface in both light and dark modes and hamburger menu, showcasing responsive layout and theming:

<p align="center">
  <img src="https://github.com/mahmoudsakrr/Next-Movie-App/blob/main/movie_app/imgs_readme/light_desktop.png" alt="Light Mode" width="50%"/>
  <img src="https://github.com/mahmoudsakrr/Next-Movie-App/blob/main/movie_app/imgs_readme/dark_mobile.png" alt="Dark Mode" width="50%"/>
</p>

