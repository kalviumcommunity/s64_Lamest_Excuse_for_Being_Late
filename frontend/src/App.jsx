import { useState } from "react";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h2 className="logo">Lamest Excuse</h2>
        <ul className={menuOpen ? "nav-links open" : "nav-links"}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Lamest Excuse for Being Late</h1>
        <p>Share & vote on the most creative excuses for being late!</p>
        <button className="cta-button" onClick={()=> {window.alert('Comming Soon!')}}>Get Started</button>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <h2>Submit Excuses</h2>
          <p>Have a hilarious excuse? Share it with the world!</p>
        </div>
        <div className="feature">
          <h2>Vote on the Best</h2>
          <p>Like and vote on the funniest and most creative excuses.</p>
        </div>
        <div className="feature">
          <h2>Community Driven</h2>
          <p>Engage with a community that appreciates humor and creativity.</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Lamest Excuse. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
