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
      toast.success(`${name} removed from cart`);  // Toast message for removal
    } else {
      addToCart(product);
      toast.success(`${name} added to cart`);  // Toast message for adding to cart
    }
  };

  return (
    <div className="w-350px box-shadow-lg border-radius-md m-4 p-4 flex flex-col justify-center items-center">
      <img src={image} alt={name} className="w-full h-60 object-contain" />
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="mt-2 text-green-600 font-bold">₹{price}</p>
      <button
        onClick={handleAddToCart}
        className={`w-full rounded-md py-1 px-3 mt-4 ${isInCart ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
      >
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
