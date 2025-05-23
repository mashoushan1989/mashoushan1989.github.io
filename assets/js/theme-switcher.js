// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 获取主题切换开关和body元素
  const themeSwitch = document.getElementById('checkbox');
  const body = document.body;
  
  // 检查localStorage中是否已保存主题偏好
  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
  
  // 如果已有主题偏好，应用它
  if (currentTheme) {
    if (currentTheme === 'dark') {
      body.style.backgroundColor = "#2f363d";
      themeSwitch.checked = true;
      applyDarkTheme();
    } else {
      body.style.backgroundColor = "";
      themeSwitch.checked = false;
      applyLightTheme();
    }
  }
  
  // 监听主题切换事件
  themeSwitch.addEventListener('change', function(e) {
    if (e.target.checked) {
      // 切换到深色主题
      applyDarkTheme();
      localStorage.setItem('theme', 'dark');
    } else {
      // 切换到浅色主题
      applyLightTheme();
      localStorage.setItem('theme', 'light');
    }
  });
  
  // 应用深色主题
  function applyDarkTheme() {
    body.style.backgroundColor = "#2f363d";
    document.querySelectorAll('.bg-white').forEach(function(element) {
      element.classList.remove('bg-white');
      element.classList.add('bg-gray-dark');
    });
    document.querySelectorAll('.text-gray').forEach(function(element) {
      element.classList.remove('text-gray');
      element.classList.add('text-white');
    });
    // 修改所有可能需要反转颜色的元素
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a:not(.btn)').forEach(function(element) {
      element.classList.add('text-white');
    });
  }
  
  // 应用浅色主题
  function applyLightTheme() {
    body.style.backgroundColor = "";
    document.querySelectorAll('.bg-gray-dark').forEach(function(element) {
      element.classList.remove('bg-gray-dark');
      element.classList.add('bg-white');
    });
    document.querySelectorAll('.text-white').forEach(function(element) {
      if (!element.classList.contains('bg-green')) {
        element.classList.remove('text-white');
        if (element.tagName.toLowerCase() === 'p') {
          element.classList.add('text-gray');
        }
      }
    });
  }
}); 