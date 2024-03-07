export const invertirFecha = (fecha) => {
  if (!fecha) {
    return '';
  }

  const fechaObj = new Date(fecha);

  if (isNaN(fechaObj.getTime())) {
    return fecha; // Devolver la fecha original si no es válida
  }

  const dia = fechaObj.getUTCDate().toString().padStart(2, '0');
  const mes = (fechaObj.getUTCMonth() + 1).toString().padStart(2, '0');
  const año = fechaObj.getUTCFullYear();

  return `${dia}-${mes}-${año}`;
};
