/**
 * It takes the username and password from the form, sends it to the server, and if the server returns
 * a 200 status code, it sets the token in session storage and redirects to the dashboard.
 * @returns The response is a JSON object with the following structure:
 * {
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjY1YzYwZjYwZjQwMDAxMjI
 */
const login = async () => {

    /* Checking if the email is valid. */
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(document.getElementById('username').value) ||
        !document.getElementById('username').value.endsWith('ulatina.net')) {
        document.getElementById('username').style.borderColor = 'red'
        document.getElementById('msg').style.color = 'red'
        document.getElementById('msg').innerHTML = 'Por favor brindar email válido'
        return
    }

    /* Creating a JSON object with the username and password from the form. */
    const json = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    /* Creating an object with the method, headers, and body. */
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    }

    /* Sending a request to the server and waiting for a response. */
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
