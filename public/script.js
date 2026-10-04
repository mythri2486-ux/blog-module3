const API = "/api";


// ======================================
// LOAD ALL BLOGS
// ======================================

async function loadBlogs() {

    const blogsContainer = document.getElementById("blogs");

    if (!blogsContainer) {
        return;
    }

    try {

        const response = await fetch(`${API}/blogs`);

        const blogs = await response.json();

        if (blogs.length === 0) {
            blogsContainer.innerHTML = "<p>No blogs available.</p>";
            return;
        }

        blogsContainer.innerHTML = "";

        blogs.forEach(blog => {

            const card = document.createElement("div");

            card.className = "blog-card";

            card.innerHTML = `
                <h3>${blog.title}</h3>

                <p>${blog.content}</p>

                <p>
                    <strong>Author:</strong>
                    ${blog.author ? blog.author.name : "Unknown"}
                </p>

                <a href="blog.html?id=${blog._id}">
                    Read More
                </a>
            `;

            blogsContainer.appendChild(card);
        });

    } catch (error) {

        console.error(error);

        blogsContainer.innerHTML =
            "<p>Unable to load blogs.</p>";
    }
}


// ======================================
// LOAD BLOGS WHEN PAGE OPENS
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    loadBlogs();

});