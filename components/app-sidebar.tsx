"use client";

import { Calendar, Folder, Home, Inbox, Kanban, Notebook, Paperclip, Pencil, PuzzleIcon, Search, Settings, Star } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar31 } from "./calendar-31";
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Estágios",
    url: "/dashboard",
    icon: Folder,
  },
  {
    title: "Calendário",
    url: "/dashboard/calendario",
    icon: Calendar,
  },
  {
    title: "Notas",
    url: "/dashboard",
    icon: Pencil,
  },
  {
    title: "Projetos",
    url: "/dashboard",
    icon: PuzzleIcon,
  },
  {
    title: "Kanban",
    url: "/dashboard/kanban",
    icon: Kanban,
  },
  {
    title: "Meus currículos",
    url: "/dashboard/curriculos",
    icon: Paperclip,
  },
  {
    title: "Favoritos",
    url: "/dashboard/settings",
    icon: Star,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="h-screen bg-zinc-800 border-r border-white/10 backdrop-blur-lg text-white">
      <SidebarContent className="bg-zinc-800">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/50 text-sm">Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors"
                    >
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
            <SidebarGroupLabel className="text-white/50 text-sm">Eventos futuros</SidebarGroupLabel>
            <SidebarGroupContent>
                <Calendar31/>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
