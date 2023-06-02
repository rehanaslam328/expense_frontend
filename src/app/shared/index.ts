import { lazy } from "react";

export { Toast, AlertBox, Container } from "./Alert";
export * as Icons from "./Icons";
export { Status } from "./Result";
export { PageLoader } from "./PageLoader";
export { SideBar } from "./SideBar";
export { AppHeader } from "./Header";
export { NotFound } from "./NotFound";
export { TabView } from "./Tabs";
export { RenderAction } from "./RenderAction";

export const InputField = lazy(() => import(/* webpackChunkName: 'InputFieldx' */ "./InputField"));
export const CheckBox = lazy(() => import(/* webpackChunkName: 'CheckBoxx' */ "./CheckBox"));
export const Buttonx = lazy(() => import(/* webpackChunkName: 'Buttonx' */ "./Button"));
export const Selectx = lazy(() => import(/* webpackChunkName: 'Selectx' */ "./Select"));
export const PaginateSelectX = lazy(
  () => import(/* webpackChunkName: 'Selectx' */ "./PaginateSelect")
);
export const DatePickerx = lazy(() => import(/* webpackChunkName: 'DatePickerx' */ "./DatePicker"));
export const UploadImage = lazy(
  () => import(/* webpackChunkName: 'ImageUploader' */ "./ImageUploader")
);
