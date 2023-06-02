import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { generateRoleOptions } from "utils";

export const systemModules = [{ title: "Settings", permissions: ["Currency", "Warehouse", "Tax"] }];

const list = systemModules.map((v: any) => v.permissions)[0];
export const systemPermissions = generateRoleOptions(list);
export const allPermissions = systemPermissions.map((val: any) => ({
  id: val,
  [val]: false,
}));

export const setPermissionsList = (permission: CheckboxValueType[]) => {
  allPermissions.forEach((val: any) => {
    // @ts-ignore
    val[val.id] = false;
  });
  allPermissions.forEach((val: any) =>
    permission.forEach((perm: any) => {
      if (val.id === perm) {
        // @ts-ignore
        val[perm] = true;
        return;
      }
    })
  );
};
