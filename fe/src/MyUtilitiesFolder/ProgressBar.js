import React, { useEffect } from 'react';
import useStorage from '../useStorage';
import '../Stylesheets/MyUtilitiesSS/ProgressBar.css';

const ProgressBar = ({ file, setFile, selectedUserID }) => {

  const { url, progress } = useStorage(file, selectedUserID)

  useEffect(() => {
    if(url) {
      setFile(null)
    }
  },[url, setFile])

  return(
    <div className="progress-bar" style={{ width: progress + "%" }}>progress</div>
  )
}

export default ProgressBar;