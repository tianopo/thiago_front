import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { useState } from "react";
import "../../Management.css";

export const SelectUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="flex cursor-pointer gap-1"
        onClick={toggleDropdown}
        onBlur={() =>
          setTimeout(() => {
            setIsOpen(false);
          }, 100)
        }
      >
        <h6 className="text-write-primary">Cliente</h6>
        {isOpen ? (
          <CaretUp className="text-write-secundary" width={19.45} height={20} />
        ) : (
          <CaretDown className="text-write-secundary" width={19.45} height={20} />
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-28 rounded-lg border border-gray-300 bg-white shadow-md">
          <ul>
            <li className="option-select-user">Funcionário</li>
            <li className="option-select-user">Cliente</li>
            <li className="option-select-user">Admin</li>
          </ul>
        </div>
      )}
    </div>
  );
};