import {React, useEffect} from 'react'

const AdminLogout = () => {
    useEffect(() => {
        localStorage.removeItem("admin-token");
        sessionStorage.removeItem("admin-wallet");
        window.location = "/admin/login";
    }, [])
  return (
    <></>
  )
}

export default AdminLogout