<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- 返回登录按钮 -->
      <div class="mb-6">
        <button @click="goToLogin" class="flex items-center text-amber-700 hover:text-amber-900 transition-all duration-300 group">
          <i class="fas fa-arrow-left mr-2 transform group-hover:-translate-x-1 transition-transform duration-300"></i>
          <span class="font-medium">返回登入</span>
        </button>
      </div>

      <!-- 注册卡片 -->
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border-t-4 border-amber-600">
        <!-- 头部装饰 -->
        <div class="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-12 text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-white opacity-10">
            <div class="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
            <div class="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
          </div>
          <div class="relative z-10">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <i class="fas fa-user-plus text-amber-600 text-3xl"></i>
            </div>
            <h2 class="text-3xl font-bold text-white mb-2">註冊新帳號</h2>
            <p class="text-amber-100 text-sm">填寫資料建立您的專屬相簿</p>
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

          <!-- 成功提示 -->
          <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg animate-slide-down">
            <div class="flex items-center">
              <i class="fas fa-check-circle text-green-500 mr-3"></i>
              <p class="text-green-700 text-sm font-medium">{{ successMessage }}</p>
            </div>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-6">
            <!-- 姓名输入 -->
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-user text-amber-600 mr-2"></i>姓名
              </label>
              <input 
                id="name"
                v-model="formData.name" 
                type="text" 
                required
                placeholder="請輸入您的姓名"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none"
                :class="{'border-red-300': errors.name}"
              />
              <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
            </div>

            <!-- 电话输入 -->
            <div>
              <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-phone text-amber-600 mr-2"></i>電話號碼
              </label>
              <input 
                id="phone"
                v-model="formData.phone" 
                type="tel" 
                required
                placeholder="請輸入您的電話號碼"
                maxlength="15"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none"
                :class="{'border-red-300': errors.phone}"
              />
              <p v-if="errors.phone" class="mt-1 text-xs text-red-500">{{ errors.phone }}</p>
            </div>

            <!-- 房间输入 -->
            <div>
              <label for="room" class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="fas fa-door-open text-amber-600 mr-2"></i>房間號碼
              </label>
              <input 
                id="room"
                v-model="formData.room" 
                type="text" 
                required
                placeholder="例如：A101"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none"
                :class="{'border-red-300': errors.room}"
              />
              <p v-if="errors.room" class="mt-1 text-xs text-red-500">{{ errors.room }}</p>
            </div>

            <!-- 提交按钮 -->
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="!isSubmitting" class="flex items-center justify-center">
                <i class="fas fa-user-plus mr-2"></i>立即註冊
              </span>
              <span v-else class="flex items-center justify-center">
                <i class="fas fa-spinner fa-spin mr-2"></i>註冊中...
              </span>
            </button>
          </form>

          <!-- 登录提示 -->
          <div class="mt-8 text-center">
            <p class="text-gray-600 text-sm">
              已經有帳號了？
              <button @click="goToLogin" class="text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-all duration-300">
                立即登入
              </button>
            </p>
          </div>
        </div>
      </div>

      <!-- 底部装饰 -->
      <div class="mt-8 text-center">
        <div class="flex items-center justify-center space-x-2 text-gray-400 text-xs">
          <i class="fas fa-shield-alt"></i>
          <span>您的資料將安全存儲在本地瀏覽器中</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { saveUser } from '../utils/storage.js';

const router = useRouter();
const formData = reactive({
  name: '',
  phone: '',
  room: ''
});
const errors = reactive({
  name: '',
  phone: '',
  room: ''
});
const errorMessage = ref('');
const successMessage = ref('');
const isSubmitting = ref(false);

const validateForm = () => {
  let isValid = true;
  errors.name = '';
  errors.phone = '';
  errors.room = '';
  errorMessage.value = '';

  if (!formData.name.trim()) {
    errors.name = '請輸入姓名';
    isValid = false;
  } else if (formData.name.trim().length < 2) {
    errors.name = '姓名至少需要2個字符';
    isValid = false;
  }

  if (!formData.phone.trim()) {
    errors.phone = '請輸入電話號碼';
    isValid = false;
  } else if (!/^[0-9]{8,15}$/.test(formData.phone.trim())) {
    errors.phone = '請輸入有效的電話號碼（8-15位數字）';
    isValid = false;
  }

  if (!formData.room.trim()) {
    errors.room = '請輸入房間號碼';
    isValid = false;
  } else if (formData.room.trim().length < 2) {
    errors.room = '房間號碼至少需要2個字符';
    isValid = false;
  }

  return isValid;
};

const handleRegister = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const userData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      room: formData.room.trim()
    };

    saveUser(userData);
    
    successMessage.value = '註冊成功！正在跳轉至登入頁面...';
    
    setTimeout(() => {
      router.push('/');
    }, 1500);
    
  } catch (error) {
    errorMessage.value = error.message || '註冊失敗，請稍後再試';
    isSubmitting.value = false;
  }
};

const goToLogin = () => {
  router.push('/');
};
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

@keyframes slide-down {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out;
}

input:focus {
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
}
</style>