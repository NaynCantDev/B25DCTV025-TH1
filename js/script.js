/**
 * MINIMALIST PORTFOLIO JAVASCRIPT - NGUYỄN TIẾN HOÀNG (B25DCTV025)
 * Lập trình Web (RIPT1306) - PTIT
 * 
 * 9 TÍNH NĂNG TƯƠNG TÁC JAVASCRIPT:
 *  1. Chuyển đổi Theme Sáng / Tối (Dark / Light) kèm localStorage
 *  2. Menu Hamburger cho Mobile / Tablet
 *  3. Scrollspy - Highlight menu theo vùng cuộn trang
 *  4. Form Validation đa điều kiện + Toast Notification
 *  5. Đếm số lượng ký tự thời gian thực cho tin nhắn (Character counter)
 *  6. Lọc dự án theo danh mục & Tìm kiếm thời gian thực
 *  7. Hiệu ứng xuất hiện khi cuộn (Scroll Reveal qua IntersectionObserver)
 *  8. Năm tự động ở Footer
 *  9. Nút Back to top cuộn mượt
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       1. THEME SÁNG / TỐI (DARK / LIGHT MODE)
       ========================================================================== */
    const initTheme = () => {
        const toggleBtn = document.getElementById('theme-toggle');
        const root = document.documentElement;

        const savedTheme = localStorage.getItem('nayn_minimal_theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

        root.setAttribute('data-theme', initialTheme);

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const current = root.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                root.setAttribute('data-theme', next);
                localStorage.setItem('nayn_minimal_theme', next);
                showToast(`Giao diện: ${next === 'dark' ? 'Tối' : 'Sáng'}`);
            });
        }
    };

    /* ==========================================================================
       2. MENU MOBILE HAMBURGER
       ========================================================================== */
    const initMobileMenu = () => {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mainNav = document.getElementById('main-nav');
        const navLinks = document.querySelectorAll('.main-nav .nav-link');

        if (!hamburgerBtn || !mainNav) return;

        const toggle = () => {
            const isOpen = mainNav.classList.toggle('open');
            hamburgerBtn.classList.toggle('active', isOpen);
            hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
        };

        const close = () => {
            mainNav.classList.remove('open');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        };

        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggle();
        });

        navLinks.forEach(link => link.addEventListener('click', close));

        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                close();
            }
        });
    };

    /* ==========================================================================
       3. SCROLLSPY & SMOOTH SCROLL OFFSET
       ========================================================================== */
    const initScrollspy = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.main-nav .nav-link');
        const header = document.getElementById('header');
        const headerOffset = header ? header.offsetHeight : 60;

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    const el = document.querySelector(targetId);
                    if (el) {
                        e.preventDefault();
                        const topPos = el.getBoundingClientRect().top + window.pageYOffset - (headerOffset + 10);
                        window.scrollTo({ top: topPos, behavior: 'smooth' });
                    }
                }
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, {
            root: null,
            rootMargin: `-${headerOffset}px 0px -40% 0px`,
            threshold: 0.1
        });

        sections.forEach(s => observer.observe(s));
    };

    /* ==========================================================================
       4. FORM VALIDATION & SUBMISSION
       ========================================================================== */
    const initFormValidation = () => {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const nameInput = document.getElementById('fullname');
        const emailInput = document.getElementById('email');
        const subjectSelect = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('btn-submit');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const setValidity = (input, isValid, message = '') => {
            const field = input.closest('.form-field');
            if (!field) return;
            const errorSpan = field.querySelector('.field-error');

            if (isValid) {
                field.classList.remove('has-error');
            } else {
                field.classList.add('has-error');
                if (errorSpan && message) errorSpan.textContent = message;
            }
        };

        const validateName = () => {
            const val = nameInput.value.trim();
            if (val.length < 2) {
                setValidity(nameInput, false, 'Họ và tên tối thiểu 2 ký tự.');
                return false;
            }
            if (/\d/.test(val)) {
                setValidity(nameInput, false, 'Họ và tên không chứa số.');
                return false;
            }
            setValidity(nameInput, true);
            return true;
        };

        const validateEmail = () => {
            const val = emailInput.value.trim();
            if (!emailPattern.test(val)) {
                setValidity(emailInput, false, 'Địa chỉ email không đúng định dạng.');
                return false;
            }
            setValidity(emailInput, true);
            return true;
        };

        const validateSubject = () => {
            const val = subjectSelect.value;
            if (!val || val === '') {
                setValidity(subjectSelect, false, 'Vui lòng chọn chủ đề liên hệ.');
                return false;
            }
            setValidity(subjectSelect, true);
            return true;
        };

        const validateMessage = () => {
            const val = messageInput.value.trim();
            if (val.length < 10) {
                setValidity(messageInput, false, `Nội dung tối thiểu 10 ký tự (hiện có: ${val.length}).`);
                return false;
            }
            setValidity(messageInput, true);
            return true;
        };

        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        subjectSelect.addEventListener('change', validateSubject);
        messageInput.addEventListener('blur', validateMessage);

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const v1 = validateName();
            const v2 = validateEmail();
            const v3 = validateSubject();
            const v4 = validateMessage();

            if (!v1 || !v2 || !v3 || !v4) {
                showToast('Vui lòng kiểm tra lại thông tin biểu mẫu.', 'error');
                return;
            }

            // Gửi giả lập
            submitBtn.disabled = true;
            const btnText = submitBtn.querySelector('.btn-text');
            const btnSpinner = submitBtn.querySelector('.btn-spinner');

            if (btnText) btnText.style.display = 'none';
            if (btnSpinner) btnSpinner.style.display = 'inline';

            setTimeout(() => {
                submitBtn.disabled = false;
                if (btnText) btnText.style.display = 'inline';
                if (btnSpinner) btnSpinner.style.display = 'none';

                showToast(`Cảm ơn ${nameInput.value.trim()}, tin nhắn đã gửi thành công!`, 'success');
                form.reset();
                document.querySelectorAll('.form-field').forEach(f => f.classList.remove('has-error'));

                const countEl = document.getElementById('char-count');
                const counterWrap = document.getElementById('char-counter');
                if (countEl) countEl.textContent = '0';
                if (counterWrap) counterWrap.classList.remove('warn', 'limit');
            }, 1000);
        });
    };

    /* ==========================================================================
       5. BỘ ĐẾM KÝ TỰ REAL-TIME
       ========================================================================== */
    const initCharacterCounter = () => {
        const textarea = document.getElementById('message');
        const countDisplay = document.getElementById('char-count');
        const counterWrap = document.getElementById('char-counter');
        const maxLen = 500;

        if (!textarea || !countDisplay || !counterWrap) return;

        textarea.addEventListener('input', () => {
            const len = textarea.value.length;
            countDisplay.textContent = len;

            if (len >= maxLen) {
                counterWrap.classList.add('limit');
                counterWrap.classList.remove('warn');
            } else if (len >= maxLen * 0.9) {
                counterWrap.classList.add('warn');
                counterWrap.classList.remove('limit');
            } else {
                counterWrap.classList.remove('warn', 'limit');
            }
        });
    };

    /* ==========================================================================
       6. LỌC DANH MỤC & TÌM KIẾM DỰ ÁN
       ========================================================================== */
    const initProjectFilter = () => {
        const tabs = document.querySelectorAll('.filter-tab');
        const searchInput = document.getElementById('project-search-input');
        const clearBtn = document.getElementById('clear-search-btn');
        const projectItems = document.querySelectorAll('.project-item');
        const emptyState = document.getElementById('empty-projects');

        let activeCategory = 'all';
        let searchQuery = '';

        const applyFilter = () => {
            let matched = 0;

            projectItems.forEach(item => {
                const cat = item.getAttribute('data-category');
                const keywords = (item.getAttribute('data-keywords') || '').toLowerCase();
                const title = (item.querySelector('.project-name')?.textContent || '').toLowerCase();
                const desc = (item.querySelector('.project-summary')?.textContent || '').toLowerCase();

                const text = `${title} ${desc} ${keywords}`;

                const matchCat = (activeCategory === 'all' || cat === activeCategory);
                const matchQuery = (searchQuery === '' || text.includes(searchQuery));

                if (matchCat && matchQuery) {
                    item.style.display = 'block';
                    matched++;
                } else {
                    item.style.display = 'none';
                }
            });

            if (emptyState) {
                emptyState.style.display = matched === 0 ? 'block' : 'none';
            }
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeCategory = tab.getAttribute('data-filter') || 'all';
                applyFilter();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim().toLowerCase();
                if (clearBtn) {
                    clearBtn.style.display = searchQuery.length > 0 ? 'block' : 'none';
                }
                applyFilter();
            });
        }

        if (clearBtn && searchInput) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                searchQuery = '';
                clearBtn.style.display = 'none';
                searchInput.focus();
                applyFilter();
            });
        }
    };

    /* ==========================================================================
       7. SCROLL REVEAL ANIMATIONS
       ========================================================================== */
    const initScrollReveal = () => {
        const reveals = document.querySelectorAll('.reveal');

        if (!('IntersectionObserver' in window)) {
            reveals.forEach(r => r.classList.add('revealed'));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        reveals.forEach(r => observer.observe(r));
    };

    /* ==========================================================================
       8. NĂM TỰ ĐỘNG Ở FOOTER
       ========================================================================== */
    const initFooterYear = () => {
        const yearEl = document.getElementById('current-year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    };

    /* ==========================================================================
       9. NÚT BACK TO TOP
       ========================================================================== */
    const initBackToTop = () => {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 280) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    /* ==========================================================================
       TOAST NOTIFICATION
       ========================================================================== */
    const showToast = (message, type = 'info') => {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.25s ease';
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 250);
        }, 3000);
    };

    // Khởi chạy
    initTheme();
    initMobileMenu();
    initScrollspy();
    initFormValidation();
    initCharacterCounter();
    initProjectFilter();
    initScrollReveal();
    initFooterYear();
    initBackToTop();
});
