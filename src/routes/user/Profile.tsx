import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useUserData } from "../../api";

const Profile = () => {
  const dispatch = useDispatch();
  const { data: user, isLoading, error } = useUserData();

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
      <div className="grid grid-cols-2 gap-6">
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-lg">User Data</h3>
          <p>{`${firstname} ${lastname}`}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-lg">Delivery Address</h3>

          <p>{`${street} ${number}`}</p>
          <p>{`${zipcode} ${city}`}</p>
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
