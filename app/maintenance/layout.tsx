export const metadata = {
  title: 'Site Unavailable',
  robots: 'noindex, nofollow',
};

export default function MaintenanceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
