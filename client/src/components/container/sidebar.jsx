import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/contact_logo.png'
import contact from '../../assets/contact_icon.png'
import category from '../../assets/categories.png'
import { Logout } from '../../shared/guards/credentialsService';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navbarItems = [
    { icon: <img src={contact} alt="Contacts" className='w-5 h-5 mr-4' />, title: 'Contacts', link: '/contacts' },
    { icon: <img src={category} alt="Categories" className='w-5 h-5 mr-4' />, title: 'Categories', link: '/categories' },
    { icon: <img src={category} alt="Favourite" className='w-5 h-5 mr-4' />, title: 'Favourite', link: '/favourite' },
    { icon: <img src={category} alt="Reminder" className='w-5 h-5 mr-4' />, title: 'Reminder', link: '/reminder' },
  ];

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      await Logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex">
      {/* Top AppBar */}
      <AppBar position="fixed" className="!bg-black">
        <Toolbar className="flex justify-between">
          {/* Hamburger Menu (Mobile) */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} className="md:!hidden !block">
            <MenuIcon />
          </IconButton>
          {/* Title */}
          <div className="hidden md:flex items-center">
            <img src={Logo} alt="COQUI-POS" className="w-9 h-9" />
            <p className="text-white text-2xl font-semibold ml-2">CONTACT MANAGER</p>
          </div>
          {/* Logout and Notification */}
          <div className="flex">
            <span className="text-white px-4 cursor-pointer" onClick={handleLogout}>Logout</span>
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer (Mobile) */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{ className: 'w-60 bg-primary-light' }}
      >
        <List>
          {navbarItems.map((item, index) => (
            <ListItemButton key={index} onClick={() => navigate(item.link)} >
              {item.icon}
              <span>{item.title}</span>
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Sidebar (Desktop) */}
      <div className="hidden md:block w-60 h-screen bg-black">
        <List>
          {navbarItems.map((item, index) => (
            <ListItemButton
              key={index}
              onClick={() => navigate(item.link)}
              className={`${location.pathname.includes(item.link) ? '!bg-primary' : ''}`}
            >
              {item.icon}
              <p className="text-white">{item.title}</p>
            </ListItemButton>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
