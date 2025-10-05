import { redirect } from 'next/navigation';
import { requireAdminAuth } from '../../lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Skip auth check for login page to avoid redirect loop
  // The middleware will handle auth for other admin routes
  
  return <>{children}</>;
}
