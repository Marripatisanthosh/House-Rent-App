import { AppBar, Menu, MenuItem, Toolbar } from "@mui/material";
import { Button, CircularProgress } from "@mui/material";
import {
  HousePlus as AppIcon,
  Building2,
  Home,
  LogIn,
  Mail,
  Menu as MenuIcon,
  ShieldPlus,
  User,
  UserPlus,
} from "lucide-react";
import { LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useLogout from "../hooks/auth/useLogout";
import useAuthStore from "../stores/useAuthStore";
import useRequestStore from "../stores/useRequestStore";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <Button
      onClick={logout}
      disabled={loading}
      sx={{
        backgroundColor: "#EF3f1f",
        "&:hover": {
          backgroundColor: "#DC2626",
        },
        padding: "8px 16px",
        textTransform: "none",
      }}
      className={`flex items-center gap-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"} `}
    >
      {loading ? (
        <CircularProgress size={20} className="text-white" />
      ) : (
        <LogOut size={20} />
      )}
      <span className="font-medium text-white">
        {loading ? "Logging out..." : "Logout"}
      </span>
    </Button>
  );
};
const NavLink = ({ to, children, icon: Icon }) => (
  <Link
    to={to}
    className="flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-all duration-200 hover:bg-white/10 active:bg-white/20"
  >
    {Icon && <Icon size={18} />}
    <span>{children}</span>
  </Link>
);

const MobileMenuItem = ({ to, children, icon: Icon, onClick }) => (
  <MenuItem onClick={onClick} className="w-full">
    <Link
      to={to}
      className="flex w-full items-center gap-2 px-2 py-1 text-gray-700"
    >
      {Icon && <Icon size={18} />}
      <span>{children}</span>
    </Link>
  </MenuItem>
);

const Navbar = () => {
  const { userData } = useAuthStore();
  const isAuthenticated = userData !== null;
  const userType = userData?.type;
  const [anchorEl, setAnchorEl] = useState(null);

  const [reqNotifs, setRequestNotifs] = useState(0);
  const [propNotifs, setPropNotifs] = useState(0);
  const { getRequestsCount, modifiedSwitch } = useRequestStore();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setRequestNotifs(getRequestsCount({ requesterId: userData?.uid }, "rseen"));
    setPropNotifs(getRequestsCount({ listedBy: userData?.uid }, "lseen"));
  }, [modifiedSwitch[0]]);

  const NavLinkWithBadge = ({ to, icon: Icon, count, children }) => {
    const IconComponent = Icon;
    return (
      <NavLink to={to}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <IconComponent size={20} />
            <span>{children}</span>
          </div>
          {count > 0 && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
              {count}
            </div>
          )}
        </div>
      </NavLink>
    );
  };

  const MobileMenuItemWithBadge = ({
    to,
    icon: Icon,
    count,
    onClick,
    children,
  }) => {
    const IconComponent = Icon;
    return (
      <MobileMenuItem to={to} onClick={onClick}>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <IconComponent size={20} />
            <span>{children}</span>
          </div>
          {count > 0 && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
              {count}
            </div>
          )}
        </div>
      </MobileMenuItem>
    );
  };

  const getMenuItems = () => {
    const items = [
      <MobileMenuItem key="home" to="/" icon={Home} onClick={handleMenuClose}>
        Home
      </MobileMenuItem>,
    ];

    if (isAuthenticated) {
      if (userType !== "user") {
        items.push(
          <MobileMenuItemWithBadge
            key="properties"
            to="/properties"
            icon={Building2}
            count={propNotifs}
            onClick={handleMenuClose}
          >
            Properties
          </MobileMenuItemWithBadge>
        );
      }
      items.push(
        <MobileMenuItemWithBadge
          key="requests"
          to="/requests"
          icon={Mail}
          count={reqNotifs}
          onClick={handleMenuClose}
        >
          Requests
        </MobileMenuItemWithBadge>
      );
      if (userType === "admin") {
        items.push(
          <MobileMenuItem key="admin" to="/admin" onClick={handleMenuClose}>
            <div className="flex items-center gap-2">
              <ShieldPlus size={20} />
              <span>Admin</span>
            </div>
          </MobileMenuItem>
        );
      }

      items.push(
        <MobileMenuItem key="profile" to="/profile" onClick={handleMenuClose}>
          <div className="flex items-center gap-2">
            <User size={20} />
            <span>Profile</span>
          </div>
        </MobileMenuItem>
      );

      items.push(
        <MenuItem
          key="logout"
          onClick={handleMenuClose}
          className="w-full px-4"
        >
          <LogoutButton />
        </MenuItem>
      );
    } else {
      items.push(
        <MobileMenuItem key="login" to="/login" onClick={handleMenuClose}>
          <div className="flex items-center gap-2">
            <LogIn size={20} />
            <span>Login</span>
          </div>
        </MobileMenuItem>,
        <MobileMenuItem key="register" to="/register" onClick={handleMenuClose}>
          <div className="flex items-center gap-2">
            <UserPlus size={20} />
            <span>Register</span>
          </div>
        </MobileMenuItem>
      );
    }

    return items;
  };

  return (
    <AppBar position="sticky" className="bg-blue-500 shadow-lg">
      <Toolbar className="container mx-auto px-4">
        <div className="flex w-full items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-white transition-transform duration-200 hover:scale-105"
          >
            <AppIcon size={24} />
            RentiT
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <NavLinkWithBadge to="/" icon={Home}>
              Home
            </NavLinkWithBadge>
            {isAuthenticated ? (
              <>
                {userType !== "user" && (
                  <NavLinkWithBadge
                    to="/properties"
                    icon={Building2}
                    count={propNotifs}
                  >
                    Properties
                  </NavLinkWithBadge>
                )}

                <NavLinkWithBadge to="/requests" icon={Mail} count={reqNotifs}>
                  Requests
                </NavLinkWithBadge>
                {userType === "admin" && (
                  <NavLinkWithBadge to="/admin" icon={ShieldPlus}>
                    Admin
                  </NavLinkWithBadge>
                )}
                <NavLinkWithBadge to="/profile" icon={User}>
                  Profile
                </NavLinkWithBadge>

                <LogoutButton />
              </>
            ) : (
              <>
                <NavLinkWithBadge to="/login" icon={LogIn}>
                  Login
                </NavLinkWithBadge>
                <NavLinkWithBadge to="/register" icon={UserPlus}>
                  Register
                </NavLinkWithBadge>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={handleMenuClick}
              className="rounded-lg p-2 text-white transition-colors duration-200 hover:bg-white/10 active:bg-white/20"
              aria-label="menu"
            >
              <MenuIcon size={24} />
            </button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              className="mt-2"
              PaperProps={{
                className: "w-56 py-2 rounded-lg shadow-lg",
              }}
            >
              {getMenuItems()}
            </Menu>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
