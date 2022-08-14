/**
 * It gets the campuses from the database and populates the select element with the campuses.
 */
const getCampuses = async () => {

    /* A constant that is used to make a request to the server. */
    const options = {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('jwt')
        }
    }

    /* A function that is used to make a request to the server. */
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

/**
 * It fetches the subjects from the database and populates the select element with the fetched data.
 */
const getSubjects = async () => {

    /* A constant that is used to make a request to the server. */
    const options = {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('jwt')
        }
    }

    /* Fetching the subjects from the database and populating the select element with the fetched data. */
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

/**
 * It gets data from a database, then creates a chart based on that data.
 */
const getChartData = async () => {
    /* Getting the values of the select elements. */
    const subject = document.getElementById('subject').value
    const campus = document.getElementById('campus').value
    /**
     * ACTUAL
     */
    let msg
    let approved = []
    let failed = []
    let dropped = []
    
    /* Getting the data from the database and then populating the chart with the data. */
    await getData('approved', subject, campus)
        .then(arr => { if (arr) { approved = arr } })
        .catch((alert) => { msg = alert })

    await getData('failed', subject, campus)
        .then(arr => { if (arr) { failed = arr } })
        .catch(() => { })

    await getData('dropped', subject, campus)
        .then(arr => { if (arr) { dropped = arr } })
        .catch(() => { })

    /* Calculating the percentages of the data. */
    if (approved.length > 1 || failed.length > 1 || dropped.length > 1) {

        let approvedMostRecent = approved.shift()
        let failedMostRecent = failed.shift()
        let droppedMostRecent = dropped.shift()
        let totalMostRecent = approvedMostRecent + failedMostRecent + droppedMostRecent
        
        let pamr = approvedMostRecent * 100 / totalMostRecent
        let pfmr = failedMostRecent * 100 / totalMostRecent
        let pdmr = droppedMostRecent * 100 / totalMostRecent
        
        
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

/**
 * It takes in 3 parameters, makes a GET request to the server, and returns a promise that resolves to
 * an array of numbers.
 * @param option - 'enrollment' or 'capacity'
 * @param subject - the subject code of the course
 * @param campus - 'All' or 'North' or 'South'
 * @returns An array of numbers.
 */
const getData = async (option, subject, campus) => {

    /* Creating a new promise. */
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('jwt')
            }
        }

        /* Making a GET request to the server. */
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

/**
 * It takes in three parameters, and then uses the Google Charts API to create a pie chart
 * @param mostRecent - the most recent value
 * @param average - the average of the data
 * @param option - 'approved', 'failed', 'dropped'
 */
const createChart = async (mostRecent, average, option) => {
    /* Loading the Google Charts API. */
    google.charts.load('current', { 'packages': ['corechart'] })
    google.charts.setOnLoadCallback(drawChart)


    /**
     * It draws a pie chart with the title of the chart being the value of the variable 'option' and
     * the data being the values of the variables 'mostRecent' and 'average'.
     * </code>
     */
    function drawChart() {
        /* Creating an array of arrays. */
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Reciente', mostRecent],
            ['Promedio', average]
        ])

        let title

        /* Setting the title of the chart. */
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

        /* Setting the options of the chart. */
        var options = { 'title': title, 'width': 400, 'height': 400, is3D: true, slices: { 1: { offset: 0.1 } }, pieSliceText: 'value' }


        /* Creating a new pie chart and placing it in the element with the id of 'option'. */
        var chart = new google.visualization.PieChart(document.getElementById(option))
        /* Drawing the chart. */
        chart.draw(data, options)
    }
}
//https://developers.google.com/chart/interactive/docs/gallery/piechart
//https://www.w3schools.com/howto/howto_google_charts.asp



