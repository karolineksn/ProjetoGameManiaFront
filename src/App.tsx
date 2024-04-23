import axios from 'axios';
import { useState } from 'react'
import './App.css'
import { Card } from './components/card/card'; 
import { GameData } from './Interface/GameData';
import { useGameData } from './hooks/useGameData';
import { API_URL } from './hooks/useGameData'
import { CreateModal } from './components/create-modal/create-modal';

function App() {
  const { data, isLoading, isError } = useGameData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/game/${id}`);
      console.log(`Item deletado com ID: ${id}`);
      // Atualize a lista de jogos após a exclusão do item (se necessário)
    } catch (error) {
      console.error('Erro ao deletar item:', error);
    }
  };

  const handleMarkUnavailable = async (id: number) => {
    try {
      await axios.put(`${API_URL}/game/${id}`, { available: false });
      console.log(`Item marcado como indisponível com ID: ${id}`);
      // Atualize a lista de jogos após a marcação como indisponível (se necessário)
    } catch (error) {
      console.error('Erro ao marcar item como indisponível:', error);
    }
  };

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar dados</div>;

  return (
    <div className="container">
      <h1>Jogos Disponíveis</h1>
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
          />
        ))}
      </div>
      <button onClick={handleOpenModal}>Cadastre um novo item</button>      
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
    </div>
  );
}

export default App;