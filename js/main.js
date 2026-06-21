/* ============================================
   崔旻帝 MINJE 百科全书 — 互动脚本
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 导航栏滚动效果
    // ==========================================
    const navbar = document.querySelector('.navbar');

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar(); // 初始檢查

    // ==========================================
    // 手机版导航菜单切换
    // ==========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // 点击导航链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // 点击页面其他区域关闭菜单
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('open');
        }
    });

    // ==========================================
    // 歌曲/电影 选项卡切换
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // 移除所有 active
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // 設定選中狀態
            btn.classList.add('active');
            const targetPanel = document.getElementById('panel-' + targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // ==========================================
    // 滚动淡入动画 (Intersection Observer)
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const fadeInElements = document.querySelectorAll(
        '.profile-card, .tmi-card, .rec-card, .timeline-content'
    );

    // 为所有卡片添加初始状态
    fadeInElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // 淡入后不再观察
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => observer.observe(el));

    // ==========================================
    // 像素小狗互动 — 鼠标靠近时增加透明度
    // ==========================================
    const pixelPuppies = document.querySelectorAll('.pixel-puppy');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        pixelPuppies.forEach((puppy, index) => {
            const rect = puppy.getBoundingClientRect();
            const puppyX = rect.left + rect.width / 2;
            const puppyY = rect.top + rect.height / 2;

            const distance = Math.sqrt(
                Math.pow(mouseX - puppyX, 2) + Math.pow(mouseY - puppyY, 2)
            );

            // 鼠标越近越明显
            const maxDistance = 300;
            const opacity = Math.max(0.08, 0.3 - (distance / maxDistance) * 0.22);
            puppy.style.opacity = opacity;
        });
    });

    // ==========================================
    // 平滑滚动到锚点
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 页脚小狗 — 随机改变速度
    // ==========================================
    const runningPuppy = document.querySelector('.footer-puppy');
    if (runningPuppy) {
        // 每次动画结束时随机调整速度
        runningPuppy.addEventListener('animationiteration', () => {
            const newDuration = 8 + Math.random() * 10; // 8-18 秒
            runningPuppy.style.animationDuration = newDuration + 's';
        });
    }

    // ==========================================
    // 照片灯箱
    // ==========================================
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="" alt="放大预览">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    window.openLightbox = function(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImg.src = '';
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxClose) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ==========================================
    // Console 彩蛋
    // ==========================================
    console.log(`
    🐾  ￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣  🐾
        최민제 崔旻帝 MINJE
        欢迎来到旻帝百科全书！
        Made with 💖 for 최민제
    🐾  ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿  🐾
    `);
});
