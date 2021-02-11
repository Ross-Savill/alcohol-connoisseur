import React, { useEffect, useState } from 'react';
import ProgressBar from '../MyUtilitiesFolder/ProgressBar';
import axios from 'axios';
import LoadingSpin from'../MyUtilitiesFolder/LoadingSpin';

const UploadImage = (props) => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const types = ['image/png', 'image/jpeg'];

  useEffect(() => {
    if(props.drinkers !== users) {
      setUsers(props.drinkers)
    }
  },[props])

  const imageChangeHandler = (e) => {
    let selected = e.target.files[0];
    if(selected && types.includes(selected.type)) {
      setFile(selected)
      setError("")
    } else {
      setFile(null)
      setError("Please select either a png or jpeg file to upload")
    }
  }

  const handleSelectedUser = (e) => {
    if(e.target.value !== selectedUser) {
      setSelectedUser(e.target.value)
    }
  }

  if(!users){
    return <LoadingSpin />
  } else {
    return  (
      <div>
        <div className="addProfilePicDiv">
        <select onChange={(e) => handleSelectedUser(e)}>
          {users.map((oneUser) => (
            <option key={oneUser._id}value={oneUser._id}>{oneUser.personName}</option>
          ))}
        </select>
        </div>
        <form>
          <input type="file" onChange={imageChangeHandler}/>
          <div className="uploadOutput">
            {error && <div className="uploadErrorDiv">{error}</div>}
            {file && <div className="fileNameDiv">{file.name}</div>}
            {file && <ProgressBar file={file} setFile={setFile} selectedUserID={selectedUser} />}
          </div>
        </form>
      </div>
    )
  }
}

export default UploadImage;