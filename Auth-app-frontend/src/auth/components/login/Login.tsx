import { useForm } from "react-hook-form";
import { errorMessages } from "../../../shared/constants/error-messages";
import { regexPatterns } from "../../../shared/constants/regex-patterns";
import { LoginData } from "../../interfaces/auth-interface";
import { toast } from "react-toastify";
import AuthService from "../../services/auth-service";
import { getErrorMessage } from "../../../shared/utils/error-handler";


function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await AuthService.login(data);
      toast.success(response.message);
      if(response.data) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        window.location.href="/dashboard";
      }
    } catch (err: any) {
      const message = getErrorMessage(err);
      toast.error(message);
    }
  };

  return (
    <div className="container-fluid login">
      <div className="login-box">
        <div className="header mb-2">
          <img src="/images/logo.svg" alt="Logo" />
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-3">
              <div className="col-md-12">
                <label>Email</label>
                <input
                  className="form-control input"
                  type="email"
                  {...register("email", {
                    required: errorMessages.required,
                    pattern: {
                      value: regexPatterns.email,
                      message: errorMessages.validEmail,
                    },
                  })}
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label>Password</label>
                <input
                  className="form-control input"
                  type="password"
                  {...register("password", {
                    required: errorMessages.required
                  })}
                />
                {errors.password && (
                  <span className="error">{errors.password.message}</span>
                )}
              </div>
            </div>
            <div className="row footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <a className="mt-3 create-account-link" href="/signup">New to Auth App? Create an account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
