const login = async () => {

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(document.getElementById('username').value) ||
        !document.getElementById('username').value.endsWith('ulatina.net')) {
        document.getElementById('username').style.borderColor = 'red'
        document.getElementById('msg').style.color = 'red'
        document.getElementById('msg').innerHTML = 'Por favor brindar email válido'
        return
    }

    const json = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    }

    fetch('/api/v1/user/login', options)
        .then(res => {

            if (res.status === 200) {
                res.json().then(res => {
                    if (res) {
                        const token = res.token
                        sessionStorage.setItem("jwt", 'Bearer ' + token)
                        window.location.replace('dashboard.html')
                    }
                })
            }
            else if (res.status === 401) {
                res.json().then(res => {
                    document.getElementById('username').style.borderColor = 'red'
                    document.getElementById('password').style.borderColor = 'red'
                    document.getElementById('msg').style.color = 'red'
                    document.getElementById('msg').innerHTML = res.msg
                })
            }

        })
        .catch(err => alert(err))
}
