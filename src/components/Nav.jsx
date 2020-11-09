import React from 'react';
import NavItem from './NavItem';

function Nav() {
  return (
    <nav className="bg-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem path="/" text={'Clock'} />
                <NavItem path="/stopwatch" text={'Stopwatch'} />
                <NavItem path="/shows" text={'Shows'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
