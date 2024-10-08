import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, error, isLoading } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await login(email, password);
	};

	return (
		<main>
			<form className="login" onSubmit={handleSubmit}>
				<h2>Log In</h2>
				<label>Email address:</label>
				<input
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<label>Password:</label>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<button disabled={isLoading}>Log in</button>
				{error && <div className="error">{error}</div>}
				<p>
					No user?{" "}
					<span>
						<Link to="/signup">Sign up</Link>
					</span>
				</p>
			</form>
		</main>
	);
};

export default Login;
