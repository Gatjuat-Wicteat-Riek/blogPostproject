/** @format */

// addingBlog and making it appear in the post page.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form"); // Ensure we select the correct form
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      //   retriving the data before accessing it
      const subjectInput = document.querySelector(
        "input[placeholder='Enter blog subject']"
      );
      const categorySelect = document.getElementById("options");
      const tagsInput = document.getElementById("tags");
      const contentTextarea = document.querySelector("textarea");

      if (!subjectInput || !categorySelect || !tagsInput || !contentTextarea) {
        alert("Form elements are missing or incorrect in the DOM.");
        return;
      }

      // Retrieve form data
      const subject = document.querySelector(
        "input[placeholder='Enter blog subject']"
      ).value;
      const category = document.getElementById("options").value;
      const tags = document.getElementById("tags").value;
      const content = document.querySelector("textarea").value;

      if (!subject || !category || !tags || !content) {
        alert("Please fill out all fields.");
        return;
      }

      // Create blog post object
      const blogPost = {
        subject,
        category,
        tags,
        content,
        date: new Date().toLocaleString(),
      };

      // Save to localStorage
      const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      blogs.push(blogPost);
      localStorage.setItem("blogs", JSON.stringify(blogs));

      // Reset the form
      form.reset();

      alert("Blog published successfully!");
    });
  } else {
    console.error("Form not found in the DOM.");
  }
});

// handling delete, edit and comment
function saveBlogData(index) {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const selectedBlog = blogs[index];
  localStorage.setItem("selectedBlog", JSON.stringify(selectedBlog));
}
document.addEventListener("DOMContentLoaded", () => {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const postsContainer = document.querySelector(".page-container");

  if (blogs.length > 0) {
    blogs.forEach((blog, index) => {
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
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
            <button class="comment-btn" data-index="${index}">Comment</button>
            <a href="full-post.html" class="read-more-btn" onclick="saveBlogData(${index})">Read More</a>

          </div>
        `;
      postsContainer.appendChild(blogItem);
    });

    // Function to save the blog data before navigating to the full post page

    // Add Event Listeners for Actions
    postsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-btn")) {
        handleDelete(event.target.dataset.index);
      } else if (event.target.classList.contains("edit-btn")) {
        handleEdit(event.target.dataset.index);
      } else if (event.target.classList.contains("comment-btn")) {
        handleComment(event.target.dataset.index);
      }
    });
  } else {
    // Message when no posts are available
    postsContainer.innerHTML +=
      "<p>No blogs available. Please add one from the Add Blog page.</p>";
  }

  // Delete Blog
  function handleDelete(index) {
    const confirmation = confirm("Are you sure you want to delete this post?");
    if (confirmation) {
      blogs.splice(index, 1); // Remove blog from array
      localStorage.setItem("blogs", JSON.stringify(blogs)); // Update localStorage
      location.reload(); // Reload to reflect changes
    }
  }

  // Edit Blog
  function handleEdit(index) {
    const blogToEdit = blogs[index];
    const newSubject = prompt("Edit Subject:", blogToEdit.subject);
    const newCategory = prompt("Edit Category:", blogToEdit.category);
    const newContent = prompt("Edit Content:", blogToEdit.content);

    if (newSubject && newCategory && newContent) {
      blogs[index] = {
        ...blogToEdit,
        subject: newSubject,
        category: newCategory,
        content: newContent,
      };
      localStorage.setItem("blogs", JSON.stringify(blogs)); // Update localStorage
      location.reload(); // Reload to reflect changes
    } else {
      alert("Editing was canceled or invalid input provided.");
    }
  }

  // Comment on Blog
  function handleComment(index) {
    const comment = prompt("Enter your comment:");
    if (comment) {
      blogs[index].comments = blogs[index].comments || [];
      blogs[index].comments.push(comment);
      localStorage.setItem("blogs", JSON.stringify(blogs)); // Update localStorage
      alert("Comment added successfully!");
    }
  }
});

//
//
