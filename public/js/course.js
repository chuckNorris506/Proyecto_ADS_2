/**
 * It gets the current month, adds 1 to it, divides it by 3, truncates the result, and sets the value
 * of the quarter input to the result.
 */
const getQuarter = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const quarter = Math.trunc(month / 3);
  document.getElementById("quarter").setAttribute("value", quarter.toString());
};

/**
 * Get the current year and set the value of the element with the id of year to the current year.
 */
const getYear = () => {
  const date = new Date();
  const year = date.getFullYear();
  document.getElementById("year").setAttribute("value", year.toString());
};

/**
 * It takes the values from the form and sends them to the server.
 */
const createCourse = () => {
  /* Creating a JSON object. */
  const json = {
    quarter: document.getElementById("quarter").value,
    year: document.getElementById("year").value,
    schedule: document.getElementById("schedule").value,
    professor: document.getElementById("professor").value,
    subject: document.getElementById("subject").value,
    campus: document.getElementById("campus").value,
    approved: document.getElementById("approved").value,
    failed: document.getElementById("failed").value,
    dropped: document.getElementById("dropped").value
  };

  /* Creating a new object called options. */
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwt"),
    },
    body: JSON.stringify(json),
  };

  /* Fetching the api/v1/course and then checking the status of the response. If the status is 201, it
  will then get the json response and then call the getQuarter, getYear, getCampuses, getProfessors,
  getSubjects, and getCourse functions. It will also set the color of the msg element to green and
  set the innerHTML of the msg element to the msg value of the json response. It will also set the
  value of the approved, failed, and dropped elements to an empty string. If the status is 409, it
  will then */
  fetch(`api/v1/course`, options)
    .then((res) => {
      if (res.status === 201) {
        res.json().then((res) => {
          getQuarter();
          getYear();
          getCampuses();
          getProfessors();
          getSubjects();
          getCourse();
          document.getElementById("msg").style.color = "green";
          document.getElementById("msg").innerHTML = res.msg;
          document.getElementById("approved").value = "";
          document.getElementById("failed").value = "";
          document.getElementById("dropped").value = "";
        });
      } else if (res.status === 409) {
        res.json().then((res) => {
          document.getElementById("msg").style.color = "red";
          document.getElementById("msg").innerHTML = res.msg;
        });
      }
    })
    .catch((err) => alert(err));
};

/**
 * It fetches the campuses from the database and populates the select element with the campuses.
 * </code>
 * @param idCampus - the id of the campus that I want to get the data from.
 */
const getCampuses = async (idCampus) => {
  /* Creating a variable called options and setting it to an object with a method and a header. */
  const options = {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

  /* Fetching data from the API and then populating the dropdown with the data. */
  fetch(`api/v1/campus`, options)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          let options;
          res.forEach((option) => {
            options += `<option value=${option.cp_id}> ${option.cp_name}</option>`;
          });
          if (idCampus == null) {
            document.getElementById("campus").innerHTML = options;
          } else {
            document.getElementById("campus" + idCampus).innerHTML = options;
          }
        });
      } else if (res.status === 404) {
        res.json().then((res) => {
          document.getElementById(
            "campus"
          ).innerHTML = `<option>${res.msg}</option>`;
        });
      }
    })
    .catch((err) => alert(err));
};

/**
 * It fetches data from the server and populates the dropdown with the fetched data.
 * @param idSubject - the id of the subject that is being edited.
 */
const getSubjects = async (idSubject) => {
  /* Creating a variable called options and setting it to an object with a method and a header. */
  const options = {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

  /* Fetching data from the database and displaying it in the dropdown menu. */
  fetch(`api/v1/subject`, options)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          let options;
          res.forEach((option) => {
            options += `<option value=${option.s_id}> ${option.s_name} ${option.s_code} </option>`;
          });
          if (idSubject == null) {
            document.getElementById("subject").innerHTML = options;
          } else {
            document.getElementById("subject" + idSubject).innerHTML = options;
          }
        });
      } else if (res.status === 404) {
        res.json().then((res) => {
          document.getElementById(
            "subject"
          ).innerHTML = `<option>${res.msg}</option>`;
        });
      }
    })
    .catch((err) => alert(err));
};

