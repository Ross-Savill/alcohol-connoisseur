import React from 'react';
import '../Stylesheets/AdminFolderSS/Admin.css'
import { useAuth0 } from '@auth0/auth0-react';
import UploadImage from './UploadImage';

const Admin = (props) => {

  return(
    <div className="addProfilePicDiv">
      <UploadImage drinkers={props.drinkers}/>
    </div>
  )
}

export default Admin;