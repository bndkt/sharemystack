import { Container } from "~/components/Container";

const faq = [
  [
    {
      question: "Is there a version for Android?",
      answer: (
        <>
          Right now, Share My Stack is available for iOS and macOS only. I’m
          considering to launch an Android version in the future. Feel free to
          voice your support on the{" "}
          <a
            href="https://sharemystack.canny.io/feature-requests/p/android"
            className="underline"
          >
            roadmap
          </a>
          .
        </>
      ),
    },
    {
      question: "What’s coming next?",
      answer: (
        <>
          Share My Stack will launch on the App Store and Product Hunt on
          October 8. I’m sure there will be some bugs to fix that I did’t catch
          during testing, so my first focus is stability and minor improvements.
          But I also have bigger features planned to add after the launch,
          starting with adding some statistics (e.g. popularity of tools,
          similarity of stacks) and more ways to share your stack (e.g. new
          templates for the generated images of stacks).
        </>
      ),
    },
  ],
  [
    {
      question: "I’m missing my favorite tool, can I add it?",
      answer: (
        <>
          There is a suggestion button within the app. You can also suggest new
          categories and tools via the{" "}
          <a
            href="https://sharemystack.canny.io/content-suggestions"
            className="underline"
          >
            roadmap
          </a>
          . Submissions are not automated because Share My Stack is meant to be
          a curation of the most used and loved tools on the market.
        </>
      ),
    },
    {
      question: `What is your "policy" for adding tools?`,
      answer: (
        <>
          This is a difficult question for me. I want Share My Stack to be a
          curated source of the most used and most loved tools on the market.
          This means I don’t want to overcrowd the categories with longs lists
          of very niche tools. The general approach should be to include the 20
          % of tools that cover about 80 % of the users.
        </>
      ),
    },
  ],
  [
    {
      question: "Is this app really free?",
      answer: (
        <>
          Share My Stack is totally free. It is a hobby project and not supposed
          to be a "startup." I reserve the right to add some form of
          monetization in the future, like a "Pro" plan or affiliate links, but
          the basic set of functionality will always be free. More than that,
          the entire source of code of this app will actually be available as
          open source soon (see below).
        </>
      ),
    },
    {
      question: "How was this built?",
      answer: (
        <>
          Share My Stack was build by a single indie hacker as a side project
          within four months. It is build with React Native and Expo, using
          Supabase for the backend and Tamagui for the UI. All the code will
          actually be available as open source soon. Please join the{" "}
          <a href="/#newsletter" className="underline">
            newsletter
          </a>{" "}
          if you’re interested in this.
        </>
      ),
    },
  ],
];

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{" "}
            <a href="https://bndkt.com" className="text-gray-900 underline">
              reach out to me
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faq.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