/**
 * It fetches a list of professors from the database and populates a select element with the list.
 * </code>
 * @param idProfessor - the id of the professor that is being edited.
 */
const getProfessors = async (idProfessor) => {
  /* Creating a variable called options and setting it to an object with a method and a header. */
  const options = {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

  /* Fetching data from the database and displaying it in the dropdown menu. */
  fetch(`api/v1/professor`, options)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          let options;
          res.forEach((option) => {
            options += `<option value=${option.p_id}> ${option.p_fullName} </option>`;
          });
          if (idProfessor == null) {
            document.getElementById("professor").innerHTML = options;
          } else {
            document.getElementById("professor" + idProfessor).innerHTML =
              options;
          }
        });
      } else if (res.status === 404) {
        res.json().then((res) => {
          document.getElementById(
            "professor"
          ).innerHTML = `<option>${res.msg}</option>`;
        });
      }
    })
    .catch((err) => alert(err));
};

/**
 * It gets all the courses from the database and displays them in a table.
 */
const getCourse = async () => {
  /* Creating a variable called options and setting it to an object with a method and a header. */
  const options = {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

  /* The above code is fetching data from the database and displaying it in a table. */
  fetch(`api/v1/course`, options)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          let options = "";
          res.forEach((option) => {
            options += `<tr>
                        <td onkeypress="return allowQuatersOnly(event,${option.c_id});" contenteditable='false' id="quarter${option.c_id}">${option.c_quarter}</td>
                        <td onkeypress="return allowYearsOnly(event,${option.c_id})" contenteditable='false' id="year${option.c_id}">${option.c_year}</td>
                        <td onBlur="CheckTime(this)" contenteditable='false' id="schedule${option.c_id}">${option.c_schedule}</td>
                        <td contenteditable='false'>
                        <select onclick="loadProfessor(${option.c_id})"  name="true" class="professor" id="professor${option.c_id}" required disabled>
                          <option value=${option.p_id}> ${option.p_fullName} </option>
                        </select>
                        </td>
                        <td contenteditable='false'>
                        <select onclick="loadSubject(${option.c_id})"  name="true" class="subject" id="subject${option.c_id}" required disabled>
                        <option value=${option.s_id}> ${option.s_name} </option>
                        </select>
                        </td>
                        <td  contenteditable='false'>
                        <select onclick="loadCampus(${option.c_id})"  name="true" class="campus" id="campus${option.c_id}" required disabled>
                        <option value=${option.cp_id}> ${option.cp_Name} </option>
                        </select>
                        </td>
                        <td onkeypress="return allowNumbersOnly(event);" contenteditable='false' id="approved${option.c_id}">${option.c_students_approved}</td>
                        <td onkeypress="return allowNumbersOnly(event);" contenteditable='false' id="failed${option.c_id}">${option.c_students_failed}</td>
                        <td onkeypress="return allowNumbersOnly(event);" contenteditable='false' id="dropped${option.c_id}">${option.c_students_dropped}</td>
                        <td>
                            <a onclick="updateCourse(${option.c_id})" class="edit" ><i class="material-icons" title="Edit" id="update${option.c_id}">create</i></a>
                            <a onclick="deleteCourse(${option.c_id})" class="delete" ><i class="material-icons" title="Delete">&#xE872;</i></a>
                        </td>
                    </tr>`;
          });

          document.getElementById("courseTable").innerHTML = options;
        });
      } else if (res.status === 404) {
        res.json().then((res) => {
          document.getElementById(
            "courseTable"
          ).innerHTML = `<option>${res.msg}</option>`;
        });
      }
    })
    .catch((err) => alert(err));
};

/**
 * It deletes a course from the database.
 * @param idCourse - id of the course to be deleted
 */
