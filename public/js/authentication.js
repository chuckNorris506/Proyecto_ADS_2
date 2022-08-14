//Para todas las vistas
/**
 * If there is no jwt in sessionStorage, redirect to the root route.
 */
const checkAuthentication = () => {
    if (!sessionStorage.getItem('jwt')) {
        window.location.assign('/')
    }   
}

/**
 * If the user is logged in, redirect them to the dashboard.
 */
const checkAuthenticationLogin = () => {
    if (sessionStorage.getItem('jwt')) {
        window.location.assign('/dashboard.html')
    }
}

/**
 * It clears the sessionStorage and redirects the user to the homepage.
 */
const signOut = async () => {
    sessionStorage.clear()
    window.location.replace('/')
}
