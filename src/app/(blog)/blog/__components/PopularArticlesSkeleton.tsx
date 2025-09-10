// PopularArticlesSkeleton.js

import React from 'react';
import './SidebarSkeleton.css';

const PopularArticlesSkeleton = () => {
  return (
    <div className="popular-articles-skeleton-container">
      <div className="popular-articles-skeleton-title"></div>
      <div className="popular-articles-skeleton-item"></div>
      <div className="popular-articles-skeleton-item"></div>
      <div className="popular-articles-skeleton-item"></div>
      <div className="popular-articles-skeleton-item"></div>
    </div>
  );
};

export default PopularArticlesSkeleton;