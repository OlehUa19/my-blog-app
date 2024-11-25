const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("posts");

const API_URL = "/api/posts";

async function fetchPosts() {
    const res = await fetch(API_URL);
    const posts = await res.json();

    postsContainer.innerHTML = "";
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <small>Автор: ${post.author}</small>
            <div class="post-actions">
                <button onclick="editPost(${post.id})">Редагувати</button>
                <button onclick="deletePost(${post.id})">Видалити</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}


postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const author = document.getElementById("author").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, author }),
    });

    postForm.reset();
    fetchPosts();
});


async function deletePost(id) {
    await fetch(`${API_URL}/${id}`, { method: "delete" });
    fetchPosts();
}


async function editPost(id) {
    const title = prompt("Новий заголовок:");
    const description = prompt("Новий опис:");
    const author = prompt("Новий автор:");

    if (title && description && author) {
        await fetch(`${API_URL}/${id}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, author }),
        });
        fetchPosts();
    }
}


fetchPosts();
