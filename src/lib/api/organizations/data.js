import { serverFetch } from "../server";

export const myOrganization = async (email) => {
  const result = await serverFetch(`/api/organizations/${email}`);
  return result;
};
