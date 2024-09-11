import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/Slices/AuthSlice";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when starting login
    try {
      const result = await dispatch(
        loginUser({
          userEmail: data.userEmail,
          password: data.password,
        })
      ).unwrap();

      if (result.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      const errorMsg = error.message.includes("auth/invalid-credential")
        ? "The credentials provided are invalid. Please check your input and try again."
        : "An unexpected error occurred. Please try again later...";
      alert(errorMsg);
      console.error("Login error: ", error);
    } finally {
      setLoading(false); // Set loading to false after login attempt
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 animate-fadeIn">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center items-center gap-3 mb-6">
          <h1 className="text-3xl font-semibold text-gray-700">Sign in</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              {...register("userEmail", {
                required: "Email Address is required",
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-mainColor focus:ring-1 focus:ring-mainColor transition-colors ${
                errors.userEmail ? "border-red-500" : ""
              }`}
              aria-label="Email Address"
              aria-required="true"
            />
            {errors.userEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userEmail.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-mainColor focus:ring-1 focus:ring-mainColor transition-colors ${
                errors.password ? "border-red-500" : ""
              }`}
              aria-label="Password"
              aria-required="true"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#B48E61] text-white font-semibold rounded-md shadow-md hover:bg-mainColor-light transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainColor"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Loading..." : "Sign in"} {/* Display loading text */}
            </button>
          </div>

          {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don’t have an account?
            <Link
              to="/register"
              className="ml-1 text-mainColor hover:text-mainColor font-montserrat transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
