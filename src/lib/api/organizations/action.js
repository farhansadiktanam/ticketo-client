import { serverMutation } from "../server";

export const addOrganization = async (data) => {
  const organizationData = await serverMutation(
    "/api/organizations",
    "POST",
    data,
  );
  return organizationData;
};

export const updateOrganization = async (data, id) => {
  const organizationData = await serverMutation(
    `/api/organizations/${id}`,
    "PATCH",
    data,
  );
  return organizationData;
};
