import { baseUrl } from "../baseUrl";
import { deleteMutation, serverMutation } from "../server";

export const addEvent = async (data) => {
  const eventData = await serverMutation("/api/events", "POST", data);
  return eventData;
};

export const updateEvent = async (data, id) => {
  //   console.log(data, id, 'Update Org');

  const resData = await serverMutation(`/api/events/${id}`, "PATCH", data);
  return resData;
};
export const deleteEvent = async (id) => {
  //   console.log(data, id, 'Update Org');

  const resData = await deleteMutation(`/api/events/${id}`);
  // revalidatePath("/dashboard/organizer/manage-events");
  return resData;
};
