import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useUserData } from "../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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
    <div className="w-full mx-auto  bg-gray-50 flex flex-col items-center p-12 gap-6">
      <h2 className="text-2xl font-semibold mb-4">Hi, {user.username}</h2>
      <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
        <div className="w-full bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-lg">User Data</h3>
          <div className="text-gray-700">
            <p>
              {firstname} {lastname}
            </p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        </div>
        <div className="w-full bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Delivery Address</h3>
          <div className="text-gray-700">
            <p>
              {street} {number}
            </p>
            <p>
              {zipcode} {city}
            </p>
          </div>
        </div>
        <div className="w-full bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 col-span-2">
          <h3 className="font-semibold text-lg">Orders</h3>

          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul>
              {orders.map((order, index) => (
                <li key={index} className="border-b py-4">
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p>Date: {order.date}</p>
                  <p>Subtotal: ${order.total}</p>
                  <h4 className="mt-2 font-medium">Items:</h4>
                  <ul className=" pl-5">
                    {order.cartItems.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {item.quantity} x {item.title} {item.size} ($
                        {item.price})
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="w-full max-w-sm p-3 bg-gray-700 text-white rounded-md cursor-pointer hover:bg-gray-500"
      >
        Log Out
      </button>
    </div>
  );
};

export default Profile;
