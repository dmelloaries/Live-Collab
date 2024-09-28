import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

function App() {
  const navigate = useNavigate();

  function handleSignInClickEvent() {
    navigate("/sign-in/");
  }

  function handleSignUpClickEvent() {
    navigate("/sign-up/");
  }
  return (
    <>
      {/* <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between"> */}
      <div
        style={{
          background: "#1C1919",
        }}
        className="h-screen"
      >
        <div className="flex flex-col items-center justify-center">
          <img
            // className="px-8 py-4"
            className="px-4 py-1 transition duration-300 ease-in-out transform hover:scale-105"
            // className="px-8 py-4 transition duration-300 ease-in-out transform hover:scale-110"
            style={{ height: "13rem", width: "18rem" }}
            src={logo}
            alt="Description"
          />
          <p
            className="m-6 font-extrabold text-center text-transparent text-2xl bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600 transition duration-300 ease-in-out transform hover:scale-105"
            style={{ height: "6rem", width: "53vw" }}
          >
            A Place to Meet, Draw, Write, Code, and Collaborate in One Stop.
          </p>
        </div>
        <div className="flex h-28 m-6 items-center justify-center space-x-44 border-secondary">
          <button
            className="text-secondary bg-gray-900 hover:text-gray-900 hover:bg-secondary hover:font-bold font-semibold py-4 px-4 rounded-lg w-28 border border-secondary transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleSignInClickEvent}
          >
            Sign In
          </button>
          <button
            className="text-secondary bg-gray-900 hover:text-gray-900 hover:bg-secondary hover:font-bold font-semibold py-4 px-4 rounded-lg w-28 border border-secondary transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleSignUpClickEvent}
          >
            Sign Up
          </button>
        </div>
      </div>
      
    </>
  );
}

export default App;
