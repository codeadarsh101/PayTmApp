import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignin = async () => {
    try {
      const response = await axios.post("https://paytmapp-jora.onrender.com/api/v1/user/signin", {
        username: username,
        password: password,
      });

      const token = response.data.token;

      // Save the token in localStorage
      localStorage.setItem("token", token);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          <InputBox
            placeholder="john@gmail.com"
            label={"Email"}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          <div className="pt-4">
            <Button label={"Sign in"} onPress={handleSignin} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
