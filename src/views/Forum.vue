<template>
    <HeaderWeb />
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card shadow-sm rounded">
            <div class="card-header text-center">
              <h3 class="card-title text-primary font-weight-bold">Diễn đàn học tập</h3>
              <p class="text-muted">Chia sẻ kiến thức, trao đổi học tập</p>
            </div>

            <!-- Hiển thị bài viết -->
            <div class="card-body">
              <div v-for="post in posts" :key="post.id" class="post-container mb-4">
                <div class="post-header mb-3">
                  <h4>{{ post.title }}</h4>
                  <p class="text-muted">Bài viết bởi <strong>{{ post.author }}</strong> | {{ post.date }}</p>
                </div>
                <div class="post-content mb-3">
                  <p>{{ post.content }}</p>
                  <!-- Tệp đính kèm -->
                  <div v-if="post.files.length > 0" class="attachments">
                    <h5>Tệp đính kèm:</h5>
                    <ul>
                      <li v-for="file in post.files" :key="file.name">
                        <a :href="file.url" target="_blank">{{ file.name }}</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Bình luận -->
                <div v-if="post.comments.length > 0" class="comments-section mt-4">
                  <h5>Bình luận:</h5>
                  <div v-for="comment in post.comments" :key="comment.id" class="comment mb-3">
                    <p><strong>{{ comment.author }} ({{ comment.role }})</strong> - {{ comment.date }}</p>
                    <p>{{ comment.content }}</p>
                  </div>
                </div>

                <!-- Form thêm bình luận -->
                <div class="add-comment mt-4">
                  <textarea v-model="newComment[post.id]" class="form-control" placeholder="Thêm bình luận..." rows="3"></textarea>
                  <button @click="submitComment(post.id)" class="btn btn-primary btn-block mt-2">Gửi</button>
                </div>
              </div>
            </div>

            <!-- Tạo bài viết mới -->
            <div v-if="isLoggedIn" class="create-post card-body">
              <h4 class="text-center">Đăng bài viết mới</h4>
              <textarea v-model="newPost.content" class="form-control mb-3" placeholder="Nhập nội dung bài viết..." rows="3"></textarea>
              <div class="d-flex gap-2">
                <input type="file" multiple @change="handleFileUpload" />
                <button @click="submitPost" class="btn btn-primary btn-sm">
                  <i class="fas fa-paper-plane"></i> Đăng bài
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterWeb/>
  </template>

  <script setup>
  import { ref } from 'vue';
  import HeaderWeb from '../components/HeaderWeb.vue';
  import FooterWeb from '../components/FooterWeb.vue';

  const isLoggedIn = ref(true);
  const posts = ref([
    {
      id: 1,
      title: 'Cách học tiếng Anh hiệu quả cho sinh viên',
      author: 'Nguyễn Văn A',
      date: '10/05/2025',
      content: 'Chia sẻ một số phương pháp học tiếng Anh hiệu quả...',
      files: [],
      comments: []
    },
    {
      id: 2,
      title: 'Bí quyết học tiếng Hàn hiệu quả',
      author: 'Lê Thị B',
      date: '12/05/2025',
      content: 'Tiếng Hàn có thể khó nhưng nếu áp dụng phương pháp đúng...',
      files: [],
      comments: []
    },
    {
      id: 3,
      title: 'Chia sẻ cách luyện nghe tiếng Anh mỗi ngày',
      author: 'Phạm Văn C',
      date: '13/05/2025',
      content: 'Luyện nghe tiếng Anh mỗi ngày là cách tốt nhất...',
      files: [],
      comments: []
    },
    {
      id: 4,
      title: 'Kinh nghiệm học từ vựng tiếng Hàn',
      author: 'Trần Thị D',
      date: '14/05/2025',
      content: 'Bạn cần có một lộ trình học từ vựng bài bản...',
      files: [],
      comments: []
    },
    {
      id: 5,
      title: 'Phương pháp học nói tiếng Anh tự tin',
      author: 'Nguyễn Thị E',
      date: '15/05/2025',
      content: 'Hãy thực hành nói mỗi ngày...',
      files: [],
      comments: []
    }
  ]);

  const newPost = ref({ content: '' });
  const newComment = ref({});
  const selectedFiles = ref([]);

  const handleFileUpload = (e) => {
    selectedFiles.value = Array.from(e.target.files);
  };

  const submitPost = () => {
    if (newPost.value.content) {
      posts.value.push({
        id: posts.value.length + 1,
        title: 'Bài viết mới',
        author: 'Sinh viên',
        date: new Date().toLocaleDateString(),
        content: newPost.value.content,
        files: selectedFiles.value,
        comments: []
      });
      newPost.value.content = '';
      selectedFiles.value = [];
    }
  };

  const submitComment = (postId) => {
    const commentContent = newComment.value[postId];
    if (commentContent) {
      const post = posts.value.find(post => post.id === postId);
      post.comments.push({
        id: post.comments.length + 1,
        author: 'Sinh viên',
        role: 'Sinh viên',
        content: commentContent,
        date: new Date().toLocaleDateString()
      });
      newComment.value[postId] = '';
    }
  };
  </script>


<style scoped>
.upload-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.upload-label {
  cursor: pointer;
  background-color: #007bff;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.upload-label i {
  font-size: 16px;
}

.file-list {
  list-style-type: none;
  margin: 10px 0 0;
  padding: 0;
}

.file-list li {
  background-color: #f1f1f1;
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: 4px;
}

button i {
  margin-right: 5px;
}
</style>
