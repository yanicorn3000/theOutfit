import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faXTwitter,
  faTiktok,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import {
  faPhone,
  faEnvelope,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const companyLinks = [
  { name: "About us", href: "outfit/about-us" },
  { name: "Terms of Service", href: "outfit/terms" },
  { name: "Privacy Policy", href: "outfit/privacy-policy" },
];

const customerLinks = [
  { name: "Delivery", href: "outfit/delivery" },
  { name: "Payment Methods", href: "outfit/payment" },
  { name: "Returns & Exchanges", href: "outfit/returns" },
  { name: "FAQ", href: "outfit/faq" },
];

const contactLinks = [
  { icon: faEnvelope, name: "info@outfit.com", href: "mailto:info@outfit.com" },
  { icon: faPhone, name: "123-456-789", href: "tel:123-456-789" },
];

const socialLinks = [
  { icon: faFacebookF, href: "#" },
  { icon: faXTwitter, href: "#" },
  { icon: faTiktok, href: "#" },
  { icon: faInstagram, href: "#" },
];
const Footer = () => {
  return (
    <footer className="w-full p-10 border-t border-t-gray-200 dark:border-t-gray-700 h-full dark:dark:bg-gray-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <Link
            to="/outfit"
            className="text-2xl font-bold text-gray-800 mb-2 dark:text-white"
          >
            THE OUTFIT
          </Link>
          <ul className="flex gap-4 mt-8">
            {socialLinks.map((link) => {
              return (
                <li key={link.icon.iconName}>
                  <Link
                    to={link.href}
                    className="bg-gray-700 dark:bg-gray-500 h-10 w-10 rounded-3xl flex items-center justify-center  text-white hover:bg-gray-600 hover:dark:bg-gray-400 transition duration-300"
                  >
                    <FontAwesomeIcon
                      icon={link.icon}
                      className="text-xl transition duration-300"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Company
          </h3>
          <ul className="flex flex-col gap-3">
            {companyLinks.map((link) => {
              return (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-md text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-white transition duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200  mb-4">
            Customer
          </h3>
          <ul className="flex flex-col gap-2">
            {customerLinks.map((link) => {
              return (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-md text-gray-500  dark:text-gray-200 hover:text-gray-700 dark:hover:text-white transition duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold dark:text-gray-200  text-gray-700 mb-4">
            Contact Us
          </h3>
          <ul className="flex flex-col gap-3 text-gray-500 transition duration-300">
            {contactLinks.map((link) => {
              return (
                <li key={link.name} className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="text-xl text-gray-400"
                  />
                  <Link
                    to={link.href}
                    className="text-md  dark:text-gray-200 dark:hover:text-white hover:text-gray-700 transition duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
            <li className="flex items-center gap-2 dark:text-gray-200">
              <FontAwesomeIcon
                icon={faHouse}
                className="text-xl text-gray-400"
              />
              123 Outfit St, Fashion City
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full h-full mt-12 text-center text-sm text-gray-400  dark:text-gray-100 flex justify-center items-center">
        <p>&copy; 2025 YANICORN</p>
      </div>
    </footer>
  );
};

export default Footer;
