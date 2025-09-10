// ArticleSkeleton.js

import React from 'react';
import './ArticleSkeleton.css';
import SidebarSkeleton from '../SidebarSkeleton';
import PopularArticlesSkeleton from '../PopularArticlesSkeleton';
import TagsSkeleton from '../TagsSkeleton';

const ArticleSkeleton = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-image"></div>
      <div className="skeleton-header"></div>
      <div className="skeleton-paragraph"></div>
      <div className="skeleton-paragraph"></div>
      <div className="skeleton-paragraph"></div>
      <SidebarSkeleton />
      <PopularArticlesSkeleton />
      <TagsSkeleton />
    </div>
  );
};

export default ArticleSkeleton;