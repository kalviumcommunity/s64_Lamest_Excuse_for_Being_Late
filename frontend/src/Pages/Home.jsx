// import { useState } from "react";
// import "../Home.css";

// function App() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="landing-container">
//       {/* Navigation Bar */}
//       <nav className="navbar">
//         <h2 className="logo">Lamest Excuse</h2>
//         <ul className={menuOpen ? "nav-links open" : "nav-links"}>
//           <li><a href="#">Home</a></li>
//           <li><a href="#">Features</a></li>
//           <li><a href="#">About</a></li>
//           <li><a href="#">Contact</a></li>
//         </ul>
//         <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
//           ☰
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <header className="hero">
//         <h1>Lamest Excuse for Being Late</h1>
//         <p>Share & vote on the most creative excuses for being late!</p>
//         <button className="cta-button" onClick={()=> {window.alert('Comming Soon!')}}>Get Started</button>
//       </header>

//       {/* Features Section */}
//       <section className="features">
//         <div className="feature">
//           <h2>Submit Excuses</h2>
//           <p>Have a hilarious excuse? Share it with the world!</p>
//         </div>
//         <div className="feature">
//           <h2>Vote on the Best</h2>
//           <p>Like and vote on the funniest and most creative excuses.</p>
//         </div>
//         <div className="feature">
//           <h2>Community Driven</h2>
//           <p>Engage with a community that appreciates humor and creativity.</p>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer>
//         <p>© 2025 Lamest Excuse. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;

import "./css/home.css";
import { NavLink } from "react-router-dom";
// import { Button } from "../components/button";


export default function LandingPage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🚀 Why Late?</div>
        <ul className="nav-links">
          <li><a href="#about" className="about-btn">About</a></li>
          <li><NavLink to="/login"><button className="hero-btn">Login</button></NavLink></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Got a Ridiculous Excuse? Share it with the World! 😆</h1>
        <p>Welcome to the most creative excuse-sharing platform. Vote, submit, and laugh at the best (or worst) excuses for being late!</p>
        <NavLink to="/signup"><button className="hero-btn">Get Started</button> </NavLink>
      </header>

      {/* Get Started Section */}
      <section id="get-started" className="get-started">
        <h2>Join the Fun 🎉</h2>
        <p>Post your excuses, upvote the most hilarious ones, and engage with the community!</p>

        <NavLink to="/signup">
        <button className="custom-button" >Sign Up Now</button>
        </NavLink>

      </section>
    </div>
  );
}
