import styled from "styled-components";
import Title from "../components/common/Title";
import Button from "../components/common/Button";
import { InputText } from "../components/common/InputText";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Sign } from "crypto";
import { login, signup } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { SignupStyle } from "./Signup";
import { useAuthStore } from "../store/authStore";

export interface SignupProps {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const showAlert = useAlert();

  const { isloggedIn, storeLogin, storeLogout } = useAuthStore();
  /*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
*/
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();
  // useForm은 내부적으로 사용하는 매개변수에 대한 타입을 먼저 지정받는다.

  const onSubmit = (data: SignupProps) => {
    login(data).then(
      (res) => {
        //res에는 Token

        //상태변화
        storeLogin(res.token);
        showAlert("로그인이 성공했습니다.");
        navigate("/");
      },
      (error) => {
        showAlert("로그인이 실패했습니다.");
      }
    );
  };

  return (
    <>
      <Title size="large">로그인</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholer="이메일"
              inputType="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요.</p>
            )}
          </fieldset>

          <fieldset>
            <InputText
              placeholer="비밀번호"
              inputType="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="error-text">비밀번호를 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" schema="primary">
              로그인
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
}
