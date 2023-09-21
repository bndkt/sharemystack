import { Logo } from "../Logo";

export function SplashScreen() {
  return (
    <div className="flex w-full h-full items-center justify-center text-white bg-sms-500">
      <Logo className="w-1/4" />
    </div>
  );
}
