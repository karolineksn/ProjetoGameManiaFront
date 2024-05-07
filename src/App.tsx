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
              <div className="topo">
            <img src="https://lh3.googleusercontent.com/pw/AP1GczOMjAxRL5UcnNIMv5rDPIwVF66ceKQqy1Oe24hQzRvQqXDaAel1Hs_dgS93ler0sVUCRTuZmffajyjCS74mHz8Ajj4qOyJmcn8JPtnVYsKsBMktPTQy6VpHp2mi-3Xf9Jzm5YSURdEhnhi_upU-r2UnHg7i4bEgUYa_GJxibKSSytfMoM7ikTQR4W8lDwUjMJJ_PAOyB5rhW6fwDkYxgX-DZUAS5LFBu0D_oOANjvjbWRnn-3JbUHLjwmWpZlRFZwqYxZF9K8NtH2C91RVZhsM8u3ffVaSwBcQ16qSJbIvG4F-vzHMFcy2MmiVhNqGOgEqdANj8DvUqUs1vQwOGTaLvE6heCVaQzVeEjnE60KhSXpa0JNnL6E81C1HuK3S2QEtsm7Veo7plOePpJ1KM4xE8NxrzMHN4fVOHxM6o4c5siY74b6QQ6V4OGJPCCuDnKYVwXYgruCt5c-oBkYsqLboGmQKAsZSKWZMnnaREmwYCK6r2N4p7cdD-aJkFvOw28m-08r-XrrwN1p5oM_JqqrzktinnJ43OpJMGNWjkjdAaSEiVQeQGERKLH0YFxP5TlNMQNH_c1x9kkmfH1IwPpmdfYD61YCSq7GdAmjEFyoU0jC4XVFAUkc4ch5o9LaSTBXd_nBqIYxACFG8yJNC_Q5szDlY794enwWXV8WSVGOKRspPoGGgDC4BIooiLkcfH5PF4cRnPq542MpiLFQJZULniS1fmLef3ZDsUyvfsbztmD7Ie6iaRuN02822Jv-nRophTpJsZJMjAEm_JbKl4wy54wuH6n1QgB3wiHBaYX6XSuohwN9CzteZ0qi2wt4h9JixM_2Za_gJJOrjOxB0Z5XXOLYByYbPNA5sRKgTA0oM01jBmQA6yQ0DHuwYhoYs6WiRbhGs7F3VFyZfvgToFZa-nhbA=w1154-h734-s-no-gm?authuser=0"/>
        </div>
      <h2></h2>
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
      <h2></h2>
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