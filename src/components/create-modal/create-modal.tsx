import { useEffect, useState } from 'react';
import { useGameDataMutate } from '../../hooks/useGameDataMutate';
import { GameData } from '../../Interface/GameData';

import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}   

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps){
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, isLoading } = useGameDataMutate();

    const submit = () => {
        const gameData: GameData = {
            id,
            title, 
            price,
            image
        }
        mutate(gameData)
    }

    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item para venda</h2>
                <form className="input-container">
                    <Input label="Título:" value={title} updateValue={setTitle}/>
                    <Input label="Preço:" value={price} updateValue={setPrice}/>
                    <Input label="Url da Imagem:" value={image} updateValue={setImage}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? 'postando...' : 'postar'}
                </button>
            </div>
        </div>
    )
}
