import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <form
      className='flex items-center w-80 p-2 rounded-3xl border-2 border-black focus:border-blue-200'
      onSubmit={handleSubmit}
    >
      <IoSearch size={25} />
      <input
        className='w-full px-2 focus:outline-none bg-yellow-100'
        type='text'
        placeholder='영화 검색...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
