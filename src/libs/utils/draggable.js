/**
 * 拖拽元素指令
 */
export default {
  bind(el) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let elemStartX = 0, elemStartY = 0;

    el.ontouchstart = function(e) {
      isDragging = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      elemStartX = el.offsetLeft;
      elemStartY = el.offsetTop;
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchEnd);
      document.body.style.overflowY = 'hidden'
    };

    function onTouchMove(e) {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      let newX = elemStartX + dx;
      let newY = elemStartY + dy;

      const maxLeft = window.innerWidth - el.offsetWidth;
      const maxTop = window.innerHeight - el.offsetHeight - 100;

      newX = Math.min(Math.max(newX, 0), maxLeft);
      newY = Math.min(Math.max(newY, 100), maxTop);

      el.style.left = newX + 'px';
      el.style.top = newY + 'px';
    }

    function onTouchEnd() {
      isDragging = false;
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      document.body.style.overflowY = 'auto'
    }
  }
};
