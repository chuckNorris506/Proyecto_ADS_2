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
                    getChartData()
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

const getChartData = async () => {
    getData('approved')
    getData('failed')
    getData('dropped')
}

const getData = async (option) => {

    const subject = document.getElementById('subject').value
    const campus = document.getElementById('campus').value

    const options = {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('jwt')
        }
    }

    fetch(`api/v1/course/${subject}/?option=${option}`, options)
        .then(res => {
            if (res.status === 200) {

                res.json().then(res => {
                    let mostRecent = Number(Object.values(res.shift()))
                    let average = 0
                    let averageCont = 0

                    res.forEach(record => {
                        average += Number(Object.values(record))
                        averageCont += 1
                    })
                    average /= averageCont
                    const data = {
                        mostRecent: mostRecent,
                        average: average
                    }
                    document.getElementById(`${option}`).innerHTML = JSON.stringify(data)
                })
            }
            else if (res.status === 404) {
                res.json().then(res => {
                    document.getElementById(`${option}`).innerHTML = res.msg
                })
            }
        })
        .catch(err => alert(err))
}



