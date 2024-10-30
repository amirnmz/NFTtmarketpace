import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const { push } = useRouter();

  if (!token) {
    push("/sign-in");
  }

  return <>{children}</>;
};
