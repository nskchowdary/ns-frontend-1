import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setItem, getItem } from "../utilities/common/index";
import "../assets/scss/LoginPage/LoginPage.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginPage = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const user = getItem("loggedIn");
    if (user) {
      navigate("/");
    }
  }, []);
  const handleLoginForm = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErr("enter User Name & Password");
    }
    if (username === "neosilica" && password === "123456") {
      setItem("loggedIn", true);
      navigate("/");
    } else {
      setErr("*Invalid Email or Password");
    }
  };
  return (
    <>
      <Container fluid className="outer_Fluid_Container">
        <Row className="outer_Container">
          <Col className="inner_img_Container p-0">
            <img className="login_image" src="/login-img.png" alt="" />
          </Col>
          <Col className="inner_form_container">
            <div className="logo-container">
              <div>
                <img className="logo-image" src="/logo512.png" alt="" />
              </div>
              <div className="logo-content">
                <h2>Welcome</h2>
                <h6>Please login to your account</h6>
              </div>
            </div>
            <Form className="form_input_field" onSubmit={handleLoginForm}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  placeholder="eg- neosilica@gmail.com"
                  type="Email"
                  className="login__input"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>
              {err && (
                  <p style={{ color: "red"}}>
                    {err}
                  </p>
                )}
              <Form.Group className="mb-4 " controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  className="login__input"
                  placeholder="***********"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Button
                className="submit_button mb-4"
                variant="primary"
                type="submit"
              >
                Login
              </Button>
              <div className="terms_condition">
                <a href="" className="terms">Terms and Conditions & Privacy Policy</a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
    //  <div className="login-MainDiv">
    //    <div className="container">
    //      <div className='container_image'>
    //        <img className='login_image' src='/login-img.png' alt='' />
    //      </div>
    //      <div className="screen">
    //        <div className="screen__content">
    //          <div className='logo-container'>
    //            <div>
    //              <img className='logo-image' src='/logo512.png' alt='' />
    //            </div>
    //            <div className='logo-content'>
    //              <h2>Welcome</h2>
    //              <h6>Please login to your account</h6>
    //            </div>
    //          </div>
    //          <form onSubmit={handleLoginForm} className="login">
    //            <div className="login__field">
    //              {err && <p style={{ color: 'red' }}>{err}</p>}
    //              {/* <i className="login__icon fas fa-user" /> */}
    //              <input
    //                type="text"
    //                className="login__input"
    //                placeholder="User name / Email"
    //                value={username}
    //                onChange={(e) => {
    //                  setUsername(e.target.value)
    //                }}
    //              />
    //            </div>
    //            <div className="login__field">
    //              {/* <i className="login__icon fas fa-lock" /> */}
    //              <input
    //                type="password"
    //                className="login__input"
    //                placeholder="Password"
    //                value={password}
    //                onChange={(e) => {
    //                  setPassword(e.target.value)
    //                }}
    //              />
    //            </div>
    //            <button type="submit" className="button login__submit">
    //              <span className="button__text">Log In Now</span>
    //              {/* <i className="button__icon fas fa-chevron-right" /> */}
    //            </button>
    //            <div className='terms-condition'><span><a href='terms_cond' id='ipos'>Terms and Conditions & Privacy Policy</a></span></div>
    //          </form>
    //        </div>
    //        {/* <div className="screen__background">
    //          <span className="screen__background__shape screen__background__shape4" />
    //          <span className="screen__background__shape screen__background__shape3" />
    //          <span className="screen__background__shape screen__background__shape2" />
    //          <span className="screen__background__shape screen__background__shape1" />
    //        </div> */}
    //      </div>
    //    </div>
    //  </div>
  );
};
export default LoginPage;
