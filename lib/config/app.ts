export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME?.trim() || "Business Admin",
  companyName:
    process.env.NEXT_PUBLIC_COMPANY_NAME?.trim() || "Your Company",
  description:
    "A reusable business management platform for customers, leads, and daily operations.",
  version: "0.1.0",
  signUpEnabled: process.env.NEXT_PUBLIC_SIGN_UP_ENABLED !== "false",
} as const;
