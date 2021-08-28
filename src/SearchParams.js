import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useBreedList from "./useBreedList";
import Results from "./Results";
import changeLocation from "./actionCreators/changeLocation";
import changeAnimal from "./actionCreators/changeAnimal";
import changeBreed from "./actionCreators/changeBreed";
import changeTheme from "./actionCreators/changeTheme";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const animal = useSelector((state) => state.animal);
  const location = useSelector((state) => state.location);
  const theme = useSelector((state) => state.theme);
  const breed = useSelector((state) => state.breed);
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const dispatch = useDispatch();

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const result = await res.json();
    setPets(result.pets);
  }

  function handleAnimalChange(e) {
    dispatch(changeAnimal(e.target.value));
    dispatch(changeBreed(""));
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            type="text"
            onChange={(e) => dispatch(changeLocation(e.target.value))}
            placeholder="Location"
            value={location}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={handleAnimalChange}
            onBlur={handleAnimalChange}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}{" "}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => dispatch(changeBreed(e.target.value))}
            onBlur={(e) => dispatch(changeBreed(e.target.value))}
          >
            <option />
            {breeds.map((b) => (
              <option key={b} value={b}>
                {b}{" "}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => dispatch(changeTheme(e.target.value))}
            onBlur={(e) => dispatch(changeTheme(e.target.value))}
          >
            <option value="darkblue">Dark blue</option>
            <option value="peru">Peru</option>
            <option value="chartreuse">Chart Reuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
