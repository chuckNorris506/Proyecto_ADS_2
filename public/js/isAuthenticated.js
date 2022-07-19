const isAuthenticated = () => {

    if (!sessionStorage.getItem('jwt')) {
        window.location.assign('/')
    }
}

isAuthenticated()