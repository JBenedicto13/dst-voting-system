import {React, useEffect} from 'react'

const AdminLogout = () => {
    useEffect(() => {
        localStorage.removeItem("admin-token");
        window.location = "/admin/login";
    }, [])
  return (
    <></>
  )
}

export default AdminLogout