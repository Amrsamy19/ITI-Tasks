function Notification({ message, type }) {
  return (
    <div className="fixed bottom-10 right-6 z-10 rounded-4xl transition-all duration-200">
      <div
        className={`${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } py-6 px-8 rounded-lg text-center`}
      >
        <p className="text-white text-xl font-bold">{message}</p>
      </div>
    </div>
  );
}

export default Notification;
