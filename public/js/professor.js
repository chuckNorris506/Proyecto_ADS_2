/**
 * It takes the values of the inputs and sends them to the server.
 */
const createProfessor = async () => {
  /* Taking the values of the inputs and storing them in a variable called json. */
  const json = {
    fullname: document.getElementById("fullname").value,
    identification: document.getElementById("identification").value,
  };

  /* A constant that is storing the method, headers and body of the request. */
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwt"),
    },
    body: JSON.stringify(json),
  };

  /* Sending the values of the inputs to the server. */
  fetch(`api/v1/professor/`, options)
    .then((res) => {
      if (res.status === 201) {
        res.json().then((res) => {
          getProfessors();
          document.getElementById("msg").style.color = "green";
          document.getElementById("msg").innerHTML = res.msg;
          document.getElementById("fullname").value = "";
          document.getElementById("identification").value = "";
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
 * It gets all the professors from the database and displays them in a table.
 */
const getProfessors = async () => {
  /* A constant that is storing the method, headers and body of the request. */
  const options = {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

  /* Getting all the professors from the database and displaying them in a table. */
  fetch(`api/v1/professor`, options)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          let options = "";
          res.forEach((option) => {
            options += `<tr>
                        <td contenteditable='false' id="fullname${option.p_id}" style="width: 216px;">${option.p_fullName}</td>
                        <td contenteditable='false' id="identification${option.p_id}" style="width: 216px;">${option.p_identification}</td>
                        <td>
                            <a onclick="updateProfessor(${option.p_id})" class="edit" ><i class="material-icons" title="Update" id="update${option.p_id}" >create</i></a>
                            <a onclick="deleteProfessor(${option.p_id})" class="delete" ><i class="material-icons" title="Delete">&#xE872;</i></a>
                        </td>
                    </tr>`;
          });
          document.getElementById("professorTable").innerHTML = options;
        });
      } else if (res.status === 404) {
        res.json().
          then((res) => {
            document.getElementById(
              "professorTable"
            ).innerHTML = `<option>${res.msg}</option>`;
          });
      }
    })
    .catch((err) => alert(err));
};

/**
 * It deletes a professor from the database.
 * @param idProfessor - the id of the professor to be deleted
 */
const deleteProfessor = async (idProfessor) => {
  /* Storing the method, headers and body of the request. */
  const options = {
    method: "DELETE",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

 /* A confirmation message that appears when you want to delete a professor. */
  alertify
    .confirm(
      "¿Está seguro que desea eliminar al profesor?",
      function () {
        fetch(`api/v1/professor/${idProfessor}`, options)
          .then((res) => {
            if (res.status === 200) {
              res.json().then((res) => {
                getProfessors();
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
 * It updates the professor's information in the database.
 * @param idProfessor - id of the professor
 * @returns the value of the variable updateBtn.
 */
const updateProfessor = async (idProfessor) => {
  /* Getting the value of the button. */
  updateBtn = document.getElementById("update" + idProfessor).innerHTML;

  /* Making the inputs editable. */
  if (updateBtn == "create") {
    document
      .getElementById("fullname" + idProfessor)
      .setAttribute("contenteditable", true);
    document
      .getElementById("identification" + idProfessor)
      .setAttribute("contenteditable", true);
    document.getElementById("update" + idProfessor).innerHTML = "check";
  } else {
    if (
      document.getElementById("fullname" + idProfessor).innerHTML == "" ||
      document.getElementById("identification" + idProfessor).innerHTML == ""
    ) {
      alertify.alert("Por favor no dejar espacios en blanco");
      return;
    }
    const json = {
      fullname: document.getElementById("fullname" + idProfessor).innerHTML,
      identification: document.getElementById("identification" + idProfessor)
        .innerHTML,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("jwt"),
      },
      body: JSON.stringify(json),
    };

    /* Updating the professor's information in the database. */
    fetch(`api/v1/professor/${idProfessor}`, options)
      .then((res) => {
        if (res.status === 201) {
          res.json().then((res) => {
            alertify.alert(res.msg);
          });
        } else {
          res.json().then((res) => {
            alertify.alert(res.msg);
          });
        }
      })
      .catch((err) => alert(err));
    /* Making the inputs not editable. */
    document
      .getElementById("fullname" + idProfessor)
      .setAttribute("contenteditable", false);
    document
      .getElementById("identification" + idProfessor)
      .setAttribute("contenteditable", false);
    document.getElementById("update" + idProfessor).innerHTML = "create";
  }
};
