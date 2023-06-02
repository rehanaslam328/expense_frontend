/** @format */

import RegisterOrganization from "./Register";
import { useGetOrganizationsQuery } from "store/query/organization";

const CreateOrganization = () => {
  const { refetch } = useGetOrganizationsQuery("");

  return (
    <>
      <RegisterOrganization refetch={refetch} />
    </>
  );
};

export default CreateOrganization;
