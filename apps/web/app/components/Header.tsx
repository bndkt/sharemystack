import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="text-center font-bold text-white pt-32">
      <Logo className="w-16 inline-block" />
      <h1 className="mt-4">
        <a href="/">Share My Stack</a>
      </h1>
    </header>
  );
}
