import { useState } from "react";
import {
  Search,
  Bell,
  Package,
  User,
  ShoppingBag,
  Bookmark,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import logo from "../../assets/feedImg/logo.png";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import AddressBookModal from "./AddressBookModal";
import SettingsModal from "./SettingsModal";

export default function UserNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSellerMode, setIsSellerMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddressBookOpen, setIsAddressBookOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const buyerLinks = [
    { name: "Feed", path: "/feed" },
    { name: "Sellers", path: "/seller" },
    { name: "Live", path: "/live" },
  ];

  const sellerLinks = [
    { name: "Products", path: "/seller/products" },
    { name: "Orders", path: "/seller/orders" },
    { name: "Promotions", path: "/seller/promotions" },
    { name: "Live", path: "/live" },
  ];

  const currentLinks = isSellerMode ? sellerLinks : buyerLinks;

  const dropdownLinks = isSellerMode
    ? [
        { icon: User, label: "Profile", path: "/seller/profile" },
        { icon: ShoppingBag, label: "My Orders", path: "/seller/orders" },
        { icon: Bookmark, label: "Saved Items", path: "/seller/saved-items" },
        {
          icon: MapPin,
          label: "Address Book",
          action: () => setIsAddressBookOpen(true),
        },
        {
          icon: CreditCard,
          label: "Payment Method",
          path: "/seller/payment-method",
        },
        {
          icon: Settings,
          label: "Settings",
          action: () => setIsSettingsOpen(true),
        },
      ]
    : [
        { icon: User, label: "Profile", path: "/buyer/profile" },
        { icon: ShoppingBag, label: "My Orders", path: "/buyer/orders" },
        { icon: Bookmark, label: "Saved Items", path: "/buyer/saved-items" },
        {
          icon: MapPin,
          label: "Address Book",
          action: () => setIsAddressBookOpen(true),
        },
        {
          icon: CreditCard,
          label: "Payment Method",
          path: "/buyer/payment-method",
        },
        {
          icon: Settings,
          label: "Settings",
          action: () => setIsSettingsOpen(true),
        },
      ];

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 py-3">
          <div className="flex items-center justify-evenly">
            {/* LEFT SIDE */}
            <div className="flex items-center space-x-4 md:space-x-8">
              <Link to="/">
                <div className="flex items-center">
                  <img src={logo} width={80} alt="Logo" />
                </div>
              </Link>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center space-x-6">
                {currentLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-gray-900 hover:text-orange-700 font-bold"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* MIDDLE: SEARCH */}
            <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search listings, sellers..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {!isSellerMode && (
                <button className="hidden md:block px-3 lg:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm">
                  Become A Seller
                </button>
              )}

              <button className="hidden md:block relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>

              <button className="hidden md:block relative p-2 hover:bg-gray-100 rounded-lg">
                <Package className="w-5 h-5 text-gray-700" />
              </button>

              {/* USER DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-pink-500 transition-colors"
                >
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border-2 border-pink-500 z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                        <span className="text-pink-500 font-semibold">
                          Seller Mode
                        </span>
                        <button
                          onClick={() => setIsSellerMode(!isSellerMode)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            isSellerMode ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              isSellerMode ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="space-y-1">
                        {dropdownLinks.map(({ icon: Icon, label, path, action }) => (
                          <button
                            key={label}
                            onClick={() => {
                              setIsDropdownOpen(false);
                              if (action) action();
                              else if (path) navigate(path);
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left"
                          >
                            <Icon className="w-5 h-5 text-gray-700" />
                            <span className="text-gray-800">{label}</span>
                          </button>
                        ))}

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left mt-2 pt-3 border-t border-gray-200"
                        >
                          <LogOut className="w-5 h-5 text-pink-500" />
                          <span className="text-pink-500 font-medium">
                            Logout
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* MOBILE MENU BUTTON */}
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
        </div>
      </nav>

      {/* MODALS */}
      {isAddressBookOpen && (
        <AddressBookModal onClose={() => setIsAddressBookOpen(false)} />
      )}
      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
    </>
  );
}
