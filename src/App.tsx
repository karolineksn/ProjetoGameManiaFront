import { useState } from 'react'
import './App.css'
import { Card } from './components/card/card';
import { GameData } from './interface/GameData';
import { useGameData } from './hooks/useGameData';
import { CreateModal } from './components/create-modal/create-modal';

function App() {
  const { data } = useGameData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
    <div className="container">
      <h1>Menu</h1>
      <div className="card-grid">
        {data?.map(gameData => 
          <Card
            price={gameData.price} 
            title={gameData.title} 
            image={gameData.image}
          />
        )}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
      <button onClick={handleOpenModal}>novo</button>
    </div>
  )
}

export default App