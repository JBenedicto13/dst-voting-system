import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UnrouteUser = ({user}) => {
  return (
    user ? <Outlet /> : <Navigate to="/login" />
  )
}

export default UnrouteUser