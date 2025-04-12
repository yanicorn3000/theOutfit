import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyerSchema } from "./schems";
import { useEffect } from "react";
import { FieldError } from "react-hook-form";
import { UserInfoFormData, UserInfoFormProps } from "../../types";

const formFields = [
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
  },

  {
    name: "name.firstname",
    type: "text",
    placeholder: "Enter your First name",
    label: "First name",
  },
  {
    name: "name.lastname",
    type: "text",
    placeholder: "Enter your Last name",
    label: "Last name",
  },
  {
    name: "address.city",
    type: "text",
    placeholder: "Enter your city",
    label: "City",
  },
  {
    name: "address.street",
    type: "text",
    placeholder: "Enter your street",
    label: "Street",
  },
  {
    name: "address.number",
    type: "number",
    placeholder: "Enter house number",
    label: "House Number",
  },
  {
    name: "address.zipcode",
    type: "text",
    placeholder: "Enter ZIP code",
    label: "ZIP Code",
  },
  {
    name: "phone",
    type: "text",
    placeholder: "Enter your phone number",
    label: "Phone Number",
  },
] as const;

type FieldNames = (typeof formFields)[number]["name"];

// Utility function to get nested properties
// from an object using a dot-separated path
// This is a simple implementation and may not cover all edge cases
// It is used to access nested properties in the errors object
// in a more readable way
// and to avoid TypeScript errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dotGetter = (obj: any, path: FieldNames) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj) as
    | FieldError
    | undefined;
};

const UserInfoForm = ({ onSubmit, user }: UserInfoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserInfoFormData>({
    resolver: zodResolver(buyerSchema),
    defaultValues: user || {},
  });

  useEffect(() => {
    if (user) {
      reset({
        ...user,
      });
    }
  }, [user, reset]);

  return (
    <form
      className="flex flex-col gap-4 max-w-3xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">User Data</h2>
      {formFields.map((field, index) => {
        return (
          <div key={index}>
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <input
              {...register(field.name as keyof UserInfoFormData, {
                valueAsNumber: field.type === "number",
              })}
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
            {dotGetter(errors, field.name) && (
              <p className="text-rose-500 text-sm mt-1">
                {dotGetter(errors, field.name)?.message}
              </p>
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="w-full p-3 bg-gray-700 text-white rounded-md cursor-pointer  hover:bg-gray-600 transition duration-300"
      >
        Next Step
      </button>
    </form>
  );
};

export default UserInfoForm;
