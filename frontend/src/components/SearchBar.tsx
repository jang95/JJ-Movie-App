import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
      setQuery('');
    }
  };

  return (
    <form className='flex items-center' onSubmit={handleSubmit}>
      <input
        className='w-full h-10 px-8 rounded-3xl focus:outline-none bg-yellow-100 border-2 focus:border-blue-400'
        type='text'
        placeholder='영화 검색...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
