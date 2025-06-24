"use client";

import {
  Briefcase,
  Calendar,
  Dice4,
  FileText,
  Folder,
  Home,
  Inbox,
  Kanban,
  LayoutDashboard,
  ListTodo,
  Notebook,
  Paperclip,
  Pencil,
  Puzzle,
  PuzzleIcon,
  Search,
  Settings,
  Star,
  Timer,
} from "lucide-react";
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

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Estágios", url: "/estagios", icon: Briefcase },
  { title: "Meus currículos", url: "/curriculos", icon: FileText },
];

const productivityItems = [
  { title: "Calendário", url: "/calendario", icon: Calendar },
  { title: "Kanban", url: "/kanban", icon: LayoutDashboard },
  { title: "Projetos", url: "/projetos", icon: Puzzle },
  { title: "Notas", url: "/notas", icon: Pencil },
];

const toolsItems = [
  { title: "Pomodoro", url: "/pomodoro", icon: Timer },
  { title: "Eisenhower", url: "/eisenhower", icon: ListTodo },
];

export function AppSidebar() {
  return (
    <Sidebar className="h-screen bg-zinc-900 border-r border-white/10 backdrop-blur-lg text-white">
      <SidebarContent className="bg-zinc-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-400 text-xs font-normal">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center font-medium gap-3 text-zinc-400 hover:bg-zinc-700  hover:text-zinc-400"
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
          <SidebarGroupLabel className="text-zinc-400 text-xs font-normal">
            Produtividade
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {productivityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center font-medium gap-3 text-zinc-400 hover:bg-zinc-700  hover:text-zinc-400"
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
          <SidebarGroupLabel className="text-zinc-400 text-xs font-normal">
            Ferramentas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center font-medium gap-3 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-400"
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
      </SidebarContent>
    </Sidebar>
  );
}
