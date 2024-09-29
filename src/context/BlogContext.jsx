import { createContext, useReducer } from "react";

const BlogContext = createContext();

const blogReducer = (state, action) => {
	switch (action.type) {
		case "SET_BLOGS":
			return action.payload;
		case "ADD_BLOG":
			return [...state, action.payload];
		case "UPDATE_BLOG":
			return state.map((blog) =>
				blog._id === action.payload._id ? action.payload : blog
			);
		case "DELETE_BLOG":
			return state.filter((blog) => blog._id !== action.payload);
		default:
			return state;
	}
};

const BlogProvider = ({ children }) => {
	const [blogs, dispatch] = useReducer(blogReducer, []);

	return (
		<BlogContext.Provider value={{ blogs, dispatch }}>
			{children}
		</BlogContext.Provider>
	);
};

export { BlogContext, BlogProvider };
