import { test, expect } from "@jest/globals";
// import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useBreedList from "../useBreedList";

/* 
The old way to test a hook 
function getBreedList(animal) {
  let list;
  function TestComponent() {
    list = useBreedList(animal);
    return null;
  }

  render(<TestComponent />);

  return list;
 }
 */

// Testing a Hook

test("gives an empty array with no animal", async () => {
  const { result } = renderHook(() => useBreedList());
  const [breedList, status] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe("unloaded");
});

test("gives brack breeds with an animal", async () => {
  const breeds = ["Havanees", "Bichon Frise", "Poodle", "Corgie"];

  fetch.mockResponseOnce(JSON.stringify({ animal: "dog", breeds }));

  const { result, waitForNextUpdate } = renderHook(() => useBreedList("dog"));

  await waitForNextUpdate();

  const [breedList, status] = result.current;

  expect(status).toBe("loaded");
  expect(breedList).toEqual(breeds);
});
