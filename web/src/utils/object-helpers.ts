type CommonItemType = {
  [key: string]: number | string,
}

type GenericItemType<Type> = {
  [key: string]: Type
}

export function updateObjectInArray<TypeArr extends {id: number | string}, TypeId, TypeNewItem extends {}>(
  array: TypeArr[],
  id: TypeId,
  newItem: TypeNewItem
) {
  return array.map((item: any) =>
    item.id == id ? { ...item, ...newItem } : item
  );
}

export const findObjectInArray = (array: [], id: number | string) => {
  return array.find((item: CommonItemType) => item.id == id)
};

export const findObjectIndexInArrayById = (array: [], id: number | string) => {
  return array.findIndex((item: CommonItemType) => item.id == id);
};

export const nestedObjectToNestedArray = (object: GenericItemType<{}>) => {
  return Object.keys(object).map((item) => object[item]);
};

export const isEmptyObject = (object: any) => {
  return JSON.stringify(object) === '{}';
};
