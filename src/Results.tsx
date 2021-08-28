import { FunctionComponent } from "react";
import Pet from "./Pet";
import { Pet as IPet } from "./APIResponseTypes";

interface IProps {
  pets: IPet[];
}

const Results: FunctionComponent<IProps> = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h2>No pets found</h2>
      ) : (
        pets.map((pet) => (
          <Pet
            key={pet.id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
