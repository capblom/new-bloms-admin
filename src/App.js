import React, { useState } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import HomeUpper from './components/home/HomeUpper';
import HomeLower from './components/home/HomeLower';
import ResourcesUpper from './components/resources/ResourcesUpper';
import ResourcesLower from './components/resources/ResourcesLower';
import MailingsUpper from './components/mailings/MailingsUpper';
import MailingsLower from './components/mailings/MailingsLower';
import CatalogueRequests from './components/mailings/CatalogueRequests';
import NewMailing from './components/mailings/NewMailing';

const App = () => {
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [activeSubNavItem, setActiveSubNavItem] = useState(null);

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
    setActiveSubNavItem(null); // Clear the sub nav item whenever a main nav item is clicked
  };

  const handleSubNavItemClick = (subNavItem) => {
    setActiveSubNavItem(subNavItem === activeSubNavItem ? null : subNavItem); // Toggle the sub nav item
  };

  const navItems = [
    { label: 'home', subItems: [] },
    { label: 'resources', subItems: ['passwords', 'manuals' , 'calendar'] },
    { label: 'mailings', subItems: ['catalogue requests', 'new mailing', 'past mailings'] },
  ];

  return (
    <div className="app">
      <Navigation activeNavItem={activeNavItem} onItemClick={handleNavItemClick} navItems={navItems} onSubItemClick={handleSubNavItemClick} activeSubNavItem={activeSubNavItem} />
      <>
        {activeNavItem === 'home' && (
          <>
            <HomeUpper/>
            <HomeLower/>
          </>
        )}
        {activeNavItem === 'resources' && (
          <>
            <ResourcesUpper/>
            {activeSubNavItem === null ? <ResourcesLower/> : <div>{/* other component based on activeSubNavItem */}</div>}
          </>
        )}
        {activeNavItem === 'mailings' && (
          <>
            <MailingsUpper/>
            {activeSubNavItem === null ? <MailingsLower/> : (activeSubNavItem === 'catalogue requests' ? <CatalogueRequests/> : activeSubNavItem === 'new mailing' ? <NewMailing /> : <div>{/* other component based on activeSubNavItem */}</div>)}
          </>
        )}
      </>
    </div>
  );
};

export default App;
