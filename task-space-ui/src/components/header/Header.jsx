import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Button from '../common/Button';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../assets/logo/logowhite.png';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import { clearSignup,getUserImage, logOut } from '../../store/actions/UserAuthActions';
function Header() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let user = useSelector(state => state.user);
  let authStatus = useSelector(state => state.user.authStatus);

  const signOut = () => {
    sessionStorage.setItem("JWT_TOKEN", null);
    dispatch(logOut);
    navigate("/login")
  }


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
            {authStatus && <Button className="links"><Link to="/dashboard">Application</Link></Button>}

          </div>
        </div>
        <div className="right">
          <div className="link-list">
            {!authStatus && <Button className="links"><Link to="/login">Login</Link></Button>}
            {!authStatus && <Button className="links"><Link to="/signup">Signup</Link></Button>}

            {authStatus && <Avatar alt="user picture" sx={{ bgcolor: blue[500] }}
              src={`http://localhost:8000/api/v1/image/download/${user?.user?.userName}`}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleUserOptionClick}
            />}



            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleUserOptionClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleUserOptionClose}>
                <Link to={"/profile"} className="flex flex-row items-start hover:border-b-4 border-indigo-500">
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleUserOptionClose} >
                <Link to={"/login"} onClick={signOut} className="flex flex-row items-start  hover:border-b-4 border-indigo-500">
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </div>
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