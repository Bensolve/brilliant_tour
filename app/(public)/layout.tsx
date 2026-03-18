import { NavBar } from "@/components/public/NavBar";
export default function PublicLayout({ 
    children,
}:{ 
    children: React.ReactNode
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}