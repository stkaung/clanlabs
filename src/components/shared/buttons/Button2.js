import Link from "next/link";

const Button2 = ({ children, url, className }) => {
  return (
    <Link
      href={url ? url : "#"}
      className={`text-size-15 font-bold text-primary-color dark:text-white-color capitalize py-17px px-35px border border-primary-color dark:border-white-color rounded-full leading-1 ${className} transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary-color/50 dark:hover:shadow-white/30`}
      style={{
        backgroundImage: 'linear-gradient(135deg, transparent 0%, var(--tw-gradient-stops, rgba(37,99,235,0.15)) 100%)',
        backgroundSize: '200% 100%',
        backgroundPosition: '0% 50%',
        transition: 'background-position 400ms ease, color 200ms ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget).style.backgroundPosition = '100% 50%';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget).style.backgroundPosition = '0% 50%';
      }}
    >
      {children ? children : ""}
    </Link>
  );
};

export default Button2;
