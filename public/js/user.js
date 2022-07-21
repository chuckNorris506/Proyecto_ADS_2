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