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
