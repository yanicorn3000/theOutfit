import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useUserData } from "../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { data: user, isLoading, error } = useUserData();
  const orders = useSelector((state: RootState) => state.checkout.orders);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;
  if (!user) return <p>No user data available.</p>;

  const { street, number, zipcode, city } = user.address;
  const { firstname, lastname } = user.name;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    alert("Logged out successfully!");
  };

  return (
    <div
      className="min-h-screen w-full bg-gray-100 bg-gradient-to-r from-gray-100 to-gray-200
 flex flex-col items-center px-4 py-12 gap-8"
    >
      <h2 className="text-3xl font-bold text-gray-800">
        Hi, {user.username} 👋
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            User Data
          </h3>
          <div className="text-gray-700 space-y-1">
            <p>
              {firstname} {lastname}
            </p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Delivery Address
          </h3>
          <div className="text-gray-700 space-y-1">
            <p>
              {street} {number}
            </p>
            <p>
              {zipcode} {city}
            </p>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Your Orders
          </h3>

          {orders.length === 0 ? (
            <p className="text-gray-500 text-center c">
              You haven't placed any orders yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {orders.map((order, index) => (
                <li
                  key={index}
                  className="border border-gray-200 rounded-lg shadow-sm "
                >
                  <div className="flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-t-lg text-gray-700">
                    <h4 className="font-semibold">Order #{order.id}</h4>
                    <span className="text-sm">{order.date}</span>
                  </div>

                  <div className="mt-3 p-4 flex flex-col gap-6">
                    <h5 className="font-medium text-gray-800 mb-1">Items:</h5>
                    <ul className=" text-gray-600 space-y-4">
                      {order.cartItems.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 object-contain inline-block mr-2"
                          />
                          <div className="flex-col flex ">
                            <span>
                              {item.quantity} x {item.title} {item.size} ($
                              {item.price}){" "}
                            </span>

                            <span>Size: {item.size}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-2  text-gray-700">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-gray-800">
                          Delivery:
                        </span>
                        <span>{order.deliveryMethod}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-gray-800">
                          Payment:
                        </span>
                        <span>{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 p-4 border-t border-gray-200">
                    <p className=" text-gray-700">
                      <span className="font-semibold">Subtotal:</span> $
                      {order.total.toFixed(2)}
                    </p>
                    <span className="flex items-center gap-2 text-sm font-medium text-amber-500 bg-amber-100 px-3 py-1 rounded-full">
                      <FontAwesomeIcon
                        icon={faClockRotateLeft}
                        className="text-xs"
                      />
                      {order.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex w-full max-w-2xl gap-5 items-center justify-between mt-6">
        <Link
          to="/outfit"
          className="bg-gray-50 w-full text-center max-w-xs text-gray-700 border border-gary-700 cursor-pointer font-medium  p-3 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300"
        >
          Back to shopping
        </Link>
        <button
          onClick={handleLogout}
          className=" w-full max-w-xs p-3 bg-rose-500 text-white border-rose-500 border-1 cursor-pointer  font-medium rounded-lg hover:bg-rose-700 hover:border-rose-700 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
