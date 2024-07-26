import useLoginForm from "../hooks/useLoginForm";
import FormField from "../components/FormField";
import { Link } from "react-router-dom";
import Button  from "../components/Button";


const Login = () => {

  const { register, handleSubmit, errors, onSubmit } = useLoginForm();

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="form-control mt-6">
              <Button type="submit" className="btn-primary" loading={true}>
                Sign Up
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Link to="/signup" className="link link-hover">
              Don&#39;t have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
