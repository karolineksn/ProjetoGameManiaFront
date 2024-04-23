import './card.css';

interface CardProps {
    id: number,
    price: number,
    title: string,
    image: string,
    onDelete: (id: number) => void; // Função para deletar um item
    onMarkUnavailable: (id: number) => void; // Função para marcar como indisponível

}

export function Card({id, price, title, image, onDelete, onMarkUnavailable} : CardProps){
    const handleDelete = () => {
        onDelete(id);
      };

      const handleMarkUnavailable = () => {
        onMarkUnavailable(id);
      };

    return(
        <div className="card">
            <img src={image}/>
            <h2>{title}</h2>
            <p><b>Valor: </b>{price}</p>
            <div className="card-buttons">
                <button onClick={handleDelete}>Deletar</button>
                <button onClick={handleMarkUnavailable}>Marcar como Indisponível</button>
            </div>
        </div>
    )
}