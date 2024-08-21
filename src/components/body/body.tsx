import { MainBody } from "./main-body";
import { Sidebar } from "./sidebar/sidebar";

export function Body() {
  return (
    <div className="mx-14 flex justify-center px-4 py-8">
      <main className="flex space-x-3">
        <div className="mr-14 flex-none">
          <Sidebar />
        </div>
        <section className="flex-1">
          <MainBody />
        </section>
      </main>
    </div>
  );
}
