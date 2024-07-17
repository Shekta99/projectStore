import { loginRequest, profileRequest } from "../api/auth";
import { useAuthStore } from "../store/auth";
import { Link, useNavigate } from "react-router-dom";
import '../styles/pages/login.css';

const LoginPage: React.FC = () => {
    
  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);
  
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

        const resLogin = await loginRequest(email, password);
        setToken(resLogin.data.token);

        const resProfile = await profileRequest();
        setProfile(resProfile.data);

        navigate("/home");
    };



    return (
        <div className="flex h-[calc(100vh-150px)] items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="container"
      >
        <h1 className="text-white text-center myLoginTittle">LOGIN</h1>

        <div className="row pt-5 justify-content-center align-items-center container mb-5">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="user@mail.com"
          className="myLoginInput"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="********"
          className="myLoginInput"
        />
        </div>
        <div className="loginButtonContainer mb-5">
        <div>
          <button className="btn">
        <strong>lOGIN</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>

          <div id="glow">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </button>
        </div>
       
        </div>
        <p className="text-center">
          Don't Have an Account?{" "}
          <Link to="/register" className="text-indigo-100 font-bold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
    }

export default LoginPage;