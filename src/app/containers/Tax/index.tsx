import { TaxTabs } from "./Tabs";
import { useState } from "react";

const Tax = () => {
  const [current, setCurrent] = useState("1");

  const handleChange = (activeKey: string) => {
    setCurrent(activeKey);
  };

  return (
    <>
      <TaxTabs handleChange={handleChange} current={current} />
    </>
  );
};

export default Tax;
