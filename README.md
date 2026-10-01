# BÀI THỰC HÀNH 01 - LẬP TRÌNH WEB (LTW)
## XÂY DỰNG TRANG WEB GIỚI THIỆU BẢN THÂN (PERSONAL PORTFOLIO - MINIMALISM)

---

### THÔNG TIN SINH VIÊN
* **Họ và tên:** Nguyễn Tiến Hoàng (Nayn)
* **Mã sinh viên:** `B25DCTV025`
* **Lớp:** `D25CQTV01-B`
* **Chuyên ngành:** Trí tuệ nhân tạo vạn vật (AIoT)
* **Môn học:** Lập trình Web (`RIPT1306`)
* **Lớp học phần:** `RIPT1306-20261-08` (Nhóm N2)
* **Giảng viên phụ trách:** Thầy Nguyễn Vũ Nhân (`nvnhan`)

---

### 1. PHONG CÁCH THIẾT KẾ & TƯ DUY XÂY DỰNG
Trang web được thiết kế theo triết lý **Tối giản (Minimalism & Clean Code)**, tập trung vào trải nghiệm đọc, nội dung xác thực và tốc độ tải trang cao:
* **Typography & Palette:** Hệ thống font không chân sắc nét (`Inter`), phông chữ kỹ thuật (`JetBrains Mono`). Bảng màu trung tính tinh tế (`Zinc & Neutral`) hỗ trợ chuyển đổi mượt mà giữa **Dark Mode** và **Light Mode**.
* **Nói không với các chỉ số sáo rỗng:** Loại bỏ các thanh phần trăm (%) kỹ năng phi thực tế. Thay vào đó phân nhóm kỹ năng theo mức độ tiếp cận trung thực: *Trọng tâm nghiên cứu*, *Nền tảng học thuật* và *Đang học tập*.
* **Dữ liệu thực tế:** Trích xuất và đối chiếu chính xác từ kinh nghiệm làm việc thực tế tại **Dagoras**, thành viên nghiên cứu **Lab CNS (Viện RIPT)**, CLB **PROPTIT**, các kho lưu trữ thực tế trên GitHub `@NaynCantDev`, Kaggle `@naynthedev` và ảnh đại diện chính chủ.

---

### 2. CẤU TRÚC MÃ NGUỒN
```text
B25DCTV025 - TH1/
├── assets/
│   └── avatar.jpg          # Ảnh đại diện chính chủ độ phân giải cao
├── css/
│   └── style.css           # Toàn bộ CSS phong cách tối giản (Grid, Flexbox, Themes, Responsive)
├── js/
│   └── script.js           # 9 tính năng tương tác bằng JavaScript thuần (Vanilla JS)
├── index.html              # Cấu trúc HTML5 chuẩn Semantic
└── README.md               # Tài liệu báo cáo chi tiết
```

---

### 3. ĐÁP ỨNG ĐẦY ĐỦ CÁC TIÊU CHÍ KỸ THUẬT

#### 3.1. Cấu trúc HTML5 Semantic
* [x] **Header / Navigation:** Logo thương hiệu, điều hướng liên kết nội bộ (`#hero`, `#about`, `#experience`, `#skills`, `#projects`, `#contact`), nút chuyển Theme Sáng/Tối và nút Menu Hamburger cho Mobile.
* [x] **Giới thiệu bản thân (Hero & About):** Ảnh đại diện bo góc tinh tế, họ tên đầy đủ, mã sinh viên `B25DCTV025`, lớp `D25CQTV01-B`, định hướng chuyên sâu Computer Vision & Deep Learning, các liên kết mạng xã hội chính thức.
* [x] **Kinh nghiệm thực tế (Experience):** Ghi nhận quá trình thực tập tại Dagoras, thành viên nghiên cứu Lab CNS (RIPT) và CLB PROPTIT.
* [x] **Năng lực kỹ thuật (Skills):**
  * *Computer Vision & Deep Learning:* Huấn luyện mô hình, OpenCV, nhận diện khuôn mặt, tiền xử lý dữ liệu ảnh.
  * *Lập trình học thuật & Scripting:* C/C++ giải thuật & cấu trúc dữ liệu, Python phục vụ ML/DL.
  * *Đang học tập:* Java (Lập trình hướng đối tượng - OOP), Lập trình Web (HTML5/CSS3/JS).
