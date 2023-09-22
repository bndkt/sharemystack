export function Builder() {
  return (
    <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <figure className="mx-auto max-w-2xl">
        <blockquote className="mt-10 text-xl font-semibold leading-8 tracking-tight text-gray-900 sm:text-2xl sm:leading-9">
          <p>
            “Thank you for checking out Share My Stack. This is a side project I built for everyone that is invested in the tools they use and that likes to share their personal stack and discover what others are using. I’m an indie hacker from Germany, currently living in Singapore. Learn more on <a href="https://bndkt.com" className="text-gray-900 underline">my blog</a>.”
          </p>
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-x-6">
          <img
            className="h-12 w-12 rounded-full bg-gray-50"
            src="/images/bndkt.jpg"
            alt=""
          />
          <div className="text-sm leading-6">
            <div className="font-semibold text-gray-900">Benedikt Müller (<a href="https://x.com/bndkt">@bndkt</a>)</div>
            <div className="mt-0.5 text-gray-600">Creator of Share My Stack</div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
