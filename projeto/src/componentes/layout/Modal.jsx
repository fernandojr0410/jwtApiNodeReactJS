import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Modal.module.css";

function Modal({ mensagem, onClose, link }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <p>{mensagem}</p>
        <Link to={link}>
          <button onClick={onClose}>Fechar</button>
        </Link>
      </div>
    </div>
  );
}

export default Modal;
