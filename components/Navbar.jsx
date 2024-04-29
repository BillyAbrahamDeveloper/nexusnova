'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const pathName = usePathname();
  const [showDropDown, setShowDropDown] = useState(false);

  const loggedIn = true;

  const dropDownHandler = () => {
    setShowDropDown((prev) => true);
  };
  const hideDropDownHandler = () => {
    setShowDropDown((prev) => false);
  };

  return (
    <div className='container py-2 h-16 flex items-center justify-between'>
      <Link href='/' onClick={hideDropDownHandler}>
        <h2 className='text-4xl  font-thin'>
          Nexus<span className=' font-bold text-green-300'>Nova.</span>
        </h2>
      </Link>

      <ul className=' flex items-center justify-between gap-10'>
        <li>
          <Link
            onClick={hideDropDownHandler}
            href='/blog'
            className={pathName === '/blog' ? 'text-green-300 font-bold' : ''}
          >
            Blog
          </Link>
        </li>

        {!loggedIn ? (
          <div className=' flex items-center justify-between gap-10'>
            <li>
              <Link
                onClick={hideDropDownHandler}
                href='/write'
                className={
                  pathName === '/write' ? 'text-green-300 font-bold' : ''
                }
              >
                Write
              </Link>
            </li>
            <li>
              <div className='relative'>
                <Image
                  onClick={dropDownHandler}
                  src='https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  width={100}
                  height={100}
                  style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                    borderRadius: '100%',
                    cursor: 'pointer',
                    border: '1px solid gray',
                  }}
                  alt='profile'
                />
                {showDropDown && (
                  <div className=' absolute top-10 -left-9  bg-green-950 p-5  rounded-xl'>
                    <Link
                      onClick={hideDropDownHandler}
                      href='/profile'
                      className={
                        pathName === '/profile'
                          ? 'text-green-300 font-bold'
                          : ''
                      }
                    >
                      Profile
                    </Link>
                    <button
                      onClick={hideDropDownHandler}
                      className=' cursor-pointer text-red-600  text-4xl text-center'
                    >
                      x
                    </button>
                  </div>
                )}
              </div>
            </li>
          </div>
        ) : (
          <div className=' flex items-center justify-between gap-10'>
            <li>
              <Link href='/login'>Login</Link>
            </li>
            <li>
              <Link href='/signup'>SignUp</Link>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
