import { useState, useRef, useEffect } from "react";

interface MultipleSelectionElementProps {
  title: string;
  availableElements: string[];
  currentElements: string[];
  setElements: (elements: string[]) => void;
}

export default function MultipleSelectionElement({
  title,
  availableElements,
  currentElements,
  setElements,
}: MultipleSelectionElementProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (element: string) => {
    if (currentElements.includes(element)) {
      setElements(currentElements.filter((e) => e !== element));
    } else {
      setElements([...currentElements, element]);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-[#d6ccb8] text-[#5a4a42] py-2 px-3 pr-8 rounded-sm text-xs focus:outline-none focus:border-[#5a4a42] cursor-pointer uppercase tracking-wider flex items-center justify-between min-w-[140px]"
      >
        <span>
          {title.toUpperCase()}{" "}
          {currentElements.length > 0 ? `(${currentElements.length})` : ""}
        </span>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#5a4a42]">
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-56 bg-white border border-[#d6ccb8] shadow-lg rounded-sm z-50 max-h-60 overflow-y-auto p-2">
          {availableElements.map((element) => {
            const isSelected = currentElements.includes(element);
            return (
              <div
                key={element}
                onClick={() => toggleOption(element)}
                className={`flex items-center px-2 py-1.5 text-xs uppercase cursor-pointer rounded transition-colors ${
                  isSelected
                    ? "bg-[#f0ece1] font-semibold text-black"
                    : "hover:bg-[#f7f4ec] text-[#5a4a42]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}} // Handled by parent div click
                  className="mr-2 accent-[#5a4a42] cursor-pointer"
                />
                <span className="truncate">{element}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
