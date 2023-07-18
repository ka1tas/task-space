import React, { useState } from "react";
import Button from '../common/Button';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../assets/logo/logowhite.png';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleUserOptionClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserOptionClose = () => {
    setAnchorEl(null);
  };

  const [showMobileMenu, setshowMobileMenu] = useState(false);

  return (
    <div className="header">
      {/* pc */}
      <div className="header-pc">
        <div className="left">
          <div className="logo-div">
            <img className="header-logo" src={logo} alt="logo" height='40px' />
          </div>
          <div className="link-list">
            <Button className="links"> <Link to="/">Home</Link></Button>
            <Button className="links"><Link to="/dashboard">Application</Link></Button>
            <Button className="links"><Link to="/login">Login</Link></Button>
            <Button className="links"><Link to="/signup">Signup</Link></Button>
          </div>
        </div>
        <div className="right">
          <Avatar alt="user picture" sx={{ bgcolor: blue[500] }} src=""
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleUserOptionClick}
          />


          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleUserOptionClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleUserOptionClose}>Profile</MenuItem>
            <MenuItem onClick={handleUserOptionClose}>Logout</MenuItem>
          </Menu>

        </div>



      </div>

      {/* mobile */}
      <div className="header-mobile">
        <div className="mobile-nav">
          <div className="logo-div">
            <img className="header-logo" src={logo} alt="logo" height='40px' />
          </div>
          <div className="right">
            <MenuIcon className="mobile-menu" fontSize="large"
              onClick={() => { setshowMobileMenu(!showMobileMenu) }} />
          </div>
        </div>

        {showMobileMenu &&
          <div className="mobile-links">
            <Button className="links"> <Link to="/">Home</Link></Button>
            <Button className="links">Applications</Button>
            <Button className="links">Login</Button>
            <Button className="links" >Signup</Button>
            <Button className="links">Profile</Button>
            <Button className="links">log Out</Button>
          </div>
        }

      </div>
    </div>

  );
}

export default Header;