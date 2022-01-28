const helpers = {};

helpers.filterArray = (array, fieldFilter, field) => {
  return array.filter((el) => {
    if (field != "") {
      return el[field] === fieldFilter;
    } else {
      return el === fieldFilter;
    }
  });
};

helpers.calculateAverage = (array, field) => {
  array = helpers.removeUndefined(array);
  let sum = 0;
  array.map((item) => {
    sum = item[field] + sum;
  });
  return sum / array.length;
};

helpers.resumeArray = (array) => {
  array = helpers.removeUndefined(array);
  const finalTable = [];
  array.map((item) => {
    item.users.map((user) => {
      finalTable.push({ ...user, company: item.name });
    });
  });
  return helpers.sortArray(finalTable, "age", "A");
};

helpers.sortArray = (array, field, sortOrder) => {
  array = helpers.removeUndefined(array);
  array.sort((a, b) => {
    if (typeof a[field] === "number") {
      return a[field] - b[field];
    } else if (typeof a[field] === "string") {
      var nameA = a[field].toUpperCase();
      var nameB = b[field].toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }
  });
  if (sortOrder.toUpperCase() === "D") {
    array.reverse();
  }
  return array;
};

helpers.changeCase = (text, textCase) => {
  switch (textCase.toUpperCase()) {
    case "U":
      return text.toUpperCase();
    case "L":
      return text.toLowerCase();
    case "S":
      return (
        text.toLowerCase().charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      );
    case "T":
      return (
        text.toUpperCase().charAt(0).toLowerCase() + text.slice(1).toUpperCase()
      );
    case "C":
      const words = text.split(" ");
      return words
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1).toLowerCase();
        })
        .join(" ");
    default:
      break;
  }
};

helpers.removeUndefined = (array) => {
  var updatedList = JSON.parse(
    JSON.stringify(array, function (key, value) {
      return value === undefined ? "" : value;
    })
  );
  return updatedList;
};

helpers.arrayCompaniesCase = (
  arrayReceived,
  textCaseCompanies,
  textCaseUsers
) => {
  arrayReceived = helpers.removeUndefined(arrayReceived);
  arrayReceived.map((item) => {
    const principalIndex = arrayReceived.findIndex(
      (elem) => elem.id === item.id
    );
    let listArray = item.users;
    listArray.forEach((element, index) => {
      listArray[index].firstName = helpers.changeCase(
        listArray[index].firstName,
        textCaseUsers
      );
      listArray[index].lastName = helpers.changeCase(
        listArray[index].lastName,
        textCaseUsers
      );
    });
    arrayReceived[principalIndex].users = helpers.sortArray(
      [...listArray],
      "firstName",
      ""
    );
    arrayReceived[principalIndex].name = helpers.changeCase(
      arrayReceived[principalIndex].name,
      textCaseCompanies
    );
  });

  return helpers.sortArray(arrayReceived, "usersLength", "D");
};

helpers.checkUpper = (text) => {
  return (!/[a-z]/.test(text) && /[A-Z]/.test(text)) || text === "";
};

helpers.transformFormData = (formData) => {
  let dataTransform = {};
  for (var pair of formData.entries()) {
    dataTransform[pair[0]] =
      pair[1] === "true" || pair[1] === "false" ? JSON.parse(pair[1]) : pair[1];
  }
  return dataTransform;
};

helpers.checkFields = (array, dataReceived) => {
  for (var [key, value] of Object.entries(dataReceived)) {
    if (typeof array[key] === "undefined") {
      return {
        ok: false,
        message: `Field ${key} doesn't exist, check formData`,
        status: "500",
      };
    }
  }
};

export { helpers };
