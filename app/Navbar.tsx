import Link from 'next/link';
import React from 'react';
import './Navbar.scss'

const Navbar = () => {
    return (
        <div className='navbar'>
           <Link className='navbar__link' href={'/'}>Home</Link>
           <Link className='navbar__link' href={'/todos'}>Todos</Link>
           <Link className='navbar__link' href={'/search'}>Search</Link>
        </div>
    );
};

export default Navbar;