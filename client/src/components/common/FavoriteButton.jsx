import React, { useEffect, useState } from 'react'
import { useFavoriteStoryMutation } from '../../slices/storiesApiSlice';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

export default function FavoriteButton({favorited,storyId}) {
  const [isFavorited,setIsFavorited] = useState(favorited)

  const [favoriteStory, {isLoading}] = useFavoriteStoryMutation(storyId);
 
  const handleFavorites = async () =>{
    try {
      const res = await favoriteStory(storyId).unwrap();
      setIsFavorited(res);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
  return (
    isFavorited ? (
      <button onClick={handleFavorites} className="size-10 rounded-full bg-red-600 hover:bg-neutral-600 transition-colors duration-200 flex justify-center items-center ">
        {isLoading ? <Spinner /> :(<span className="material-symbols-rounded">heart_check</span>)}
      </button>
    ) : (
      <button onClick={handleFavorites} className="size-10 rounded-full bg-neutral-600 hover:bg-red-600 transition-colors duration-200 flex justify-center items-center ">
        {isLoading ? <Spinner /> :(<span className="material-symbols-rounded">favorite</span>)}
      </button>
    )
  )
}
