document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("blog-form");
    const blogsContainer = document.getElementById("blogs");
    let isEditing = false; // Flag to indicate edit mode
  
    // Fetch and display blogs on page load
    fetchBlogs();
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const id = document.getElementById("blog-id").value;
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
  
      const blog = { title, content };
  
      if (isEditing) {
        // Update existing blog
        updateBlog(id, blog);
      } else {
        // Create new blog
        createBlog(blog);
      }
  
      // Reset form and edit flag
      form.reset();
      isEditing = false;
    });
  
    async function fetchBlogs() {
      const response = await fetch("/api/blogs");
      const blogs = await response.json();
      displayBlogs(blogs);
    }
  
    function displayBlogs(blogs) {
      blogsContainer.innerHTML = "";
      blogs.forEach(blog => {
        const blogDiv = document.createElement("div");
        blogDiv.classList.add("blog");
        blogDiv.innerHTML = `
          <h2>${blog.title}</h2>
          <p>${blog.content}</p>
          <button onclick="editBlog(${blog.id}, '${blog.title}', '${blog.content}')">Edit</button>
          <button onclick="deleteBlog(${blog.id})">Delete</button>
        `;
        blogsContainer.appendChild(blogDiv);
      });
    }
  
    async function createBlog(blog) {
      await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(blog)
      });
      fetchBlogs();
    }
  
    async function updateBlog(id, blog) {
      await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(blog)
      });
      fetchBlogs();
    }
  
    async function deleteBlog(id) {
      await fetch(`/api/blogs/${id}`, {
        method: "DELETE"
      });
      fetchBlogs();
    }
  
    window.editBlog = function (id, title, content) {
      document.getElementById("blog-id").value = id;
      document.getElementById("title").value = title;
      document.getElementById("content").value = content;
      isEditing = true; // Set edit flag to true
    };
  
    window.deleteBlog = deleteBlog;
  });