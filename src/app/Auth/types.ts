/** @format */

export type LoginFormProps = {
  email: string;
  password: string;
};

export type submitProps = {
  email: string;
};

export type FogetFormProps = {
  loading: boolean;
  onSubmit: (value: submitProps) => void;
};

export type loginSubmitProps = Omit<FogetFormProps, "onSubmit"> & {
  onSubmit: (value: LoginFormProps) => void;
};

export type signUpSubmitProps = LoginFormProps & {
  name: string;
  password_confirmation: string;
};

export type resetSubmitProps = {
  confirmation_code: string;
  passowrd: string;
  confirm_password: string;
};

export type resetFormProps = Omit<FogetFormProps, "onSubmit"> & {
  onSubmit: (value: resetSubmitProps) => void;
};

export type SignupFormProps = Omit<FogetFormProps, "onSubmit"> & {
  onSubmit: (value: signUpSubmitProps) => void;
};
