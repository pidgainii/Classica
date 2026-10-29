interface SelectionElementProps {
  title: string;
  availableElements: string[];
  currentElement: string;
  setElement: (element: string) => void;
}

export default function SelectionElement({
  title,
  availableElements,
  currentElement,
  setElement,
}: SelectionElementProps) {
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setElement(event.currentTarget.value);
  };

  return (
    <div className="relative">
      <label>
        <select
          value={currentElement}
          onChange={onChangeSelect}
          className="appearance-none bg-white border border-[#d6ccb8] text-[#5a4a42] py-2 pl-3 pr-8 rounded-sm text-xs focus:outline-none focus:border-[#5a4a42] cursor-pointer uppercase tracking-wider"
        >
          <option value="" disabled>
            {title.toUpperCase()}
          </option>
          {availableElements.map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-[#5a4a42]">
          ▼
        </span>
      </label>
    </div>
  );
}
