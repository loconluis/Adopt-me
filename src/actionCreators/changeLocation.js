export default function changeLocation(location) {
  return {
    type: "LOCATION_CHANGE",
    payload: location,
  };
}
