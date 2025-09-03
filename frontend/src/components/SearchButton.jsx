import { MdOutlineSearch } from 'react-icons/md';

const SearchButton = () => {
  return (
    <div className="search-btn:hover">
      <MdOutlineSearch className="search-btn" size={'40px'} />
    </div>
  );
};

export default SearchButton;
