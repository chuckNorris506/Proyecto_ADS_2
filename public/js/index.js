const login = async () => {

    if (!(document.getElementById('username').value).includes('@ulatina.net')) {
        alert('Por favor brindar email válido')
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
                        window.location.assign('dashboard.html')
                    }
                })
            }
            else if (res.status === 400) {
                res.json().then(res => {
                    alert(res.msg)
                })
            }
            else if (res.status === 401) {
                res.json().then(res => {
                    alert(res.msg)
                })
            }

        })
        .catch(err => alert(err))
}
