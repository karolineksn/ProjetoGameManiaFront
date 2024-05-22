import React, { useState } from 'react';
import { useGameData } from './hooks/useGameData';
import { Card } from './components/card/card';
import { CreateModal } from './components/create-modal/create-modal';
import './App.css';
import topoSite from './img/topo_site.png';


function App() {
    const { data, loading, setData } = useGameData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (id: number) => {
        // Aqui você deve adicionar a lógica para deletar o item do backend e atualizar o estado
        setData(data => data ? data.filter(game => game.id !== id) : null);
    };

    const handleMarkUnavailable = (id: number) => {
        // Aqui você deve adicionar a lógica para marcar o item como indisponível no backend e atualizar o estado
        setData(data => data ? data.map(game => game.id === id ? { ...game, available: false } : game) : null);
    };

    const handleUpdateItem = (id: number, newData: { price: number; title: string; image: string }) => {
        // Aqui você deve adicionar a lógica para atualizar o item no backend e atualizar o estado
        setData(data => data ? data.map(game => game.id === id ? { ...game, ...newData } : game) : null);
    };

    const handleOpenModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
          <img src={topoSite} alt="Topo do Site" className="topo" />
            <div className="lista"><h2>Catálogo de Jogos</h2></div> 
            <div className="card-grid">
                {data?.map((gameData) => (
                    <Card
                        key={gameData.id}
                        id={gameData.id}
                        price={gameData.price}
                        title={gameData.title}
                        image={gameData.image}
                        onDelete={handleDelete}
                        onMarkUnavailable={handleMarkUnavailable}
                        onUpdateItem={handleUpdateItem}
                    />
                ))}
            </div>
            <button onClick={handleOpenModal}>Cadastre um novo item</button>
            {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
            <div className='base'>
                <h1></h1>
                <h4>Created by Karol Nascimento</h4>
            </div>
        </div>
    );
}

export default App;
