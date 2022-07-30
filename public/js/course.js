const getQuarter = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const quarter = Math.trunc(month / 3);
  document.getElementById("quarter").setAttribute("value", quarter.toString());
};

const getYear = () => {
  const date = new Date();
  const year = date.getFullYear();
  document.getElementById("year").setAttribute("value", year.toString());
};

const createCourse = async () => {
  const json = {
    quarter: document.getElementById("quarter").value,
    year: document.getElementById("year").value,
    schedule: document.getElementById("schedule").value,
    professor: document.getElementById("professor").value,
    subject: document.getElementById("subject").value,
    campus: document.getElementById("campus").value,
    approved: document.getElementById("approved").value,
    failed: document.getElementById("failed").value,
    dropped: document.getElementById("dropped").value,
  };
  console.log(json);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwt"),
    },
    body: JSON.stringify(json),
  };

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

const getCampuses = async (idCampus) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

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
          getData();
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

const getSubjects = async (idSubject) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

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

const getProfessors = async (idProfessor) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

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

const getCourse = async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

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
                        <select onclick="loadProfessor()"  name="true" class="professor" id="professor${option.c_id}" required disabled>
                          <option value=${option.p_id}> ${option.p_fullName} </option>
                        </select>
                        </td>
                        <td contenteditable='false'>
                        <select id="subject${option.c_id}" required disabled>
                        <option value=${option.s_id}> ${option.s_name} </option>
                        </select>
                        </td>
                        <td  contenteditable='false'>
                        <select id="campus${option.c_id}" required disabled>
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

const deleteCourse = async (idCourse) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

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
      function () {}
    )
    .setHeader("Mensaje");
};

const updateCourse = async (idCourse) => {
  updateBtn = document.getElementById("update" + idCourse).innerHTML;

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

    console.log(json);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("jwt"),
      },
      body: JSON.stringify(json),
    };

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

function allowNumbersOnly(event) {
  if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 13) {
    return true;
  } else {
    return false;
  }
}

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

function loadProfessor() {
  var val = document.getElementById("professor9");
  var opt = document.createElement("option");
  opt.innerHTML = "test";
  console.log(val);
  if (val.name == "true") {
    val.appendChild(opt);
    val.removeAttribute("name");
  }
}
