

import "./css/Landing.css";
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
