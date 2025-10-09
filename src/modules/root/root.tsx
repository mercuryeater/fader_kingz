"use client";

import { useForm } from "react-hook-form";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import "./root.css";

interface FormData {
  nombre: string;
  documento: string;
  telefono: string;
  correo: string;
  autorizacion: boolean;
}

export default function Root() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="root-container">
      {/* Logo y redes sociales */}
      <div className="header">
        <img
          src="/FADERKINGZ-logotipo(color2).png"
          alt="Fader Kingz Logo"
          className="logo"
        />
        <div className="social-icons">
          <a href="#" className="social-icon">
            <FaInstagram />
          </a>
          <a href="#" className="social-icon">
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* Poster del evento */}
      <div className="event-poster">
        <img
          src="/WhatsApp Image 2025-10-01 at 10.59.09 AM.jpeg.jpg"
          alt="Silver Selections Vol. 2"
          className="poster-image"
        />
      </div>

      {/* Formulario de registro */}
      <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
        <h2 className="form-title">REGISTRO SILVER SELECTIONS VOL. 2</h2>

        <div className="form-group">
          <label htmlFor="nombre">Nombre*</label>
          <input
            id="nombre"
            type="text"
            {...register("nombre", { required: true })}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="documento">Documento*</label>
          <input
            id="documento"
            type="text"
            {...register("documento", { required: true })}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono*</label>
          <input
            id="telefono"
            type="tel"
            {...register("telefono", { required: true })}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo electrónico</label>
          <input
            id="correo"
            type="email"
            {...register("correo")}
            className="form-input"
          />
        </div>

        {/* Checkbox de autorización */}
        <div className="authorization-box">
          <p className="authorization-text">
            ¿Nos autorizas a enviar información de eventos, promociones,
            descuentos y publicidades FADER KINGZ a los contactos
            proporcionados?
          </p>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                value="true"
                {...register("autorizacion")}
                className="radio-input"
                defaultChecked
              />
              Sí
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="false"
                {...register("autorizacion")}
                className="radio-input"
              />
              No
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">
          ENVIAR
        </button>
      </form>

      {/* Video preview */}
      <div className="video-section">
        <h3 className="video-title">Checkea nuestro último lanzamiento:</h3>
        <div className="video-placeholder">
          <div className="video-frame">
            <span className="video-text">CYPHER</span>
            <span className="video-subtitle">SILVER SELECTIONS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
