// SidebarSkeleton.js

import React from 'react';
import './SidebarSkeleton.css';

const SidebarSkeleton = () => {
  return (
    <div className="sidebar-skeleton-container">
      <div className="sidebar-skeleton-title"></div>
      <div className="sidebar-skeleton-item"></div>
      <div className="sidebar-skeleton-item"></div>
      <div className="sidebar-skeleton-item"></div>
      <div className="sidebar-skeleton-item"></div>
    </div>
  );
};

export default SidebarSkeleton;