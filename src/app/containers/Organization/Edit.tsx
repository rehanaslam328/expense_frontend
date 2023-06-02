// import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import RegisterOrganization from "./Register";
import { useGetOrganizationsQuery } from "store/query/organization";

const UpdateOrganization = () => {
  const [curr, setCurr] = useState({});
  const { data: { organizations = [] } = {}, refetch } = useGetOrganizationsQuery("");

  useEffect(() => {
    setCurr(organizations.filter((org: any) => org.organizations.is_default)[0]);
  }, [setCurr, organizations]);

  return (
    <>
      {/* <Outlet /> */}
      <RegisterOrganization curr={curr} edit refetch={refetch} />
    </>
  );
};

export default UpdateOrganization;
