import React from "react";


const Logout = () => {
  localStorage.clear();

  window.location.href = '/login';

  return null
};

export default Logout;