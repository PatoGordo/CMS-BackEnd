export async function validateDataToStructure(
  structure: object,
  data: any
): Promise<any> {
  interface IField {
    name: string;
    type: string;
  }

  interface IStructure {
    [key: string]: IField;
  }

  await Promise.all([
    Object.keys(structure).forEach((field) => {
      if (
        data[field] === undefined ||
        (structure as IStructure)[field].type !== typeof data[field]
      ) {
        throw new Error(
          `"${
            (structure as IStructure)[field].name
          }" field doesn't follow the structure definitions.`
        );
      }
    })
  ]);

  return data;
}
