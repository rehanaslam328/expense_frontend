/** @format */

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import qString from "query-string";
import { Toast } from "app/shared";
import { useTypedDispatch } from "store";
import { RegisterForm } from "./RegisterForm";
import { endpoints, routeNames } from "static";
import {
  setlistingData,
  editOrganization,
  createOrganization,
} from "store/slices/OrganizationSlice";
import { useLoading, useListing, useGetSearchParam } from "app/Hooks";
import { RegisterOrganizationProps } from "./Types";

const { DASHBOARD, ORGANIZATION_LISTING } = routeNames;
const { CREATE_ORGANIZATION, EDIT_ORGANIZATION } = endpoints;

const RegisterOrganization = ({
  curr,
  edit = false,
  refetch = () => null,
}: RegisterOrganizationProps) => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [loading, toggle] = useLoading();
  const [current, setCurrent] = useState(0);
  const { param } = useGetSearchParam("org");
  const { search } = useLocation();
  const { org: organization_id } = qString.parse(search);

  const [info, setInfo] = useState({
    primary_contact_name: "",
    primary_contact_email: "",
    time_zone: "",
    organization_type_id: "",
    fiscal_year_id: "",
    inventory_start_date: "",
  });
  const {
    org_list,
    ctry_list,
    currncy_list,
    fiscle_list,
    isLoading,
    organization_type_list,
    country_list,
    currency_list,
    fiscal_year_list,
  } = useListing();

  useEffect(() => {
    dispatch(
      setlistingData({
        organization_type_list,
        country_list,
        fiscal_year_list,
        currency_list,
      })
    );
  }, [dispatch, organization_type_list, country_list, currency_list, fiscal_year_list]);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const onSubmit = (values: any) => {
    if (current === 0) {
      setInfo(values);
      return next();
    }
    toggle();
    let data = new FormData();
    const res = { ...values, ...info, is_logo_deleted: false };
    for (const key in res) {
      data.append(key, res[key] || "");
    }
    // data.append("logo", form.getFieldValue("logo"));
    if (edit) {
      dispatch(
        editOrganization({
          data,
          method: "post",
          url: `${EDIT_ORGANIZATION}/${organization_id}`,
          isJsonType: false,
        })
      )
        .unwrap()
        .then((res) => {
          toggle();
          if (res) {
            refetch();
            Toast({ message: res.message });
            setTimeout(() => navigate(ORGANIZATION_LISTING), 1500);
          }
        });
    } else
      dispatch(
        createOrganization({
          data,
          method: "post",
          url: CREATE_ORGANIZATION,
          isJsonType: false,
        })
      )
        .unwrap()
        .then((res) => {
          if (res) {
            if (param === "create") {
              refetch();
            }
            Toast({ message: res.message });
            setTimeout(() => navigate(param === "create" ? ORGANIZATION_LISTING : DASHBOARD), 1500);
          }
          toggle();
        });
  };

  return (
    <>
      <RegisterForm
        curr={curr}
        edit={edit}
        prev={prev}
        loading={loading}
        current={current}
        org_list={org_list}
        onSubmit={onSubmit}
        isLoading={isLoading}
        ctry_list={ctry_list}
        fiscle_list={fiscle_list}
        currncy_list={currncy_list}
      />
    </>
  );
};

export default RegisterOrganization;
