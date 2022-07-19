const createProfessor = async () => {
    const json = {
        fullname: document.getElementById('fullname').value,
        identification: document.getElementById('identification').value
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('jwt')
        },
        body: JSON.stringify(json)
    }

    fetch(`api/v1/professor/`, options)
        .then(res => {
            if (res.status === 201) {
                res.json().then(res => {
                    alert(res.msg)
                    document.getElementById('fullname').value = " "
                    document.getElementById('identification').value = " "
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

