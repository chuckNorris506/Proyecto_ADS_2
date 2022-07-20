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
    getData('approved');
    getData('failed');
    getData('dropped');
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
                    //document.getElementById(`${option}`).innerHTML = JSON.stringify(data)
                    createChart(data.mostRecent, data.average, option)
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

const createChart = async (mostRecent, average, option) => {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    // Draw the chart and set the chart values
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Reciente', mostRecent],
            ['Promedio', average]
        ]);

        // Optional; add a title and set the width and height of the chart
        var options = { 'title': option, 'width': 400, 'height': 400, is3D: true, slices: {1: {offset: 0.1}} };

        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.PieChart(document.getElementById(option));
        chart.draw(data, options);
    }
}

//https://developers.google.com/chart/interactive/docs/gallery/piechart
//https://www.w3schools.com/howto/howto_google_charts.asp



