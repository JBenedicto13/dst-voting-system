import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateAdmin = ({admin}) => {
  return (
    admin ? <Outlet /> : <Navigate to="/admin/login" />
  )
}

export default PrivateAdmin