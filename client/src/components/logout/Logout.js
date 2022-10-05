import {React, useEffect} from 'react'

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem("token");
        window.location = "/";
    }, [])
  return (
    <h1>This is Logout Component</h1>
  )
}

export default Logout