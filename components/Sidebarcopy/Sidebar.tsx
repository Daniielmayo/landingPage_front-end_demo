"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { usePathname, useRouter } from "next/navigation";
import { PhotoProfile } from "../PhotoProfile/PhotoProfile";
import IconHeartEmpty from "../icons/Dashboard/IconProduct";
import IconProfile from "../icons/Dashboard/IconProfile";
import IconLogout from "../icons/Dashboard/IconLogout";
import { signOut } from "next-auth/react";
import { useLocale } from "next-intl";

export const SidebarTwo = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathName = usePathname();
  const localActive = useLocale();

  const menuDashboard = [
    {
      name: "Productos",
      href: `/${localActive}/dashboard/products`,
      icon: <IconHeartEmpty />,
    },
    {
      name: "Perfil",
      href: `/${localActive}/dashboard/profile`,
      icon: <IconProfile />,
    },
  ];

  const router = useRouter();
  const handleLogout = async () => {
    localStorage.clear();
    await signOut();
    router.push(`/`);
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="md:flex flex-col rounded-br-lg border-1 border-[var(--darkGray)] text-[var(--black)]"
    >
      <PhotoProfile />
      <NavbarContent className="flex justify-start align-center">
        <NavbarBrand>
          <p
            className="text-[var-(--black)] font-bold"
            style={{
              top: "30px",
              left: "40px",
              width: "200px",
            }}
          >
            Virginia Martinez
          </p>
        </NavbarBrand>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden "
        />
      </NavbarContent>

      <NavbarContent
        className="hidden md:flex flex-col gap-10  items-start justify-start rounded-r-lg border-1 border-[var(--darkGray)] text-[var(--black)] fixed sidebar pl-2" // Added classes
        style={{
          top: "65px",
          left: 0,
          height: "calc(100vh - 65px)",
          width: "200px",
        }}
      >
        {menuDashboard.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link
              color={
                index === menuDashboard.length - 1 ? "danger" : "foreground"
              }
              href={item.href}
              passHref
              className={`w-full  pt-10 ${styles["h-[25px]"]} ${
                pathName.startsWith("/dashboard") && item.href === "/dashboard"
                  ? styles["active"]
                  : !pathName.startsWith("/dashboard") &&
                    item.href === "/dashboard/products"
                  ? styles["active"]
                  : pathName === item.href
                  ? styles["active"]
                  : ""
              }`}
            >
              <div className="flex gap-2 h-[25px] mt-3 ">
                {item.icon}
                {item.name}
              </div>
            </Link>
          </NavbarItem>
        ))}

        <div onClick={handleLogout} className={"flex h-[25px]"}>
          <IconLogout />
          <div className="flex gap-2 cursor-pointer">Log Out</div>
        </div>
      </NavbarContent>

      <NavbarMenu className="bg-[var(--white)]">
        {menuDashboard.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === menuDashboard.length - 1 ? "danger" : "foreground"
              }
              href={item.href}
              passHref
              className={`w-full ${styles["sidebar__button--item"]} ${
                pathName.startsWith("/dashboard") && item.href === "/dashboard"
                  ? styles["active"]
                  : !pathName.startsWith("/dashboard") &&
                    item.href === "/dashboard/products"
                  ? styles["active"]
                  : pathName === item.href
                  ? styles["active"]
                  : ""
              }`}
            >
              <div className="flex gap-2 h-[25px] ">
                {item.icon}
                {item.name}
              </div>
            </Link>
          </NavbarMenuItem>
        ))}

        <NavbarMenuItem className="p-[0.3rem]">
          <div onClick={handleLogout} className={`w-full flex`}>
            <IconLogout />
            <div className="flex h-[25px] ">Log Out</div>
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
