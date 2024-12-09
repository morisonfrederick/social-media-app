function Side() {
  return (
    <div className="h-screen w-full bg-slate-200 flex items-center justify-center ">
      <div className="">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to Tiki!
        </h1>
        <p className="text-gray-600 mb-4">
          Tiki is your ultimate space to connect, share, and stay in touch with
          friends, family, and colleagues.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Why Use Tiki?
        </h2>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>
            <span className="font-bold">🌟 Instant Communication:</span> Chat
            with anyone, anytime.
          </li>
          <li>
            <span className="font-bold">📷 Share Moments:</span> Send photos,
            videos, and more.
          </li>
          <li>
            <span className="font-bold">🌐 Stay Connected:</span> Reach friends
            around the globe.
          </li>
          <li>
            <span className="font-bold">🔒 Privacy First:</span> Your chats are
            secure and private.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Get Started
        </h2>
        <ol className="list-decimal list-inside text-gray-600">
          <li>Select a contact or group to start chatting.</li>
          <li>Share your thoughts, files, or just say hello!</li>
          <li>Enjoy seamless, real-time conversations.</li>
        </ol>

        <p className="mt-6 text-gray-800 font-semibold">
          Let’s make every conversation meaningful! 💬
        </p>
      </div>
    </div>
  );
}

export default Side;
