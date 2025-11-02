import { useState } from 'react';
import { Search, Bell, Package, User, ShoppingBag, Bookmark, MapPin, CreditCard, Settings, LogOut, Menu, X } from 'lucide-react';
import logo from "../../assets/feedImg/logo.png"
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function UserNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSellerMode, setIsSellerMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 py-3">
        <div className="flex items-center justify-evenly ">
          {/* Logo */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="flex items-center">
              <div className="">
                <img src={logo} width={80} alt="" />
              </div>
            </div>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-900 hover:text-orange-700 font-bold">
                Feed
              </a>
              <a href="#" className="text-gray-900 hover:text-orange-700 font-bold">
                Sellers
              </a>
              <a href="#" className="text-gray-900 hover:text-orange-700 font-bold">
                Live
              </a>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search listings, sellers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Actions - Hidden on mobile */}
            <button className="hidden md:block px-3 lg:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm whitespace-nowrap">
              Become A Seller
            </button>

            <button className="hidden md:block relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-700" />
            </button>

            <button className="hidden md:block relative p-2 hover:bg-gray-100 rounded-lg">
              <Package className="w-5 h-5 text-gray-700" />
            </button>

            {/* User Avatar with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-purple-500 transition-colors"
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border-2 border-pink-500 z-50">
                  <div className="p-4">
                    {/* Seller Mode Toggle */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                      <span className="text-pink-500 font-semibold">Seller Mode</span>
                      <button
                        onClick={() => setIsSellerMode(!isSellerMode)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${isSellerMode ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${isSellerMode ? 'translate-x-6' : 'translate-x-0'
                            }`}
                        />
                      </button>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-1">
                      <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left">
                        <User className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-800">Profile</span>
                      </button>

                      <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left">
                        <ShoppingBag className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-800">My Orders</span>
                      </button>

                      <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left">
                        <Bookmark className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-800">Saved Items</span>
                      </button>

                      <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left">
                        <MapPin className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-800">Address Book</span>
                      </button>

                      <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left">
                        <CreditCard className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-800">Payment Method</span>
                      </button>

                      <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left">
                        <Settings className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-800">Settings</span>
                      </button>

                      <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left mt-2 pt-3 border-t border-gray-200">
                        <LogOut className="w-5 h-5 text-pink-500" />
                        <span className="text-pink-500 font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button - Only visible on small devices */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search listings, sellers..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0  z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu - Slide from right */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="p-6">
          {/* Logo in sidebar */}
          <div className="flex items-center mb-8">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-2 w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold text-base">DTF</span>
            </div>
            <span className="ml-2 text-sm font-semibold text-gray-600">DESTASH</span>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            <a href="#" className="block text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-3 font-medium">
              Feed
            </a>
            <a href="#" className="block text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-3">
              Sellers
            </a>
            <a href="#" className="block text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-3">
              Live
            </a>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <button className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm mb-4">
            Become A Seller
          </button>

          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg">
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Notifications</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg">
              <Package className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Orders</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
}