const createSubject = async () => {

    const json = {
        name: document.getElementById('name').value,
        code: document.getElementById('code').value
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('jwt')
        },
        body: JSON.stringify(json)
    }

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

    const options = {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('jwt')
        }
    }

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
                res.json().then(res => {
                    document.getElementById('subject').innerHTML = `<option>${res.msg}</option>`
                })
            }
        })
        .catch(err => alert(err))
}

const deleteSubject = async (idSubject) => {

    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': sessionStorage.getItem('jwt')
        }
    }

    alertify.confirm("¿Está seguro que desea eliminar la materia?",
        function(){
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
        function(){
            
    }).setHeader("Mensaje");
}

const updateSubject = async (idSubject) => {
    updateBtn = document.getElementById("update"+idSubject).innerHTML

    if (updateBtn == "create") {
        document.getElementById("name"+idSubject).setAttribute("contenteditable", true)
        document.getElementById("code"+idSubject).setAttribute("contenteditable", true)
        document.getElementById("update"+idSubject).innerHTML = "check"
    }else{
        if (document.getElementById("name"+idSubject).innerHTML == "" || document.getElementById("code"+idSubject).innerHTML == "") {
            alertify.alert('Por favor no dejar espacios en blanco');
            return
        }
        const json = {
            name: document.getElementById("name"+idSubject).innerHTML,
            code: document.getElementById("code"+idSubject).innerHTML
        }
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('jwt')
            },
            body: JSON.stringify(json)
        }
    
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
        document.getElementById("name"+idSubject).setAttribute("contenteditable", false)
        document.getElementById("code"+idSubject).setAttribute("contenteditable", false)
        document.getElementById("update"+idSubject).innerHTML = "create"
    }
}