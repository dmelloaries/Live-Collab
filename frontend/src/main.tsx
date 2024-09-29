import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ClerkProvider, useAuth, SignIn, SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import App from "./App.tsx";
import HomePage from "./components/VideoCall.tsx";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

// Custom component to handle redirection for signed-in users
function RedirectIfSignedIn({ children }: { children: JSX.Element }) {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      // If user is signed in, redirect to the homepage
      navigate("/homepage");
    }
  }, [isSignedIn, navigate]);

  // Only render the children if the user is not signed in
  return !isSignedIn ? children : null;
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        baseTheme: dark,
      }}
      navigate={(to) => {
        navigate(to);
      }}
    >
      <Routes>
        <Route path="/" element={<App />} />

        {/* Redirect to homepage if signed in */}
        <Route
          path="/sign-in/*"
          element={
            <RedirectIfSignedIn>
              <SignIn
                redirectUrl="/homepage"
                path="/sign-in"
                appearance={{
                  elements: {
                    rootBox:
                      "flex h-screen w-screen justify-center items-center",
                  },
                }}
              />
            </RedirectIfSignedIn>
          }
        />

        {/* Redirect to homepage if signed in */}
        <Route
          path="/sign-up/*"
          element={
            <RedirectIfSignedIn>
              <SignUp
                redirectUrl="/homepage"
                routing="path"
                path="/sign-up"
                appearance={{
                  elements: {
                    rootBox:
                      "flex h-screen w-screen justify-center items-center",
                  },
                }}
              />
            </RedirectIfSignedIn>
          }
        />

        {/* Homepage should only be accessible when signed in */}
        <Route
          path="/homepage"
          element={
            <>
              <HomePage />
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
