import Card from "../components/Card"
import React, { useEffect, useState } from "react";

interface Theme {
  id: number;
  image_url: string;
  title: string;
  rating: number;
  description: string;
}
export default function DashboardPage() {
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/themes")
      .then((res) => res.json())
      .then((data) => {
        setThemes(data);
      })
      .catch((err) => console.error("Failed to fetch themes", err));
  }, []);
  
  return (
    <div style={{ padding: "20px" }}>
      {themes.map((theme) => (
        <Card
        key={theme.id}
        id={theme.id}
        imageUrl={theme.image_url}
        name={theme.title}
        rating={theme.rating}
        description={theme.description}
      />
      ))}
    </div>
  );
}
