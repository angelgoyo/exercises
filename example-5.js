import { cleanConsole, createAll } from "./data";
import { helpers } from "./helper";
const companies = createAll();

cleanConsole(5, companies);

const result = (array) => {
  const arrHasCar = helpers.filterArray(array, true, "car");
  const resultTable = {
    size: array.length,
    average: helpers.calculateAverage(array, "age"),
    hasCar: arrHasCar.length,
    averageWithCar: helpers.calculateAverage(arrHasCar, "age"),
  };
  return resultTable;
};

const companiesSolution = result(helpers.resumeArray(companies));

console.log("---- SOLUTION EXAMPLE 5 --- ", companiesSolution);
// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Use la función creada en el ejemplo 4 para crear una nueva función tomando
// como parámetro la variable "companies" y devuelve un nuevo objeto con los
// siguientes atributos:
//     'size' => total de "users"
//     'average' => edad promedio de "users"
//     'hasCar' => total de "users" propietarios de un carro
//     'averageWithCar' => edad promedio de los "users" con un carro

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Use the function created in example 4 to create a
// new function taking as parameter the "companies" variable and returning
// a new object with the following attributes:
//     'size' => number of "users"
//     'average' => average age of "users"
//     'hasCar' => number of "users" owning a car
//     'averageWithCar' => average age of users with a car.
