"use client";
import DashboardHeading from "@/components/DashboardHeading";
import {
  addOrganization,
  updateOrganization,
} from "@/lib/api/organizations/action";
import { myOrganization } from "@/lib/api/organizations/data";
import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
import { Card, CardHeader, Form, TextArea, Input, Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Organization = () => {
  const { data: session } = useSession();
  const [myOrg, setMyOrg] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const setOrgData = async () => {
      const org = await myOrganization(session?.user?.email);
      setMyOrg(org);
    };
    setOrgData();
  }, [session]);

  // console.log(myOrg);

  const onOrganizationSubmit = async (data) => {
    const imageFile = data.logo[0];
    const imageUrl = await uploadImage(imageFile);

    const organizationData = {
      organizationName: data.organizationName,
      logo: imageUrl,
      website: data.website,
      description: data.description,
      organizationEmail: session?.user?.email,
    };
    if (!myOrg) {
      const organizationResData = await addOrganization(organizationData);
      if (organizationResData.insertedId) {
        toast.success("Profile added");
      }
    } else {
      const organizationResUpdateData = await updateOrganization(
        organizationData,
        myOrg._id,
      );
      if (organizationResUpdateData.modifiedCount > 0) {
        toast.success("Profile updated");
      }
    }
  };
  return (
    <div>
      <DashboardHeading
        title={" My organization profile"}
        description={
          "Update organization logo, profile, website and description"
        }
      />
      <div className="mt-6 space-y-6 max-w-3xl">
        <Card
          className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
          radius="lg"
        >
          <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
            <h3 className="text-xl font-bold text-white">
              Organization Details
            </h3>
            <p className="text-slate-400 text-xs">
              Review and edit your organization credentials.
            </p>
          </CardHeader>
          <div className="p-6">
            <Form
              className="space-y-4 w-full"
              onSubmit={handleSubmit(onOrganizationSubmit)}
            >
              <Input
                defaultValue={myOrg?.organizationName}
                {...register("organizationName", {
                  required: "Organization Name is rquired",
                })}
                id="organizationName"
                label="Organization Name"
                placeholder="TechEvents Corp"
                required
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
              />
              <Input
                {...register("logo", {
                  required: "Logo is rquired",
                })}
                id="logo"
                type="file"
                accept="image"
                placeholder="https://example.com/avatar.jpg"
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
              />

              <Input
                defaultValue={myOrg?.website}
                {...register("website", {
                  required: "Organization Website is rquired",
                })}
                id="website"
                label="Organization Website"
                placeholder="techevents.corp"
                required
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
              />

              <TextArea
                defaultValue={myOrg?.description}
                {...register("description", {
                  required: "Organization Description is rquired",
                })}
                id="description"
                label="Description"
                placeholder="Hosting global developer conferences and software hacking marathons."
                required
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none min-h-25 text-white text-sm"
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 px-6 shadow-lg"
                  radius="lg"
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Organization;
