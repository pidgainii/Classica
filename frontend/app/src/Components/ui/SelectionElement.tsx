interface SelectionElementProps {
  title: string;
  availableElements: string[];
  currentElement: string;
  setElement: (element: string) => void;
}

export default function SelectionElement({
  title,
  availableElements,
  setElement,
}: SelectionElementProps) {
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setElement(event.currentTarget.value);
  };

  return (
    <div>
      <label>
        <select onChange={onChangeSelect}>
          {availableElements.map((element) => (
            <option value={element}>{element}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
