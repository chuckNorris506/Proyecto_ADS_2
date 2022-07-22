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
                    let data = ''
                    res.forEach(option => {
                        data += `<li value=${option.a_id}>
                            Sede: ${option.cp_name},
                            Materia: ${option.s_name} ${option.s_code},
                            Identificador de curso: ${option.c_id},<br>                  
                            Aprobados: ${option.a_courseVarianceApproved}%, 
                            Reprobados: ${option.a_courseVarianceFailed}%, 
                            Abandonaron: ${option.a_courseVarianceDropped}%
                            </li>`
                    })
                    document.getElementById('alerts').innerHTML = data
                })
            }
            else if (res.status === 404) {
                res.json().then(res => {
                    document.getElementById('msg').innerHTML = res.msg
                })
            }
        })
        .catch(err => alert(err))
}