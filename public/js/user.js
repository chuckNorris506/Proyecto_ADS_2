const register = async () => {

    if (document.getElementById('password').value != document.getElementById('password2').value) {
        alert('Contraseñas no coinciden')
        return
    }

    if (!(document.getElementById('username').value).includes('@ulatina.net')) {
        alert('Por favor brindar email válido')
        return
    }

    const json = {
        fullName: document.getElementById('fullName').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('jwt')
        },
        body: JSON.stringify(json)
    }

    fetch(`api/v1/user/register`, options)
        .then(res => {
            if (res.status === 201) {
                res.json().then(res => {
                    document.getElementById('fullName').value = ""
                    document.getElementById('username').value = ""
                    document.getElementById('password').value = ""
                    document.getElementById('password2').value = ""
                    alert(res.msg)
                })
            }
            else {
                res.json().then(res => {
                    alert(res.msg)
                })
            }
        })
        .catch(err => alert(err))
}

const getUsers = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('jwt')
        }
    }

    fetch(`api/v1/user`, options)
        .then(res => {
            if (res.status === 200) {
                res.json().then(res => {
                    let options = ""
                    res.forEach(option => {
                        options += 
                        `<tr>
                        <td >${option.u_fullName}</td>
                        <td >${option.u_username}</td>
                        <td >${option.u_password}</td>
                        <td>
                            <a href="#" class="edit" data-toggle="modal"><i class="material-icons"
                                    data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a href="#" class="delete" data-toggle="modal"><i class="material-icons"
                                    data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                        </td>
                    </tr>`
                    })
                    document.getElementById('userTable').innerHTML = options
                })
            }
            else if (res.status === 404) {
                res.json().then(res => {
                    document.getElementById('userTable').innerHTML = `<option>${res.msg}</option>`
                })
            }
        })
        .catch(err => alert(err))
}