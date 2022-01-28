import { cleanConsole, createAll } from "./data";
import { helpers } from "./helper";
const companies = createAll();

cleanConsole(3, companies);

const validateUpper = (array) => {
  array = helpers.arrayCompaniesCase(array, "u", "u");
  const upperCompany = array.map((item) => {
    const upperName = helpers.checkUpper(item.name);
    if (!upperName) {
      return false;
    }
    const upperUser = item.users.map((user) => {
      const upperFirstName = helpers.checkUpper(user.firstName);
      const upperLastName = helpers.checkUpper(user.firstName);
      if (!upperFirstName || !upperLastName) {
        return false;
      }
      return true;
    });
    if (!upperName || helpers.filterArray(upperUser, false, "").length > 0) {
      return false;
    }
    return true;
  });
  if (helpers.filterArray(upperCompany, false, "").length > 0) {
    return false;
  }
  return true;
};

const companiesSolution = validateUpper(companies);

console.log("---- SOLUTION EXAMPLE 3 --- ", companiesSolution);

// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Cree una función tomando la variable "companies" como parámetro y devolviendo
// un booleano que valida que todos los nombres de las empresas y los atributos
// "firstName" y "lastName" de "users" están en mayúsculas.
// Debes probar la operación de esta función importando la función creada
// en el "example-1.js".

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking the "companies" variable as a parameter and returning
// a boolean validating that all the names of the companies and the attributes "firstName"
// and "lastName" of "users" are capitalized. You must test the operation
// of this function by importing the function created for "example-1.js"