const deleteCourse = async (idCourse) => {
  /* Creating a constant called options and setting the method to DELETE and the headers to the
  Authorization token. */
  const options = {
    method: "DELETE",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

  /* A function that is called when the user clicks on the delete button. */
  alertify
    .confirm(
      "¿Está seguro que desea eliminar el curso?",
      function () {
        fetch(`api/v1/course/${idCourse}`, options)
          .then((res) => {
            if (res.status === 200) {
              res.json().then((res) => {
                getCourse();
              });
            } else {
              res.json().then((res) => {
                alert(res.msg);
              });
            }
          })
          .catch((err) => alert(err));
      },
      function () { }
    )
    .setHeader("Mensaje");
};

/**
 * It takes the id of a course and updates the course with the new information.
 * </code>
 * 
 * 
 * A:
 * 
 * You can use <code>JSON.stringify</code> to convert your object to a string.
 * <code>const json = {
 *   quarter: document.getElementById("quarter" + idCourse).innerHTML,
 *   year: document.getElementById("year" + idCourse).innerHTML,
 *   schedule: document.getElementById("schedule" + idCourse).innerHTML,
 *   professor: document.getElementById("professor" + idCourse).value,
 *   subject: document.getElementById("subject" + idCourse).value,
 *   campus: document.getElementById("campus" + idCourse).value,
 *   approved: document.getElementById("approved" + idCourse).innerHTML,
 *   failed: document.getElementById("failed" +
 * @param idCourse - 1
 */
const updateCourse = async (idCourse) => {
  /* Getting the innerHTML of the button with the id "update" + idCourse. */
  updateBtn = document.getElementById("update" + idCourse).innerHTML;

  /* Creating a JSON object with the values of the table. */
  if (updateBtn == "create") {
    document
      .getElementById("quarter" + idCourse)
      .setAttribute("contenteditable", true);
    document
      .getElementById("year" + idCourse)
      .setAttribute("contenteditable", true);
    document
      .getElementById("schedule" + idCourse)
      .setAttribute("contenteditable", true);
    document
      .getElementById("professor" + idCourse)
      .setAttribute("contenteditable", true);
    document
      .getElementById("subject" + idCourse)
      .setAttribute("contenteditable", true);
    document
      .getElementById("campus" + idCourse)
      .setAttribute("contenteditable", true);
    document
      .getElementById("approved" + idCourse)
      .setAttribute("contenteditable", true);
    document
      .getElementById("failed" + idCourse)
      .setAttribute("contenteditable", true);
    document
      .getElementById("dropped" + idCourse)
      .setAttribute("contenteditable", true);
    document.getElementById("update" + idCourse).innerHTML = "check";
    document.getElementById("professor" + idCourse).disabled = false;
    document.getElementById("subject" + idCourse).disabled = false;
    document.getElementById("campus" + idCourse).disabled = false;
  } else {
    const json = {
      quarter: document.getElementById("quarter" + idCourse).innerHTML,
      year: document.getElementById("year" + idCourse).innerHTML,
      schedule: document.getElementById("schedule" + idCourse).innerHTML,
      professor: document.getElementById("professor" + idCourse).value,
      subject: document.getElementById("subject" + idCourse).value,
      campus: document.getElementById("campus" + idCourse).value,
      approved: document.getElementById("approved" + idCourse).innerHTML,
      failed: document.getElementById("failed" + idCourse).innerHTML,
      dropped: document.getElementById("dropped" + idCourse).innerHTML,
    };

    /* Creating a PUT request to the server. */
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("jwt"),
      },
      body: JSON.stringify(json),
    };

    /* The above code is fetching the data from the API and then updating the data in the database. */
    fetch(`api/v1/course/${idCourse}`, options)
      .then((res) => {
        if (res.status === 201) {
          res.json().then((res) => {
            alertify.alert(res.msg);
            document
              .getElementById("quarter" + idCourse)
              .setAttribute("contenteditable", false);
            document
              .getElementById("year" + idCourse)
              .setAttribute("contenteditable", false);
            document
              .getElementById("schedule" + idCourse)
              .setAttribute("contenteditable", false);
            document
              .getElementById("professor" + idCourse)
              .setAttribute("contenteditable", false);
            document
              .getElementById("subject" + idCourse)
              .setAttribute("contenteditable", false);
            document
              .getElementById("campus" + idCourse)
              .setAttribute("contenteditable", false);
            document
              .getElementById("approved" + idCourse)
              .setAttribute("contenteditable", false);
            document
              .getElementById("failed" + idCourse)
              .setAttribute("contenteditable", false);
            document
              .getElementById("dropped" + idCourse)
              .setAttribute("contenteditable", false);
            document.getElementById("update" + idCourse).innerHTML = "create";
            document.getElementById("professor" + idCourse).disabled = true;
            document.getElementById("professor" + idCourse).disabled = true;
            document.getElementById("subject" + idCourse).disabled = true;
            document.getElementById("campus" + idCourse).disabled = true;
          });
        } else {
          res.json().then((res) => {
            alertify.alert(res.msg);
          });
        }
      })
      .catch((err) => alert(err));
  }
};

