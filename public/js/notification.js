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