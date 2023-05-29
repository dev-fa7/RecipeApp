import { Login } from "../components/Login";
import { Register } from "../components/Register";

export const Auth = () => {
    document.querySelector("title").innerHTML = "MyRecipoo - Login/Register";
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    );
}