import React, { useState, useEffect, Fragment } from 'react';

export const InfoModal = ({ info }) => {
  // console.log(info);
  if (info === null) {
    return null
  }
  return (
    <div className="infoModal">
      <p>{info.name}</p>
    </div>
  )
}