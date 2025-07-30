import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { DescriptionAlerts } from "../Alert/AlertMessage";
import { registerApi } from "../../user";
import { useAppDispatch } from "../../store/store";
import { addError } from "../../store/errorSlice";
import Public from "../Navbar/PublicNavbar";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be atleast 8 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Confirming your password is required"),
});


export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "", // Added confirmPassword to match the validation schema
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        await registerApi({
          username: values.username,
          email: values.email,
          password: values.password,
        });
        navigate("/login");
      } catch (error: any) {
        const message = error.response.data.message;
        dispatch(addError(message));
      }
    },
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white mt-30 max-h-screen w-full">
    <Public />
    <DescriptionAlerts />

    <div className="flex justify-center items-center pt-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 px-8 py-10">
        <h1 className="text-3xl font-bold text-center text-blue-900">Sign Up</h1>
        <p className="text-center text-gray-500 mt-2">Join our community now</p>

        <form onSubmit={formik.handleSubmit} className="space-y-5 mt-6">
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username"
              {...formik.getFieldProps("username")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 text-white text-lg font-semibold bg-gradient-to-tr from-blue-500 to-teal-500 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
);
}