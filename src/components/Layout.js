// Layout.js
import React from 'react';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div>
      <div className="background-container"></div>
      <div className="header">
        <h1 className="header-brand">AnimeOm</h1>
      </div>
      <div className="main">
        {children}
      </div>
    </div>
  );
}
