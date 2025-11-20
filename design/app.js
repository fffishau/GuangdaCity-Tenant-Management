const tabs = document.querySelectorAll('.tab');
const form = document.getElementById('loginForm');
const phoneInput = document.getElementById('phone');
const help = document.getElementById('phoneHelp');
const submitBtn = document.getElementById('submitBtn');
let role = 'tenant';

function selectTab(target) {
  tabs.forEach(t => t.classList.remove('is-active'));
  target.classList.add('is-active');
  role = target.dataset.role;
}

tabs.forEach(t => {
  t.addEventListener('click', () => selectTab(t));
});

function sanitize(value) {
  return value.replace(/\D+/g, '');
}

function validate() {
  const value = sanitize(phoneInput.value);
  phoneInput.value = value;
  const ok = value.length >= 8 && value.length <= 12;
  submitBtn.disabled = !ok;
  help.textContent = ok ? '' : '請輸入 8–12 位數字的電話號碼';
  return ok;
}

phoneInput.addEventListener('input', validate);

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validate()) return;
  const payload = { role, phone: phoneInput.value };
  console.log('login', payload);
});