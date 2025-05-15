import { useNavigate } from "react-router-dom";

import './Card.css';

type CardProps = {
  imageUrl: string;
  name: string;
  rating: number;
  description: string;
  id: number;
};

export default function Card({ imageUrl, name, rating, description, id }: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/themes/${id}`);
  };

  return (
    <div className="card">
      <img src={imageUrl} alt={name} className="card-image" />
      <h2 className="card-title">{name}</h2>
      <p className="card-rating">评分: {rating} / 5</p>
      <p className="card-description">{description}</p>
      <button onClick={handleClick} className="card-button">预定</button>
    </div>
  );
}
