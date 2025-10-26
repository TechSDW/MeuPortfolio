import React from "react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          © {new Date().getFullYear()} Fábio Hiromitsu Nawa. Todos os direitos reservados.
        </p>
        <p className="footer-subtext">
          Desenvolvido com React e CSS customizado
        </p>
      </div>
    </footer>
  );
}
