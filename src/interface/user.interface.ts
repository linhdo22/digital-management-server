import { AccessLevel, Role } from "src/entity/role";
import { User } from "src/entity/user";

export interface IParamsUser {
  [key: string]: any;
  id: User["id"];
  email: User["email"];
  username: User["username"];
  firstName: User["firstName"];
  lastName: User["lastName"];
  password: User["password"];
  confirm_password: User["password"];
  membership_id?: User["membership_id"];
  forceChangePassword: User["forceChangePassword"];
  taxExempt: User["taxExempt"];
  paymentRailsType: User["paymentRailsType"];
  access_level: AccessLevel["id"];
  roles: Role["id"][];
  status: User["status"];
  statusComment?: User["statusComment"];
}

export interface IUserInfo {
  profile_id: string;
  fistName: string;
  lastName: string;
  access_level: User["access_level"]["name"];
  created: string;
  last_login: string;
  product: number;
  storeName: User["storeName"];
  order: { order_as_buyer: number; order_as_buyer_total: number };
  vendor: User["email"];
  vendor_id: User["id"];
  wishlist: number;
}

export type IUserStatus = "E" | "D" | "U" | "";
export type IFilterUserMembership = "M_4" | "P_4";

export interface IFilterUserProperties {
  address: string;
  country: string;
  date_range: string[];
  date_type: "R" | "L";
  memberships: IFilterUserMembership[];
  phone: string;
  search: string;
  state: string;
  status: IUserStatus[];
  types: string[];
}

export interface IFilterUserSort {
  sort: "last_login" | "firstName" | "access_level" | "created" | "vendor";
  order_by: "DESC" | "ASC";
  count: number;
  page: number;
}
export interface IFilterUser extends IFilterUserProperties, IFilterUserSort {
  [key: string]: any;
  tz: number;
}
