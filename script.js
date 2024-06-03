document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('postForm');
  const postsContainer = document.getElementById('postsContainer');

  const sections = {
      home: document.getElementById('home-section'),
      createPost: document.getElementById('create-post-section'),
      viewPosts: document.getElementById('view-posts-section')
  };

  const navHome = document.getElementById('nav-home');
  const navCreatePost = document.getElementById('nav-create-post');
  const navViewPosts = document.getElementById('nav-view-posts');

  navHome.addEventListener('click', () => showSection('home'));
  navCreatePost.addEventListener('click', () => showSection('createPost'));
  navViewPosts.addEventListener('click', () => showSection('viewPosts'));

  postForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const postTitle = document.getElementById('postTitle').value;
      const postContent = document.getElementById('postContent').value;

      addPost(postTitle, postContent);
      postForm.reset();
      showSection('viewPosts');
  });

  function addPost(title, content) {
      const posts = getPosts();
      posts.push({ title, content });
      localStorage.setItem('posts', JSON.stringify(posts));
      renderPosts();
  }

  function deletePost(index) {
      const posts = getPosts();
      posts.splice(index, 1);
      localStorage.setItem('posts', JSON.stringify(posts));
      renderPosts();
  }

  function getPosts() {
      const posts = localStorage.getItem('posts');
      return posts ? JSON.parse(posts) : [];
  }

  function renderPosts() {
      postsContainer.innerHTML = '';
      const posts = getPosts();
      posts.forEach((post, index) => {
          const postElement = document.createElement('div');
          postElement.className = 'post';
          postElement.innerHTML = `
              <h3>${post.title}</h3>
              <p>${post.content}</p>
              <div class="actions">
                  <i class="fas fa-trash-alt" onclick="deletePost(${index})"></i>
              </div>
          `;
          postsContainer.appendChild(postElement);
      });
  }

  function showSection(section) {
      Object.keys(sections).forEach(key => {
          sections[key].style.display = 'none';
          sections[key].classList.remove('active');
      });
      sections[section].style.display = 'block';
      setTimeout(() => {
          sections[section].classList.add('active');
      }, 0);
  }

  window.deletePost = deletePost; // Make the deletePost function available globally

  // Show the home section by default
  showSection('home');
  renderPosts();
});