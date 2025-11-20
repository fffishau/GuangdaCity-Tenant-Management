<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-lg border-b-4 border-amber-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <i class="fas fa-user text-white text-xl"></i>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-800">{{ currentUser?.name }}</h1>
              <p class="text-xs text-gray-500">{{ currentUser?.room }}</p>
            </div>
          </div>
          <button @click="handleLogout" class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
            <i class="fas fa-sign-out-alt mr-2"></i>登出
          </button>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 用户信息卡片 -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-amber-600">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <div class="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <img :src="avatarUrl" alt="avatar" class="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <h2 class="text-3xl font-bold text-gray-800 mb-2">我的相簿</h2>
              <div class="flex items-center space-x-4 text-gray-600">
                <span class="flex items-center"><i class="fas fa-phone text-amber-600 mr-2"></i>{{ currentUser?.phone }}</span>
                <span class="flex items-center"><i class="fas fa-door-open text-amber-600 mr-2"></i>房間：{{ currentUser?.room }}</span>
              </div>
            </div>
          </div>
          <div class="text-center px-8 py-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl shadow-inner">
            <p class="text-4xl font-bold text-amber-600">{{ userAlbums.length }}</p>
            <p class="text-sm text-gray-600 mt-1">張照片</p>
          </div>
        </div>
      </div>

      <!-- 上传区域 -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-4 border-green-500">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-800 flex items-center">
            <i class="fas fa-cloud-upload-alt text-green-500 mr-3"></i>上傳新照片
          </h3>
        </div>
        <div class="flex items-center space-x-4">
          <label for="imageUpload" class="flex-1 cursor-pointer">
            <div class="border-3 border-dashed border-amber-300 rounded-2xl p-8 text-center hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 bg-gradient-to-br from-white to-amber-50">
              <i class="fas fa-images text-amber-400 text-5xl mb-4"></i>
              <p class="text-gray-600 font-medium">點擊選擇圖片</p>
              <p class="text-gray-400 text-sm mt-2">支持 JPG、PNG、GIF 格式</p>
            </div>
            <input id="imageUpload" type="file" accept="image/*" @change="handleImageUpload" class="hidden" />
          </label>
        </div>
        <div v-if="uploadPreview" class="mt-6 p-4 bg-amber-50 rounded-xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <img :src="uploadPreview" alt="preview" class="w-20 h-20 object-cover rounded-lg shadow-md" />
              <div>
                <p class="font-medium text-gray-800">預覽圖片</p>
                <p class="text-sm text-gray-500">準備上傳</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button @click="confirmUpload" class="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
                <i class="fas fa-check mr-2"></i>確認上傳
              </button>
              <button @click="cancelUpload" class="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-all duration-300">
                <i class="fas fa-times mr-2"></i>取消
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 相册网格 -->
      <div class="mb-6">
        <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-photo-video text-amber-600 mr-3"></i>我的照片集
        </h3>
      </div>

      <div v-if="userAlbums.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="image in userAlbums" :key="image.id" class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
          <div class="relative">
            <img :src="image.imageUrl" alt="album" class="w-full h-64 object-cover" />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
              <button @click="confirmDelete(image.id)" class="opacity-0 group-hover:opacity-100 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-lg">
                <i class="fas fa-trash mr-2"></i>刪除
              </button>
            </div>
          </div>
          <div class="p-4 bg-gradient-to-br from-white to-amber-50">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">
                <i class="fas fa-calendar-alt text-amber-600 mr-2"></i>{{ formatDate(image.createdAt) }}
              </span>
              <span class="text-xs text-gray-400">
                <i class="fas fa-clock mr-1"></i>{{ formatTime(image.createdAt) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="bg-white rounded-2xl shadow-xl p-16 text-center">
        <i class="fas fa-images text-gray-300 text-8xl mb-6"></i>
        <h3 class="text-2xl font-bold text-gray-400 mb-2">還沒有照片</h3>
        <p class="text-gray-400">開始上傳您的第一張照片吧！</p>
      </div>
    </div>

    <!-- 删除确认对话框 -->
    <div v-if="showDeleteDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform scale-95 animate-scale-in">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-exclamation-triangle text-red-500 text-3xl"></i>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">確認刪除</h3>
          <p class="text-gray-600 mb-6">確定要刪除這張照片嗎？此操作無法恢復。</p>
          <div class="flex space-x-4">
            <button @click="showDeleteDialog = false" class="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-all duration-300">
              取消
            </button>
            <button @click="executeDelete" class="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 上传成功提示 -->
    <div v-if="showSuccessToast" class="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-slide-in z-50">
      <i class="fas fa-check-circle text-2xl"></i>
      <span class="font-medium">上傳成功！</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCurrentUser, getUserAlbums, uploadImage, deleteImage, logout } from '../utils/storage.js';

const router = useRouter();
const currentUser = ref(null);
const userAlbums = ref([]);
const uploadPreview = ref('');
const uploadFile = ref(null);
const showDeleteDialog = ref(false);
const deleteImageId = ref('');
const showSuccessToast = ref(false);
const avatarUrl = 'https://hpi-hub.tos-cn-beijing.volces.com/static/key_2d/brown2Woman6_1756179580396-1253.png';

const loadUserData = () => {
  currentUser.value = getCurrentUser();
  if (!currentUser.value || currentUser.value.role !== 'user') {
    router.push('/');
    return;
  }
  userAlbums.value = getUserAlbums(currentUser.value.id);
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadPreview.value = e.target.result;
    uploadFile.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const confirmUpload = () => {
  if (!uploadFile.value) return;
  
  uploadImage(currentUser.value.id, uploadFile.value);
  uploadPreview.value = '';
  uploadFile.value = null;
  loadUserData();
  
  showSuccessToast.value = true;
  setTimeout(() => {
    showSuccessToast.value = false;
  }, 3000);
};

const cancelUpload = () => {
  uploadPreview.value = '';
  uploadFile.value = null;
};

const confirmDelete = (imageId) => {
  deleteImageId.value = imageId;
  showDeleteDialog.value = true;
};

const executeDelete = () => {
  deleteImage(deleteImageId.value);
  showDeleteDialog.value = false;
  loadUserData();
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' });
};

const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('zh-TW', { timeZone: 'Asia/Taipei', hour: '2-digit', minute: '2-digit' });
};

const handleLogout = () => {
  logout();
  router.push('/');
};

onMounted(() => {
  loadUserData();
});
</script>

<style scoped>
@keyframes scale-in {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>