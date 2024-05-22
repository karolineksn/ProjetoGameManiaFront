import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/game';

interface Game {
    id: number;
    title: string;
    image: string;
    price: number;
    available: boolean;
}

export function useGameData() {
    const [data, setData] = useState<Game[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching game data:', error);
                setLoading(false);
            });
    }, []);

    return { data, loading, setData };
}
