import React from 'react';
import './Navigation.css';

const NavBlock = ({ item, isActive, onMainClick, onSubItemClick, activeSubNavItem }) => (
  <div
    className={`nav-block ${isActive ? 'active' : ''}`}
    id={`nav-block-${item.label.toLowerCase()}`}
  >
    <div
      className='nav-block-button'
      onClick={() => onMainClick(item.label)}
    ></div>

    <div className='nav-block-label'>
      <h2>{item.label.toUpperCase()}</h2>
      {isActive && item.subItems && (
        <div>
          {item.subItems.map(subItem => (
            <h5 
              key={subItem} 
              onClick={(e) => {
                e.stopPropagation();
                onSubItemClick(subItem);
              }}
              className={subItem === activeSubNavItem ? 'active' : ''}
            >
              {subItem.toUpperCase()}
            </h5>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Navigation = ({ navItems, activeNavItem, activeSubNavItem, onItemClick, onSubItemClick }) => {
  const handleNavItemClick = (navItem) => {
    if (navItem === activeNavItem) {
      onItemClick('home');
    } else {
      onItemClick(navItem);
    }
  };

  return (
    <>
      {navItems.map((item) => (
        <NavBlock
          key={item.label}
          item={item}
          isActive={activeNavItem === item.label}
          onMainClick={handleNavItemClick}
          onSubItemClick={onSubItemClick}
          activeSubNavItem={activeSubNavItem}
        />
      ))}
      <div className='nav-curve-upper'></div>
      <div className='nav-curve-lower'></div>
    </>
  );
};

export default Navigation;
