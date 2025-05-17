import { z } from "zod";

export const buyerSchema = z.object({
  name: z.object({
    firstname: z
      .string()
      .nonempty("First name is required")
      .min(2, "First name should contain at least 2 characters"),
    lastname: z
      .string()
      .nonempty("Last name is required")
      .min(2, "Last name should contain at least 2 characters"),
  }),

  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(
      /^\d{1}-\d{3}-\d{3}-\d{4}$/,
      "Phone number should have format 123-456-789"
    ),

  address: z.object({
    city: z.string().min(2, "City should contain at least 2 characters"),
    zipcode: z
      .string()
      .nonempty("Zipcode is required")
      .regex(/^\d{5}-\d{4}$/, "Postal code should have format 12345-6789")
      .min(6, "Postal code should contain at least 9 characters"),
    street: z.string().min(5, "Street should contain at least 5 characters"),
    number: z.coerce
      .number()
      .min(1, "House number should contain at least 1 character"),
  }),

  email: z
    .string()
    .nonempty("Email is required")
    .email("Email should be valid"),
});

export const paymentSchema = z.object({
  paymentMethod: z
    .string({
      required_error: "Payment method is required",
      invalid_type_error: "Payment method is required",
    })
    .min(1, "Payment method is required"),
});

export const deliverySchema = z.object({
  deliveryMethod: z
    .string({
      required_error: "Delivery method is required",
      invalid_type_error: "Delivery method is required",
    })
    .min(1, "Delivery method is required"),
});
