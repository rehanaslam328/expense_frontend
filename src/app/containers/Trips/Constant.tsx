import { HotelForm, CarForm, BusForm, TrainForm } from "./Trip_modes";
import { Icons } from "app/shared";
import { FormInstance } from "antd";

const { FaHotel, AiFillCar, MdDirectionsBus, MdTrain } = Icons;

export const initialState = {
  name: "",
  travel_type: "Domestic",
  is_visa_require: false,
  business_purpose: "",
  trip_flights: {
    trip_type_id: 1,
    seat_pref_id: "",
    meal_pref_id: "",
    flight_details: [{}],
  },
  trip_hotels: [{}],
  trip_car_rents: [{}],
  trip_bus_rents: [{}],
  trip_train_rents: [{}],
};

export const TimeLine = [
  {
    name: "Hotel",
    component: (form: FormInstance) => <HotelForm form={form} />,
    isShow: false,
    icon: <FaHotel size={25} />,
  },
  {
    name: "Car",
    component: ({ form }: { form: FormInstance }) => <CarForm form={form} />,
    isShow: false,
    icon: <AiFillCar size={25} />,
  },
  {
    name: "Bus",
    component: ({ form }: { form: FormInstance }) => <BusForm form={form} />,
    isShow: false,
    icon: <MdDirectionsBus size={25} />,
  },
  {
    name: "Train",
    component: ({ form }: { form: FormInstance }) => <TrainForm form={form} />,
    isShow: false,
    icon: <MdTrain size={25} />,
  },
];
