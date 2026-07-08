"use client";

import Link from "next/link";

import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Label,
  Form,
} from "@heroui/react";
// import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import { signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { imageUpload } from "@/utils/uploadImage";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const imageUrl = await imageUpload(imageFile);

    const { data: signUpData, error: signUpError } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      image: imageUrl || "",
    });
    console.log(signUpData, signUpError, "Register page");
    if (signUpData) {
      redirect("/");
    }
  };
  return (
    <Card className="w-full max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4 mx-auto">
      <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
        <Logo />
        <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent">
          Create an Account
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Join Ticketo to book premium events or host your own organization.
        </p>
      </CardHeader>
      <CardBody className="gap-4">
        <Form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="name">Full Name</Label>
          <Input
            {...register("name", { required: "Name is rquired" })}
            id="name"
            placeholder="John Doe"
            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
          />
          {errors.name && (
            <p className="text-red-400 text-xs">{errors.name.message}</p>
          )}
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email", { required: "Email is rquired" })}
            id="email"
            placeholder="john@example.com"
            type="email"
            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
          />
          {errors.email && (
            <p className="text-red-400 text-xs">{errors.email.message}</p>
          )}
          <Label htmlFor="image">Profile Image URL</Label>
          <Input
            {...register("image", { required: "Image is rquired" })}
            id="image"
            type="file"
            accept="image"
            placeholder="https://example.com/avatar.jpg"
            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
          />
          {errors.image && (
            <p className="text-red-400 text-xs">{errors.image.message}</p>
          )}

          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password", { required: "Password is rquired" })}
            id="password"
            placeholder="••••••••"
            type="password"
            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
          />
          {errors.password && (
            <p className="text-red-400 text-xs">{errors.password.message}</p>
          )}

          <div className="flex flex-col gap-2 w-full">
            <Label
              htmlFor="role"
              className="text-sm font-semibold text-slate-300"
            >
              Select Role
            </Label>
            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <select
                  id="role"
                  className="w-full h-11 pl-4 pr-10 rounded-xl border border-white/10 bg-slate-900/50 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500"
                  {...register("role", { required: "Role is required" })}
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="attendee">Attendee</option>
                  <option value="organizer">Organizer</option>
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
              {errors.role && (
                <p className="text-red-400 text-xs">{errors.role.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-linear-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
            radius="lg"
          >
            Create Account
          </Button>
        </Form>

        <div className="flex items-center my-4">
          <div className="grow border-t border-white/5" />
          <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">
            Or Sign Up With
          </span>
          <div className="grow border-t border-white/5" />
        </div>

        <Button
          variant="bordered"
          className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11"
          radius="lg"
          // startContent={<FaGoogle className="text-pink-500" />}
        >
          Google OAuth
        </Button>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-pink-500 hover:text-pink-400 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
