import errorIcon from "../assets/images/icon-error.svg";
import { FaSyncAlt } from "react-icons/fa";

function Error({ resetErrorBoundary }) {
  return (
    <div className="error-container flex flex-col items-center justify-center mt-24 gap-4 text-center">
      <div className="error-img">
        <img className="w-8 h-8" src={errorIcon} alt="" />
      </div>
      <h1 className="text-4xl font-bold">Something went wrong!</h1>
      <p className="text-lg">
        We couldn't connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-gray-700 cursor-pointer text-white rounded flex gap-2 items-center "
      >
        <FaSyncAlt className="w-4 h-4" />
        Retry
      </button>
    </div>
  );
}

export default Error;
