const isAuthenticated = () => {
    const jwt = sessionStorage.getItem('jwt')
    if (!jwt) {
        window.location.assign('/')
    }
}

isAuthenticated()