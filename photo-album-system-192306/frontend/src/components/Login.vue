<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- 登录卡片 -->
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border-t-4 border-amber-600">
        <!-- 头部装饰 -->
        <div class="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-12 text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-white opacity-10">
            <div class="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
            <div class="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
          </div>
          <div class="relative z-10">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <i class="fas fa-camera-retro text-amber-600 text-3xl"></i>
            </div>
            <h2 class="text-3xl font-bold text-white mb-2">相簿管理系統</h2>
            <p class="text-amber-100 text-sm">管理您的專屬回憶時光</p>
          </div>
        </div>

        <!-- 表单区域 -->
        <div class="p-8">
          <!-- 错误提示 -->
          <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
            <div class="flex items-center">
              <i class="fas fa-exclamation-circle text-red-500 mr-3"></i>
              <p class="text-red-700 text-sm font-medium">{{ errorMessage }}</p>
            </div>
          </div>

          <!-- 角色切换标签 -->
          <div class="flex rounded-xl bg-gray-100 p-1 mb-6">
            <button 
              @click="loginType = 'user'" 
              :class="{'bg-white shadow-md': loginType === 'user', 'text-gray-500': loginType !== 'user'}"
              class="flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
            >
              <i class="fas fa-user mr-2"></i>用戶登入
            </button>
            <button 
              @click="loginType = 'admin'" 
              :class="{'bg-white shadow-md': loginType === 'admin', 'text-gray-500': loginType !== 'admin'}"
              class="flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
            >
              <i class="fas fa-shield-alt mr-2"></i>管理員
            </button>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- 用户登录表单 -->
            <div v-if="loginType === 'user'">
              <label for="userPhone" class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-phone text-amber-600 mr-2"></i>電話號碼
              </label>
              <input 
                id="userPhone"
                v-model="userPhone" 
                type="tel" 
                required
                placeholder="請輸入註冊的電話號碼"
                maxlength="15"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none"
              />
            </div>

            <!-- 管理员登录表单 -->
            <div v-if="loginType === 'admin'" class="space-y-6">
              <div>
                <label for="adminUsername" class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-user-shield text-amber-600 mr-2"></i>管理員帳號
                </label>
                <input 
                  id="adminUsername"
                  v-model="adminUsername" 
                  type="text" 
                  required
                  placeholder="請輸入管理員帳號"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none"
                />
              </div>
              <div>
                <label for="adminPassword" class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-lock text-amber-600 mr-2"></i>密碼
                </label>
                <input 
                  id="adminPassword"
                  v-model="adminPassword" 
                  type="password" 
                  required
                  placeholder="請輸入密碼"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none"
                />
              </div>
            </div>

            <!-- 登录按钮 -->
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="!isSubmitting" class="flex items-center justify-center">
                <i class="fas fa-sign-in-alt mr-2"></i>立即登入
              </span>
              <span v-else class="flex items-center justify-center">
                <i class="fas fa-spinner fa-spin mr-2"></i>登入中...
              </span>
            </button>
          </form>

          <!-- 注册提示 -->
          <div v-if="loginType === 'user'" class="mt-8 text-center">
            <p class="text-gray-600 text-sm">
              還沒有帳號？
              <button @click="goToRegister" class="text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-all duration-300">
                立即註冊
              </button>
            </p>
          </div>

          <!-- 管理员提示信息 -->
          <div v-if="loginType === 'admin'" class="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div class="flex items-start">
              <i class="fas fa-info-circle text-amber-600 mt-0.5 mr-3"></i>
              <div class="text-xs text-gray-600">
                <p class="font-semibold mb-1">默認管理員帳號</p>
                <p>帳號: <span class="font-mono text-amber-700">admin</span></p>
                <p>密碼: <span class="font-mono text-amber-700">admin123</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部装饰 -->
      <div class="mt-8 text-center">
        <div class="flex items-center justify-center space-x-2 text-gray-400 text-xs">
          <i class="fas fa-shield-alt"></i>
          <span>安全的本地存儲系統</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { validateUser, validateAdmin, setCurrentUser, initStorage } from '../utils/storage.js';

const router = useRouter();
const loginType = ref('user');
const userPhone = ref('');
const adminUsername = ref('');
const adminPassword = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

initStorage();

const handleLogin = async () => {
  errorMessage.value = '';
  isSubmitting.value = true;

  try {
    if (loginType.value === 'user') {
      if (!userPhone.value.trim()) {
        errorMessage.value = '請輸入電話號碼';
        isSubmitting.value = false;
        return;
      }

      const user = validateUser(userPhone.value.trim());
      if (!user) {
        errorMessage.value = '此電話號碼尚未註冊，請先註冊';
        isSubmitting.value = false;
        return;
      }

      setCurrentUser(user);
      router.push('/user');
    } else {
      if (!adminUsername.value.trim() || !adminPassword.value.trim()) {
        errorMessage.value = '請輸入完整的帳號和密碼';
        isSubmitting.value = false;
        return;
      }

      const admin = validateAdmin(adminUsername.value.trim(), adminPassword.value.trim());
      if (!admin) {
        errorMessage.value = '帳號或密碼錯誤';
        isSubmitting.value = false;
        return;
      }

      setCurrentUser(admin);
      router.push('/admin');
    }
  } catch (error) {
    errorMessage.value = '登入失敗，請稍後再試';
    isSubmitting.value = false;
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

input:focus {
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
}
</style>