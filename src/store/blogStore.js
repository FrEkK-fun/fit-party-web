import { create } from 'zustand';

const useBlogStore = create((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
  addBlog: (blog) => set((state) => ({ blogs: [...state.blogs, blog] })),
  updateBlog: (updatedBlog) =>
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      ),
    })),
  deleteBlog: (blogId) =>
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog._id !== blogId),
    })),
}));

export default useBlogStore;
