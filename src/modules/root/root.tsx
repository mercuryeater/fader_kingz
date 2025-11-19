"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaInstagram, FaYoutube, FaPlay } from "react-icons/fa";

import config from "@/config";
import { Toaster, toaster } from "@/components/ui/toaster";

import "./root.css";

interface FormData {
  nombre: string;
  documento: string;
  telefono: string;
  correo: string;
  autorizacion: boolean;
}

export default function Root() {
  const INSTAGRAM_URL = "https://www.instagram.com/faderkingz/";
  const YOUTUBE_URL = "https://www.youtube.com/@faderkingz";
  const SPOTIFY_PLAYLIST =
    "https://open.spotify.com/playlist/719DzvpkDnrGDq7ymjeRhn?si=V-AUMuP_Q86JoCyYVlRqwA";
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const modelData = {
      nombre: data.nombre,
      documento: data.documento,
      telefono: data.telefono,
      email: data.correo,
      quiere_suscribirse: data.autorizacion,
      evento: "Silver Selections Vol. 2",
    };

    if (!config.EXCEL_HOST) return console.error("EXCEL_HOST no está definido");

    try {
      const respuesta = await fetch(config.EXCEL_HOST, {
        method: "POST",
        body: JSON.stringify(modelData),
      });

      const resultado = await respuesta.json();

      if (resultado.status === "success") {
        toaster.create({
          title: "¡Registro exitoso!",
          description:
            "Te esperamos en el evento con toda la actitud FADER KINGZ",
          type: "success",
          duration: 5000,
        });
        reset();
      }
    } catch (error) {
      toaster.create({
        title: "Error al registrar",
        description:
          "Hubo un problema al enviar tu registro. Por favor, intenta de nuevo.",
        type: "error",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="root-container">
      <Toaster />
      {/* Logo y redes sociales */}
      <div className="header">
        <img
          src="/FADERKINGZ-logotipo(color2).png"
          alt="Fader Kingz Logo"
          className="logo"
        />
        <div className="social-icons">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaInstagram />
          </a>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
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

        <button
          type="submit"
          className={isLoading ? "submit-button loading" : "submit-button"}
          disabled={isLoading}
        >
          {isLoading ? "ENVIANDO..." : "ENVIAR"}
        </button>
      </form>

      {/* Video preview */}
      <div className="video-section">
        <h3 className="video-title">
          Escucha la playlist de nuestros artistas
        </h3>
        <div
          className="video-placeholder"
          onClick={() => window.open(SPOTIFY_PLAYLIST, "_blank")}
        >
          <FaPlay className="video-play-logo" />
          <img
            src="/FD_KINGZ.jpg"
            alt="Fader Kingz Logo"
            className="spotifyImage"
          />
        </div>
      </div>
    </div>
  );
}
