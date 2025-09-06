import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSearchPopup } from '../../pages/searchPopup';
import './SearchButton.css';

export default function SearchButton() {
  const { open } = useSearchPopup();

  return (
    <div className="search-btn" onClick={open} aria-label="検索を開く">
      <AiOutlineSearch size={80} />
    </div>
  );
}
