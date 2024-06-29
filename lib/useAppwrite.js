import { useState, useEffect } from 'react';
import { account } from './appwrite';

export function useAppwrite() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        account.get().then(
            response => {
                setUser(response);
            },
            error => {
                setUser(null);
            }
        );
    }, []);

    return { user, setUser };
}
