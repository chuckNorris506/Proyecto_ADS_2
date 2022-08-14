/**
 * It takes the values of two input fields, creates a JSON object, and sends it to the server.
 */
const createSubject = async () => {

    /* Creating a JSON object with the values of the input fields. */
    const json = {
        name: document.getElementById('name').value,
        code: document.getElementById('code').value
    }

    /* Creating a JSON object with the values of the input fields. */
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('jwt')
        },
        body: JSON.stringify(json)
    }

    /* A fetch request to the server. */
    fetch("api/v1/subject/", options)
        .then(res => {
            if (res.status === 201) {
                res.json().then(res => {
                    getSubjects()
                    document.getElementById('msg').style.color = 'green'
                    document.getElementById('msg').innerHTML = res.msg
                    document.getElementById('name').value = ""
                    document.getElementById('code').value = ""
                })
            }
            else if (res.status === 409) {
                res.json().then(res => {
                    document.getElementById('msg').style.color = 'red'
                    document.getElementById('msg').innerHTML = res.msg
                })
            }
        })
        .catch(err => alert(err))
}

const getSubjects = async () => {

    /* A JSON object that contains the method and the headers of the request. */
    const options = {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('jwt')
        }
    }

    /* A fetch request to the server. */
    fetch(`api/v1/subject`, options)
        .then(res => {
            if (res.status === 200) {
                res.json().then(res => {
                    let options = ""
                    res.forEach(option => {
                        options +=
                            `<tr>
                        <td contenteditable='false' id="name${option.s_id}" style="width: 216px;">${option.s_name}</td>
                        <td contenteditable='false' id="code${option.s_id}" style="width: 216px;">${option.s_code}</td>
                        <td>
                            <a onclick="updateSubject(${option.s_id})" class="edit" "><i id="update${option.s_id}" class="material-icons" title="Update">create</i></a>
                            <a onclick="deleteSubject(${option.s_id})" class="delete" ><i class="material-icons" title="Delete">&#xE872;</i></a>
                        </td>
                    </tr>`
                    })
                    document.getElementById('subjectTable').innerHTML = options
                })
            }
            else if (res.status === 404) {
                res.json()
                    .then(res => {
                        document.getElementById('subjectTable').innerHTML = `<option>${res.msg}</option>`
                    })
            }
        })
        .catch(err => alert(err))
}

/**
 * It deletes a subject from the database.
 * @param idSubject - the id of the subject to be deleted
 */
const deleteSubject = async (idSubject) => {

    /* A JSON object that contains the method and the headers of the request. */
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': sessionStorage.getItem('jwt')
        }
    }

    /* A confirmation message that appears when the user clicks on the delete button. */
    alertify.confirm("¿Está seguro que desea eliminar la materia?",
        function () {
            fetch(`api/v1/subject/${idSubject}`, options)
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(res => {
                            getSubjects();
                        })
                    }
                    else {
                        res.json().then(res => {
                            alert(res.msg)
                        })
                    }
                })
                .catch(err => alert(err))
        },
        function () {

        }).setHeader("Mensaje");
}

/**
 * It changes the content of the button from "create" to "check" and vice versa.
 * @param idSubject - id of the subject
 * @returns the value of the variable updateBtn.
 */
const updateSubject = async (idSubject) => {
    /* Getting the value of the button. */
    updateBtn = document.getElementById("update" + idSubject).innerHTML

    /* Checking if the button is "create" or "check". If it is "create", it will change the content of
    the button to "check" and it will make the input fields editable. If it is "check", it will
    check if the input fields are empty. If they are empty, it will show an alert. If they are not
    empty, it will make a request to the server to update the subject. */
    if (updateBtn == "create") {
        document.getElementById("name" + idSubject).setAttribute("contenteditable", true)
        document.getElementById("code" + idSubject).setAttribute("contenteditable", true)
        document.getElementById("update" + idSubject).innerHTML = "check"
    } else {
        if (document.getElementById("name" + idSubject).innerHTML == "" || document.getElementById("code" + idSubject).innerHTML == "") {
            alertify.alert('Por favor no dejar espacios en blanco');
            return
        }
        /* Creating a JSON object with the values of the input fields. */
        const json = {
            name: document.getElementById("name" + idSubject).innerHTML,
            code: document.getElementById("code" + idSubject).innerHTML
        }
        /* Creating a JSON object with the method, headers, and body of the request. */
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('jwt')
            },
            body: JSON.stringify(json)
        }

        /* Making a request to the server to update the subject. */
        fetch(`api/v1/subject/${idSubject}`, options)
            .then(res => {
                if (res.status === 201) {
                    res.json().then(res => {
                        alertify.alert(res.msg);
                    })
                }
                else {
                    res.json().then(res => {
                        alertify.alert(res.msg);
                    })
                }
            })
            .catch(err => alert(err))
        /* Making the input fields not editable and changing the content of the button to "create". */
        document.getElementById("name" + idSubject).setAttribute("contenteditable", false)
        document.getElementById("code" + idSubject).setAttribute("contenteditable", false)
        document.getElementById("update" + idSubject).innerHTML = "create"
    }
}