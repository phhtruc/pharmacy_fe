import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login as loginApi } from "../services/authService";
import { useAuth } from "../utils/AuthContext";
import { isAuthenticated } from "../utils/auth";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");
  const { login } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const validationSchema = Yup.object({
    username: Yup.string().required("Tài khoản là bắt buộc"),
    password: Yup.string().required("Mật khẩu là bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await loginApi(values.username, values.password);

        // Truyền tokens cho AuthContext
        login({
          accessToken: response.data.data.accessToken,
          refreshToken: response.data.data.refreshToken,
        });
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage("Tài khoản hoặc mật khẩu không đúng.");
        toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Đăng nhập</h2>
          {errorMessage && (
            <div className="alert alert-danger text-center">{errorMessage}</div>
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
                placeholder="Nhập tên đăng nhập"
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
              {formik.isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </form>
          <p className="text-center mt-3">
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
