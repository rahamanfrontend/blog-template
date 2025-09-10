// TagsSkeleton.js

import React from 'react';
import './SidebarSkeleton.css';

const TagsSkeleton = () => {
  return (
    <div className="tags-skeleton-container">
      <div className="tags-skeleton-title"></div>
      <div className="tags-skeleton-item"></div>
      <div className="tags-skeleton-item"></div>
      <div className="tags-skeleton-item"></div>
      <div className="tags-skeleton-item"></div>
    </div>
  );
};

export default TagsSkeleton;