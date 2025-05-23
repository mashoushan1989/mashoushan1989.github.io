// 使用立即执行函数减少全局作用域污染
(function() {
  // 首先检查浏览器兼容性
  checkBrowserCompatibility();
  
  // 等待DOM加载完成
  document.addEventListener('DOMContentLoaded', function() {
    // 获取主题切换开关
    const themeSwitch = document.getElementById('checkbox');
    if (!themeSwitch) return; // 防止在没有切换按钮的页面上出错
    
    // 检查localStorage中是否已保存主题偏好
    const currentTheme = localStorage.getItem('theme');
    
    // 如果已有主题偏好，应用它
    if (currentTheme) {
      if (currentTheme === 'dark') {
        themeSwitch.checked = true;
        applyTheme('dark');
      } else {
        themeSwitch.checked = false;
        applyTheme('light');
      }
    }
    
    // 监听主题切换事件
    themeSwitch.addEventListener('change', function(e) {
      if (e.target.checked) {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
      }
    });
  });
  
  // 浏览器兼容性检查函数
  function checkBrowserCompatibility() {
    // 检测localStorage支持
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
    } catch(e) {
      console.warn('LocalStorage不可用，主题偏好将不会被保存');
      const switchWrapper = document.querySelector('.theme-switch-wrapper');
      if (switchWrapper) switchWrapper.style.display = 'none';
      return false;
    }
    
    // 检测CSS变量支持
    if (!window.CSS || !window.CSS.supports || !window.CSS.supports('--test', '0')) {
      console.warn('您的浏览器不支持CSS变量，主题切换可能无法正常工作');
      
      // 降级处理 - 为不支持CSS变量的浏览器提供基本主题切换
      const style = document.createElement('style');
      style.textContent = `
        .theme-dark {
          background-color: #2f363d !important;
          color: #ffffff !important;
        }
        .theme-dark a:not(.btn) {
          color: #58a6ff !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    return true;
  }
  
  // 应用主题函数 - 简化为仅切换类名，其余通过CSS变量处理
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('theme-dark');
      forceRepaint();
    } else {
      document.documentElement.classList.remove('theme-dark');
      forceRepaint();
    }
    
    // 确保任何被遗漏的元素都得到处理
    enforceTheme(theme);
  }
  
  // 强制确保主题应用到所有元素
  function enforceTheme(theme) {
    if (theme === 'dark') {
      // 特殊处理可能被遗漏的元素
      const problemElements = document.querySelectorAll('[style*="color"]');
      problemElements.forEach(el => {
        // 如果元素有内联样式设置了颜色，可能会覆盖我们的CSS
        if (el.tagName.toLowerCase() !== 'a' && 
            !el.classList.contains('btn') && 
            !el.classList.contains('theme-excluded')) {
          el.style.color = '#ffffff';
        }
      });
      
      // 特殊处理具有背景色的元素
      const bgElements = document.querySelectorAll('[style*="background"]');
      bgElements.forEach(el => {
        if (!el.classList.contains('theme-excluded')) {
          el.style.backgroundColor = '#2f363d';
        }
      });
    } else {
      // 恢复可能被我们手动修改过的元素
      const modifiedElements = document.querySelectorAll('[style*="color"]');
      modifiedElements.forEach(el => {
        if (el.getAttribute('data-original-color')) {
          el.style.color = el.getAttribute('data-original-color');
          el.removeAttribute('data-original-color');
        }
      });
      
      const bgElements = document.querySelectorAll('[style*="background"]');
      bgElements.forEach(el => {
        if (el.getAttribute('data-original-bg')) {
          el.style.backgroundColor = el.getAttribute('data-original-bg');
          el.removeAttribute('data-original-bg');
        }
      });
    }
  }
  
  // 强制重绘以确保所有CSS变量立即生效
  function forceRepaint() {
    // 触发重绘
    const body = document.body;
    const displayValue = body.style.display;
    body.style.display = 'none';
    void body.offsetHeight; // 这行代码强制浏览器重新计算布局
    body.style.display = displayValue;
  }
})(); 