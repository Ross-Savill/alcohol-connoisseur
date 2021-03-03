import React from 'react';
import '../Stylesheets/AdminFolderSS/Admin.css'
import UploadImage from './UploadImage';

const Admin = (props) => {

  return(
    <div className="addProfilePicDiv">
      <UploadImage drinkers={props.drinkers}/>
    </div>
  )
}

export default Admin;