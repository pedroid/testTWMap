import React from 'react';

export const InfoModal = ({ info }) => {
  // console.log(info);
  if (info === null) {
    return null
  }
  return (
    <div className="infoModal">
      <p className="name">{info.name}</p>
      <p className="data">{info.data}</p>
      <p className="description">{info.description}</p>
    </div>
  )
}