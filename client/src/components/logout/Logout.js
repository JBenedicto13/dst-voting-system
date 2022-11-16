import {React, useEffect} from 'react'

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem("token");
        window.location = "/";
    }, [])
  return (
    <></>
  )
}

export default Logout