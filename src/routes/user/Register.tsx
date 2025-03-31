import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddUserToApi } from "../../api";

const schema = z.object({
  username: z.string().min(3, "Username should contain at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password should contain at least 6 characters"),
  name: z.object({
    firstname: z.string().min(2, "First name is required"),
    lastname: z.string().min(2, "Last name is required"),
  }),

  address: z.object({
    city: z.string().min(2, "City is required"),
    street: z.string().min(2, "Street is required"),
    number: z.number().positive("House number is required"),
    zipcode: z.string().regex(/^\d{5}$/, "ZIP code must be 5 digits"),
  }),
  phone: z.string().min(9, "Phone number must be at least 9 digits"),
});

export type UserData = z.infer<typeof schema>;

const formFields = [
  {
    name: "username",
    type: "text",
    placeholder: "Enter your username",
    label: "Username",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
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
];

const Register = () => {
  const { mutate, isLoading, isError, isSuccess } = useAddUserToApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: UserData) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log("User added:", response.id); // Sprawdź odpowiedź z API
        alert(`User created! ID: ${response.id}`);
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 p-12 justify-center items-center">
      <h2>Register Form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto w-full p-4 flex flex-col gap-4"
      >
        {formFields.map((field, index) => {
          return (
            <div key={index}>
              <label htmlFor={field.name} className="text-gray-700">
                {field.label}
              </label>
              <input
                {...register(field.name as keyof UserData, {
                  valueAsNumber: field.type === "number",
                })}
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors[field.name as keyof UserData] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name as keyof UserData]?.message as string}
                </p>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-3 bg-blue-500 text-white rounded-md"
        >
          {isLoading ? "Submitting..." : "Create User"}
        </button>

        {isError && (
          <p className="text-red-500 mt-4">
            An error occurred while creating the user.
          </p>
        )}
        {isSuccess && (
          <p className="text-green-500 mt-4">User created successfully!</p>
        )}
      </form>
    </div>
  );
};

export default Register;
