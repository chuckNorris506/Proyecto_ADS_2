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
                    getSubjects()
                    document.getElementById('msg').style.color = 'green'
                    document.getElementById('msg').innerHTML = res.msg
                    document.getElementById('name').value = ""
                    document.getElementById('code').value = ""
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
                    let options = ""
                    res.forEach(option => {
                        options += 
                        `<tr>
                        <td style="width: 216px;">${option.s_name}</td>
                        <td style="width: 216px;">${option.s_code}</td>
                        <td>
                            <a href="#" class="edit" data-toggle="modal"><i class="material-icons"
                                    data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a href="#" class="delete" data-toggle="modal"><i class="material-icons"
                                    data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                        </td>
                    </tr>`
                    })
                    document.getElementById('subjectTable').innerHTML = options
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