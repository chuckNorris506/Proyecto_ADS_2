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
                    let data = '<ul>'
                    res.forEach(option => {
                        data += `<li value=${option.a_id}>
                            Variación aprobados:${option.courseVarianceApproved}, 
                            Variación reprobados: ${option.courseVarianceFailed}, 
                            Variación abandonaron:${option.courseVarianceDropped}
                            </li>`
                    })
                    data += '</ul>'
                    document.getElementById('alerts').innerHTML = data
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