* [x] **Dự án thực tế (5 dự án trên GitHub @NaynCantDev, vượt yêu cầu $\ge 3$ dự án):**
  1. `Face_recognize`: Ứng dụng nhận diện khuôn mặt nghiên cứu tại CNS Lab (Python, OpenCV).
  2. `Learning-About-AI-Things`: Kho lưu trữ thực nghiệm huấn luyện mô hình ML/DL (Jupyter Notebook, Python).
  3. `ProPTIT_Java`: Dự án tự học Lập trình hướng đối tượng (OOP) với Java.
  4. `simulate-a-ball`: Dự án mô phỏng chuyển động vật lý đầu tiên trên GitHub (Python, Pygame).
  5. `Personal Portfolio (TH01)`: Website cá nhân tối giản chuẩn RWD cho môn Lập trình Web PTIT.
* [x] **Form liên hệ (Contact):** Thông tin sinh viên PTIT và biểu mẫu gửi tin nhắn có kiểm tra dữ liệu đầu vào.
* [x] **Footer:** Bản quyền, năm tự động, thông tin học phần PTIT.

#### 3.2. Bố cục CSS & Responsive
* [x] Sử dụng **CSS Grid** và **Flexbox** xuyên suốt cho layout.
* [x] Hiệu ứng `hover` chuyển tiếp mượt mà (`transition`), viền sáng nhẹ, nâng khối tự nhiên.
* [x] **Responsive đa màn hình (2 Breakpoints chính):**
  * Tablet (`max-width: 900px`): Thu gọn lưới đa cột sang 1 cột, cân chỉnh tỷ lệ hero và padding.
  * Mobile (`max-width: 680px`): Kích hoạt menu Hamburger dạng drawer, xếp dọc toàn bộ khối nội dung thân thiện cho cảm ứng.

#### 3.3. JavaScript thuần (Cài đặt 9 tính năng tương tác - Yêu cầu $\ge 5$)
1. **Dark / Light Mode Toggle:** Lưu tùy chọn vào `localStorage`, tự động theo theme hệ điều hành.
2. **Mobile Hamburger Menu:** Đóng/mở drawer menu mượt mà, tự đóng khi click link hoặc ra ngoài.
3. **Scrollspy & Smooth Scroll:** Tự động highlight mục menu đang xem và bù trừ chiều cao Fixed Header.
4. **Form Validation đa điều kiện:** Kiểm tra tên, email regex, chủ đề, độ dài lời nhắn; báo lỗi inline và thông báo Toast khi hoàn tất.
5. **Character Counter thời gian thực:** Đếm số lượng ký tự nhập vào ô lời nhắn (`0 / 500`), đổi màu cảnh báo khi sắp chạm ngưỡng.
6. **Lọc danh mục & Tìm kiếm dự án:** Lọc nhanh theo tab (Tất cả, AI & Vision, Học thuật & OOP, Web) và tìm kiếm trực tiếp theo từ khóa.
7. **Scroll Reveal Animation:** Xuất hiện tinh tế các phần tử khi cuộn vào khung nhìn bằng `IntersectionObserver`.
8. **Năm tự động ở Footer:** Cập nhật theo `new Date().getFullYear()`.
9. **Nút Back-to-Top:** Xuất hiện khi cuộn qua 280px, cuộn mượt về đầu trang.

---

### 4. HƯỚNG DẪN KIỂM THỬ TRÊN TRÌNH DUYỆT
Mở tệp `index.html` trực tiếp bằng trình duyệt (Opera, Chrome, Edge) hoặc Live Server trong VS Code để trải nghiệm giao diện và các tính năng tương tác.
