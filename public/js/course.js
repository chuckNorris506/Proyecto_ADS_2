const getQuarter = () => {
    const date = new Date()
    const month = date.getMonth() + 1
    const quarter = (Math.trunc(month / 3))
    document.getElementById("quarter").setAttribute("value", quarter.toString())
}

const getYear = () => {
    const date = new Date()
    const year = date.getFullYear()
    document.getElementById("year").setAttribute("value", year.toString())
}

const createCourse = async () => {
    const json = {
        quarter: document.getElementById('quarter').value,
        year: document.getElementById('year').value,
        schedule: document.getElementById('schedule').value,
        professor: document.getElementById('professor').value,
        subject: document.getElementById('subject').value,
        campus: document.getElementById('campus').value,
        approved: document.getElementById('approved').value,
        failed: document.getElementById('failed').value,
        dropped: document.getElementById('dropped').value
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('jwt')
        },
        body: JSON.stringify(json)
    }

    fetch(`api/v1/course`, options)
        .then(res => {
            if (res.status === 201) {
                res.json().then(res => {
                    alert(res.msg)
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

const getCampuses = async () => {

    const options = {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('jwt')
        }
    }

    fetch(`api/v1/campus`, options)
        .then(res => {
            if (res.status === 200) {
                res.json().then(res => {
                    let options
                    res.forEach(option => {
                        options += `<option value=${option.cp_id}> ${option.cp_name}</option>`
                    })
                    document.getElementById('campus').innerHTML = options
                    getData()
                })
            }
            else if (res.status === 404) {
                res.json().then(res => {
                    document.getElementById('campus').innerHTML = `<option>${res.msg}</option>`
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