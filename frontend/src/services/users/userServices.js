import { BASE_URL } from "../../utils/url.js";
import axios from "axios";
import { getuser } from "../../utils/getuser.js";




export const LoginAPI = async (userData) => {
    const response = await axios.post(`${BASE_URL}/users/login`, {
        email: userData.email,
        password: userData.password,

    });
    // return a promise
    return response.data;

}
export const RegisterAPI = async (email,password,username) => {
    const response = await axios.post(`${BASE_URL}/users/register`, {
        email: email,
        password: password,
        username: username
    });
    // return a promise
    return response.data;
}

export const changePasswordAPI = async (newPassword) => {
     const token = getuser()?.token; 
  const response = await axios.put(
    `${BASE_URL}/users/profile/password`,
    {
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //Return a promise
  return response.data;
};

//! update Profile
export const updateProfileAPI = async ({ email, username }) => {
    const token = getuser()?.token; // Get the token from localStorage or any other storage mechanism
  const response = await axios.put(
    `${BASE_URL}/users/update-profile`,
    {
      email,
      username,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //Return a promise
  return response.data;
};