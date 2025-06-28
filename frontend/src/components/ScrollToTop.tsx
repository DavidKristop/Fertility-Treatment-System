// src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuộn lên đầu trang
    window.scrollTo(0, 0);

    // Bạn cũng có thể cuộn mượt mà hơn nếu muốn:
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth'
    // });

  }, [pathname]); // Dependencies array: Hàm này sẽ chạy lại mỗi khi 'pathname' thay đổi

  return null; // Component này không render bất kỳ UI nào
}

export default ScrollToTop;