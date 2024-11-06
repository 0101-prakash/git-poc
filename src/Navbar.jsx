import { useState, useRef } from "react";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openGridDropdown, setOpenGridDropdown] = useState(false);

  const dropdownTimeout = useRef(null);
  const gridDropdownTimeout = useRef(null);

  const handleDropdownMouseEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(false);
    }, 200); // delay in ms before closing the menu
  };

  const handleGridDropdownMouseEnter = () => {
    clearTimeout(gridDropdownTimeout.current);
    setOpenGridDropdown(true);
  };

  const handleGridDropdownMouseLeave = () => {
    gridDropdownTimeout.current = setTimeout(() => {
      setOpenGridDropdown(false);
    }, 200); // delay in ms before closing the grid menu
  };

  return (
    <nav className="flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
      <a
        className="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        href="#"
      >
        Blog
      </a>
      <a
        className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        href="#"
      >
        Portfolio
      </a>
      <a
        className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        href="#"
      >
        About
      </a>
      <a
        className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        href="#"
      >
        Contact
      </a>

      {/* Dropdown List */}
      <div
        className="relative"
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      >
        <button className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark:bg-transparent dark:focus:text-white dark:hover:text-white dark:focus:bg-gray-600 dark:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
          <span>Dropdown List</span>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform ${
              openDropdown ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {openDropdown && (
          <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48 z-30">
            <div className="px-2 py-2 bg-white rounded-md shadow dark:bg-gray-700">
              <a
                className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="#"
              >
                Link #1
              </a>
              <a
                className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="#"
              >
                Link #2
              </a>
              <a
                className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="#"
              >
                Link #3
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Grid Dropdown */}
      <div
        className="relative"
        onMouseEnter={handleGridDropdownMouseEnter}
        onMouseLeave={handleGridDropdownMouseLeave}
      >
        <button className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark:bg-transparent dark:focus:text-white dark:hover:text-white dark:focus:bg-gray-600 dark:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
          <span>Grid Dropdown</span>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform ${
              openGridDropdown ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {openGridDropdown && (
          <div className="absolute right-0 w-full md:max-w-screen-sm md:w-screen mt-2 origin-top-right z-30">
            <div className="px-2 pt-2 pb-4 bg-white rounded-md shadow-lg dark:bg-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  className="flex items-start rounded-lg bg-transparent p-2 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  href="#"
                >
                  <div className="bg-teal-500 text-white rounded-lg p-3">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="md:h-6 md:w-6 h-4 w-4"
                    >
                      <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Item #1</p>
                    <p className="text-sm dark:text-gray-200">
                      Description for item #1
                    </p>
                  </div>
                </a>
                {/* More items... */}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
