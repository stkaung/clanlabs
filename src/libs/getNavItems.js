import navItems from "../../public/data/nav-items.json";

const getNavItems = () => {
  return navItems ? navItems : [];
};

export default getNavItems;
