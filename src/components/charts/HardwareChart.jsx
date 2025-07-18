// components/charts/HardwareChart.jsx
"use client"; // Indica que este componente se ejecuta en el cliente (Next.js)
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"; // Importa los componentes necesarios de recharts

const HardwareChart = ({ title, data, id }) => {
  // Si no hay datos, no renderiza nada
  if (!data || data.length === 0) return null;

  // Obtiene las claves de los datos, excluyendo 'timestamp'
  const keys = Object.keys(data[0]).filter((key) => key !== "timestamp");

  return (
    <div key={id} className="my-6">
      {/* Título del gráfico */}
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        {/* Gráfico de líneas */}
        <LineChart data={data}>
          {/* Cuadrícula del gráfico */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* Eje X usando 'timestamp' */}
          <XAxis dataKey="timestamp" />
          {/* Eje Y */}
          <YAxis />
          {/* Tooltip al pasar el mouse */}
          <Tooltip />
          {/* Renderiza una línea por cada clave encontrada */}
          {keys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={`hsl(${(index * 77) % 360}, 70%, 50%)`} // Color dinámico para cada línea
              dot={false} // Sin puntos en la línea
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HardwareChart;
