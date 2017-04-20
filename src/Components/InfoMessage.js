import React from 'react';

const InfoMessage = ({ icon, children }) => (
  <div className="help">
    <i className={icon}></i>
    <p>{children}</p>
  </div>
);

export default InfoMessage;