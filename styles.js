/** @format */

// Addblog codes

var document = document
  .querySelector("form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Retrieve the form data
    const subject = document.querySelector(
      "input[placeholder='Enter blog subject']"
    ).value;
    const category = document.getElementById("options").value;
    const tags = document.getElementById("tags").value;
    const content = document.querySelector("textarea").value;

    // Create a blog object
    const blogPost = {
      subject,
      category,
      tags,
      content,
      date: new Date().toLocaleString(),
    };

    // Get existing blogs from localStorage
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push(blogPost);

    // Save the updated blogs back to localStorage
    localStorage.setItem("blogs", JSON.stringify(blogs));

    // Optionally reset the form
    document.querySelector("form").reset();

    alert("Blog published successfully!");
  });

// posts codes

// Retrieve stored blogs from localStorage
const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

// Reference to the container where posts will be displayed
const postsContainer = document.querySelector(".page-container");

if (blogs.length > 0) {
  blogs.forEach((blog) => {
    // Create a blog post element
    const blogItem = document.createElement("div");
    blogItem.className = "blog-item";
    blogItem.innerHTML = `
        <div class="blog-meta">
          <span class="category">Category: ${blog.category}</span>
          <h3 class="blog-title">${blog.subject}</h3>
        </div>
        <p class="blog-desc">${blog.content.slice(0, 100)}...</p>
        <div class="post-actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
          <button class="comment-btn">Comment</button>
          <a href="full-post.html" class="read-more-btn">Read More</a>
        </div>
      `;
    postsContainer.appendChild(blogItem);
  });
} else {
  // Message when no posts are available
  postsContainer.innerHTML +=
    "<p>No blogs available. Please add one from the Add Blog page.</p>";
}
