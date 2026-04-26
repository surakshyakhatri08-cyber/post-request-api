import React from "react";
import type { FieldError } from "react-hook-form";

interface FieldGroupProps {
  icon: React.ReactNode;
  error?: FieldError;
  children: React.ReactNode;
  alignStart?: boolean;
}

export const FieldGroup = ({ icon, error, children, alignStart }: FieldGroupProps) => (
  <div className="space-y-1">
    <div className={`flex ${alignStart ? "items-start" : "items-center"} gap-4`}>
      <div className={`text-gray-400 ${alignStart ? "mt-3" : ""}`}>
        {icon}
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
    {error && (
      <p className="text-red-500 text-xs pl-10 italic font-medium">
        {error.message}
      </p>
    )}
  </div>
);