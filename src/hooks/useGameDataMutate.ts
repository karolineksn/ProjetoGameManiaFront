import { useMutation, useQueryClient } from 'react-query';
import { GameData } from '../Interface/GameData';

const API_URL = 'http://localhost:8080/game';

export function useGameDataMutate() {
    const queryClient = useQueryClient();

    const mutate = async (newGame: GameData) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newGame),
        });

        if (!response.ok) {
            throw new Error('Failed to add new game');
        }

        return response.json();
    };

    return useMutation(mutate, {
        onSuccess: () => {
            queryClient.invalidateQueries('gameData');
        },
    });
}
