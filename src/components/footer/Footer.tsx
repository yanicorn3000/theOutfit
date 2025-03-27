import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full p-8">
      <div className="flex justify-between">
        <Link to="/outfit" className="text-2xl font-bold text-gray-800 mb-2">
          THE OUTFIT
        </Link>
        <div>social</div>
      </div>
    </footer>
  );
};

export default Footer;
