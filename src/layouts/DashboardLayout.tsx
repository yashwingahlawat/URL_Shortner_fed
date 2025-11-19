import MainLayout from "./MainLayout";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
