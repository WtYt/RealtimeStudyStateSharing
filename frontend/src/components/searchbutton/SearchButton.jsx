import React from 'react';
import { IoSearchCircleSharp } from 'react-icons/io5';
import { useSearchPopup } from '../../pages/searchPopup';
import './SearchButton.css';

export default function SearchButton() {
  const { open } = useSearchPopup();

  return (
    <div className="search-btn" onClick={open} aria-label="検索を開く">
      <IoSearchCircleSharp size={80} />
    </div>
  );
}
