import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Calendar31 } from "@/components/calendar-31";
import { Suspense } from "react";
import { requireAuth } from "@/lib/authMiddleware";

export default async function Page() {
  await requireAuth();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              Loading...
            </div>
          }
        >
          <header className="flex h-16 shrink-0 items-center gap-2  px-4 text-white bg-zinc-900">
            <SidebarTrigger className="-ml-1" />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 bg-zinc-900">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <Calendar31 />
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
          </div>
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
