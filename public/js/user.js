const register = async () => {
  if (
    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
      document.getElementById("username").value
    ) ||
    !document.getElementById("username").value.endsWith("ulatina.net")
  ) {
    document.getElementById("msg").style.color = "red";
    document.getElementById("msg").innerHTML = "Por favor brindar email válido";
    return;
  }

  if (
    document.getElementById("password").value !=
    document.getElementById("password2").value
  ) {
    document.getElementById("msg").style.color = "red";
    document.getElementById("msg").innerHTML = "Contraseñas no coinciden";
    return;
  }

  const json = {
    fullName: document.getElementById("fullName").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwt"),
    },
    body: JSON.stringify(json),
  };

  fetch(`api/v1/user/register`, options)
    .then((res) => {
      if (res.status === 201) {
        res.json().then((res) => {
          getUsers();
          document.getElementById("msg").style.color = "green";
          document.getElementById("msg").innerHTML = res.msg;
          document.getElementById("fullName").value = "";
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
          document.getElementById("password2").value = "";
        });
      } else {
        res.json().then((res) => {
          document.getElementById("msg").style.color = "red";
          document.getElementById("msg").innerHTML = res.msg;
        });
      }
    })
    .catch((err) => alert(err));
};

const getUsers = async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

  fetch(`api/v1/user`, options)
    .then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          let options = "";
          res.forEach((option) => {
            options += `<tr>
                                <td contenteditable='false' id="fullName${option.u_id}">${option.u_fullName}</td>
                                <td contenteditable='false' id="userName${option.u_id}">${option.u_username}</td>
                                <td >${option.u_password}</td>
                                <td>
                                    <a  class="edit" onclick="updateUser(${option.u_id})"><i id="update${option.u_id}" class="material-icons" title="Update">create</i></a>
                                    <a  class="delete" onclick="deleteUser(${option.u_id})" ><i class="material-icons" title="Delete">&#xE872;</i></a>
                                </td>
                            </tr>`;
          });
          document.getElementById("userTable").innerHTML = options;
        });
      } else if (res.status === 404) {
        res.json().then((res) => {
          document.getElementById(
            "userTable"
          ).innerHTML = `<option>${res.msg}</option>`;
        });
      }
    })
    .catch((err) => alert(err));
};

const deleteUser = async (idUser) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  };

  alertify
    .confirm(
      "¿Está seguro que desea eliminar al usuario?",
      function () {
        fetch(`api/v1/user/${idUser}`, options)
          .then((res) => {
            if (res.status === 200) {
              res.json().then((res) => {
                getUsers();
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
const updateUser = async (idUser) => {
  updateBtn = document.getElementById("update" + idUser).innerHTML;

  if (updateBtn == "create") {
    document
      .getElementById("fullName" + idUser)
      .setAttribute("contenteditable", true);
    document
      .getElementById("userName" + idUser)
      .setAttribute("contenteditable", true);
    document.getElementById("update" + idUser).innerHTML = "check";
  } else {
    if (
      document.getElementById("userName" + idUser).innerHTML == "" ||
      document.getElementById("fullName" + idUser).innerHTML == ""
    ) {
      alertify.alert("Por favor no dejar espacios en blanco");
      return;
    }
    const json = {
      fullName: document.getElementById("fullName" + idUser).innerHTML,
      username: document.getElementById("userName" + idUser).innerHTML,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("jwt"),
      },
      body: JSON.stringify(json),
    };

    fetch(`api/v1/user/${idUser}`, options)
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
      .getElementById("fullName" + idUser)
      .setAttribute("contenteditable", false);
    document
      .getElementById("userName" + idUser)
      .setAttribute("contenteditable", false);
    document.getElementById("update" + idUser).innerHTML = "create";
  }
};



const sendMail = async () => {

  const json = {
    to: document.getElementById("userName").value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  };

  fetch(`api/v1/user/forgot-password`, options)
      .then((res) => {
        if (res.status === 201) {
          res.json().then((res) => {
            const token = res.token
            localStorage.setItem("id", token)
            alertify.alert(res.msg);
          });
        } else {
          res.json().then((res) => {
            alertify.alert(res.msg);
          });
        }
      })
      .catch((err) => alert(err));
};

/**
 * It takes the id from localStorage and sends it to the backend to update the password.
 * @returns {
 *   "msg": "Contraseña actualizada"
 * }</code>
 */
const resetPassword = async () => {

  /* Checking if the password and the password2 are the same. */
  if (
    document.getElementById("password").value !=
    document.getElementById("password2").value
  ) {
    alertify.alert("Contraseñas no coinciden");
    return;
  }

  /* Getting the id from localStorage. */
  const id = localStorage.getItem('id')
  

  /* Getting the value from the input with the id "password" and storing it in the variable "json". */
  const json = {
    password: document.getElementById("password").value
  };

  /* Sending a PUT request to the backend. */
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(json)
  };
      fetch(`api/v1/user/reset-password/${id}`, options)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            alertify.alert(res.msg);
            localStorage.removeItem('id');
            window.location.replace('index.html')
          });
        } else {
          res.json().then((res) => {
            alertify.alert(res.msg);
          });
        }
      })
      .catch((err) => alert(err));
};
