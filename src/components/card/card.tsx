import React, { useState } from 'react';
import './card.css';

interface CardProps {
    id: number,
    price: number,
    title: string,
    image: string,
    onDelete: (id: number) => void; // Função para deletar um item
    onMarkUnavailable: (id: number) => void; // Função para marcar como indisponível
    onUpdateItem: (id: number, newData: { price: number; title: string; image: string }) => void; // Função para atualizar um item
}

export function Card({ id, price, title, image, onDelete, onMarkUnavailable, onUpdateItem }: CardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newData, setNewData] = useState({ price, title, image });

    const handleDelete = () => {
        onDelete(id);
    };

    const handleMarkUnavailable = () => {
        onMarkUnavailable(id);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        onUpdateItem(id, newData);
    };

    return (
        <div className="card">
            <img src={image} alt={title} />
            {isEditing ? (
                <div>
                    <input type="text" value={newData.title} onChange={(e) => setNewData({ ...newData, title: e.target.value })} />
                    <input type="number" value={newData.price} onChange={(e) => setNewData({ ...newData, price: Number(e.target.value) })} />
                    <input type="text" value={newData.image} onChange={(e) => setNewData({ ...newData, image: e.target.value })} />
                    <button onClick={handleSave}>Salvar</button>
                </div>
            ) : (
                <div>
                    <h2>{title}</h2>
                    <p><b>Preço: </b>{price}</p>
                    <div className="card-buttons">
                        <button onClick={handleEdit}>Editar</button>
                        <button onClick={handleDelete}>Deletar</button>
                        <button onClick={handleMarkUnavailable}>Marcar como Indisponível</button>
                    </div>
                </div>
            )}
        </div>
    );
}
