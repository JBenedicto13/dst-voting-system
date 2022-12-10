import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UnrouteAdmin = ({admin}) => {
  return (
    admin ? <Outlet /> : <Navigate to="/admin/login" />
  )
}

export default UnrouteAdmin