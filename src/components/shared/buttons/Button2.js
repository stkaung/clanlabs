import Link from "next/link";

const Button2 = ({ children, url, className }) => {
  return (
    <Link
      href={url ? url : "#"}
      className={`text-size-15 font-bold text-primary-color dark:text-white-color capitalize py-17px px-35px bg-transparent hover:bg-primary-color hover:text-white-color dark:hover:bg-primary-color border border-primary-color dark:border-white-color dark:hover:border-primary-color rounded-full leading-1 ${className} transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary-color/50 dark:hover:shadow-white/30`}
    >
      {children ? children : ""}
    </Link>
  );
};

export default Button2;
