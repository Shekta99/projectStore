// CharacterList.tsx
import React from 'react';
import Card from '../../components/uiSwapi/card';
import charactersImg from '../../utils/characters';

interface Character {
  name: string;
  id: string | number;
  hair_color: string;
}

interface CharacterListProps {
  characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  if (characters.length === 0) {
    return <div>No characters available</div>;
  }



// ...

return (
  <div className='container'>
    <div className='row'>
    {characters.map((character) => (
      <div className='col-6 mb-4 '>
        <Card key={character.id}
       title={character.name} 
       hair_color={character.hair_color}
      image={charactersImg[character.name as keyof typeof charactersImg]}
        />
      </div>
    ))}

    <div>
    </div>
  </div>
  </div>
);
};

export default CharacterList;
