import type { BookQueryFilters } from "../../Models/queryFilters";
import { SORT_BY_OPTIONS } from "../../Utils/Constants";

interface CategoryNavigationProps {
  triggerNewQuery: (filters: BookQueryFilters) => void;
}

export default function CategoryNavigation(props: CategoryNavigationProps) {
  const onClickBiographies = () => {
    props.triggerNewQuery({
      searchQuery: "",
      sortBy: SORT_BY_OPTIONS[1],
      genres: ["Biography"],
      languages: [],
    });
  };
  const onClickChildren = () => {
    props.triggerNewQuery({
      searchQuery: "",
      sortBy: SORT_BY_OPTIONS[1],
      genres: ["Childrens"],
      languages: [],
    });
  };
  const onClickChristian = () => {
    props.triggerNewQuery({
      searchQuery: "",
      sortBy: SORT_BY_OPTIONS[1],
      genres: ["Christian"],
      languages: [],
    });
  };
  const onClickPoetry = () => {
    props.triggerNewQuery({
      searchQuery: "",
      sortBy: SORT_BY_OPTIONS[1],
      genres: ["Poetry"],
      languages: [],
    });
  };

  return (
    <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400 py-4 max-w-5xl mx-auto">
      <div
        onClick={onClickBiographies}
        className="hover:text-gray-600 hover:underline"
      >
        <button>Biographies & Memoirs</button>
      </div>
      <div
        onClick={onClickChildren}
        className="hover:text-gray-600 hover:underline"
      >
        <button>Children's Books</button>
      </div>
      <div
        onClick={onClickChristian}
        className="hover:text-gray-600 hover:underline"
      >
        <button>Christian Books</button>
      </div>
      <div
        onClick={onClickPoetry}
        className="hover:text-gray-600 hover:underline"
      >
        <button>Poetry</button>
      </div>
    </div>
  );
}
