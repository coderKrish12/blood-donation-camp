"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerDonor } from "@/services/registrationServices";
import toast from "react-hot-toast";

// Define blood groups
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Yup schema
const schema: yup.ObjectSchema<RegistrationFormData> = yup.object({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  age: yup
    .string()
    .required("Age is required")
    .test("is-number", "Age must be a number", (value) =>
      /^\d+$/.test(value || "")
    )
    .test("min-age", "You must be at least 18", (value) =>
      value ? parseInt(value) >= 18 : false
    ),
  gender: yup.mixed<"male" | "female">().oneOf(["male", "female"]).required(),
  blood_group: yup
    .mixed<"A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-">()
    .oneOf(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .required(),
  first_time: yup.boolean().required(),
  last_donation_date: yup
    .string()
    .nullable()
    .default(null) // ✅ ensures it's never undefined
    .when("first_time", {
      is: false,
      then: (schema) => schema.required("Last donation date is required"),
      otherwise: (schema) => schema.nullable(),
    }),
});

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      age: "",
      gender: "male",
      blood_group: "A+",
      first_time: true,
      last_donation_date: null,
    },
  });

  const { mutateAsync: registerDonorHandler, isPending } = useMutation({
    mutationFn: (data: RegistrationFormData) => registerDonor(data),
    onSuccess: () => toast.success("Registration successful!"),
    onError: (error) => console.error("Registration error:", error),
  });

  const first_time = watch("first_time");

  const onSubmit = (data: RegistrationFormData) => {
    let formattedDate = null;

    if (data?.last_donation_date) {
      const date = new Date(data.last_donation_date);
      formattedDate = date.toISOString().split("T")[0];

      data.last_donation_date = formattedDate;
    }

    registerDonorHandler(data);
  };

  const inputClassName =
    "w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white shadow-sm transition-all mt-1";

  useEffect(() => {
    if (first_time) {
      setValue("last_donation_date", null, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [first_time, setValue]);

  return (
    <form className="space-y-6" id="register" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-semibold text-red-600 mb-4 text-center">
        Register
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          {...register("name")}
          className={inputClassName}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <div className="flex items-center gap-2">
          <span className="p-2 border border-gray-300 rounded-lg mt-1">
            +91
          </span>
          <input
            {...register("phone")}
            type="tel"
            className={inputClassName}
            placeholder="Your phone"
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-medium">Age</label>
        <input
          {...register("age")}
          type="number"
          className={inputClassName}
          placeholder="Your age"
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium">Gender</label>
        <select {...register("gender")} className={inputClassName}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>

      {/* Blood Group */}
      <div>
        <label className="block text-sm font-medium">Blood Group</label>
        <select {...register("blood_group")} className={inputClassName}>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        {errors.blood_group && (
          <p className="text-red-500 text-sm">{errors.blood_group.message}</p>
        )}
      </div>

      {/* First-time Donor */}
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("first_time")} />
        <label>First-time donor</label>
      </div>

      {/* Last Donation Date */}
      {!first_time && (
        <div>
          <label className="block text-sm font-medium">
            Last donation date
          </label>
          <input
            type="date"
            {...register("last_donation_date")}
            className={inputClassName}
          />
          {errors.last_donation_date && (
            <p className="text-red-500 text-sm">
              {errors.last_donation_date.message as string}
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 bg-red-600 rounded-lg text-white font-semibold hover:bg-red-700"
      >
        Save Life
      </button>
    </form>
  );
}
