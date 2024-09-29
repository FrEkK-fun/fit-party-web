const devBackendURL = import.meta.env.VITE_DEV_BACKEND_URL;
const prodBackendURL = import.meta.env.VITE_PROD_BACKEND_URL;

const backendURL =
	import.meta.env.MODE === "production" ? prodBackendURL : devBackendURL;

export default backendURL;
