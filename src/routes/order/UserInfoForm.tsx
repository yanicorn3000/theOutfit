import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyerSchema } from "./schems";
import { useEffect } from "react";
import { FieldError } from "react-hook-form";
import { UserInfoFormData, UserInfoFormProps } from "../../types";
import Button from "../../components/buttons/Button";

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
//funkcja pomocnicza - dostanie się do błędów: path to np. "name.firstname"; split(".") zamienia to na ["name", "firstname"];
//reduce(...) przechodzi po każdym poziomie obiektu obj (np. errors); Zwraca errors["name"]["firstname"] – czyli cały obiekt błędu
//„zejdź poziom niżej w obiekcie tylko jeśli poprzedni poziom istnieje”.

const UserInfoForm = ({ onSubmit, user }: UserInfoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserInfoFormData>({
    resolver: zodResolver(buyerSchema),
    defaultValues: user ?? {
      email: "",
      phone: "",
      name: { firstname: "", lastname: "" },
      address: { city: "", street: "", number: 0, zipcode: "" },
    },
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
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <h2 className="text-2xl dark:text-white text-gray-800 font-bold mb-4 text-center">
        User Data
      </h2>
      {formFields.map((field, index) => {
        return (
          <div key={index}>
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
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
              className="w-full mt-2 p-2 border bg-gray-50 dark:bg-gray-700 border-gray-300 rounded-md text-gray-800 dark:text-white"
            />
            {dotGetter(errors, field.name) && (
              <p className="text-rose-500 text-sm mt-1">
                {dotGetter(errors, field.name)?.message}
              </p>
            )}
          </div>
        );
      })}

      <Button type="submit" variant="primary" fullWidth className="mt-4">
        Next Step
      </Button>
    </form>
  );
};

export default UserInfoForm;
