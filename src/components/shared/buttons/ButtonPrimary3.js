import Link from "next/link";

const ButtonPrimary3 = ({ children, type, url, className }) => {
  return (
    <Link
      href={url ? url : "#"}
      className={`text-size-15 font-bold text-white-color capitalize py-17px px-35px ${
        type === 2 ? "" : "ml-10px"
      } bg-200 bg-gradient-secondary hover:bg-[-100%] rounded-full leading-1 ${className} transition-all duration-300 relative after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:bg-white-color after:opacity-0 after:scale-[1.2] after:hover:opacity-20 after:hover:scale-100 after:transition-all after:duration-300 after:z-[-1] shadow-md hover:shadow-lg hover:shadow-primary-color/50`}
    >
      {children ? children : ""}
    </Link>
  );
};

export default ButtonPrimary3;
