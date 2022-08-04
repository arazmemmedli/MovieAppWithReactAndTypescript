import React from 'react';
import { TrashIcon } from '@heroicons/react/solid';

export const RemoveFavourites = () => {
    return (
        <>
            <span className='mr-2 text-white '>Remove from favourites</span>
            <TrashIcon color='red' className='text-xs w-5'/>
        </>
    )
}
