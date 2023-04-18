export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return <div className="flex items-center min-h-[90vh]">{children}</div>;
}
