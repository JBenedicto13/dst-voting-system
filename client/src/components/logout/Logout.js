import {React, useEffect} from 'react'

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("user-wallet");
        window.location = "/";
    }, [])
  return (
    <></>
  )
}

export default Logout