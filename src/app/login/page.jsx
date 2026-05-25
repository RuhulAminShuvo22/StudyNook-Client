"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};

const LoginPage = () => {

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const user = Object.fromEntries(formData.entries());

    try {

      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      console.log({ data, error });

      // ❌ Login Failed
      if (error) {
        toast.error(error.message || "Login Failed ❌");

        return;
      }

      // ✅ Login Success
      toast.success("Welcome back to StudyNook! 🚀", {
        style: {
          border: "1px solid #10B981",
          padding: "16px",
          color: "#1E293B",
          fontWeight: "600",
        },

        iconTheme: {
          primary: "#059669",
          secondary: "#FFF",
        },
      });

      // ✅ Redirect Home Page
      setTimeout(() => {
        router.push("/");
      }, 1200);

    } catch (err) {

      console.error(err);

      toast.error("Something went wrong!");
    }
  };

  const handleGoogleLogin = () => {

    toast.loading("Connecting with Google...", {
      id: "google-auth",
    });

    setTimeout(() => {

      toast.success(
        "Successfully logged in with Google! 🎉",
        {
          id: "google-auth",
        }
      );

    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50/40 via-white to-emerald-50/30 px-4 py-12">

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white border border-cyan-100/60 rounded-3xl shadow-xl shadow-cyan-600/5 p-8 md:p-10"
      >

        {/* Logo */}
        <motion.div
          className="flex justify-center mb-4"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src="/assets/studynook.png"
            alt="StudyNook Logo"
            className="h-40 w-auto object-contain"
          />
        </motion.div>

        {/* Heading */}
        <div className="text-center mb-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Welcome Back to{" "}
            <span className="text-emerald-600">
              StudyNook
            </span>
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 font-medium">
            Sign in to manage your quiet room bookings.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}
          <motion.div variants={itemVariants}>

            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              required
              className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all hover:border-slate-300 font-medium text-slate-800 shadow-sm"
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants}>

            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all hover:border-slate-300 font-medium text-slate-800 shadow-sm"
            />
          </motion.div>

          {/* Login Button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >

            <Button
              type="submit"
              size="lg"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-emerald-600/10 transition-colors mt-2"
            >
              Login
            </Button>
          </motion.div>
        </form>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="relative flex items-center justify-center my-6"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>

          <span className="relative px-3 bg-white text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            OR
          </span>
        </motion.div>

        {/* Google Login */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >

          <Button
            variant="bordered"
            size="lg"
            onClick={handleGoogleLogin}
            className="w-full border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50/50 font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >

            <FcGoogle className="text-lg shrink-0" />

            Continue with Google
          </Button>
        </motion.div>

        {/* Register */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-8 text-xs font-medium text-slate-500"
        >

          Do not have an account?{" "}

          <Link
            href="/register"
            className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline transition-all"
          >
            Register
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;


// "use client"

// import { authClient } from "@/lib/auth-client";
// import {
//   Button,
//   Card,
//   FieldError,
//   Form,
//   Input,
//   Label,
//   TextField,
// } from "@heroui/react";
// import { useRouter } from "next/navigation";

// const LoginPage = () => {
//   const router = useRouter();

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const user = Object.fromEntries(formData.entries());

//     const { data, error } = await authClient.signIn.email({
     
//       email: user.email,
//       password: user.password,
//     });
//     console.log({data , error})

//     if (data) {
//       router.push('/');
//     }
//     if (error) {
//       alert("Error");
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-center items-center min-h-screen">
//         <Card className="border w-96 py-8 px-6">
//           <h2 className="text-center text-2xl font-bold mb-4">
//             Login Page
//           </h2>

//           <Form className="flex flex-col gap-4" onSubmit={onSubmit} >
            
//             {/* Email */}
//             <TextField
//               isRequired
//               name="email"
//               type="email"
//               validate={(value) => {
//                 if (
//                   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
//                 ) {
//                   return "Enter a valid email";
//                 }
//                 return null;
//               }}
//             >
//               <Label>Email</Label>
//               <Input placeholder="example@gmail.com" />
//               <FieldError />
//             </TextField>

//             {/* Password */}
//             <TextField isRequired name="password" type="password">
//               <Label>Password</Label>
//               <Input placeholder="Enter password" />
//               <FieldError />
//             </TextField>

//             {/* Buttons */}
//             <div className="flex justify-center gap-2">
//               <Button className={"rounded-none w-full"} type="submit">
//                 Login
//               </Button>
//             </div>
//           </Form>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
