import { useForm } from "react-hook-form";
import { errorMessages } from "../../../shared/constants/error-messages";
import { regexPatterns } from "../../../shared/constants/regex-patterns";
import { signupFormValues } from "../../interfaces/auth-interface";
import AuthService from "../../services/auth-service";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../shared/utils/error-handler";
import { useNavigate } from "react-router-dom";


function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<signupFormValues>();

  const onSubmit = async (data: signupFormValues) => {
    try {
      const response = await AuthService.signup(data);
      toast.success(response.message);
      reset();
      navigate('/login');
    } catch (err: any) {
      const message = getErrorMessage(err);
      toast.error(message);
    }
  };

  const password = watch("password");

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
                <label>Name</label>
                <input
                  className="form-control input"
                  type="text"
                  {...register("name", { required: errorMessages.required })}
                />
                {errors.name && (
                  <span className="error">{errors.name.message}</span>
                )}
              </div>
            </div>
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
                <label>
                  Password
                  <img
                    className="info"
                    src="/images/info.svg"
                    alt="Info"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Password must be at least 8 characters long and include at least one letter, one number, and one special character"
                  />
                </label>
                <input
                  className="form-control input"
                  type="password"
                  {...register("password", {
                    required: errorMessages.required,
                    pattern: {
                      value: regexPatterns.password,
                      message: errorMessages.validPassword,
                    },
                  })}
                />
                {errors.password && (
                  <span className="error">{errors.password.message}</span>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label>Confirm Password</label>
                <input
                  className="form-control input"
                  type="password"
                  {...register("confirmPassword", {
                    required: errorMessages.required,
                    validate: (value) =>
                      value === password || errorMessages.matchPassword,
                  })}
                />
                {errors.confirmPassword && (
                  <span className="error">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
            <div className="row footer">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
              <a className="mt-3 create-account-link" href="/login">Have an account? Login here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
