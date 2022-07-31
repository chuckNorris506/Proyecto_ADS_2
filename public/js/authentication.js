//Para todas las vistas
const checkAuthentication = () => {
    if (!sessionStorage.getItem('jwt')) {
        window.location.assign('/')
    }   
}

const checkAuthenticationLogin = () => {
    if (sessionStorage.getItem('jwt')) {
        window.location.assign('/dashboard.html')
    }
}

const signOut = async () => {
    sessionStorage.clear()
    window.location.replace('/')
}
