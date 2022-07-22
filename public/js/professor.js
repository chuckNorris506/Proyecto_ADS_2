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
                    getProfessors()
                    document.getElementById('msg').style.color = 'green'
                    document.getElementById('msg').innerHTML = res.msg
                    document.getElementById('fullname').value = ""
                    document.getElementById('identification').value = ""
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
                    let options = ""
                    res.forEach(option => {
                        options += 
                        `<tr>
                        <td style="width: 216px;">${option.p_fullName}</td>
                        <td style="width: 216px;">${option.p_identification}</td>
                        <td>
                            <a href="#" class="edit" data-toggle="modal"><i class="material-icons"
                                    data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a href="#" class="delete" data-toggle="modal"><i class="material-icons"
                                    data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                        </td>
                    </tr>`
                    })
                    document.getElementById('professorTable').innerHTML = options
                })
            }
            else if (res.status === 404) {
                res.json().then(res => {
                    document.getElementById('professorTable').innerHTML = `<option>${res.msg}</option>`
                })
            }
        })
        .catch(err => alert(err))
}

