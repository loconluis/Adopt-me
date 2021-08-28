import { useEffect, useState } from "react";
import { Animal, BreedListAPIResponse } from "./APIResponseTypes";

const localCache: {
  [index: string]: string[];
} = {};

type Status = "unloaded" | "loading" | "loaded";

export default function useBreedList(animal: Animal): [string[], Status] {
  const [breeds, setBreeds] = useState([] as string[]);
  const [status, setStatus] = useState<Status>("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreeds([]);
    } else if (localCache[animal]) {
      setBreeds(localCache[animal]);
    } else {
      void requestBreedList();
    }

    async function requestBreedList() {
      setBreeds([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = (await res.json()) as BreedListAPIResponse;

      localCache[animal] = json.breeds || [];
      setBreeds(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breeds, status];
}
