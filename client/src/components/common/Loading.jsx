import React from 'react'

export default function Loading() {
  return (
    <div className='flex justify-between items-center'>
 	<span className='sr-only'>Loading...</span>
	 {[...new Array(3)].map((_, id) => (
  	<div key={id} className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	))}
	<div className='h-2 w-2 bg-white rounded-full animate-bounce'></div>
</div>
  )
}
