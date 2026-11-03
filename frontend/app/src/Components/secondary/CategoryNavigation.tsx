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
    <div className="w-full bg-[#f7f4ec] pb-6 pt-2 px-8">
      <div className="max-w-5xl mx-auto flex justify-center flex-wrap gap-x-10 gap-y-2 text-xs font-serif tracking-widest text-[#5a4a42]">
        <button
          onClick={onClickBiographies}
          className="hover:text-black hover:underline uppercase transition-colors"
        >
          Biographies & Memoirs
        </button>
        <button
          onClick={onClickChildren}
          className="hover:text-black hover:underline uppercase transition-colors"
        >
          Children's Books
        </button>
        <button
          onClick={onClickChristian}
          className="hover:text-black hover:underline uppercase transition-colors"
        >
          Christian Books
        </button>
        <button
          onClick={onClickPoetry}
          className="hover:text-black hover:underline uppercase transition-colors"
        >
          Poetry
        </button>
      </div>
    </div>
  );
}
