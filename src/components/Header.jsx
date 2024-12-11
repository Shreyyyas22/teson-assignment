import { useCart } from '../context/CartContext';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
    const { cartList } = useCart();
    return (
        <header className="p-4 bg-black text-white flex justify-between items-center">
            <nav className="flex-1 flex justify-center space-x-6">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/cart">Cart</NavLink>
            </nav>
            <Link to="/cart" className="relative">
                <span>🛒</span>
                {cartList.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex justify-center items-center">
                        {cartList.length}
                    </span>
                )}
            </Link>
        </header>
    );
};
