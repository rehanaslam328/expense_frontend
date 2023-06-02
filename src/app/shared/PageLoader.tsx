/** @format */
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const override = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: red;
  height: 100%;
`;

export const PageLoader = () => (
  <BeatLoader color="green" css={override} size={18} margin={12} loading />
);
