// letras y espacio

export const isLetterWithSpace = (event) => {
  const charCode = event.which ? event.which : event.keyCode;
  const char = String.fromCharCode(charCode);

  // Utiliza una expresión regular para permitir letras y espacios
  if (/^[A-Za-z\s]+$/.test(char)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
};

// números

export const isNumber = (event) => {
  const charCode = event.which ? event.which : event.keyCode;

  // Utiliza una expresión regular para permitir solo dígitos numéricos
  if (/\d/.test(String.fromCharCode(charCode))) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
};

//alfanumericos y espacios

export const isAlphaNumericWithSpaces = (event) => {
  const charCode = event.which ? event.which : event.keyCode;

  // Utiliza una expresión regular para permitir números, letras y espacios
  if (/^[a-zA-Z0-9\s]*$/.test(String.fromCharCode(charCode))) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
};

// teléfono, admite +, números, espacios y máximo 30 caracteres 

export const isValidPhoneNumber = (event) => {
  const charCode = event.which ? event.which : event.keyCode;
  const inputValue = String.fromCharCode(charCode);

  // Utiliza una expresión regular para permitir números, '+', espacios y limitar a 30 caracteres
  if (/^[0-9+\s]*$/.test(inputValue) && event.target.value.length < 30) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
};
