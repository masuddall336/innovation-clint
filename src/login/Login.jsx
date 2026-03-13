import { useContext } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../firebase/AuthContext";

const Login = () => {
  const { singInUser } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    singInUser(email, password)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back ${res.user.email}`,
          confirmButtonColor: "#2e2a2a",
        });
        form.reset();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-5 pt-[10%]">
      <div className="flex flex-col md:flex-row items-center gap-10 bg-white shadow-lg p-10 rounded-xl">

        {/* Left Side - Login Form */}
        <div className="w-80">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Input your Email"
                className="border p-2 w-full rounded mt-1"
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Input your Password"
                className="border p-2 w-full rounded mt-1"
              />
            </div>

            <input
              type="submit"
              value="Login"
              className="bg-[#2e2a2a] w-full py-2 text-white rounded cursor-pointer hover:bg-black transition"
            />
          </form>
        </div>

        {/* Right Side - React Animation */}
        <motion.div
          className="w-80 h-80 flex items-center justify-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="bg-[#2e2a2a] text-white p-10 rounded-2xl shadow-xl text-center"
          >
            <h3 className="text-xl font-bold mb-3">Welcome Back 👋</h3>
            <p>Please login to continue</p>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Login;