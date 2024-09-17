import { useState } from "react";

import { MainBody } from "./main-body";
import { Sidebar } from "./sidebar/sidebar";

export function Body() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div
      className={`m-0 flex justify-center py-8 md:m-14 ${isSidebarOpen ? "px-0" : "px-4"}`}
    >
      <main className="relative flex size-full space-x-3 md:h-auto md:min-h-screen">
        <div
          className={`md:static md:z-0 md:mr-14 md:block md:size-auto md:flex-none md:border-none ${isSidebarOpen ? "" : "hidden"} absolute -top-72 z-20 h-fit w-full rounded-lg border-t-2 border-gray-300 bg-white`}
        >
          <Sidebar toggleSidebar={toggleSidebar} />
        </div>
        <section className={`${!isSidebarOpen ? "" : "hidden"} md:block `}>
          <MainBody toggleSidebar={toggleSidebar} />
        </section>  
      </main>
    </div>
  );
}
