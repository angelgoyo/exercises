import { cleanConsole, createAll } from "./data";
import { helpers } from "./helper";
import "./arrayMethods";

const companies = createAll();

cleanConsole(7, companies);

const getCompany = (id) => {
  const index = companies.findIndex((elem) => elem.id === id);
  if (index === -1) {
    console.log("Company not found");
    return false;
  }
  return companies[index].name;
};

// const companyName = getCompany(1);

// console.log("---- SOLUTION EXAMPLE 7 part 1 --- ", companyName);

const deleteCompany = (id) => {
  const index = companies.findIndex((elem) => elem.id === id);
  if (index === -1) {
    console.log("Company not found");
    return false;
  }
  companies.deleteOne(index);
  return companies;
};

// const companiesSolution = deleteCompany(1);

// console.log("---- SOLUTION EXAMPLE 7 part 2 --- ", companiesSolution);

const updateCompany = (req, data, method) => {
  const { id } = req;
  let dataReceived = helpers.transformFormData(data);

  const checkUsers =
    "users" in dataReceived || "usersLength" in dataReceived ? true : false;
  if (checkUsers) {
    console.log("You can't update users attribute");
    return {
      ok: false,
      message: "You can't update users attribute",
      status: "500",
    };
  }

  const index = companies.findIndex((elem) => elem.id === id);
  if (index === -1) {
    console.log("Company not found");
    return { ok: false, message: "Company not found", status: "404" };
  }

  if (method.toUpperCase() === "PATCH") {
    return helpers.checkFields(companies[index], dataReceived);
  }

  companies.updateOne(dataReceived, index);
  return { ok: true, message: "Company Udpated", status: "200" };
};

// const data = { id: 1 };
// const method = "PATCH";
// const formData = new FormData();
// formData.append("name", "Reebok");
// formData.append("isOpen", true);
// formData.append("users", []);

// const resp = updateCompany(data, formData);

// console.log("---- SOLUTION EXAMPLE 7 part 3 --- ", companies, resp);

const newUser = (req, data) => {
  const { id } = req;
  let dataReceived = helpers.transformFormData(data);

  const index = companies.findIndex((elem) => elem.id === id);
  if (index === -1) {
    console.log("Company not found");
    return { ok: false, message: "Company not found", status: "404" };
  }

  const companyUsers = companies[index].users;
  const newId = { id: companyUsers.at(-1).id + 1 };
  dataReceived = { ...dataReceived, ...newId };
  dataReceived.age = Number(dataReceived.age);

  const userLength = companyUsers.push(dataReceived);
  companies[index].users = companyUsers;
  companies[index].usersLength = userLength;
  return { ok: true, message: "User Created", status: "200" };
};

// const data = { id: 5 };
// const formData = new FormData();
// formData.append("firstName", "Juan");
// formData.append("lastName", "Delgado");
// formData.append("age", 35);
// formData.append("car", true);

// const resp = newUser(data, formData);

// console.log("---- SOLUTION EXAMPLE 7 part 4 --- ", companies, resp);

// const data = { id: 1 };
// const method = "PUT";
// const formData = new FormData();
// formData.append("name", "Reebok");
// formData.append("isOpen", true);
// formData.append("users", []);

// const resp = updateCompany(data, formData, method);

// console.log("---- SOLUTION EXAMPLE 7 part 5 --- ", companies;

const deleteUser = (req) => {
  const { idCompany, idUser } = req;

  const index = companies.findIndex((elem) => elem.id === idCompany);
  if (index === -1) {
    console.log("Company not found");
    return { ok: false, message: "Company not found", status: "404" };
  }

  const companyUsers = companies[index].users;
  const indexUser = companyUsers.findIndex((elem) => elem.id === idUser);
  if (indexUser === -1) {
    console.log("User not found");
    return { ok: false, message: "User not found", status: "404" };
  }

  companyUsers.deleteOne(indexUser);
  companies[index].users = companyUsers;
  companies[index].usersLength = companyUsers.length;
  return { ok: true, message: "User Deleted", status: "200" };
};

// const data = { idCompany: 5, idUser: 4 };

// const resp = deleteUser(data);

// console.log("---- SOLUTION EXAMPLE 7 part 6 --- ", companies, resp);

const updateUser = (req, data, method) => {
  const { idCompany, idUser } = req;
  let dataReceived = helpers.transformFormData(data);

  const index = companies.findIndex((elem) => elem.id === idCompany);
  if (index === -1) {
    console.log("Company not found");
    return { ok: false, message: "Company not found", status: "404" };
  }

  const companyUsers = helpers.removeUndefined(companies[index].users);

  const indexUser = companyUsers.findIndex((elem) => elem.id === idUser);
  if (indexUser === -1) {
    console.log("User not found");
    return { ok: false, message: "User not found", status: "404" };
  }

  if (method.toUpperCase() === "PATCH") {
    return helpers.checkFields(companyUsers[indexUser], dataReceived);
  }

  dataReceived.age = Number(dataReceived.age);
  companyUsers.updateOne(dataReceived, indexUser);
  companies[index].users = companyUsers;

  return { ok: true, message: "User Updated", status: "200" };
};

