import { useCart } from "../context/CartContext";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  const { cartList } = useCart();

  return (
    <header className="p-4 bg-black text-white flex justify-between items-center">
      {/* Logo or Brand */}
      <Link to="/" className="text-2xl font-bold hover:text-gray-300">
        Tech Store
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 flex justify-center space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-gray-300 ${isActive ? "text-blue-400 font-semibold" : ""}`
          }
          aria-label="Go to Home"
        >
          Home
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `hover:text-gray-300 ${isActive ? "text-blue-400 font-semibold" : ""}`
          }
          aria-label="Go to Cart"
        >
          Cart
        </NavLink>
      </nav>

      {/* Cart Icon with Badge */}
      <Link
        to="/cart"
        className="relative hover:text-gray-300"
        aria-label="View Cart"
      >
        <span className="text-2xl">🛒</span>
        {cartList.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex justify-center items-center">
            {cartList.length}
          </span>
        )}
      </Link>
    </header>
  );
};
