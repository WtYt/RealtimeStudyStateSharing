import React, { useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import SearchModal from './SearchModal';
import './SearchButton.css';

export default function SearchButton({ categories = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="search-btn"
        onClick={() => setOpen(true)}
        role="button" 
        tabIndex={0}
        aria-label="検索を開く"
      >
        <MdOutlineSearch size="40px" style={{ cursor: 'pointer'}} />
      </div>

      <SearchModal
        open={open}
        onClose={() => setOpen(false)}
        categories={categories}
      />
    </>
  );
}
