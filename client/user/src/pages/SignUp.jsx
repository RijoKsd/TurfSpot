import { Link } from "react-router-dom";
import FormField from "../components/FormField";
import useSignUpForm from "../hooks/useSignUpForm";
import  Button  from "../components/Button";

const SignUp = () => {
  const { register, handleSubmit, errors, onSubmit,loading } = useSignUpForm();
   return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              label="Name"
              name="name"
              type="text"
              register={register}
              error={errors.name}
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email}
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password}
            />
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword}
            />
            <div className="form-control mt-6">
               <Button type="submit" className="btn-primary" loading={loading}>Sign Up</Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Link to="/login" className="link link-hover">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;