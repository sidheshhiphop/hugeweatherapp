import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Signup() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [prefered, setPrefered] = useState("");
  const UserValues = useSelector((state) => state);
  const [messageApi, contextHolder] = message.useMessage();
  const handleLogin = async () => {
    dispatch(
      setUser({
        username: username,
        password: password,
        prefered: prefered,
      })
    );
    messageApi.open({
      type: "success",
      content: "user created successfully",
    });
    Navigate("/login");

    setUsername("");
    setPassword("");
  };
  return (
    <div>
      {contextHolder}
      <section className="gradient-form h-full bg-white dark:bg-neutral-700">
        <div className="container h-full p-12">
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
                        <p className="mb-4">Please Create your account</p>
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
                        <Input
                          value={prefered}
                          onChange={(e) => setPrefered(e.target.value)}
                          placeholder="preferred Location"
                          className="mb-4"
                        />
                        <div class="font-bold flex justify-center">
                          {" "}
                          ! Enter your Preffered Location Spelling Correctly{" "}
                        </div>
                        <div className="mb-12 mt-2 pb-1 pt-1 text-center">
                          <Button
                            onClick={handleLogin}
                            type="primary"
                            className="mb-3 bg-black inline-block w-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase"
                          >
                            Create
                          </Button>
                          <a href="/login">Already have an account?</a>
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

export default Signup;
