import "./css/button.css"; // Import the CSS file

export function Button({ children, className = "", ...props }) {
  return (
    <button className={`custom-button ${className}`} {...props}>
      {children}
    </button>
  );
}
