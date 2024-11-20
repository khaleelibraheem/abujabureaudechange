const MenuIcon = ({ isOpen }) => (
  <div className="relative w-6 h-4 rotate-0 transition-all duration-500 ease-in-out">
    <span
      className={`block absolute h-[2px] w-full opacity-100 left-0 transition-transform duration-500 ease-in-out bg-gray-700 dark:bg-gray-300 rounded-full ${
        isOpen ? "top-2 rotate-[135deg]" : "top-0"
      }`}
    />
    <span
      className={`block absolute h-[2px] w-3/4 opacity-100 right-0 transition-all duration-500 ease-in-out bg-gray-700 dark:bg-gray-300 rounded-full ${
        isOpen ? "w-full top-2 rotate-[-135deg]" : "top-[7px]"
      }`}
    />
    <span
      className={`block absolute h-[2px] w-1/2 opacity-100 right-0 transition-all duration-500 ease-in-out bg-gray-700 dark:bg-gray-300 rounded-full ${
        isOpen ? "w-full top-2 rotate-[-135deg] opacity-0" : "top-[14px]"
      }`}
    />
  </div>
);

export default MenuIcon;
