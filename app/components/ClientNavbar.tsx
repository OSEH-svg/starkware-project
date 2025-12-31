    "use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export function ClientNavbar() {
  const pathname = usePathname();
  return pathname === "/" ? <Navbar /> : null;
}
