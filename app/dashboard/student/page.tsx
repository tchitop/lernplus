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
                <div>Test</div>
            )}
            {isLoggedIn && (
                <div>Test Test</div>
            )}
        </div>
    )
}