import { useCart } from "../context/CartContext";
import { useTitle } from "../hooks/useTitle";
import { CartCard } from "../components/CartCard";

const Cart = () => {
  const { cartList, total, changeQuantity } = useCart();
  useTitle('Cart');

  return (
    <main className="bg-gray-100 min-h-screen py-6 px-4">
      <section className="cart max-w-screen-lg mx-auto bg-white shadow-lg rounded-md p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-200 pb-4">
          Cart Items: <span className="text-blue-600">{cartList.length}</span> / 
          <span className="text-green-600"> ₹{total}</span>
        </h1>
        {cartList.length > 0 ? (
          cartList.map((product) => (
            <CartCard
              key={product.id}
              product={product}
              onIncrease={() => changeQuantity(product.id, product.quantity + 1)}
              onDecrease={() => changeQuantity(product.id, product.quantity - 1)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </section>
    </main>
  );
}

export default Cart;
