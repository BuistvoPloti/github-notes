export const updateObjectInArray = (array, id, newItem) => {
  return array.map((item) =>
    item.id === id
      ? { ...item, ...newItem }
      : item
  );
};