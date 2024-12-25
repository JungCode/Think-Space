const Types = () => {
  return (
    <div className="max-w-3xl px-5 mx-auto font-sans text-gray-800">
      <header className="pb-5 mb-10 text-center border-b-4 border-green-500">
        <h1 className="text-4xl font-bold text-gray-900">
          Types of Content Blocks
        </h1>
        <p className="text-lg text-gray-600">
          Learn how to structure your content effectively
        </p>
        <iframe
          width="800"
          height="450"
          src="https://www.youtube.com/watch?v=BZnR2Ml17sc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="mx-auto mt-5 rounded shadow-lg"
        ></iframe>
      </header>

      <main>
        <section className="mb-8">
          <h2 className="pl-2 mb-4 text-2xl font-semibold text-purple-700 border-l-4 border-purple-500">
            Header Blocks
          </h2>
          <p className="mb-4 text-lg">
            Header blocks serve as the title or introduction for sections of
            your content. They help in organizing the structure and grabbing
            attention.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="pl-2 mb-4 text-2xl font-semibold text-orange-700 border-l-4 border-orange-500">
            Text Blocks
          </h2>
          <p className="mb-4 text-lg">
            Text blocks are used to convey detailed information. They can vary
            in size and style to suit the context of your content.
          </p>
          <ul className="p-4 space-y-2 list-disc list-inside bg-gray-100 rounded">
            <li>
              <strong>Paragraphs:</strong> Ideal for storytelling and detailed
              descriptions.
            </li>
            <li>
              <strong>Bullet Points:</strong> Great for listing key points in a
              concise format.
            </li>
            <li>
              <strong>Quotes:</strong> Use for highlighting inspirational or
              important statements.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="pl-2 mb-4 text-2xl font-semibold text-teal-700 border-l-4 border-teal-500">
            Image and Video Blocks
          </h2>
          <p className="mb-4 text-lg">
            These blocks enhance visual appeal and provide additional context to
            your text. They are crucial for engaging your audience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="pl-2 mb-4 text-2xl font-semibold text-red-700 border-l-4 border-red-500">
            Call-to-Action Blocks
          </h2>
          <p className="mb-4 text-lg">
            Call-to-action (CTA) blocks are designed to guide users towards a
            specific action, such as signing up, making a purchase, or exploring
            more content.
          </p>
          <ul className="p-4 space-y-2 list-disc list-inside bg-gray-100 rounded">
            <li>
              <strong>Buttons:</strong> Direct users to the next step with
              clickable buttons.
            </li>
            <li>
              <strong>Banners:</strong> Highlight offers or important
              announcements.
            </li>
            <li>
              <strong>Forms:</strong> Collect user data effectively.
            </li>
          </ul>
        </section>
      </main>

      <footer className="pt-5 mt-10 text-center border-t-4 border-indigo-500">
        <p className="text-sm text-gray-500">
          &copy; 2024 Your Blog. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Types;
