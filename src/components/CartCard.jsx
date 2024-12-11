import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartCard = ({ product }) => {
  const { removeFromCart, changeQuantity } = useCart();
  const { name, price, image, quantity, id } = product;

  // Handle increase quantity
  const handleIncrease = () => {
    if (quantity < 10) {
      changeQuantity(id, "increase");
    } else {
      toast.warning("Maximum quantity reached");
    }
  };

  // Handle decrease quantity
  const handleDecrease = () => {
    if (quantity > 1) {
      changeQuantity(id, "decrease");
    } else {
      toast.warning("Minimum quantity reached");
    }
  };

  // Handle remove item
  const handleRemove = () => {
    const toastId = toast.info(
      <div>
        <p>Are you sure you want to remove this product from the cart?</p>
        <div className="flex justify-between mt-2">
          <button
            className="bg-red-600 text-white rounded-md py-1 px-3 hover:bg-red-700"
            onClick={() => {
              removeFromCart(product);
              toast.success("Product removed from cart");
              toast.dismiss(toastId);
            }}
          >
            Confirm
          </button>
          <button
            className="bg-gray-600 text-white rounded-md py-1 px-3 hover:bg-gray-700"
            onClick={() => toast.dismiss(toastId)}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <div className="cartCard flex flex-col sm:flex-row items-center shadow-lg rounded-md m-4 p-4 bg-white">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-md"
      />

      {/* Product Details */}
      <div className="product-info flex-1 text-center sm:text-left mt-4 sm:mt-0 sm:ml-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-green-600 font-bold mt-2">₹{price}</p>
        <p className="text-gray-500 mt-1">Quantity: {quantity}</p>
      </div>

      {/* Quantity Controls */}
      <div className="quantity-controls flex items-center space-x-2 mt-4 sm:mt-0">
        <button
          onClick={handleDecrease}
          disabled={quantity <= 1}
          aria-label="Decrease Quantity"
          className={`py-1 px-3 rounded-md font-semibold ${
            quantity <= 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-400 hover:bg-gray-500 text-white"
          }`}
        >
          -
        </button>
        <span className="font-semibold">{quantity}</span>
        <button
          onClick={handleIncrease}
          disabled={quantity >= 10}
          aria-label="Increase Quantity"
          className={`py-1 px-3 rounded-md font-semibold ${
            quantity >= 10
              ? "bg-blue-300 text-gray-200 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        aria-label="Remove Product"
        className="bg-red-600 hover:bg-red-700 text-white rounded-md py-1 px-3 mt-4 sm:mt-0 sm:ml-4"
      >
        Remove
      </button>
    </div>
  );
};