// const data = { idCompany: 5, idUser: 4 };
// const method = "PATCH";
// const formData = new FormData();
// formData.append("firstName", "Juan");
// formData.append("lastName", "Delgado");
// formData.append("age", 35);
// formData.append("car", true);

// const resp = updateUser(data, formData, method);

// console.log("---- SOLUTION EXAMPLE 7 part 7 --- ", companies, resp);

// const data = { idCompany: 5, idUser: 4 };
// const method = "PUT";
// const formData = new FormData();
// formData.append("firstName", "Juan");
// formData.append("lastName", "Delgado");
// formData.append("age", 35);
// formData.append("car", true);

// const resp = updateUser(data, formData, method);

// console.log("---- SOLUTION EXAMPLE 7 part 8 --- ", companies, resp);

const moveUser = (req) => {
  const { idOldCompany, idNewCompany, idUser } = req;

  const indexOldCompany = companies.findIndex(
    (elem) => elem.id === idOldCompany
  );
  if (indexOldCompany === -1) {
    console.log("Source Company not found");
    return { ok: false, message: "Source Company not found", status: "404" };
  }

  const indexNewCompany = companies.findIndex(
    (elem) => elem.id === idNewCompany
  );
  if (indexNewCompany === -1) {
    console.log("Destination Company not found");
    return {
      ok: false,
      message: "Destination Company not found",
      status: "404",
    };
  }

  const companyUsers = companies[indexOldCompany].users;
  const indexUser = companyUsers.findIndex((elem) => elem.id === idUser);
  if (indexUser === -1) {
    console.log("User not found");
    return { ok: false, message: "User not found", status: "404" };
  }

  const userToMove = companyUsers.deleteOne(indexUser);
  companies[indexOldCompany].users = companyUsers;
  companies[indexOldCompany].usersLength = companyUsers.length;

  const newCompanyUsers = companies[indexNewCompany].users;
  const newId = newCompanyUsers.at(-1).id + 1;
  userToMove[0].id = newId;

  const usersLength = newCompanyUsers.push(userToMove[0]);
  companies[indexNewCompany].users = newCompanyUsers;
  companies[indexNewCompany].usersLength = usersLength;
  return { ok: true, message: "User Moved", status: "200" };
};

// const data = { idOldCompany: 5, idNewCompany: 4, idUser: 4 };

// const resp = moveUser(data);

// console.log("---- SOLUTION EXAMPLE 7 part 9 --- ", companies, resp);
// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Parte 1: Crear una función tomando como parámetro un "id" de "company" y
// devolviendo el nombre de esta "company".

// Parte 2: Crear una función tomando como parámetro un "id" de "company" y
// quitando la "company" de la lista.

// Parte 3: Crear una función tomando como parámetro un "id" de "company" y
// permitiendo hacer un PATCH/PUT (como con una llamada HTTP) en todos los
// atributos de esta "company" excepto en el atributo "users".

// Parte 4: Crear una función tomando como parámetro un "id" de "company" y un
// nuevo "user" cuyo el apelido es "Delgado", el nombre "Juan", de 35 años y
// dueño de un carro. El nuevo "user" debe agregarse a la lista de "users" de este
// "company" y tener un "id" generado automáticamente. La función también debe modificar
// el atributo "usersLength" de "company".

// Parte 5: Crear una función tomando como parámetro un "id" de "company" y
// permitiendo hacer un PUT (como con una llamada HTTP) en esta "company" excepto
// en el atributo "users".

// Parte 6: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user". La función debe quitar este "user" de la lista de "users"
// de "company" y cambiar el atributo "usersLength" de "company".

// Parte 7: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user" que permite hacer un PATCH (como con una llamada HTTP) en este
// "user".

// Parte 8: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user" que permite hacer un PUT (como con una llamada HTTP) en este
// "user".

// Parte 9: Crear una función tomando como parámetro dos "id" de "company" y
// un "id" de "user". La función debe permitir que el user sea transferido de la
// primera "company" a la segunda "company". El atributo "usersLength" de cada
// "company" debe actualizarse.

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Part 1: Create a function taking as parameter an "id" of "company" and
// returning the name of this "company".

// Part 2: Create a function taking as parameter an "id" of "company" and
// removing the "company" from the list.

// Part 3: Create a function taking as a parameter an "id" of "company" and
// allowing to make a PATCH (as with an HTTP call) on all
// attributes of this "company" except on the "users" attribute.

// Part 4: Create a function taking as parameter an "id" of "company" and a
// new "user" whose name is "Delgado", the first name "Juan", aged 35 and
// a car. The new "user" must be added to the "users" list of this
// "company" and have an automatically generated "id". The function must also modify
// the "usersLength" attribute of "company".

// Part 5: Create a function taking as parameter an "id" of "company" and
// allowing to make a PUT (as with an HTTP call) on this "company" except
// on the "users" attribute.

// Part 6: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user". The function must remove this "user" from the list of "users"
// from "company" and change the attribute "usersLength" from "company".

// Part 7: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user" allowing to make a PATCH (as with an HTTP call) on this
// "user".

// Part 8: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user" allowing to make a PUT (as with an HTTP call) on this
// "user".

// Part 9: Create a function taking as parameter two "id" of "company" and
// an "id" of "user". The function must allow the user to be transferred as a parameter
// from the 1st "company" to the 2nd "company". The "usersLength" attribute of each
// "company" must be updated
