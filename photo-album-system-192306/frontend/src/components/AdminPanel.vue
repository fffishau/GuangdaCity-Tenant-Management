<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-lg border-b-4 border-amber-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <i class="fas fa-shield-alt text-white text-xl"></i>
            </div>
            <h1 class="text-2xl font-bold text-gray-800">管理員後台</h1>
          </div>
          <button @click="handleLogout" class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
            <i class="fas fa-sign-out-alt mr-2"></i>登出
          </button>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">總用戶數</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ users.length }}</p>
            </div>
            <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
              <i class="fas fa-users text-blue-500 text-2xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-green-500 transform hover:scale-105 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">總圖片數</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ albums.length }}</p>
            </div>
            <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <i class="fas fa-images text-green-500 text-2xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">活躍用戶</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ activeUsers }}</p>
            </div>
            <div class="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
              <i class="fas fa-user-check text-purple-500 text-2xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- 标签切换 -->
      <div class="bg-white rounded-2xl shadow-xl mb-6">
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px">
            <button @click="activeTab = 'users'" :class="{'border-amber-600 text-amber-600': activeTab === 'users', 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'users'}" class="w-1/2 py-4 px-1 text-center border-b-2 font-medium text-lg transition-all duration-300">
              <i class="fas fa-users mr-2"></i>用戶管理
            </button>
            <button @click="activeTab = 'albums'" :class="{'border-amber-600 text-amber-600': activeTab === 'albums', 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'albums'}" class="w-1/2 py-4 px-1 text-center border-b-2 font-medium text-lg transition-all duration-300">
              <i class="fas fa-photo-video mr-2"></i>相簿管理
            </button>
          </nav>
        </div>
      </div>

      <!-- 用户管理面板 -->
      <div v-if="activeTab === 'users'" class="space-y-4">
        <div v-for="user in users" :key="user.id" class="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <img :src="avatarUrl" alt="avatar" class="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-800">{{ user.name }}</h3>
                <div class="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span><i class="fas fa-phone mr-1 text-amber-600"></i>{{ user.phone }}</span>
                  <span><i class="fas fa-door-open mr-1 text-amber-600"></i>{{ user.room }}</span>
                </div>
                <p class="text-xs text-gray-400 mt-1">註冊時間: {{ formatDate(user.createdAt) }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="text-center px-4 py-2 bg-amber-100 rounded-lg">
                <p class="text-2xl font-bold text-amber-600">{{ getUserImageCount(user.id) }}</p>
                <p class="text-xs text-gray-600">張圖片</p>
              </div>
              <button @click="viewUserAlbums(user.id)" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105">
                <i class="fas fa-eye mr-1"></i>查看
              </button>
              <button @click="confirmDeleteUser(user.id)" class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105">
                <i class="fas fa-trash mr-1"></i>刪除
              </button>
            </div>
          </div>
        </div>

        <div v-if="users.length === 0" class="bg-white rounded-2xl shadow-xl p-12 text-center">
          <i class="fas fa-users-slash text-gray-300 text-6xl mb-4"></i>
          <p class="text-gray-400 text-lg">暫無用戶數據</p>
        </div>
      </div>

      <!-- 相册管理面板 -->
      <div v-if="activeTab === 'albums'">
        <div v-if="selectedUserId" class="mb-6">
          <button @click="selectedUserId = null" class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all duration-300">
            <i class="fas fa-arrow-left mr-2"></i>返回全部相簿
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="image in displayedAlbums" :key="image.id" class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div class="relative group">
              <img :src="image.imageUrl" :alt="getUserName(image.userId)" class="w-full h-64 object-cover" />
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <button @click="confirmDeleteImage(image.id)" class="opacity-0 group-hover:opacity-100 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform scale-90 group-hover:scale-100">
                  <i class="fas fa-trash mr-2"></i>刪除
                </button>
              </div>
            </div>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-semibold text-gray-800">{{ getUserName(image.userId) }}</p>
                  <p class="text-xs text-gray-500">{{ getUserRoom(image.userId) }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-400">
                    <i class="fas fa-clock mr-1"></i>{{ formatDate(image.createdAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="displayedAlbums.length === 0" class="bg-white rounded-2xl shadow-xl p-12 text-center">
          <i class="fas fa-images text-gray-300 text-6xl mb-4"></i>
          <p class="text-gray-400 text-lg">暫無相簿數據</p>
        </div>
      </div>
    </div>

    <!-- 确认删除对话框 -->
    <div v-if="showDeleteDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform scale-95 animate-scale-in">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-exclamation-triangle text-red-500 text-3xl"></i>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">確認刪除</h3>
          <p class="text-gray-600 mb-6">{{ deleteMessage }}</p>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllUsers, getAllAlbums, deleteUser, deleteImage, logout } from '../utils/storage.js';

const router = useRouter();
const users = ref([]);
const albums = ref([]);
const activeTab = ref('users');
const selectedUserId = ref(null);
const showDeleteDialog = ref(false);
const deleteType = ref('');
const deleteId = ref('');
const deleteMessage = ref('');
const avatarUrl = 'https://hpi-hub.tos-cn-beijing.volces.com/static/key_2d/brown2Woman6_1756179580396-1253.png';

const activeUsers = computed(() => {
  return users.value.filter(user => getUserImageCount(user.id) > 0).length;
});

const displayedAlbums = computed(() => {
  if (selectedUserId.value) {
    return albums.value.filter(album => album.userId === selectedUserId.value);
  }
  return albums.value;
});

const loadData = () => {
  users.value = getAllUsers();
  albums.value = getAllAlbums();
};

const getUserImageCount = (userId) => {
  return albums.value.filter(album => album.userId === userId).length;
};

const getUserName = (userId) => {
  const user = users.value.find(u => u.id === userId);
  return user ? user.name : '未知用戶';
};

const getUserRoom = (userId) => {
  const user = users.value.find(u => u.id === userId);
  return user ? user.room : '';
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
};

const viewUserAlbums = (userId) => {
  selectedUserId.value = userId;
  activeTab.value = 'albums';
};

const confirmDeleteUser = (userId) => {
  const user = users.value.find(u => u.id === userId);
  deleteType.value = 'user';
  deleteId.value = userId;
  deleteMessage.value = `確定要刪除用戶"${user.name}"及其所有相簿嗎？此操作無法恢復。`;
  showDeleteDialog.value = true;
};

const confirmDeleteImage = (imageId) => {
  deleteType.value = 'image';
  deleteId.value = imageId;
  deleteMessage.value = '確定要刪除此圖片嗎？此操作無法恢復。';
  showDeleteDialog.value = true;
};

const executeDelete = () => {
  if (deleteType.value === 'user') {
    deleteUser(deleteId.value);
  } else if (deleteType.value === 'image') {
    deleteImage(deleteId.value);
  }
  showDeleteDialog.value = false;
  loadData();
};

const handleLogout = () => {
  logout();
  router.push('/');
};

onMounted(() => {
  loadData();
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

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}
</style>