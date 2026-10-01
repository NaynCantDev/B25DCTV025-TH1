/**
 * PORTFOLIO SCRIPT - NGUYỄN TIẾN HOÀNG (B25DCTV025)
 * Môn học: Lập trình Web (RIPT1306) - Lớp N2 - Học viện CNBCVT (PTIT)
 * 
 * DANH SÁCH 9 TÍNH NĂNG TƯƠNG TÁC JAVASCRIPT:
 *  1. Chế độ Sáng / Tối (Dark / Light mode) kèm lưu trữ localStorage
 *  2. Menu Hamburger cho giao diện Mobile & Tablet (Responsive Drawer)
 *  3. Cuộn mượt mà (Smooth scroll) & Tự động highlight mục menu đang xem (Scrollspy)
 *  4. Kiểm tra tính hợp lệ dữ liệu biểu mẫu (Form Validation) đa điều kiện + Toast thông báo
 *  5. Đếm số ký tự nhập vào thời gian thực (Character counter) cho ô lời nhắn
 *  6. Lọc dự án theo danh mục & Tìm kiếm dự án theo từ khóa / thẻ (Real-time Filter & Search)
 *  7. Hiệu ứng xuất hiện khi cuộn trang (Scroll reveal animation qua IntersectionObserver)
 *  8. Hiển thị năm hiện tại tự động ở Footer (Dynamic current year)
 *  9. Nút cuộn nhanh lên đầu trang (Back to top floating button)
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       TÍNH NĂNG 1: CHẾ ĐỘ SÁNG / TỐI (DARK / LIGHT MODE)
       - Lưu tùy chọn vào localStorage
       - Tự động nhận diện theme hệ thống nếu chưa có thiết lập trước đó
       ========================================================================== */
    const initThemeToggle = () => {
        const themeToggleBtn = document.getElementById('theme-toggle');
        const rootElement = document.documentElement;

        // Lấy theme đã lưu hoặc theo cấu hình hệ điều hành
        const savedTheme = localStorage.getItem('hoang_portfolio_theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        rootElement.setAttribute('data-theme', currentTheme);

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                const nowTheme = rootElement.getAttribute('data-theme');
                const newTheme = nowTheme === 'dark' ? 'light' : 'dark';
                
                rootElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('hoang_portfolio_theme', newTheme);

                showToast(`Đã chuyển sang giao diện ${newTheme === 'dark' ? 'Tối' : 'Sáng'}`, 'info');
            });
        }
    };

    /* ==========================================================================
       TÍNH NĂNG 2: MENU HAMBURGER CHO GIAO DIỆN MOBILE & TABLET
       - Đóng/mở drawer menu
       - Tự động đóng khi nhấn vào liên kết hoặc click ra ngoài vùng menu
       ========================================================================== */
    const initMobileMenu = () => {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mainNav = document.getElementById('main-nav');
        const navLinks = document.querySelectorAll('.main-nav .nav-link');

        if (!hamburgerBtn || !mainNav) return;

        const toggleMenu = () => {
            const isOpen = mainNav.classList.toggle('open');
            hamburgerBtn.classList.toggle('active', isOpen);
            hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
        };

        const closeMenu = () => {
            mainNav.classList.remove('open');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        };

        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Đóng menu khi nhấp vào bất kỳ link nào
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Đóng menu khi nhấp ra ngoài
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                closeMenu();
            }
        });
    };

    /* ==========================================================================
       TÍNH NĂNG 3: CUỘN MƯỢT MÀ & HIGHLIGHT MỤC MENU ĐANG XEM (SCROLLSPY)
       - Sử dụng IntersectionObserver để theo dõi section đang active
       - Hỗ trợ bù trừ chiều cao Fixed Header khi click anchor link
       ========================================================================== */
    const initScrollSpy = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.main-nav .nav-link');
        const headerHeight = document.getElementById('header')?.offsetHeight || 72;

        // Xử lý scroll bù trừ header khi click link
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        const elementPosition = targetEl.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - (headerHeight - 2);

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // IntersectionObserver để active nav link theo vị trí cuộn
        const observerOptions = {
            root: null,
            rootMargin: `-${headerHeight}px 0px -40% 0px`,
            threshold: 0.1
        };

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
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    };

    /* ==========================================================================
       TÍNH NĂNG 4: VALIDATE BIỂU MẪU LIÊN HỆ (FORM VALIDATION ĐA ĐIỀU KIỆN)
       - Kiểm tra tính hợp lệ của từng trường theo thời gian thực (blur/input)
       - Hiển thị thông báo lỗi inline trực quan
       - Giả lập tiến trình gửi tin nhắn và thông báo Toast thành công
       ========================================================================== */
    const initFormValidation = () => {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const fullnameInput = document.getElementById('fullname');
        const emailInput = document.getElementById('email');
        const subjectSelect = document.getElementById('subject');
        const messageTextarea = document.getElementById('message');
        const submitBtn = document.getElementById('btn-submit');

        // Regex kiểm tra email chuẩn quốc tế
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const setFieldStatus = (inputElement, isValid, errorMsg = '') => {
            const formGroup = inputElement.closest('.form-group');
            if (!formGroup) return;

            const errorElement = formGroup.querySelector('.error-msg');

            if (isValid) {
                formGroup.classList.remove('has-error');
                formGroup.classList.add('has-success');
                if (errorElement) errorElement.textContent = '';
            } else {
                formGroup.classList.remove('has-success');
                formGroup.classList.add('has-error');
                if (errorElement && errorMsg) errorElement.textContent = errorMsg;
            }
        };

        const validateFullname = () => {
            const val = fullnameInput.value.trim();
            if (val.length === 0) {
                setFieldStatus(fullnameInput, false, 'Vui lòng không để trống họ và tên.');
                return false;
            }
            if (val.length < 2) {
                setFieldStatus(fullnameInput, false, 'Họ và tên phải có tối thiểu 2 ký tự.');
                return false;
            }
            // Không chứa chữ số
            if (/\d/.test(val)) {
                setFieldStatus(fullnameInput, false, 'Họ và tên không được chứa chữ số.');
                return false;
            }
            setFieldStatus(fullnameInput, true);
            return true;
        };

        const validateEmail = () => {
            const val = emailInput.value.trim();
            if (val.length === 0) {
                setFieldStatus(emailInput, false, 'Vui lòng nhập địa chỉ email.');
                return false;
            }
            if (!emailRegex.test(val)) {
                setFieldStatus(emailInput, false, 'Email không đúng định dạng (ví dụ: hoang@domain.com).');
                return false;
            }
            setFieldStatus(emailInput, true);
            return true;
        };

        const validateSubject = () => {
            const val = subjectSelect.value;
            if (!val || val === '') {
                setFieldStatus(subjectSelect, false, 'Vui lòng chọn một chủ đề liên hệ.');
                return false;
            }
            setFieldStatus(subjectSelect, true);
            return true;
        };

        const validateMessage = () => {
            const val = messageTextarea.value.trim();
            if (val.length === 0) {
                setFieldStatus(messageTextarea, false, 'Vui lòng không để trống nội dung tin nhắn.');
                return false;
            }
            if (val.length < 10) {
                setFieldStatus(messageTextarea, false, `Nội dung còn quá ngắn (${val.length}/10 ký tự tối thiểu).`);
                return false;
            }
            setFieldStatus(messageTextarea, true);
            return true;
        };

        // Gắn sự kiện blur (rời khỏi ô nhập)
        fullnameInput.addEventListener('blur', validateFullname);
        fullnameInput.addEventListener('input', () => {
            if (fullnameInput.closest('.form-group').classList.contains('has-error')) {
                validateFullname();
            }
        });

        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', () => {
            if (emailInput.closest('.form-group').classList.contains('has-error')) {
                validateEmail();
            }
        });

        subjectSelect.addEventListener('change', validateSubject);

        messageTextarea.addEventListener('blur', validateMessage);
        messageTextarea.addEventListener('input', () => {
            if (messageTextarea.closest('.form-group').classList.contains('has-error')) {
                validateMessage();
            }
        });

        // Xử lý gửi Form
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const isNameValid = validateFullname();
            const isEmailValid = validateEmail();
            const isSubValid = validateSubject();
            const isMsgValid = validateMessage();

            if (!isNameValid || !isEmailValid || !isSubValid || !isMsgValid) {
                showToast('Vui lòng kiểm tra lại thông tin biểu mẫu!', 'error');
                return;
            }

            // Giả lập trạng thái Loading khi gửi dữ liệu
            submitBtn.disabled = true;
            const btnText = submitBtn.querySelector('.btn-text');
            const btnSpinner = submitBtn.querySelector('.btn-spinner');
            const originalText = btnText.textContent;

            btnText.textContent = 'Đang gửi tin nhắn...';
            btnSpinner.style.display = 'inline-block';

            setTimeout(() => {
                submitBtn.disabled = false;
                btnText.textContent = originalText;
                btnSpinner.style.display = 'none';

                showToast(`Cảm ơn ${fullnameInput.value.trim()}! Lời nhắn của bạn đã được gửi thành công.`, 'success');

                // Reset biểu mẫu & giao diện
                form.reset();
                document.querySelectorAll('.form-group').forEach(grp => {
                    grp.classList.remove('has-success', 'has-error');
                });

                // Cập nhật lại bộ đếm ký tự
                const charCountEl = document.getElementById('char-count');
                const charCounterEl = document.getElementById('char-counter');
                if (charCountEl) charCountEl.textContent = '0';
                if (charCounterEl) charCounterEl.classList.remove('warning', 'limit');
            }, 1200);
        });
    };

    /* ==========================================================================
       TÍNH NĂNG 5: ĐẾM SỐ KÝ TỰ NHẬP VÀO THỜI GIAN THỰC (CHARACTER COUNTER)
       - Cập nhật số lượng ký tự trực tiếp khi người dùng gõ
       - Cảnh báo màu vàng khi sắp đạt giới hạn và màu đỏ khi tối đa
       ========================================================================== */
    const initCharacterCounter = () => {
        const textarea = document.getElementById('message');
        const countDisplay = document.getElementById('char-count');
        const counterContainer = document.getElementById('char-counter');
        const maxLen = 500;

        if (!textarea || !countDisplay || !counterContainer) return;

        textarea.addEventListener('input', () => {
            const currentLength = textarea.value.length;
            countDisplay.textContent = currentLength;

            if (currentLength >= maxLen) {
                counterContainer.classList.add('limit');
                counterContainer.classList.remove('warning');
            } else if (currentLength >= maxLen * 0.9) {
                counterContainer.classList.add('warning');
                counterContainer.classList.remove('limit');
            } else {
                counterContainer.classList.remove('warning', 'limit');
            }
        });
    };

    /* ==========================================================================
       TÍNH NĂNG 6: LỌC & TÌM KIẾM DỰ ÁN THEO DANH MỤC VÀ TỪ KHÓA
       - Lọc theo tag category: All, AI, Web
       - Tìm kiếm real-time theo tiêu đề, mô tả, công nghệ
       - Hiển thị empty state khi không tìm thấy
       ========================================================================== */
    const initProjectFilterAndSearch = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('project-search-input');
        const clearBtn = document.getElementById('clear-search-btn');
        const projectCards = document.querySelectorAll('.project-card');
        const emptyState = document.getElementById('empty-projects');

        let currentCategory = 'all';
        let currentKeyword = '';

        const filterProjects = () => {
            let visibleCount = 0;

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
                const title = (card.querySelector('.project-title')?.textContent || '').toLowerCase();
                const desc = (card.querySelector('.project-desc')?.textContent || '').toLowerCase();

                const contentToSearch = `${title} ${desc} ${keywords}`;
                
                const matchCategory = (currentCategory === 'all' || category === currentCategory);
                const matchKeyword = currentKeyword === '' || contentToSearch.includes(currentKeyword);

                if (matchCategory && matchKeyword) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (emptyState) {
                emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        };

        // Sự kiện click nút filter category
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.getAttribute('data-filter') || 'all';
                filterProjects();
            });
        });

        // Sự kiện gõ từ khóa tìm kiếm
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentKeyword = e.target.value.trim().toLowerCase();
                if (clearBtn) {
                    clearBtn.style.display = currentKeyword.length > 0 ? 'block' : 'none';
                }
                filterProjects();
            });
        }

        // Sự kiện xóa tìm kiếm
        if (clearBtn && searchInput) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                currentKeyword = '';
                clearBtn.style.display = 'none';
                searchInput.focus();
                filterProjects();
            });
        }
    };

    /* ==========================================================================
       TÍNH NĂNG 7: HIỆU ỨNG XUẤT HIỆN KHI CUỘN TRANG (SCROLL REVEAL ANIMATION)
       - Sử dụng IntersectionObserver theo dõi các phần tử có class .reveal
       - Tự động thêm class .revealed khi phần tử xuất hiện trong khung nhìn
       ========================================================================== */
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal');

        if (!('IntersectionObserver' in window)) {
            // Fallback nếu trình duyệt cũ không hỗ trợ IntersectionObserver
            revealElements.forEach(el => el.classList.add('revealed'));
            return;
        }

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Chỉ chạy animation 1 lần
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    };

    /* ==========================================================================
       TÍNH NĂNG 8: TỰ ĐỘNG HIỂN THỊ NĂM HIỆN TẠI Ở FOOTER
       ========================================================================== */
    const initDynamicYear = () => {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };

    /* ==========================================================================
       TÍNH NĂNG 9: NÚT CUỘN LÊN ĐẦU TRANG (BACK TO TOP)
       - Ẩn/hiện khi cuộn qua mốc 300px
       - Cuộn mượt mà lên đỉnh trang khi nhấp
       ========================================================================== */
    const initBackToTop = () => {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 320) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    /* ==========================================================================
       HỆ THỐNG TOAST THÔNG BÁO (TOAST NOTIFICATION HELPER)
       ========================================================================== */
    const showToast = (message, type = 'info') => {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let iconSvg = '';
        if (type === 'success') {
            iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else if (type === 'error') {
            iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
        } else {
            iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
        }

        toast.innerHTML = `
            ${iconSvg}
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // Tự động gỡ sau 3.5 giây
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(15px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3500);
    };

    /* ==========================================================================
       KHỞI CHẠY TẤT CẢ CÁC TÍNH NĂNG
       ========================================================================== */
    initThemeToggle();
    initMobileMenu();
    initScrollSpy();
    initFormValidation();
    initCharacterCounter();
    initProjectFilterAndSearch();
    initScrollReveal();
    initDynamicYear();
    initBackToTop();
});
