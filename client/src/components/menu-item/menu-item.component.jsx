import React from 'react';
// HOC = higher order component, take any component and return the modified version
// allows you to access router
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, linkUrl, match, history }) => {
  // string interpolation to use dynamic values on styles
  // use history API to navigate between routes
  // props.history and props.match are there by default
  return (
    <div
      className={`${size === undefined ? 'menu-item' : `${size} menu-item`}`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      ></div>
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
