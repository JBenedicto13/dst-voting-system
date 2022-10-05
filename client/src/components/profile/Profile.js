import {React, useEffect} from 'react';
import http from '../../utils/http';

const Profile = () => {

    useEffect(() => {
        getUserProfile();
    }, [])

    const getUserProfile = async () => {
       const response = await http.get('/user');
       console.log(response);
    }
  return (
    <h1>This is Profile component</h1>
  )
}

export default Profile