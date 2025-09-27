import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/store/slices/cartSlice";

const CartModel = ({ setIsOpen }) => {
  const cart = useSelector((state) => state.cart);
  const totalPrice = cart.cart.reduce(
    (total, book) => total + book.price * book.quantity,
    0
  );
  const actions = useDispatch();

  const handleClear = () => {
    actions(clearCart());
  };

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center z-30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white py-8 px-10 rounded-lg flex flex-col items-center justify-center gap-8 shadow-md"
      >
        <h1 className="text-2xl text-gray-900 font-bold">Cart</h1>
        <div className="h-64 overflow-y-auto p-4 flex flex-col gap-6">
          {cart.cart.length > 0 ? (
            cart.cart.map((book) => (
              <div key={book._id} className="flex items-center w-full gap-4">
                <img
                  src={book.bookCoverImage}
                  alt={book.title}
                  className="w-20 h-24"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{book.title}</p>
                  <p className="font-bold text-green-600">${book.price}</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => actions(decrementQuantity(book._id))}
                      className="text-blue-800 hover:text-blue-600 transition duration-200"
                    >
                      <FaMinus />
                    </button>
                    <p className="text-gray-600">{book.quantity}</p>
                    <button
                      onClick={() => actions(incrementQuantity(book._id))}
                      className="text-blue-800 hover:text-blue-600 transition duration-200"
                    >
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => actions(removeFromCart(book._id))}
                      className="text-red-800 hover:text-red-600 transition duration-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-red-700 text-xl font-bold">Cart is empty</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="font-bold">Total Price</p>
          <p className="font-bold text-green-800">${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
            onClick={() => setIsOpen(false)}
          >
            Continue shopping
          </button>
          <button
            onClick={handleClear}
            className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Clear cart
          </button>
          <button className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModel;
