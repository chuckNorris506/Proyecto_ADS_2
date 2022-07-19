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
                    alert(res.msg)
                    document.getElementById('name').value = " "
                    document.getElementById('code').value = " "
                })
            }
            else if (res.status === 409) {
                res.json().then(res => {
                    alert(res.msg)
                })
            }
        })
        .catch(err => alert(err))
}