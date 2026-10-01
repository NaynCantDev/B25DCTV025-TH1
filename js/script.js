/**
 * JAVASCRIPT TƯƠNG TÁC - BÀI THỰC HÀNH 01 (LTW - PTIT)
 * Sinh viên: Nguyễn Tiến Hoàng (B25DCTV025)
 * 
 * CÁC TÍNH NĂNG TƯƠNG TÁC THEO ĐỀ BÀI:
 *  1. Dark / Light mode (kèm localStorage)
 *  2. Menu hamburger (giao diện di động)
 *  3. Smooth scroll (cuộn mượt mà bù trừ header)
 *  4. Validate form (kiểm tra nhiều điều kiện trước khi gửi)
 *  5. Đếm ký tự (theo dõi độ dài ô lời nhắn thời gian thực)
 *  6. Lọc / Tìm kiếm dự án theo từ khóa và danh mục
 *  7. Hiển thị năm hiện tại tự động ở footer
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       1. DARK / LIGHT MODE
       ========================================================================== */
    const initTheme = () => {
        const btn = document.getElementById('theme-toggle');
        const root = document.documentElement;

        const saved = localStorage.getItem('portfolio_theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));

        if (btn) {
            btn.addEventListener('click', () => {
                const isDark = root.getAttribute('data-theme') === 'dark';
                const next = isDark ? 'light' : 'dark';
                root.setAttribute('data-theme', next);
                localStorage.setItem('portfolio_theme', next);
            });
        }
    };

    /* ==========================================================================
       2. MENU HAMBURGER CHO MOBILE
       ========================================================================== */
    const initMobileMenu = () => {
        const btn = document.getElementById('hamburger-btn');
        const nav = document.getElementById('nav');
        const links = document.querySelectorAll('.nav-link');

        if (!btn || !nav) return;

        const toggle = () => {
            const isOpen = nav.classList.toggle('open');
            btn.classList.toggle('open', isOpen);
            btn.setAttribute('aria-expanded', String(isOpen));
        };

        const close = () => {
            nav.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        };

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggle();
        });

        links.forEach(l => l.addEventListener('click', close));

        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !btn.contains(e.target)) {
                close();
            }
        });
    };

    /* ==========================================================================
       3. SMOOTH SCROLL & ACTIVE MENU
       ========================================================================== */
    const initSmoothScroll = () => {
        const links = document.querySelectorAll('.nav-link');
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 56;

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    const el = document.querySelector(targetId);
                    if (el) {
                        e.preventDefault();
                        const pos = el.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 10);
                        window.scrollTo({ top: pos, behavior: 'smooth' });
                    }
                }
            });
        });

        // Highlight menu khi cuộn
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(sec => {
                const top = sec.offsetTop - headerHeight - 40;
                if (window.pageYOffset >= top) {
                    current = sec.getAttribute('id');
                }
            });

            links.forEach(link => {
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }, { passive: true });
    };

    /* ==========================================================================
       4. VALIDATE FORM (KIỂM TRA NHIỀU ĐIỀU KIỆN)
       ========================================================================== */
    const initFormValidation = () => {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const nameInput = document.getElementById('fullname');
        const emailInput = document.getElementById('email');
        const msgInput = document.getElementById('message');
        const submitBtn = document.getElementById('btn-submit');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const checkField = (input, isValid) => {
            const group = input.closest('.form-group');
            if (!group) return;
            if (isValid) {
                group.classList.remove('has-error');
            } else {
                group.classList.add('has-error');
            }
        };

        const validateName = () => {
            const val = nameInput.value.trim();
            const valid = val.length >= 2 && !/\d/.test(val);
            checkField(nameInput, valid);
            return valid;
        };

        const validateEmail = () => {
            const val = emailInput.value.trim();
            const valid = emailPattern.test(val);
            checkField(emailInput, valid);
            return valid;
        };

        const validateMsg = () => {
            const val = msgInput.value.trim();
            const valid = val.length >= 10;
            checkField(msgInput, valid);
            return valid;
        };

        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        msgInput.addEventListener('blur', validateMsg);

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const v1 = validateName();
            const v2 = validateEmail();
            const v3 = validateMsg();

            if (!v1 || !v2 || !v3) {
                showToast('Vui lòng kiểm tra lại các trường thông tin màu đỏ.');
                return;
            }

            // Giả lập gửi tin nhắn
            submitBtn.disabled = true;
            const label = submitBtn.querySelector('.btn-label');
            const loading = submitBtn.querySelector('.btn-loading');
            if (label) label.style.display = 'none';
            if (loading) loading.style.display = 'inline';

            setTimeout(() => {
                submitBtn.disabled = false;
                if (label) label.style.display = 'inline';
                if (loading) loading.style.display = 'none';

                showToast(`Cảm ơn bạn! Tin nhắn đã được gửi thành công.`);
                form.reset();
                document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

                const count = document.getElementById('char-count');
                const counter = document.getElementById('char-counter');
                if (count) count.textContent = '0';
                if (counter) counter.classList.remove('warn', 'limit');
            }, 800);
        });
    };

    /* ==========================================================================
       5. ĐẾM KÝ TỰ (CHARACTER COUNTER)
       ========================================================================== */
    const initCharCounter = () => {
        const msg = document.getElementById('message');
        const count = document.getElementById('char-count');
        const wrap = document.getElementById('char-counter');
        const max = 500;

        if (!msg || !count || !wrap) return;

        msg.addEventListener('input', () => {
            const len = msg.value.length;
            count.textContent = len;

            if (len >= max) {
                wrap.classList.add('limit');
                wrap.classList.remove('warn');
            } else if (len >= max * 0.9) {
                wrap.classList.add('warn');
                wrap.classList.remove('limit');
            } else {
                wrap.classList.remove('warn', 'limit');
            }
        });
    };

    /* ==========================================================================
       6. LỌC & TÌM KIẾM DỰ ÁN THEO TỪ KHÓA / TAG
       ========================================================================== */
    const initProjectSearchAndFilter = () => {
        const searchInput = document.getElementById('project-search');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectBoxes = document.querySelectorAll('.project-box');
        const emptyMsg = document.getElementById('empty-msg');

        let currentCategory = 'all';
        let currentSearch = '';

        const filter = () => {
            let matched = 0;
            projectBoxes.forEach(box => {
                const cat = box.getAttribute('data-category');
                const keywords = (box.getAttribute('data-keywords') || '').toLowerCase();
                const title = (box.querySelector('.project-title')?.textContent || '').toLowerCase();
                const desc = (box.querySelector('.project-desc')?.textContent || '').toLowerCase();

                const combined = `${title} ${desc} ${keywords}`;
                const matchCat = (currentCategory === 'all' || cat === currentCategory);
                const matchSearch = currentSearch === '' || combined.includes(currentSearch);

                if (matchCat && matchSearch) {
                    box.style.display = 'flex';
                    matched++;
                } else {
                    box.style.display = 'none';
                }
            });

            if (emptyMsg) {
                emptyMsg.style.display = matched === 0 ? 'block' : 'none';
            }
        };

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.getAttribute('data-filter') || 'all';
                filter();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value.trim().toLowerCase();
                filter();
            });
        }
    };

    /* ==========================================================================
       7. HIỂN THỊ NĂM HIỆN TẠI Ở FOOTER
       ========================================================================== */
    const initFooterYear = () => {
        const el = document.getElementById('current-year');
        if (el) el.textContent = new Date().getFullYear();
    };

    /* ==========================================================================
       TOAST THÔNG BÁO NHANH
       ========================================================================== */
    const showToast = (message) => {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.textContent = message;
        toast.style.display = 'block';

        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    };

    // Khởi chạy
    initTheme();
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initCharCounter();
    initProjectSearchAndFilter();
    initFooterYear();
});
