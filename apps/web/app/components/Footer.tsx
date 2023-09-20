import { Link } from "@remix-run/react";
import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { TextField } from "~/components/Fields";
import { Logo } from "~/components/Logo";
import { NavLinks } from "~/components/NavLinks";
import qrCode from "~/images/qr-code.svg";
import { config } from "~/lib/config";

function QrCodeBorder(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-900">
              <Logo className="h-10 w-10 flex-none text-sms-500" />
              <div className="ml-4">
                <p className="text-base font-semibold">{config.name}</p>
                <p className="mt-1 text-sm">{config.tagline}</p>
              </div>
            </div>
            <nav className="mt-11 flex gap-8">
              <NavLinks
                links={[
                  ["Roadmap", "https://sharemystack.com/roadmap"],
                  ["Changelog", "https://sharemystack.com/terms"],
                  ["Imprint", "https://feld.app/imprint"],
                  ["Privacy", "https://feld.app/privacy"],
                  ["Terms", "https://feld.app/terms"],
                ]}
              />
            </nav>
          </div>
          {config.appStoreLink ? (
            <div className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors hover:bg-gray-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
              <div className="relative flex h-24 w-24 flex-none items-center justify-center">
                <QrCodeBorder className="absolute inset-0 h-full w-full stroke-gray-300 transition-colors group-hover:stroke-sms-500" />
                <img src={qrCode} alt="" />
              </div>
              <div className="ml-8 lg:w-64">
                <p className="text-base font-semibold text-gray-900">
                  <Link to={config.appStoreLink}>
                    <span className="absolute inset-0 sm:rounded-2xl" />
                    Download the app
                  </Link>
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  Scan the QR code to download the app from the App Store.
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">
          <form
            id="newsletter"
            className="flex w-full justify-center md:w-auto"
            action="https://app.convertkit.com/forms/5438278/subscriptions"
            method="post"
            data-sv-form="5438278"
            data-uid="f260b979da"
            data-format="inline"
            data-version="5"
            data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
          >
            <TextField
              type="email"
              aria-label="Email address"
              placeholder="Email address"
              autoComplete="email"
              required
              className="w-60 min-w-0 shrink"
              name="email_address"
            />
            <Button type="submit" color="sms" className="ml-4 flex-none">
              Join waitlist
            </Button>
          </form>
          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            &copy; {new Date().getFullYear()} feld.app OÜ. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
