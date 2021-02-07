import React from 'react';
import { storage } from '../firebase'
import '../Stylesheets/AdminFolderSS/Admin.css'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      url: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  handleChange = e => {
    if(e.target.files[0]) {
      const image  = e.target.files[0]
      this.setState({ image })
    }
  }

  handleUpload = () => {
    const { image } = this.state
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on('state_changed',
    (snapshot) => {

    },
    (error) => {
      console.log(error)
    },
    () => {
      storage.ref('images').child(image.name).getDownloadURL().then(url => {
        this.setState({ url })
      })
    });
  }

  render() {
    return (
      <div className="adminPageContainer">
        <input type="file" onChange={this.handleChange}/>
        <button onClick={this.handleUpload}>Upload</button>

      </div>
    )
  }
}

export default Admin;