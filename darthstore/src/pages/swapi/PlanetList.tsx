// PlanetList.tsx
import React from 'react';
import '../../styles/pages/swapi/planet.css';

interface Planet {
  name: string;
  // Agregar una propiedad única como id si está disponible
  id: string | number; // Por ejemplo, asumiendo que cada planeta tiene un id único
}

interface PlanetListProps {
  planets: Planet[];
}

const PlanetList: React.FC<PlanetListProps> = ({ planets }) => {
  if (planets.length === 0) {
    return <div>No planets available</div>;
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Planetas</h1>
      <div className='row gap-4 justify-content-center mt-5 mb-5'>
        {planets.map((planet) => (
          <div key={planet.id} className='col-4'>
            <div className='card planetCard'>
              <div className='card-body'>
                <h5 className='card-title'>{planet.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PlanetList;
