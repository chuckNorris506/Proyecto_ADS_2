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
                    let data = "<option value=0>Todos</option>"
                    res.forEach(option => {
                        data += `<option value=${option.cp_id}> ${option.cp_name}</option>`
                    })
                    document.getElementById('campus').innerHTML = data
                    getSubjects()
                })
            }
            else if (res.status === 404) {
                res.json().then(res => {
                    document.getElementById('campus').innerHTML = `<option>${res.msg}</option>`
                    document.getElementById('subject').innerHTML = `<option>${res.msg}</option>`
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
                    let data
                    res.forEach(option => {
                        data += `<option value=${option.s_id}> ${option.s_name} ${option.s_code} </option>`
                    })
                    document.getElementById('subject').innerHTML = data
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
    const subject = document.getElementById('subject').value
    const campus = document.getElementById('campus').value
    /**
     * ACTUAL
     */
    let msg
    let approved = []
    let failed = []
    let dropped = []
    
    await getData('approved', subject, campus)
        .then(arr => { if (arr) { approved = arr } })
        .catch((alert) => { msg = alert })

    await getData('failed', subject, campus)
        .then(arr => { if (arr) { failed = arr } })
        .catch(() => { })

    await getData('dropped', subject, campus)
        .then(arr => { if (arr) { dropped = arr } })
        .catch(() => { })

    if (approved.length > 1 || failed.length > 1 || dropped.length > 1) {

        let approvedMostRecent = approved.shift()
        let failedMostRecent = failed.shift()
        let droppedMostRecent = dropped.shift()
        let totalMostRecent = approvedMostRecent + failedMostRecent + droppedMostRecent
        alert(droppedMostRecent)
        let pamr = approvedMostRecent * 100 / totalMostRecent
        let pfmr = failedMostRecent * 100 / totalMostRecent
        let pdmr = droppedMostRecent * 100 / totalMostRecent
        
        alert(pfmr)
        let totalApprovedHistorical = 0
        let totalFailedHistorical = 0
        let totalDroppedHistorical = 0
        let totalHistorical = 0

        approved.forEach(element => {
            totalApprovedHistorical += element
        })
        failed.forEach(element => {
            totalFailedHistorical += element
        })
        dropped.forEach(element => {
            totalDroppedHistorical += element
        })

        totalHistorical = totalApprovedHistorical + totalFailedHistorical + totalDroppedHistorical

        let pah = totalApprovedHistorical * 100 / totalHistorical
        let pfh = totalFailedHistorical * 100 / totalHistorical
        let pdh = totalDroppedHistorical * 100 / totalHistorical

        createChart(pamr, pah, 'approved')
        createChart(pfmr, pfh, 'failed')
        createChart(pdmr, pdh, 'dropped')
    }
    else {
        document.getElementById(`approved`).innerHTML = ""
        document.getElementById(`failed`).innerHTML = ""
        document.getElementById(`dropped`).innerHTML = msg
    }
}

const getData = async (option, subject, campus) => {

    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('jwt')
            }
        }

        fetch(`api/v1/course/${subject}/?campus=${campus}&option=${option}`, options)
            .then(res => {
                if (res.status === 200) {

                    res.json().then(res => {
                        let arr = []
                        let count = 0

                        res.forEach(record => {
                            arr[count] = Number(Object.values(record))
                            count++
                        })
                        resolve(arr)
                    }
                    )
                }

                else if (res.status === 404) {
                    res.json().then(res => {
                        reject(res.msg)
                    })
                }
            })
            .catch(err => alert(err))
    })


}

const createChart = async (mostRecent, average, option) => {
    google.charts.load('current', { 'packages': ['corechart'] })
    google.charts.setOnLoadCallback(drawChart)


    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Reciente', mostRecent],
            ['Promedio', average]
        ])

        let title

        switch (option) {
            case 'approved':
                title = 'Aprobados'
                break
            case 'failed':
                title = 'Reprobados'
                break
            case 'dropped':
                title = 'Abandonaron'
                break
        }

        var options = { 'title': title, 'width': 400, 'height': 400, is3D: true, slices: { 1: { offset: 0.1 } }, pieSliceText: 'value' }


        var chart = new google.visualization.PieChart(document.getElementById(option))
        chart.draw(data, options)
    }
}
//https://developers.google.com/chart/interactive/docs/gallery/piechart
//https://www.w3schools.com/howto/howto_google_charts.asp



