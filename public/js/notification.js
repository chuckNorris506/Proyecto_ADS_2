/**
 * It gets the alerts from the database and displays them in a table.
 */
const getAlerts = async () => {

    /* Setting the options for the fetch request. */
    const options = {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('jwt')
        }
    }

    /* A fetch request to the database. */
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
                        <td contenteditable='false' style="width: 216px;">${alert.a_approved_diff} %</td>
                        <td contenteditable='false' style="width: 216px;">${alert.a_failed_diff} %</td>
                        <td contenteditable='false' style="width: 216px;">${alert.a_dropped_diff} %</td>
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