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
                    let options
                    res.forEach(option => {
                        options += `<option value=${option.s_id}> ${option.s_name} ${option.s_code} </option>`
                    })
                    document.getElementById('subject').innerHTML = options
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