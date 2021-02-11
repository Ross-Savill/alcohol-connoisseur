import { useState, useEffect } from 'react';
import { storage } from './firebase/config';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const useStorage = (file, selectedUserID) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const storageRef = storage.ref(file.name);
    storageRef.put(file).on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percentage);
    },(err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const token = await getAccessTokenSilently();
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
      setUrl(url)
        axios.patch(`https://drinkandrate.herokuapp.com/profilephotoupdate/${selectedUserID}`,{ profilePic: url }, config)
        .then(resp => console.log(resp))
        .catch(error => console.log(error))
    })
  }, [file])

  return { progress, url, error }

}

export default useStorage;