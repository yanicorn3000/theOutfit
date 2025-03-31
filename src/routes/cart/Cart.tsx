import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromCart } from "../../redux/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

//dodac przycis do wyczyszczenia koszyka

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const subtotal = cart.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  const delivery = 5;
  const total = subtotal + delivery;

  const summary = [
    {
      title: "Subtotal",
      value: subtotal,
    },
    {
      title: "Delivery",
      value: delivery,
    },
    {
      title: "Total",
      value: total,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-15">
      <h2 className="font-semibold text-3xl text-gray-700">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-gray-500">There’s nothing in your cart yet...</p>
          <Link
            to="/outfit"
            className="bg-gray-700 text-white cursor-pointer rounded hover:bg-gray-500 px-4 py-2"
          >
            Back to shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 mt-6 w-full gap-8">
          <ul className="flex flex-col w-full gap-4 max-w-2xl">
            {cart.map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex justify-between items-start w-full  gap-4 py-4 border-b border-b-gray-300 last-of-type:border-none"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex-1">
                    <h5 className="text-gray-800 font-semibold">
                      {item.title}
                    </h5>
                    <p className="text-gray-800 text-md">
                      Size: <span className="font-semibold">{item.size}</span>
                    </p>
                    <p className="text-md text-gray-600">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      dispatch(removeFromCart({ id: item.id, size: item.size }))
                    }
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-gray-500 text-md cursor-pointer bg-gray-100 py-1 px-2 border border-gray-200 rounded-md hover:bg-gray-400 hover:text-white"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-7 bg-gray-50 p-12 w-full place-self-start rounded-lg">
            <h3 className="text-xl font-semibold"> Summary</h3>
            <div>
              {summary.map((el) => {
                const value = el.value;
                return (
                  <div
                    key={el.title}
                    className="flex justify-between text-gray-800 last-of-type:font-semibold last-of-type:border-t last-of-type:mt-7 last-of-type:py-4 last-of-type:border-t-gray-400"
                  >
                    <p>{el.title}:</p>
                    <span>${value.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-6">
              <Link
                to="/outfit"
                className="bg-gray-50 text-gray-700 border border-gary-700 cursor-pointer rounded hover:bg-gray-700 hover:text-white px-4 py-2 transition duration-300"
              >
                Back to shopping
              </Link>
              <Link
                to={
                  isAuthenticated
                    ? "/outfit/checkout"
                    : "/outfit/login?redirect=/outfit/checkout"
                }
                className="bg-gray-700 text-white cursor-pointer rounded hover:bg-gray-500 px-4 py-2 border-none transition duration-300 "
              >
                Go to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
