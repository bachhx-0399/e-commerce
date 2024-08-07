import { MainBody } from "./main-body";

export function Body() {
  return (
    <div className="mx-14 px-4 py-8">
      <main className="flex space-x-3">
        <div className="flex-none">Sidebar</div>
        <section className="flex-1">
          <MainBody />
        </section>
      </main>
    </div>
  );
}
