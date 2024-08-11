import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header.tsx";
import { useEffect } from "react";
import { api } from "@/lib/axios.ts";
import { isAxiosError } from "axios";

export function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response.status;
          const code = error.response?.data?.code;

          if (status === 401 && code === "UNAUTHORIZED") {
            return navigate("/sign-in", { replace: true });
          }
        }
        throw error;
      },
    );
    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
