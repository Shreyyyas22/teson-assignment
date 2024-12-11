import { useCart } from "../context/CartContext";
import { useState } from "react";
import { toast } from "react-toastify";  // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css";  // Import styles for React Toastify

export const CartCard = ({ product }) => {
  const { removeFromCart, changeQuantity } = useCart();
  const { name, price, image, quantity, id } = product;

  const [showLimitWarning, setShowLimitWarning] = useState(false);

  // Handle the increase and decrease actions
  const handleIncrease = () => {
    if (quantity < 10) {
      changeQuantity(id, "increase");
    } else {
      toast.warning("Maximum quantity reached");
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      changeQuantity(id, "decrease");
    } else {
      toast.warning("Minimum quantity reached");
    }
  };

  const handleRemove = () => {
    // Show confirmation toast
    const toastId = toast.info(
      <div>
        <p>Are you sure you want to remove this product from the cart?</p>
        <div className="flex justify-between mt-2">
          <button
            className="bg-red-600 text-white rounded-md py-1 px-3"
            onClick={() => {
              // Remove item from cart
              removeFromCart(product);
              // Show success toast message
              toast.success("Product removed from cart");
              // Dismiss the confirmation toast after successful removal
              toast.dismiss(toastId);
            }}
          >
            Confirm
          </button>
          <button
            className="bg-gray-600 text-white rounded-md py-1 px-3"
            onClick={() => {
              // Dismiss the confirmation toast when Cancel is clicked
              toast.dismiss(toastId);
            }}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false, // Do not auto-close the toast
        closeOnClick: false,
        draggable: false,
        progress: undefined,
      }
    );
  };

  return (
    <div className="cartCard flex justify-between items-center shadow-lg rounded-md m-4 p-4">
      <img src={image} alt={name} className="w-32 h-32 object-contain mr-4" />
      <div className="product-info">
        <h3 className="font-semibold">{name}</h3>
        <p className="font-bold text-green-600">${price}</p>
        <p>Quantity: {quantity}</p>
      </div>
      <div className="quantity-controls flex items-center space-x-2">
        <button
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className={`bg-gray-400 text-white rounded-md py-1 px-3 ${quantity <= 1 ? "cursor-not-allowed" : ""}`}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={handleIncrease}
          disabled={quantity >= 10}
          className={`bg-blue-600 text-white rounded-md py-1 px-3 ${quantity >= 10 ? "cursor-not-allowed" : ""}`}
        >
          +
        </button>
      </div>

      <button
        onClick={handleRemove}
        className="bg-red-600 text-white rounded-md py-1 px-3 ml-4"
      >
        Remove
      </button>
    </div>
  );
};
