import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const SortDropdown = ({ onSortChange }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(t('SortByDefault'));

  const handleOptionClick = (optionKey) => {
    const option = t(optionKey);
    setSelectedOption(option);
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {selectedOption}
          <FaChevronDown className="ml-2" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
          <div className="py-1">
            <a
              onClick={() => handleOptionClick('SortByDefault')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              {t('SortByDefault')}
            </a>
            <a
              onClick={() => handleOptionClick('SortByPopularity')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              {t('SortByPopularity')}
            </a>
            <a
              onClick={() => handleOptionClick('SortByLatest')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              {t('SortByLatest')}
            </a>
            <a
              onClick={() => handleOptionClick('SortByPriceAsc')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              {t('SortByPriceAsc')}
            </a>
            <a
              onClick={() => handleOptionClick('SortByPriceDesc')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              {t('SortByPriceDesc')}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
