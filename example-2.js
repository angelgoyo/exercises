import { cleanConsole, createAll } from "./data";
import { helpers } from "./helper";
const companies = createAll();

cleanConsole(2, companies);

const hasCarfunction = (array, hasCar) => {
  array = helpers.removeUndefined(array);
  array.map((item) => {
    const arrHasCar = helpers.filterArray(item.users, hasCar, "car");
    const index = array.findIndex((elem) => elem.id === item.id);
    array[index].users = arrHasCar;
    array[index].usersLength = arrHasCar.length;
  });
  return array;
};

const companiesSolution = hasCarfunction([...companies], true);

console.log("---- SOLUTION EXAMPLE 2 --- ", companiesSolution);

// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Crear una función tomando como parámetro la variable "companies" y el
// booleano "hasCar". Para cada "company" debe conservar solo
// "users" cuyo valor de atributo "car" es igual al parámetro del
// función "hasCar" y el atributo "usersLength" deben indicar el total de
// "users" correspondientes al parámetro "hasCar".

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking as parameter the variable "companies" and the
// boolean "hasCar". For each "company" you must keep only the
// "users" whose attribute value "car" is equal to the parameter of the
// "hasCar" function and the "usersLength" attribute must indicate the number of
// "users" corresponding to the "hasCar" parameter
