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
                    getData()
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
const getData = async () => {

    const id = document.getElementById('subject').value
    const option = 'approved'
    const options = {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('jwt')
        }
    }

    fetch(`api/v1/course/${id}/?option=${option}`, options)
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
                    document.getElementById('charts').innerHTML = JSON.stringify(data)
                })
            }
            else if (res.status === 404) {
                res.json().then(res => {
                    document.getElementById('charts').innerHTML = ""
                    alert('No hay datos')
                })
            }
        })
        .catch(err => alert(err))
}

const getAlerts = () => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('jwt')
        }
    }
    fetch(`api/v1/alert`, options)
        .then(res => {
            if (res.status === 200) {
                res.json().then(res => {
                    document.getElementById('alerts').innerHTML = JSON.stringify(res)
                })
            }
            else if (res.status === 404) {
                res.json().then(res => {
                    alert('No hay datos')
                })
            }
        })
        .catch(err => alert(err))
}