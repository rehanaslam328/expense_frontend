import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";

export type Token = {
  access_token: string;
  organization_id: string | number;
};

export type RoleFormProps = {
  current?: any;
  bool: boolean;
  loading: boolean;
  roleAlert: boolean;
  toggle: () => void;
  onSubmit: (val: any) => void;
  setAlert: Dispatch<SetStateAction<boolean>>;
};

export type roleCreateProps = Omit<RoleFormProps, "current" | "loading" | "onSubmit"> &
  Token & {
    refetch: () => void;
  };

export type roleEditProps = Required<roleCreateProps> & Pick<RoleFormProps, "current">;

export type roleDetailProps = Pick<RoleFormProps, "bool" | "toggle">;

export type roleListingProps = {
  list: object[];
  handleClick: MouseEventHandler;
  handleConfirm: MouseEventHandler;
};

export type roleCheckboxFormProps = {
  title: string;
  list: string[];
  itemPermissions: CheckboxValueType[];
  setPermission: Dispatch<SetStateAction<CheckboxValueType[]>>;
};

export type submitCreateUserProps = {
  name: string;
  email: string;
  role_id: string | number;
};

export type InviteUserFormProps = {
  bool: boolean;
  current?: any;
  roles: object[];
  loading: boolean;
  toggle: () => void;
  onSubmit: (val: any) => void;
};

export type createInviteProps = Omit<InviteUserFormProps, "current" | "onSubmit" | "loading"> &
  Token & {
    refetch: () => void;
  };

export type editInviteFormProps = Required<createInviteProps> &
  Pick<InviteUserFormProps, "current">;

export type inviteUserDetailProps = Pick<InviteUserFormProps, "bool" | "toggle">;

export type inviteUserListingProps = Required<roleListingProps>;
