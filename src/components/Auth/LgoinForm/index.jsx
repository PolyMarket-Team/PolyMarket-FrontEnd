import React, { useEffect } from "react";
import useInput from "@hooks/useInput";
import { useNavigate, Link } from "react-router-dom";

import Logo from "@components/UI/Logo";
import { Button } from "@components/UI/Button";
import { Form, Label, Input, Error, LinkContainer } from "../SignupForm/style";
import { Section, Header } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { login } from "redux/modules/authSlice";
import { setNotification } from "redux/modules/notiSlice";

const LoginForm = () => {
    const dispatch = useDispatch();
    const { fetchLoginState, authMessage, isLogin } = useSelector(
        (state) => state.auth
    );

    const navigate = useNavigate();
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /(?=.*\d)(?=.*[a-z]).{8,}/;

    const {
        value: email,
        hasError: emailHasError,
        valueChangeHandler: onChangeEmail,
        inputBlurHandler: onBlurEmail,
    } = useInput((value) => emailRegex.test(value));
    const {
        value: password,
        hasError: passwordHasError,
        valueChangeHandler: onChangePassword,
        inputBlurHandler: onBlurPassword,
    } = useInput((value) => passwordRegex.test(value));

    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };
    useEffect(() => {
        dispatch(
            setNotification({
                notiState: true,
                notiType: fetchLoginState,
                notiMessage: authMessage,
            })
        );
    }, [fetchLoginState]);
    useEffect(() => {
        if (isLogin) {
            navigate("/", { replace: true });
        }
    }, [isLogin, navigate]);
    return (
        <Section>
            <Header>
                <Logo logo="color" />
            </Header>
            <Form onSubmit={formSubmitHandler}>
                <Label id="email-label">
                    <span>이메일 주소</span>
                    <div>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            onBlur={onBlurEmail}
                        />
                    </div>
                    {emailHasError && (
                        <Error>이메일 형식을 확인해주세요.</Error>
                    )}
                </Label>
                <Label id="password-label">
                    <span>비밀번호</span>
                    <div>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            onBlur={onBlurPassword}
                        />
                    </div>
                    {passwordHasError && (
                        <Error>비밀번호 형식을 확인해주세요.</Error>
                    )}
                </Label>
                <Button type="submit">로그인</Button>
            </Form>
            <LinkContainer>
                아직 회원이 아니신가요?&nbsp;
                <Link to="/signup">회원가입 하러가기</Link>
            </LinkContainer>
        </Section>
    );
};
export default LoginForm;