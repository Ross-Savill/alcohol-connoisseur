import React, { useEffect, useState } from 'react';
import { storage } from '../firebase'
import '../Stylesheets/AdminFolderSS/Admin.css'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Admin = () => {

    const [drinkers, setDrinkers] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

  useEffect(() => {
    if(drinkers){
      const { drinkers } = this.props.drinkers
      if(drinkers !== this.state.drinkers) {
        setDrinkers(drinkers)
      }
    }
  },[drinkers])

  // handleDrinkerSelection() {

  // }

  const handleChange = e => {
    console.log(e)
    if(e.target.files[0]) {
      const image  = e.target.files[0]
      setImage(image)
    }
  }

  const handleUpload = () => {
    // const { getAccessTokenSilently, user } = useAuth0();
    const { image } = this.state
    // const token = await getAccessTokenSilently();
    // const config = {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // }
    const uploadTask = storage.ref(`images/${image.name}`).put(image)

    uploadTask.on('state_changed',
    (snapshot) => {

    },
    (error) => {
      console.log(error)
    },
    () => {
      storage.ref('images').child(image.name).getDownloadURL().then(url => {
        setUrl(url)
      })
      // axios.patch("https://drinkandrate.herokuapp.com/users", {profilePic: url})
    });
  }

  return (
    <div className="adminPageContainer">
      <select></select>
      <input type="file" onChange={(e) => handleChange(e)}/>
      <button onClick={() => handleUpload()}>Upload</button>
    </div>
  )
}

export default Admin;