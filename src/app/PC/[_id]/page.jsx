"use client";
import useSocket from "@/hooks/useSocket";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HardwareChartComponent from "@/components/charts/HardwareChart";
import groupMetricsByHardware from "@/utils/groupMetricsByHardware";

// Componente principal para mostrar la información del PC
const PcInfo = () => {
  const { _id } = useParams(); // Obtiene el ID del PC desde la URL
  const [groupedData, setGroupedData] = useState({}); // Estado para almacenar los datos agrupados
  const socket = useSocket(`${process.env.NEXT_PUBLIC_URL}`); // Inicializa el socket con la URL del backend

  useEffect(() => {
    // Efecto para obtener los datos iniciales del hardware del PC
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/hardware/${_id}` // Llama a la API para obtener los reportes del hardware
        );
        const grouped = groupMetricsByHardware(response.data.reports || []); // Agrupa los datos por tipo de hardware
        setGroupedData(grouped); // Actualiza el estado con los datos agrupados
      } catch (error) {
        alert("Error fetching PC data"); // Muestra alerta en caso de error
        console.error("Error fetching PC data:", error);
      }
    };

    getData(); // Llama a la función para obtener los datos
  }, [_id]); // Se ejecuta cuando cambia el ID del PC

  useEffect(() => {
    if (!socket) return; // Si no hay socket, no hace nada

    socket.emit("joinChannel", _id); // Se une al canal específico del PC

    // Escucha los nuevos reportes de hardware en tiempo real
    socket.on("hardwareReport", (newReport) => {
      setGroupedData((prevData) => {
        const time = new Date(newReport.timestamp).toLocaleTimeString(); // Formatea la hora del reporte
        const updated = { ...prevData }; // Copia defensiva del estado anterior

        // Itera sobre cada tipo de hardware reportado
        Object.entries(newReport.hardware || {}).forEach(
          ([hardwareType, components]) => {
            updated[hardwareType] = [...(updated[hardwareType] || [])]; // Inicializa el array si no existe

            const entry = { timestamp: time }; // Crea una nueva entrada con la hora

            // Itera sobre los componentes y sensores para extraer los valores
            Object.entries(components).forEach(([component, sensors]) => {
              Object.entries(sensors).forEach(([category, values]) => {
                Object.entries(values).forEach(([label, value]) => {
                  const key = `${component} - ${category} - ${label}`; // Llave única para cada métrica
                  entry[key] =
                    typeof value === "object" && value !== null
                      ? JSON.parse(JSON.stringify(value)) // Copia profunda si es objeto
                      : value;
                });
              });
            });

            updated[hardwareType].push({ ...entry }); // Agrega la nueva entrada al array correspondiente
          }
        );

        return updated; // Devuelve el estado actualizado
      });
    });

    // Limpieza del listener para evitar duplicados
    return () => {
      socket.off("channelMessage");
    };
  }, [_id, socket]); // Se ejecuta cuando cambia el ID o el socket

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Hardware de {_id}</h1>
      {/* Renderiza un gráfico por cada tipo de hardware */}
      {Object.entries(groupedData).map(([hardwareType, data], index) => (
        <HardwareChartComponent title={hardwareType} data={data} id={index} />
      ))}
    </div>
  );
};

export default PcInfo;
