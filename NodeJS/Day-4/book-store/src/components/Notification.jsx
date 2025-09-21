function Notification({ message, type, setOpened, setMessage }) {
  const handleClick = () => {
    setMessage({ message: "", type: "" });
    setOpened(false);
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white py-8 px-10 rounded-lg flex flex-col items-center justify-center gap-8 shadow-md">
        <p
          className={`${
            type === "success" ? "text-green-500" : "text-red-500"
          } text-2xl font-bold`}
        >
          {message}
        </p>
        <button
          className={`${
            type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white px-4 py-2 rounded-lg hover:${
            type === "success" ? "bg-green-600" : "bg-red-600"
          } transition duration-200`}
          onClick={handleClick}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Notification;
