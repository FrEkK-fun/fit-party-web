import { useAuthContext } from "./useAuthContext";
import { usePlayerContext } from "./usePlayerContext";

export const useLogout = () => {
	const { dispatch } = useAuthContext();
	const { dispatch: dispatchPlayer } = usePlayerContext();

	const logout = () => {
		// Remove the user from local storage
		localStorage.removeItem("user");

		// Dispatch the logout action
		dispatch({ type: "LOGOUT" });
		dispatchPlayer({ type: "SET_PLAYER", payload: null });

		// Redirect to the login page
		window.location.href = "/login";
	};

	return { logout };
};
