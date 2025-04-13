'use client';

import { useEffect, useState } from 'react';

export default function Student () {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check login status on component mount
    useEffect(() => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    }, []);
  
    return (
        <div className="text-amber-100">
            {!isLoggedIn && (
                <div className='text-center justify-center flex flex-col'>
                    <div className='text-red-600'>Tut mir leid, du hast keinen Zugriff auf diese Seite.</div>
                </div>
            )}
            {isLoggedIn && (
                <div className='text-center justify-center'></div>
            )}
        </div>
    )
}