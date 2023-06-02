export const generateRoleOptions = (list: string[]) => {
  const updatedList = list.map((title) =>
    ["View", "Create", "Edit", "Delete"].map((opt) => `${title}${opt}`)
  );
  return updatedList.flatMap((flat) => flat);
};
