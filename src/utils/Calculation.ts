export const getTotal = (dataSource: object[]) => {
    let total = 0;
    dataSource?.forEach((item: any) => {
        const amount = parseFloat(item?.amount);
        total = total + amount;
    });
    return total;
  };