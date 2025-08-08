import Link from "next/link";

const ButtonPrimary = ({ children, type, url, className }) => {
  return (
    <Link
      href={url ? url : "#"}
      className={`text-size-15 font-bold text-white-color capitalize py-17px px-35px ${
        type === 2 ? "" : "ml-10px"
      } rounded-full leading-1 ${className} transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary-color/50 `}
      style={{
        backgroundImage: 'linear-gradient(135deg, var(--tw-gradient-stops, #2563EB 0%, #1E40AF 100%))',
        backgroundSize: '200% 100%',
        backgroundPosition: '0% 50%',
        transition: 'background-position 400ms ease, transform 300ms ease, box-shadow 300ms ease',
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

export default ButtonPrimary;
