"use client";

import DashboardHeading from "@/components/DashboardHeading";
import { addEvent } from "@/lib/api/events/action";
import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
import { Button, TextArea, Card, CardHeader, Form, Input } from "@heroui/react";
import { organization } from "better-auth/client";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Music",
  "Tech",
  "Sports",
  "Arts",
  "Business",
  "Food",
  "Other",
];
const LOCATIONS = [
  "New York",
  "San Francisco",
  "London",
  "Dhaka",
  "Tokyo",
  "Berlin",
  "Online",
];

const AddEventPage = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data, "event page");
    const imageFile = data.banner[0];
    console.log(imageFile);

    const imageUrl = await uploadImage(imageFile);
    delete data?.banner;
    const updateData = {
      ...data,
      banner: imageUrl,
      organizationEmail: session?.user?.email,
    };
    const result = await addEvent(updateData);
    // console.log(result, "event page");

    if (result.insertedId) {
      toast.success("Event added successfully");
      redirect("/events");
    } else {
      toast.error(result.message || "Event not created");
    }
  };

  return (
    <div>
      <DashboardHeading title={"Add event"} description={"Add new event"} />

      <div className="mt-6 max-w-3xl">
        <Card
          className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
          radius="lg"
        >
          <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
            <h3 className="text-xl font-bold text-white">Host a New Event</h3>
            <p className="text-slate-400 text-xs">
              Fill out the detailed event information. Banners and dates are
              required.
            </p>
          </CardHeader>

          <div className="p-6">
            <Form
              className="space-y-4 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <Input
                  {...register("title", {
                    required: "Event name is required",
                  })}
                  label="Event Title"
                  placeholder="e.g. Rock Fest 2026"
                  // isInvalid={!!errors.eventName}
                  // errorMessage={errors.eventName?.message}
                  className="w-full bg-slate-900/50 border-white/10"
                />
                <Input
                  {...register("banner", {
                    required: "Banner is rquired",
                  })}
                  type="file"
                  accept="image"
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
                />
              </div>

              {/* ✅ native selects instead of HeroUI Select */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-slate-400">Category</label>
                  <div className="relative">
                    <select
                      {...register("category", {
                        required: "Category is required",
                      })}
                      className="w-full h-11 pl-4 pr-10 rounded-xl border border-white/10 bg-slate-900/50 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    >
                      <option value="">Select Category</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {errors.category && (
                    <p className="text-red-400 text-xs">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-slate-400">Location</label>
                  <div className="relative">
                    <select
                      {...register("location", {
                        required: "Location is required",
                      })}
                      className="w-full h-11 pl-4 pr-10 rounded-xl border border-white/10 bg-slate-900/50 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    >
                      <option value="">Select Location</option>
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {errors.location && (
                    <p className="text-red-400 text-xs">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <Input
                  {...register("date", { required: "Date is required" })}
                  type="date"
                  label="Date"
                  // isInvalid={!!errors.date}
                  // errorMessage={errors.date?.message}
                  className="w-full bg-slate-900/50 border-white/10"
                />
                <Input
                  {...register("price", { required: "Price is required" })}
                  type="number"
                  min={0}
                  step="any"
                  label="Ticket Price ($)"
                  placeholder="0.00"
                  // isInvalid={!!errors.price}
                  // errorMessage={errors.price?.message}
                  className="w-full bg-slate-900/50 border-white/10"
                />
                <Input
                  {...register("capacity", { required: "Seats is required" })}
                  type="number"
                  min={1}
                  label="Available Capacity"
                  placeholder="100"
                  // isInvalid={!!errors.seats}
                  // errorMessage={errors.seats?.message}/
                  className="w-full bg-slate-900/50 border-white/10"
                />
              </div>

              <TextArea
                {...register("description", {
                  required: "Description is required",
                })}
                label="Detailed Description"
                placeholder="Outline the detailed schedule, speaker list, and amenities..."
                // isInvalid={!!errors.description}
                // errorMessage={errors.description?.message}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl min-h-30 text-white text-sm"
              />

              <Button
                type="submit"
                className="bg-linear-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/10"
                radius="lg"
              >
                Host Event Now
              </Button>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddEventPage;
