import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { LoginAPI } from "../../user";
import { useAppDispatch } from "../../store/store";
import { addError } from "../../store/errorSlice";
import Public from "../Navbar/PublicNavbar";
import { loginAction } from "../../store/userSlice";
import { DescriptionAlerts } from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be atleast 8 characters long")
    .required("Password is required"),
});

export default function Login() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      LoginAPI({
        email: values.email,
        password: values.password,
      })
        .then((data) => {
          dispatch(loginAction(data));
          console.log(data)
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token",data.token);
          navigate("/");
        })
        .catch((error: any) => {
          const message = error.response.data.message;
          dispatch(addError(message));
        });
    },
  });
  return (
    <div>
      <Public />
 <DescriptionAlerts />
      <div className="mt-30 max-w-md mx-auto h-auto bg-white p-6 rounded-xl shadow-lg  border border-gray-200">
        <form onSubmit={formik.handleSubmit} className=" ">
          <div>
            <div>
              <h1 className="font-semibold text-black-800 text-center text-2xl">
                {" "}
                Login{" "}
              </h1>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                placeholder=" Email"
                className="border-neutral-300 rounded border mr-50 h-10 mt-8 w-full pl-1"
              ></input>
              {formik.touched.email && formik.errors.email && (
                <span className="text-xs text-red-500">
                  {formik.errors.email}
                </span>
              )}
            </div>
            <div>
              <input
                type="password"
                {...formik.getFieldProps("password")}
                placeholder="  Password"
                className=" border-neutral-300 rounded border mr-50 h-10 mt-8 w-full pl-1"
              ></input>
              {formik.touched.password && formik.errors.password && (
                <span className="text-xs text-red-500">
                  {formik.errors.password}
                </span>
              )}
            </div>
            <button className="text-center text-white font-bold rounded mt-8 mr-85  h-10 w-full bg-gradient-to-tr from-blue-500 to-teal-500 opacity-200  ">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
