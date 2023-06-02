import { RootState, useTypedSelector } from "store";

export const useGetTokens = () => {
  const {
    token: { access_token },
    organization_id,
  } = useTypedSelector(({ authReducer }: RootState) => authReducer);
  return { access_token, organization_id };
};
