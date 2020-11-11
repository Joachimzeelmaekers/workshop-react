import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const ACTIVE_LINK_CLASS =
  'px-3 py-2 rounded-md text-xl font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700';
const DEFAULT_LINK_CLASS =
  'px-3 py-2 rounded-md text-xl font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700';

function NavItem({path, text}) {
  const location = useLocation();
  const isActivePath = location.pathname === path;

  return (
    <Link
      className={isActivePath ? ACTIVE_LINK_CLASS : DEFAULT_LINK_CLASS}
      to={path}
    >
      {text}
    </Link>
  );
}

export default NavItem;
