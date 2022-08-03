const getAlerts = async () => {

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
                    let alerts = ""
                    res.forEach(alert => {
                        alerts +=
                            `<tr style="background-color: hsla(0, 100%, 50%, 0.1)";>
                        <td contenteditable='false' style="width: 216px;">${alert.s_name}</td>
                        <td contenteditable='false' style="width: 216px;">${alert.cp_name}</td>
                        <td contenteditable='false' style="width: 216px;">${alert.c_year}</td>
                        <td contenteditable='false' style="width: 216px;">${alert.c_quarter}</td>
                        <td contenteditable='false' style="width: 216px;">${alert.a_courseVarianceApproved} %</td>
                        <td contenteditable='false' style="width: 216px;">${alert.a_courseVarianceFailed} %</td>
                        <td contenteditable='false' style="width: 216px;">${alert.a_courseVarianceDropped} %</td>
                            </tr>`
                    })
                    document.getElementById('notificationTable').innerHTML = alerts
                })
            }
            else if (res.status === 404) {
                res.json()
                    .then(res => {
                        document.getElementById('notificationTable').innerHTML = `<option>${res.msg}</option>`
                    })
            }
        })
        .catch(err => alert(err))
}