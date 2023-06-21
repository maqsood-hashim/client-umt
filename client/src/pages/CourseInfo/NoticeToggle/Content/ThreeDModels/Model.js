import React from 'react';

const Model = ({ title, src }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '600px', // Adjust the height as needed
      width: '800px', // Adjust the width as needed
      margin: '0 auto',
    }}
  >
    <h2 style={{ marginBottom: '10px' }}>{title}</h2>
    <iframe
      style={{ width: '100%', height: '100%' }}
      title={title}
      frameborder="0"
      allowfullscreen
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      xr-spatial-tracking
      execution-while-out-of-viewport
      execution-while-not-rendered
      web-share
      src={src}
    ></iframe>
  </div>
);

export default Model;
