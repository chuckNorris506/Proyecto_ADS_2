//Para todas las vistas
const isNotAuthenticated = () => {

    if (!sessionStorage.getItem('jwt')) {
        window.location.assign('/')
    }
}

//Para el index
const isAuthenticated = async () => {
    if (sessionStorage.getItem('jwt')) {
        window.location.assign('/dashboard.html')
    }
}