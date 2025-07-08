import React, { useState } from "react";
import BloodbankSignup from "../Component/Singup/BloodbankSignup";
import Singup from "../Component/Singup/UserSingup";
import Log from "../Component/Singup/log";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [bloodbank, setBloodbank] = useState(false);

  const goto = () => {
    setIsSignUp(!isSignUp);
  };

  const gotoBloodBank = () => {
    setBloodbank(!bloodbank);
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-8 overflow-auto">
        {isSignUp ? (
          // login In
          <Log goto={goto} />
        ) : !bloodbank ? (
          // Sign Up for User
          <Singup gotoBloodBank={gotoBloodBank} goto={goto} />
        ) : (
          <BloodbankSignup gotoBloodBank={gotoBloodBank} goto={goto} />
        )}
      </div>
    </div>
  );
}
