import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Orbit Admin Dashboard | Executive Management System",
  description: "Enterprise Electronics Retail Administration & Analytics for Orbit",
};

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}

