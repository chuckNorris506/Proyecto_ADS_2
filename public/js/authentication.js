//Para todas las vistas
const checkAuthentication = () => {
    if (!sessionStorage.getItem('jwt')) {
        window.location.assign('/')
    }
}

const signOut = async () => {
    sessionStorage.clear()
    window.location.assign('/')
}