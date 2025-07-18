import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

// Hook personalizado para manejar la conexión de socket
export default function useSocket(url) {
  const socketRef = useRef(null); // Referencia para almacenar la instancia del socket

  useEffect(() => {
    // Conectar al servidor usando la URL proporcionada
    socketRef.current = io(url);

    // Evento cuando se conecta exitosamente al servidor
    socketRef.current.on("connect", () => {
      console.log("Conectado al socket con ID:", socketRef.current.id);
    });

    // Función de limpieza: se ejecuta al desmontar el componente
    return () => {
      socketRef.current.disconnect(); // Desconectar el socket
    };
  }, [url]); // Se ejecuta cuando cambia la URL

  return socketRef.current; // Retorna la instancia del socket
}
