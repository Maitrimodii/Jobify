import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addNotification } from '../actions/notificationActions';
import { clearSocket, setSocket } from '../actions/socketActions';
import Notifications from './Notifications';
import io from 'socket.io-client';

const Header = () => {
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redux setup
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.userLogin.userInfo);
  const userRole = isAuthenticated ? isAuthenticated.role : null;
  const isChatOpen = useSelector((state) => state.chat.isChatOpen);
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;

  // Navigation routes
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'SignUp', href: '/signup' },
    { name: 'Login', href: '/login' },
  ];

  const employerRoutes = [
    { name: 'Add Job', href: '/add-job' },
    { name: 'View Applications', href: '/view-applications' },
    { name: 'Profile', href:'/employerprofile'},
    { name: 'Chat', href:'/chat'},
  ];

  const employeeRoutes = [
    { name: 'View Jobs', href: '/view-jobs' },
    { name: 'My Applications', href: '/my-applications' },
    { name: 'Profile', href: '/employeeprofile'},
    { name: 'Chat', href:'/chat'},
  ];
  
  // Socket setup and event listeners
  useEffect(() => {
    const socketUrl = 'http://localhost:5000';
    const socket = io(socketUrl);
    dispatch(setSocket(socket));

    socket.on('connection', () => {
      console.log('Connected to server');
    });

    if(userInfo){
      socket.emit('addUser', userInfo._id);
    }
    
    socket.on('getMessage', ({ senderId, message: newMessage }) => {
      if (!isChatOpen) {
        // Dispatching a notification for new messages
        dispatch(addNotification({
          senderId,
          message: 'You have a new message',
        }));
      }
    });
  
    // Cleanup function
    return () => {
      socket.disconnect();
      dispatch(clearSocket());
    };
  }, [dispatch, isChatOpen]);

  return (
    <div>
      <header className="z-50 inset-x-0  top-0  bg-indigo-500">
        {/* Main Navigation */}
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link to='/' className="text-sm font-semibold leading-6 text-white">Jobify</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
            {isAuthenticated ? (
              <>
                {userRole === 'employer' && employerRoutes.map((item) => (
                  <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-white">
                    {item.name}
                  </Link>
                ))}
                <Notifications />
                {userRole === 'employee' && employeeRoutes.map((item) => (
                  <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-white">
                    {item.name}
                  </Link>
                ))}
              </>
            ) : (
              <>
                {navigation.map((item) => (
                  <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-white">
                    {item.name}
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dialog */}
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            {/* Mobile Menu Items */}
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                {isAuthenticated ? (
                  <>
                    {userRole === 'employer' && employerRoutes.map((item) => (
                      <Link key={item.name} to={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        {item.name}
                      </Link>
                    ))}
                    {userRole === 'employee' && employeeRoutes.map((item) => (
                      <Link key={item.name} to={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        {item.name}
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    {navigation.map((item) => (
                      <Link key={item.name} to={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        {item.name}
                      </Link>
                    ))}
                  </>
                )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
};

export default Header;
