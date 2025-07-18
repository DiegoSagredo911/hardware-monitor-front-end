// Función para agrupar métricas por tipo de hardware
const groupMetricsByHardware = (reports = []) => {
  const grouped = {}; // Objeto donde se almacenarán los datos agrupados

  reports.forEach((report) => {
    // Convierte el timestamp a una cadena legible de hora
    const time = new Date(report.timestamp).toLocaleTimeString();

    // Itera sobre cada tipo de hardware en el reporte
    Object.entries(report.hardware || {}).forEach(
      ([hardwareType, components]) => {
        // Inicializa el arreglo para el tipo de hardware si no existe
        grouped[hardwareType] = grouped[hardwareType] || [];
        // Crea una nueva entrada con el timestamp
        const entry = { timestamp: time };

        // Itera sobre cada componente del hardware
        Object.entries(components).forEach(([component, sensors]) => {
          // Itera sobre cada categoría de sensores
          Object.entries(sensors).forEach(([category, values]) => {
            // Itera sobre cada etiqueta y valor de la categoría
            Object.entries(values).forEach(([label, value]) => {
              // Crea una clave única para cada métrica
              const key = `${component} - ${category} - ${label}`;
              // Asigna el valor a la clave en la entrada
              entry[key] = value;
            });
          });
        });

        // Agrega la entrada al arreglo correspondiente al tipo de hardware
        grouped[hardwareType].push(entry);
      }
    );
  });

  // Devuelve el objeto agrupado
  return grouped;
};

export default groupMetricsByHardware;
