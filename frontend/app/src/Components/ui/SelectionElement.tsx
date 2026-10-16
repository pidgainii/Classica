interface SelectionElementProps {
  title: string;
  availableElements: string[];
  setElements: (elements: string[]) => void;
}

export default function SelectionElement({
  title,
  availableElements,
  setElements,
}: SelectionElementProps) {
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = event.currentTarget.selectedOptions;
    const newElements = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      newElements.push(selectedOptions[i].value);
    }
    setElements(newElements);
  };

  return (
    <div>
      <label>
        <select multiple={true} onChange={onChangeSelect}>
          {availableElements.map((element) => (
            <option value={element}>{element}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
