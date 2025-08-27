// 替换为你的 GitHub 用户名
const GITHUB_USER = 'LucasGuake'; 

// GitHub API：获取贡献日历数据
fetch(`https://api.github.com/users/${GITHUB_USER}/contributions`)
  .then(res => res.json())
  .then(data => {
    renderContribCalendar(data);
  });

// Canvas 渲染逻辑
function renderContribCalendar(contributions) {
  const canvas = document.createElement('canvas');
  canvas.width = 800; // 日历宽度
  canvas.height = 200; // 日历高度
  const ctx = canvas.getContext('2d');

  // 适配主题色（从页面 CSS 提取）
  const root = document.documentElement;
  const themeColor = getComputedStyle(root).getPropertyValue('--accent-color');

  // 绘制日历格子（示例逻辑，需根据贡献数据映射）
  contributions.forEach((week, weekIndex) => {
    week.forEach((day, dayIndex) => {
      // 根据贡献次数映射颜色深浅
      const intensity = day.count / 10; // 假设最大贡献次数为 10
      ctx.fillStyle = `rgba(${hexToRgb(themeColor)}, ${intensity})`;
      ctx.fillRect(dayIndex * 20, weekIndex * 20, 18, 18);
    });
  });

  // 替换 DOM，插入 Canvas
  const container = document.querySelector('.contrib-calendar-container');
  container.appendChild(canvas);
}

// 辅助函数：Hex 转 RGB
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  return `${parseInt(hex.substring(0, 2), 16)}, ${parseInt(hex.substring(2, 4), 16)}, ${parseInt(hex.substring(4, 6), 16)}`;
}