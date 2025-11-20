// localStorage操作工具函数，包含用户数据和管理员账号管理
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEYS = {
  USERS: 'photo_album_users',
  ALBUMS: 'photo_album_data',
  CURRENT_USER: 'photo_album_current_user',
  ADMIN: 'photo_album_admin'
};

// 初始化管理员账号
const initAdmin = () => {
  const admin = getAdmin();
  if (!admin) {
    const defaultAdmin = {
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      id: 'admin_001'
    };
    localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(defaultAdmin));
    return defaultAdmin;
  }
  return admin;
};

// 获取管理员信息
export const getAdmin = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ADMIN);
  return data ? JSON.parse(data) : null;
};

// 验证管理员登录
export const validateAdmin = (username, password) => {
  const admin = getAdmin() || initAdmin();
  return admin.username === username && admin.password === password ? admin : null;
};

// 获取所有用户
export const getAllUsers = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
};

// 保存用户
export const saveUser = (userData) => {
  const users = getAllUsers();
  const existingUser = users.find(u => u.phone === userData.phone);
  
  if (existingUser) {
    throw new Error('该手机号已注册');
  }
  
  const newUser = {
    id: uuidv4(),
    name: userData.name,
    phone: userData.phone,
    room: userData.room,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return newUser;
};

// 验证用户登录
export const validateUser = (phone) => {
  const users = getAllUsers();
  return users.find(u => u.phone === phone) || null;
};

// 获取当前登录用户
export const getCurrentUser = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

// 设置当前登录用户
export const setCurrentUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

// 用户登出
export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// 获取所有相簿数据
export const getAllAlbums = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ALBUMS);
  return data ? JSON.parse(data) : [];
};

// 获取用户相簿
export const getUserAlbums = (userId) => {
  const albums = getAllAlbums();
  return albums.filter(album => album.userId === userId);
};

// 上传图片到相簿
export const uploadImage = (userId, imageData) => {
  const albums = getAllAlbums();
  const newImage = {
    id: uuidv4(),
    userId,
    imageUrl: imageData,
    uploadDate: new Date().toISOString(),
    createdAt: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
  };
  
  albums.push(newImage);
  localStorage.setItem(STORAGE_KEYS.ALBUMS, JSON.stringify(albums));
  return newImage;
};

// 删除图片
export const deleteImage = (imageId) => {
  const albums = getAllAlbums();
  const filtered = albums.filter(img => img.id !== imageId);
  localStorage.setItem(STORAGE_KEYS.ALBUMS, JSON.stringify(filtered));
};

// 删除用户及其所有相簿
export const deleteUser = (userId) => {
  const users = getAllUsers();
  const albums = getAllAlbums();
  
  const filteredUsers = users.filter(u => u.id !== userId);
  const filteredAlbums = albums.filter(a => a.userId !== userId);
  
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filteredUsers));
  localStorage.setItem(STORAGE_KEYS.ALBUMS, JSON.stringify(filteredAlbums));
};

// 更新用户信息
export const updateUser = (userId, updateData) => {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === userId);
  
  if (index !== -1) {
    users[index] = { ...users[index], ...updateData };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return users[index];
  }
  return null;
};

// 获取用户统计信息
export const getUserStats = (userId) => {
  const albums = getUserAlbums(userId);
  return {
    totalImages: albums.length,
    latestUpload: albums.length > 0 ? albums[albums.length - 1].createdAt : null
  };
};

// 初始化存储
export const initStorage = () => {
  initAdmin();
};

// 清空所有数据（仅用于测试）
export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.ALBUMS);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  initAdmin();
};