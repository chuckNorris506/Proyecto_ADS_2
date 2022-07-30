const createProfessor = async () => {
  const json = {
    fullname: document.getElementById("fullname").value,
    identification: document.getElementById("identification").value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwt"),
    },
    body: JSON.stringify(json),
  };

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

const getProfessors = async () => {
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

const deleteProfessor = async (idProfessor) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

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

const updateProfessor = async (idProfessor) => {
  updateBtn = document.getElementById("update" + idProfessor).innerHTML;

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
    document
      .getElementById("fullname" + idProfessor)
      .setAttribute("contenteditable", false);
    document
      .getElementById("identification" + idProfessor)
      .setAttribute("contenteditable", false);
    document.getElementById("update" + idProfessor).innerHTML = "create";
  }
};
