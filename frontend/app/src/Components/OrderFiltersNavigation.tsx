import { SelectionElement } from "./ui/SelectionElement";

export default function OrderFiltersNavigation() {
  return (
    <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400 py-4 max-w-5xl mx-auto">
      <a href="#" className="hover:text-gray-600 hover:underline">
        Order by: [ Random ]
      </a>
      <a href="#" className="hover:text-gray-600 hover:underline">
        Themes
      </a>
      <SelectionElement />
    </div>
  );
}
