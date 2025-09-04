import React from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useSearchPopup } from '../../pages/searchPopup';
import './SearchButton.css';

export default function SearchButton() {
  const { open } = useSearchPopup();

  return (
    <button
      className="search-btn"
      onClick={open}
      aria-label="検索を開く"
    >
      <MdOutlineSearch size="24px" />
    </button>
  );
}
