// 使用立即执行函数减少全局作用域污染
(function() {
  // 首先检查浏览器兼容性
  checkBrowserCompatibility();
  
  // 等待DOM加载完成
  document.addEventListener('DOMContentLoaded', function() {
    // 获取主题切换开关和body元素
    const themeSwitch = document.getElementById('checkbox');
    if (!themeSwitch) return; // 防止在没有切换按钮的页面上出错
    
    // 检查localStorage中是否已保存主题偏好
    const currentTheme = localStorage.getItem('theme');
    
    // 如果已有主题偏好，应用它
    if (currentTheme) {
      if (currentTheme === 'dark') {
        themeSwitch.checked = true;
        applyDarkTheme();
      } else {
        themeSwitch.checked = false;
        applyLightTheme();
      }
    }
    
    // 监听主题切换事件
    themeSwitch.addEventListener('change', function(e) {
      if (e.target.checked) {
        applyDarkTheme();
        localStorage.setItem('theme', 'dark');
      } else {
        applyLightTheme();
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
    return true;
  }
  
  // 全面的深色主题应用函数
  function applyDarkTheme() {
    // 添加全局主题类
    document.documentElement.classList.add('theme-dark');
    document.body.style.backgroundColor = "#2f363d";
    document.body.classList.add('theme-dark');
    
    // 直接设置基础文本颜色
    document.body.style.color = "#ffffff";
    
    // 处理所有文本元素
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, td, th, blockquote, label, .masthead-title, .post-meta, .post-title, .site-title, .site-nav, .post-list-heading, .post-content');
    textElements.forEach(el => {
      el.classList.add('text-white');
      // 确保文本是白色
      el.style.color = "#ffffff";
      // 移除可能的黑色文本类
      el.classList.remove('text-gray');
    });
    
    // 特殊处理链接
    const links = document.querySelectorAll('a:not(.btn)');
    links.forEach(el => {
      el.style.color = "#58a6ff";
      el.classList.add('link-light');
    });
    
    // 处理背景元素
    const bgElements = document.querySelectorAll('.bg-white, .border, .markdown-body, .highlight, pre, code, section, header, footer, nav, .container, .content, main, aside');
    bgElements.forEach(el => {
      el.classList.remove('bg-white');
      el.classList.add('bg-gray-dark');
      el.style.backgroundColor = "#2f363d";
      el.style.borderColor = "#444";
    });
    
    // 处理按钮
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(el => {
      if (!el.classList.contains('theme-excluded')) {
        el.classList.add('dark-button');
        el.style.backgroundColor = "#2a2e33";
        el.style.color = "#ffffff";
        el.style.borderColor = "#444";
      }
    });
    
    // 处理输入框
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(el => {
      if (el.id !== 'checkbox') { // 排除主题切换按钮
        el.style.backgroundColor = "#2a2e33";
        el.style.color = "#ffffff";
        el.style.borderColor = "#444";
      }
    });
    
    // 处理表格
    const tables = document.querySelectorAll('table');
    tables.forEach(el => {
      el.style.color = "#ffffff";
      el.style.borderColor = "#444";
    });
    
    // 处理表格单元格
    const tableCells = document.querySelectorAll('th, td');
    tableCells.forEach(el => {
      el.style.borderColor = "#444";
    });
    
    // 处理代码块
    const codeBlocks = document.querySelectorAll('pre, code');
    codeBlocks.forEach(el => {
      el.style.backgroundColor = "#1f2428";
      el.style.color = "#e6e6e6";
      el.style.borderColor = "#444";
    });
    
    // 处理引用块
    const blockquotes = document.querySelectorAll('blockquote');
    blockquotes.forEach(el => {
      el.style.borderLeftColor = "#444";
      el.style.color = "#e6e6e6";
    });
    
    // 处理列表项
    const listItems = document.querySelectorAll('li');
    listItems.forEach(el => {
      el.style.color = "#ffffff";
    });
    
    // 处理分割线
    const hrs = document.querySelectorAll('hr');
    hrs.forEach(el => {
      el.style.borderColor = "#444";
    });
    
    // 处理图片
    const images = document.querySelectorAll('img');
    images.forEach(el => {
      el.style.filter = "brightness(0.9)";
    });
    
    // 处理网站特有元素
    if (document.querySelector('.g-footer')) {
      document.querySelector('.g-footer').style.backgroundColor = "#2f363d";
      document.querySelector('.g-footer').style.color = "#ffffff";
    }
    
    // 处理毒鸡汤部分
    if (document.getElementById('sentence')) {
      document.getElementById('sentence').style.color = "#ffffff";
    }
  }
  
  // 全面的浅色主题应用函数
  function applyLightTheme() {
    // 移除全局主题类
    document.documentElement.classList.remove('theme-dark');
    document.body.style.backgroundColor = "";
    document.body.classList.remove('theme-dark');
    
    // 重置基础文本颜色
    document.body.style.color = "";
    
    // 处理所有文本元素
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, td, th, blockquote, label, .masthead-title, .post-meta, .post-title, .site-title, .site-nav, .post-list-heading, .post-content');
    textElements.forEach(el => {
      el.classList.remove('text-white');
      // 清除文本颜色
      el.style.color = "";
      // 恢复可能的灰色文本
      if (el.tagName.toLowerCase() === 'p') {
        el.classList.add('text-gray');
      }
    });
    
    // 特殊处理链接
    const links = document.querySelectorAll('a:not(.btn)');
    links.forEach(el => {
      el.style.color = "";
      el.classList.remove('link-light');
    });
    
    // 处理背景元素
    const bgElements = document.querySelectorAll('.bg-gray-dark, .border, .markdown-body, .highlight, pre, code, section, header, footer, nav, .container, .content, main, aside');
    bgElements.forEach(el => {
      el.classList.remove('bg-gray-dark');
      el.classList.add('bg-white');
      el.style.backgroundColor = "";
      el.style.borderColor = "";
    });
    
    // 处理按钮
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(el => {
      el.classList.remove('dark-button');
      el.style.backgroundColor = "";
      el.style.color = "";
      el.style.borderColor = "";
    });
    
    // 处理输入框
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(el => {
      if (el.id !== 'checkbox') { // 排除主题切换按钮
        el.style.backgroundColor = "";
        el.style.color = "";
        el.style.borderColor = "";
      }
    });
    
    // 处理表格
    const tables = document.querySelectorAll('table');
    tables.forEach(el => {
      el.style.color = "";
      el.style.borderColor = "";
    });
    
    // 处理表格单元格
    const tableCells = document.querySelectorAll('th, td');
    tableCells.forEach(el => {
      el.style.borderColor = "";
    });
    
    // 处理代码块
    const codeBlocks = document.querySelectorAll('pre, code');
    codeBlocks.forEach(el => {
      el.style.backgroundColor = "";
      el.style.color = "";
      el.style.borderColor = "";
    });
    
    // 处理引用块
    const blockquotes = document.querySelectorAll('blockquote');
    blockquotes.forEach(el => {
      el.style.borderLeftColor = "";
      el.style.color = "";
    });
    
    // 处理列表项
    const listItems = document.querySelectorAll('li');
    listItems.forEach(el => {
      el.style.color = "";
    });
    
    // 处理分割线
    const hrs = document.querySelectorAll('hr');
    hrs.forEach(el => {
      el.style.borderColor = "";
    });
    
    // 处理图片
    const images = document.querySelectorAll('img');
    images.forEach(el => {
      el.style.filter = "";
    });
    
    // 处理网站特有元素
    if (document.querySelector('.g-footer')) {
      document.querySelector('.g-footer').style.backgroundColor = "";
      document.querySelector('.g-footer').style.color = "";
    }
    
    // 处理毒鸡汤部分
    if (document.getElementById('sentence')) {
      document.getElementById('sentence').style.color = "";
    }
  }
})(); 