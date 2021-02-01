import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import '../Stylesheets/AuthFolderSS/LogoutButton.css'

const LogoutButton = () => {
  const { logout } = useAuth0();
  return(
    <div className="logoutLink" onClick={() => logout()}>
      Logout
    </div>
  )
}

export default LogoutButton;