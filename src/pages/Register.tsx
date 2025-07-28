import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Tài khoản là bắt buộc")
      .matches(/^\S+$/, "Tài khoản không được chứa khoảng trắng"),
    password: Yup.string()
      .required("Mật khẩu là bắt buộc")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      roles: "CUSTOMER",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await register(values.username, values.password, [values.roles]);
        setErrorMessage("");
        setSuccessMessage("Đăng ký thành công! Chuyển hướng đến trang đăng nhập");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setSuccessMessage("");
        setErrorMessage(error.message || "Đăng ký thất bại. Vui lòng thử lại.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Đăng ký</h2>
          {errorMessage && (
            <div className="alert alert-danger text-center">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="alert alert-success text-center">
              {successMessage}
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label>Tài khoản</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.username && formik.errors.username
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Nhập tài khoản"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="invalid-feedback">{formik.errors.username}</div>
              )}
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Nhập mật khẩu"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block mt-3"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>
          <p className="text-center mt-3">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
