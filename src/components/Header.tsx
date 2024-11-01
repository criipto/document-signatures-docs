import React, {useEffect, useReducer, useState} from 'react';
import { Link } from "gatsby";

import { OperationsStatusProvider, OperationsStatusIcon, OperationsStatusTrigger } from '@criipto/ui-operations-status';

import '@criipto/ui-operations-status/dist/index.css';
import Search from './Search';
import logo from '../images/criipto-logo.png';

export default function Header(props: {path: string | undefined, className?: string}) {
  const [showDropdown, toggleDropdown] = useReducer((value) => !value, false);
  const [showSearch, setShowSearch] = useState(false);
  const {path} = props;
  const isVerify = path?.startsWith('/verify');
  const isSignatures = path?.startsWith('/signatures');

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowSearch(false);
      if (event.key === '/') setShowSearch(true);
    };

    document.addEventListener('keyup', handler);
    return () => document.removeEventListener('keyup', handler);
  }, []);

  return (
    <React.Fragment>
      <header className={`sticky top-0 z-40 w-full backdrop-blur flex-none duration-500 lg:z-50 bg-light-blue-300 text-md text-deep-purple-900 supports-backdrop-blur:bg-blue/60 font-medium font-sans ${props.className}`}>
        <div className="max-w-screen-2xl mx-auto">
          <div className="py-2 border-b border-gray-900/10 lg:px-8 lg:border-0 mx-4 lg:mx-0 flex justify-between items-center gap-6">
            <div className="relative flex items-center flex-1">
              <a href="/" className="mr-3 flex flex-row gap-6 items-center h-[19px]">
                <img src={logo} alt="Criipto" className="h-[19px]" />
                <span className="hidden lg:inline uppercase text-deep-purple-900 font-sans font-medium">Documentation</span>
              </a>

              <div className="relative">
                <button
                  className="leading-5 bg-gray-400/20 rounded-full py-1 px-3 flex items-center uppercase space-x-2 hover:bg-gray-400/40 text-deep-purple-900 hover:text-primary-600"
                  onClick={toggleDropdown}
                >
                  {isVerify ? (
                    <React.Fragment>
                      Verify (eIDs)

                      <svg width="6" height="3" className="ml-2 overflow-visible" aria-hidden="true">
                        <path d="M0 0L3 3L6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                      </svg>
                    </React.Fragment>
                  ) : isSignatures ? (
                    <React.Fragment>
                      Signatures

                      <svg width="6" height="3" className="ml-2 overflow-visible" aria-hidden="true">
                        <path d="M0 0L3 3L6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                      </svg>
                    </React.Fragment>
                  ) : (
                    'Verify + Signatures'
                  )}
                </button>
                {showDropdown && (
                  <div className="absolute top-full mt-1 py-2 w-60 rounded-lg bg-white shadow ring-1 ring-gray-900/5 leading-6 font-medium uppercase text-deep-purple-900 z-60">
                    <Link to="/verify">
                      <span className="flex items-center justify-between px-3 py-1 text-deep-purple-900 hover:text-primary-600">
                        Verify (eIDs)
                        {isVerify && (
                          <svg width="24" height="24" fill="none"><path d="m7.75 12.75 2.25 2.5 6.25-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        )}
                      </span>
                    </Link>
                    <Link to="/signatures">
                      <span className="flex items-center justify-between px-3 py-1 text-deep-purple-900 hover:text-primary-600">
                        Signatures
                        {isSignatures && (
                          <svg width="24" height="24" fill="none"><path d="m7.75 12.75 2.25 2.5 6.25-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        )}
                      </span>
                    </Link>
                  </div>
                )}
              </div>

              <button onClick={() => setShowSearch(true)} type="button" className="hidden lg:flex items-center w-64 text-sm leading-6 bg-white text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 ml-4">
                <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-3 flex-none">
                  <path d="m19 19-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle>
                </svg>
                Search...
              </button>

              <button onClick={() => setShowSearch(true)} type="button" className="ml-auto text-white w-8 h-8 -my-1 flex items-center justify-center lg:hidden">
                <span className="sr-only">Search</span>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m19 19-3.5-3.5"></path><circle cx="11" cy="11" r="6"></circle>
                </svg>
              </button>
            </div>
            
            <div className="hidden lg:flex items-center relative">
              <OperationsStatusProvider>
                <OperationsStatusTrigger overlayClassname="top-[35px] right-0">
                  <OperationsStatusIcon />
                  <span className="ml-2 inline-block text-white cursor-pointer font-medium uppercase text-deep-purple-900 hover:text-primary-600">Operations Status</span>
                </OperationsStatusTrigger>
              </OperationsStatusProvider>
            </div>
            <div className="hidden lg:flex items-center">
              <div>
                <Link to="/changelog" target="_blank" className="text-white font-medium mr-2 py-2 px-4 rounded uppercase text-deep-purple-900 hover:text-primary-600 focus:outline-none focus:shadow-outline">
                  Changelog
                </Link>
                <a href="https://dashboard.criipto.com" target="_blank" className="text-white font-medium mr-2 py-2 px-4 rounded uppercase text-deep-purple-900 hover:text-primary-600 focus:outline-none focus:shadow-outline">
                  Dashboard
                </a>
                <a href="https://www.criipto.com/signup?utm_source=docs" target="_blank" className="bg-white font-medium py-2 px-4 rounded uppercase text-deep-purple-900 hover:text-primary-600 focus:outline-none focus:shadow-outline">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`backdrop-blur-sm bg-black/30 fixed h-screen w-screen top-0 left-0 right-0 z-50 p-4 items-center justify-center ${showSearch ? 'flex' : 'hidden'}`}
        onClick={() => setShowSearch(false)}
      >
        <div className="bg-white rounded-md p-4 w-full h-full max-w-2xl lg:max-h-[42rem] overflow-auto prose" onClick={(event) => event.stopPropagation()}>
          <button onClick={() => setShowSearch(false)} type="button" className="absolute z-10 top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
            <span className="sr-only">Close search</span>
            <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 overflow-visible">
              <path d="M0 0L10 10M10 0L0 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
          </button>

          <p className="mb-2 mt-0 text-sm">
            Tip: You can also use keyboard shortcut '/' to access search
          </p>
          {showSearch ? <Search onHide={() => setShowSearch(false)} /> : null}
        </div>
      </div>
    </React.Fragment>
  )
}