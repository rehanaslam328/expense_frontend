export const DateFormat = (values: any) => {
  const flight_Details =
    values?.trip_flights?.flight_details.length &&
    //@ts-ignore
    values?.trip_flights?.flight_details.map((data: any, i: number) => {
      return {
        ...data,
        depart_date: data.depart_date.format("YYYY-MM-DD"),
      };
    });
  console.log("trip", flight_Details);
};