/**
 * If the key pressed is a number or the enter key, return true, otherwise return false
 * @param event - The event object is a JavaScript object that contains useful information about the
 * event that just occurred.
 * @returns a boolean value.
 */
function allowNumbersOnly(event) {
  if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 13) {
    return true;
  } else {
    return false;
  }
}

/**
 * If the key pressed is not a number, return false. If the key pressed is a number, and the length of
 * the string is greater than 3, return false. Otherwise, return true
 * @param e - The event object
 * @param str - The string that is being typed in the textbox.
 * @returns a boolean value.
 */
function allowYearsOnly(e, str) {
  var ascii = e.which ? e.which : e.keyCode;
  if (ascii > 31 && (ascii < 48 || ascii > 57)) {
    return false;
  } else {
    if (str.length > 3) {
      return false;
    } else {
      return true;
    }
  }
}

/**
 * If the key pressed is not a number between 1 and 3, then return false. Otherwise, if the input
 * already has a value, return false. Otherwise, return true.
 * @param e - The event object
 * @param str - The string that is currently in the textbox.
 * @returns a boolean value.
 */
function allowQuatersOnly(e, str) {
  var ascii = e.which ? e.which : e.keyCode;
  if (ascii > 31 && (ascii < 49 || ascii > 51)) {
    return false;
  } else {
    if (str.length > 0) {
      return false;
    } else {
      return true;
    }
  }
}

/**
 * It checks if the time is in the correct format, if it is not, it will alert the user.
 * @param str - The input element
 * @returns the value of the variable hour.
 */
function CheckTime(str) {
  hour = str.innerHTML;
  if (hour == "") {
    return;
  }
  if (hour.length > 8) {
    alert("Introdujo una cadena mayor a 8 caracteres");
    return;
  }
  if (hour.length != 8) {
    alert("Introducir HH:MM:SS");
    return;
  }
  a = hour.charAt(0); //<=2
  b = hour.charAt(1); //<4
  c = hour.charAt(2); //:
  d = hour.charAt(3); //<=5
  e = hour.charAt(5); //:
  f = hour.charAt(6); //<=5
  if ((a == 2 && b > 3) || a > 2) {
    alert(
      "El valor que introdujo en la Hora no corresponde, introduzca un digito entre 00 y 23"
    );
    return;
  }
  if (d > 5) {
    alert(
      "El valor que introdujo en los minutos no corresponde, introduzca un digito entre 00 y 59"
    );
    return;
  }
  if (f > 5) {
    alert("El valor que introdujo en los segundos no corresponde");
    return;
  }
  if (c != ":" || e != ":") {
    alert(
      "Introduzca el caracter ':' para separar la hora, los minutos y los segundos"
    );
    return;
  }
}

/**
 * If the select element has a name attribute, then create an option element and append it to the
 * select element. Then remove the name attribute.
 * @param id - the id of the select element
 */
function loadProfessor(id) {
  var val = document.getElementById("professor"+id);
  var opt = document.createElement("option");
  
  if (val.name == "true") {
    opt.innerHTML = getProfessors(id)
    val.appendChild(opt);
    val.removeAttribute("name");
  }
}

/**
 * If the select element has a name attribute, then create an option element and append it to the
 * select element, then remove the name attribute.
 * @param id - the id of the select element
 */
function loadSubject(id) {
  var val = document.getElementById("subject"+id);
  var opt = document.createElement("option");
  
  if (val.name == "true") {
    opt.innerHTML = getSubjects(id)
    val.appendChild(opt);
    val.removeAttribute("name");
  }
}

/**
 * If the campus dropdown has the name attribute, then add the campuses to the dropdown and remove the
 * name attribute.
 * @param id - the id of the select element
 */
function loadCampus(id) {
  var val = document.getElementById("campus"+id);
  var opt = document.createElement("option");
  
  if (val.name == "true") {
    opt.innerHTML = getCampuses(id)
    val.appendChild(opt);
    val.removeAttribute("name");
  }
}