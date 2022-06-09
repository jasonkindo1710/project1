import jwt_decode from "jwt-decode"

const tokenExpired = (accessToken, callback) => {
    let timeExpired;
    window.clearTimeout(timeExpired)
    const currentTime = Date.now()
    const {exp} = jwt_decode(accessToken)
    const timeLeft = exp * 1000 - currentTime

    timeExpired = window.setTimeout(() => {
        callback()
    }, timeLeft)
}

export default tokenExpired