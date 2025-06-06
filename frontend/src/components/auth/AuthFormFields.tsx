import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
//import { Fragment } from "react";

interface AuthFormFieldsProps {
  mode: "login" | "register";
}

export default function AuthFormFields({ mode }: AuthFormFieldsProps) {
  return (
    <>
      {/* Phone */}
      <div>
        <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Số điện thoại
        </Label>
        <Input id="phone" type="tel" className="mt-1 w-full bg-gray-100" autoFocus />
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mật khẩu
        </Label>
        <Input id="password" type="password" className="mt-1 w-full bg-gray-100" />
      </div>

      {/* If registering, show “Confirm Password” */}
      {mode === "register" && (
        <div>
          <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Nhập lại mật khẩu
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            className="mt-1 w-full bg-gray-100"
          />
        </div>
      )}
    </>
  );
}
