import React, { useState } from "react";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function LogIn() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const UserValues = useSelector((state) => state);
  const Navigate = useNavigate();
  const handleLogin = () => {
    localStorage.setItem("Current", username);

    const userFilter = UserValues.user.users.filter(
      (val) => val?.username == username
    );
    const userPasswordFilter = UserValues.user.users.filter(
      (val) => val?.password == password
    );
    if (
      userFilter[0]?.username == username &&
      userPasswordFilter[0]?.password == password
    ) {
      Navigate("/weather");
    } else {
      alert("Email Id Or Password Is Incorrect");
    }
  };
  return (
    <div>
      <section className="gradient-form h-full bg-white dark:bg-neutral-700">
        <div className="container h-full p-24">
          <div className="flex h-full flex-wrap items-center justify-center ">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg ">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <div className="text-center">
                        <img
                          className="mx-auto w-48"
                          src="https://hugeitsolutions.com/images/logo/HugeLogo.png"
                          alt="logo"
                        />
                        <h4 className="mb-12 mt-1 pb-1 mr-4 text-xl font-semibold ">
                          Huge Weather App
                        </h4>
                      </div>

                      <div>
                        <p className="mb-4">Please login to your account</p>
                        <Input
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Username"
                          className="mb-4"
                        />
                        <Input.Password
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="mb-4"
                        />
                        
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <Button
                            onClick={handleLogin}
                            type="primary"
                            className="mb-3 inline-block bg-black w-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase"
                          >
                            Log in
                          </Button>
                          <a href="/signup">Don't have an account?</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none">
                    <div className="px-4 py-6 text-black md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-semibold">
                        Welcome To Huge Weather
                      </h4>
                      <p className="text-sm">
                        "Stay ahead of the elements with Huge Weather, your
                        ultimate companion for accurate forecasts. From sunny
                        skies to stormy conditions, we've got you covered. Plan
                        your day with confidence, powered by our reliable
                        updates. Download Huge Weather now for seamless weather
                        tracking!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LogIn;
