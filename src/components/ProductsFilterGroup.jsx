import React from 'react';
import PropTypes from 'prop-types';

function ProductsFilterGroup({ value, category, options, name, setSearchParams }) {
  const handleCheckboxChange = (option) => {
    setSearchParams((prevState) => {
      const currentValues = new URLSearchParams(prevState);
      const selectedValues = currentValues.getAll(category);

      if (selectedValues.includes(option)) {
        const newValues = selectedValues.filter((item) => item !== option);
        currentValues.delete(category);
        newValues.forEach((item) => currentValues.append(category, item));
      } else {
        currentValues.append(category, option);
      }
      return currentValues;
    });
  };
  return (
    <>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">{name}</h3>
        <ul className="space-y-1 text-gray-700 text-sm">
          {options.map((option, index) => {
            return (
              <li className="flex items-center gap-4" key={index}>
                <input
                  type="checkbox"
                  id="mat-wood"
                  className="h-4 w-4"
                  checked={value.getAll(category).includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                <label htmlFor="mat-wood">{option}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ProductsFilterGroup;

ProductsFilterGroup.propTypes = {
  value: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  setSearchParams: PropTypes.func.isRequired,
};
