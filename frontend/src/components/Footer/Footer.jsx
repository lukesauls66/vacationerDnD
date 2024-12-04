import { FaLinkedin, FaGithub } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-main-container">
      <a
        className="footer-link-button-container"
        href="https://www.linkedin.com/in/luke-sauls-437786330/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="footer-link-button-linkedin">
          <FaLinkedin size={30} />
        </button>
      </a>
      <a
        className="footer-link-button-container"
        href="https://github.com/lukesauls66"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="footer-link-button-github">
          <FaGithub size={30} />
        </button>
      </a>
    </div>
  );
}

export default Footer;
