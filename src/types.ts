import { ButtonHTMLAttributes } from "react";

export type LoginResponse = {
  token: string;
};
export type AddToCartProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  selectedSize: string;
  variant?: "primary" | "secondary";
  isError?: boolean;
  setIsError: (isError: boolean) => void;
  onSuccess?: () => void;
};

//MODAL

export type ModalButton = {
  label: string;
  onClick: () => void;
  variant?: "success" | "primary" | "outline";
};

export type GenericModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  buttons: ModalButton[];
};

//MENU

export type NavItem = {
  id: string;
  title: string;
  link: string;
};

export type MobileMenuProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  items: NavItem[];
};

//PRODUCT TYPES

export type SizeProps = {
  category: string;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  variant?: "primary" | "secondary";
  isError: boolean;
  setIsError: (isError: boolean) => void;
};

export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

export type ProductCardProps = {
  product: Product;
};

export type ListProps = {
  data: Product[];
  title: string;
};

//CART TYPES

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  size: string; // api nie obsługuje
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  subtotal: number;
};

export type SendCart = {
  id: number;
  quantity: number;
  size: string;
}[];

//CHECKPOUT TYPES

export type BuyerInfo = {
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    zipcode: string;
    street: string;
    number: number;
  };
  phone: string;
  email: string;
};

export type CheckoutFormData = BuyerInfo & {
  paymentMethod: string;
  deliveryMethod: string;
};

export type OrderSummaryProps = {
  buyerInfo: BuyerInfo | null;
  paymentMethod: string | null;
  deliveryMethod: string | null;
  onSubmit: () => void;
  onBack: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  isLoading?: boolean;
};

export type CheckoutState = {
  buyerInfo: BuyerInfo | null;
  paymentMethod: string | null;
  step: number;
  deliveryMethod: string | null;
  shippingCost: number;
  orders: Order[];
};

export type Order = {
  cartItems: CartItem[];
  paymentMethod: string | null;
  deliveryMethod: string | null;
  date: string;
  id: number;
  total: number;
  status: string;
};

export type DeliveryFormData = Pick<CheckoutFormData, "deliveryMethod">;

export type DeliveryFormProps = {
  onSubmit: (data: DeliveryFormData) => void;
  onBack: () => void;
};

export type UserInfoFormData = Omit<
  CheckoutFormData,
  "paymentMethod" | "deliveryMethod"
>;

export type UserInfoFormProps = {
  onSubmit: (data: UserInfoFormData) => void;
  user?: UserInfoFormData;
};

export type StepNavigationProps = {
  currentStep: number;
};

export type PaymentFormData = Pick<CheckoutFormData, "paymentMethod">;

export type PaymentFormProps = {
  onSubmit: (data: PaymentFormData) => void;
  onBack: () => void;
};

export type ThemeState = {
  theme: "light" | "dark";
};

//BUTTON

export type ButtonProps = {
  variant?: "primary" | "success" | "outline";
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
