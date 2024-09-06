import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center items-center gap-3 mb-6">
            <h1 className="text-3xl font-semibold text-gray-700">
              {t("CreateAccount")}
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                {t("FullName")}
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                {...register("fullName", {
                  required: t("FullNameRequired"),
                  minLength: {
                    value: 6,
                    message: t("FullNameMinLength"),
                  },
                })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-hovermain focus:ring-1 focus:ring-hovermain focus-visible:outline-none transition-colors"
                aria-label={t("FullName")}
                aria-required="true"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {t("EmailAddress")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                {...register("email", {
                  required: t("EmailRequired"),
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: t("InvalidEmail"),
                  },
                })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-hovermain focus:ring-1 focus:ring-hovermain focus-visible:outline-none transition-colors"
                aria-label={t("EmailAddress")}
                aria-required="true"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {t("Password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                {...register("password", {
                  required: t("PasswordRequired"),
                  minLength: {
                    value: 6,
                    message: t("PasswordMinLength"),
                  },
                })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-hovermain focus:ring-1 focus:ring-hovermain focus-visible:outline-none transition-colors"
                aria-label={t("Password")}
                aria-required="true"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                {t("ConfirmPassword")}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: t("ConfirmPasswordRequired"),
                  validate: (value) =>
                    value === watch("password") || t("PasswordsNotMatch"),
                })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-hovermain focus:ring-1 focus:ring-hovermain focus-visible:outline-none transition-colors"
                aria-label={t("ConfirmPassword")}
                aria-required="true"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-btncolor text-white font-semibold rounded-md shadow-md hover:bg-hovermain-light transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hovermain"
              >
                {t("SignUp")}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              {t("AlreadyHaveAccount")}{" "}
              <Link
                to="/login"
                className="ml-1 text-hovermain hover:text-hovermain font-semibold transition-colors"
              >
                {t("Login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
