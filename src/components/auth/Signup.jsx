import React, { useEffect, useState } from "react";
import AuthWrapper from "../shared/AuthWrapper";
import Form from "../shared/Form";
import Input from "../shared/Input";
import FormHeading from "../shared/FormHeading";
import Button from "../shared/Button";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register, resetState } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const { user, isLoading, isSuccess, isError, message, type } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError && type === "auth/register") {
      toast.error(message);
      if (message === "Email already exist") {
        navigate("/login");
      }

      dispatch(resetState());
    }

    if (isSuccess && type === "auth/register") {
      console.log(user);
      toast.success("Registration success");
      dispatch(resetState());
    }

    //eslint-disable-next-line
  }, [isError, isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("Please fill all details");
    }

    dispatch(register(formData));
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <AuthWrapper>
      <div>
        <FormHeading text={"Register please"} />
        <Form onSubmit={onSubmit}>
          <Input
            type={"text"}
            placeholder={"Enter name"}
            label={"Name"}
            name={"name"}
            value={name}
            onChange={onChange}
          />
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
          <Button text={isLoading ? "Loading..." : "Sign up"} />
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
