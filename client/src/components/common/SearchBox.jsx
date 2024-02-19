import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const { searchQuery: keyword } = useParams();
  const [searchQuery, setSearchQuery] = useState(keyword || '');
  const submitHandler = (e) =>{
    e.preventDefault()
    if (searchQuery.trim()){
      setSearchQuery('')
      navigate(`/search/${searchQuery}`)
    }else{
      navigate('/')
    }
  }
  return (
    <form onSubmit={submitHandler} className="flex items-center">
      <input
        type="text"
        name="q"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder="Search Stories..."
        className="p-3 bg-neutral-800 outline-none text-neutral-50 rounded-l-full"
      />
      <button
        type="submit"
        className="p-3 rounded-r-full bg-orange-600 hover:bg-orange-500 flex justify-center items-center"
      >
        <span className="material-symbols-rounded">search</span>
      </button>
    </form>
  );
}
