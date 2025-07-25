import Link from "next/link";

const ButtonPrimary = ({ children, type, url, className }) => {
  return (
    <Link
      href={url ? url : "#"}
      className={`text-size-15 font-bold text-white-color capitalize py-17px px-35px ${
        type === 2 ? "" : "ml-10px"
      } bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full leading-1 ${className} transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary-color/50 `}
    >
      {children ? children : ""}
    </Link>
  );
};

export default ButtonPrimary;
