import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromCart } from "../../redux/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getShippingCost } from "../../utils";
import { incrementItem } from "../../redux/cartSlice";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const subtotal = useSelector((state: RootState) => state.cart.subtotal);
  const countShipping = getShippingCost("Standard shipping", subtotal);

  const summary = [
    {
      title: "Subtotal",
      value: subtotal,
    },
    {
      title: "Delivery",
      value: countShipping,
    },
    {
      title: "Total",
      value: subtotal + countShipping,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-10 p-12 bg-white dark:bg-gray-600 w-full h-full">
      <h2 className="font-semibold text-3xl text-gray-700 dark:text-white">
        Your Cart
      </h2>
      {cart.length === 0 ? (
        <div className="flex flex-col h-50 justify-start items-center gap-6">
          <p className="text-gray-500 dark:text-gray-100">
            There’s nothing in your cart yet...
          </p>
          <Link
            to="/outfit"
            className="bg-gray-700 w-full text-center  text-white cursor-pointer rounded hover:bg-gray-500 dark:hover:bg-gray-800 px-4 py-3"
          >
            Back to shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 w-full gap-8">
          <ul className="flex flex-col w-full gap-4 max-w-2xl">
            {cart.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex justify-between items-start w-full  gap-4 py-4 border-b border-b-gray-300 dark:border-b-gray-500 last-of-type:border-none"
                >
                  <div className="flex items-center justify-center w-30 h-30 bg-white rounded-md ">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-30 h-30 object-contain p-2"
                    />
                  </div>

                  <div className="flex-1">
                    <h5 className="text-gray-800 font-semibold dark:text-gray-100">
                      {item.title}
                    </h5>
                    <p className="text-gray-800 text-md dark:text-gray-100">
                      Size: <span className="font-semibold">{item.size}</span>
                    </p>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-white">
                      <p data-testid="product-price" className="text-md ">
                        ${item.price}
                      </p>
                      <p>x</p>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-0.5 text-gray-500 dark:text-white text-md cursor-pointer bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-500 rounded-md hover:bg-gray-400 dark:hover:bg-gray-800 hover:text-white"
                          onClick={() =>
                            dispatch(
                              removeFromCart({ id: item.id, size: item.size })
                            )
                          }
                        >
                          -
                        </button>
                        <span data-testid="item-quantity">{item.quantity}</span>
                        <button
                          className="px-2 py-0.5 text-gray-500 dark:text-white text-md cursor-pointer bg-gray-100 dark:bg-gray-700 border dark:hover:bg-gray-800 border-gray-200 dark:border-gray-500 rounded-md hover:bg-gray-400 hover:text-white"
                          onClick={() =>
                            dispatch(
                              incrementItem({ id: item.id, size: item.size })
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    aria-label="Remove item"
                    onClick={() =>
                      dispatch(removeFromCart({ id: item.id, size: item.size }))
                    }
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-gray-500 text-md cursor-pointer dark:text-white bg-gray-100 py-1 px-2 border border-gray-200 rounded-md hover:bg-gray-400 hover:text-white dark:border-gray-500 dark:hover:bg-gray-800 dark:bg-gray-700"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-7 bg-gray-50 dark:bg-gray-800 p-12 w-full place-self-start rounded-lg shadow-md">
            <h3 className="text-xl text-gray-800 dark:text-gray-200 font-semibold">
              Summary
            </h3>
            <div>
              {summary.map((el) => {
                const value = el.value;
                return (
                  <div
                    key={el.title}
                    className="flex justify-between text-gray-800 dark:text-white last-of-type:font-semibold last-of-type:border-t last-of-type:mt-7 last-of-type:py-4 last-of-type:border-t-gray-400"
                  >
                    <p>{el.title}:</p>
                    <span>${value.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            {countShipping === 0 ? (
              <div className="flex gap-1 text-center text-sm px-2 py-1 items-center text-emerald-500 rounded-md font-semibold place-self-start  bg-emerald-100 -mt-5">
                <FontAwesomeIcon icon={faTruck} />
                <p>You are eligible for a free Standard shipping!</p>
              </div>
            ) : null}

            <div className="flex gap-6">
              <Link
                to="/outfit"
                className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200 border border-gray-800 dark:border-gray-500 cursor-pointer rounded hover:bg-gray-700 hover:text-white px-4 py-2 transition duration-300"
              >
                Back to shopping
              </Link>
              <Link
                to={
                  isAuthenticated
                    ? "/outfit/checkout"
                    : "/outfit/login?redirect=/outfit/checkout"
                }
                className="bg-gray-700 font-semibold dark:bg-gray-200 dark:text-gray-800 text-white cursor-pointer rounded hover:bg-gray-600 dark:hover:bg-gray-700 dark:hover:text-white px-4 py-2 border border-gray-800 dark:border-gray-400  transition duration-300 "
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
