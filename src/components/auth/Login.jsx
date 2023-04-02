import React, { useEffect, useState } from "react";
import AuthWrapper from "../shared/AuthWrapper";
import FormHeading from "../shared/FormHeading";
import Form from "../shared/Form";
import Button from "../shared/Button";
import Input from "../shared/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, resetState } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { user, isLoading, isSuccess, isError, message, type } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError && type === "auth/login") {
      toast.error(message);
      dispatch(resetState());
    }

    if (isSuccess && type === "auth/login") {
      console.log(user);
      navigate("/");
      dispatch(resetState());
    }

    //eslint-disable-next-line
  }, [isError, isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill all details");
    }

    dispatch(login(formData));
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <AuthWrapper>
      <div>
        <FormHeading text={"Welcome back!"} />
        <Form onSubmit={onSubmit}>
          <Input
            type={"email"}
            placeholder={"Enter email"}
            label={"Email"}
            name={"email"}
            value={email}
            onChange={onChange}
          />
          <Input
            type={"password"}
            placeholder={"Enter password"}
            label={"Password"}
            name={"password"}
            value={password}
            onChange={onChange}
          />
          <Button type={"submit"} text={isLoading ? "Loading..." : "Sign in"} />
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default Login;
