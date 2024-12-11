import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const ProductCard = ({ product }) => {
  const { addToCart, cartList, removeFromCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  const { id, name, price, image, description } = product;

  useEffect(() => {
    const productInCart = cartList.find((product) => product.id === id);
    if (productInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [cartList, id]);

  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(product);
      toast.success(`${name} removed from cart`); 
    } else {
      addToCart(product);
      toast.success(`${name} added to cart`); 
    }
  };

  return (
    <div className="w-full sm:w-80 lg:w-64 box-shadow-lg border border-gray-200 rounded-md m-4 p-4 flex flex-col justify-between items-center bg-white">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-48 sm:h-60 object-contain"
      />

      {/* Product Details */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <p className="mt-4 text-green-600 font-bold">₹{price}</p>
      </div>

      {/* Action Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full rounded-md py-2 px-4 mt-4 text-white ${
          isInCart
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
