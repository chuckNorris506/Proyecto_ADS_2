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

const getProfessors = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('jwt')
        }
    }

    fetch(`api/v1/professor`, options)
        .then(res => {
            if (res.status === 200) {
                res.json().then(res => {
                    let options
                    res.forEach(option => {
                        options += `<option value=${option.p_id}> ${option.p_fullName} </option>`
                    })
                    document.getElementById('professor').innerHTML = options
                })
            }
            else if (res.status === 404) {
                res.json().then(res => {
                    document.getElementById('professor').innerHTML = `<option>${res.msg}</option>`
                })
            }
        })
        .catch(err => alert(err))
}