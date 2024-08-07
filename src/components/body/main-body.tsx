import { Card } from "./card";

export function MainBody() {
  return (
    <div className="container m-0 max-w-[948px] p-0">
      <header>Body header</header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 16 }, (_x, index) => (
          <Card key={index} />
        ))}
      </div>
    </div>
  );
}
