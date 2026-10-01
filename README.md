# BÀI THỰC HÀNH 01 - LẬP TRÌNH WEB (LTW)
## XÂY DỰNG TRANG WEB GIỚI THIỆU BẢN THÂN (PERSONAL PORTFOLIO)

---

### THÔNG TIN SINH VIÊN
* **Họ và tên:** Nguyễn Tiến Hoàng
* **Mã sinh viên:** `B25DCTV025`
* **Lớp:** `D25CQTV01-B`
* **Môn học:** Lập trình Web (`RIPT1306`)
* **Mã lớp học phần:** `RIPT1306-20261-08` (Nhóm N2)
* **Giảng viên phụ trách:** Thầy Nguyễn Vũ Nhân (`nvnhan`)
* **Thời hạn nộp bài:** 12:00 01/10/2026

---

### 1. CẤU TRÚC THƯ MỤC MÃ NGUỒN
```text
B25DCTV025 - TH1/
├── assets/
│   └── avatar.jpg          # Ảnh đại diện cá nhân
├── css/
│   └── style.css           # Toàn bộ mã CSS (Grid, Flexbox, Themes, Responsive)
├── js/
│   └── script.js           # Toàn bộ mã tương tác JavaScript thuần (9 tính năng)
├── index.html              # Cấu trúc HTML5 Semantic hoàn chỉnh của trang web
└── README.md               # Tài liệu báo cáo và hướng dẫn bài thực hành
```

---

### 2. CHI TIẾT ĐÁP ỨNG CÁC TIÊU CHÍ KỸ THUẬT CỦA ĐỀ BÀI

#### 2.1. Cấu trúc HTML5 (Semantic & Đầy đủ thành phần)
* [x] **Header / Menu điều hướng:** Logo thương hiệu cá nhân, menu các mục (`#hero`, `#about`, `#skills`, `#projects`, `#contact`), nút chuyển Theme (Sáng/Tối) và nút Hamburger trên thiết bị di động.
* [x] **Phần giới thiệu bản thân (Hero & About Me):** Avatar cá nhân bo tròn hiệu ứng phát sáng gradient, họ tên, mã sinh viên, ngành học AIoT PTIT, tiểu sử ngắn, quá trình học tập (THPT Chuyên Lào Cai - Giải Nhì HSG Tin học 2025, CTV Lab CNS RIPT, PROPTIT), mục tiêu nghề nghiệp và các nút liên kết mạng xã hội (GitHub, Kaggle, Facebook, Email).
* [x] **Danh sách kỹ năng (Skills):** Phân nhóm rõ ràng theo 3 lĩnh vực (Trí tuệ nhân tạo & Khoa học dữ liệu, Lập trình Web & Giao diện, Công cụ & Môi trường hệ thống) với thanh tiến độ phần trăm trực quan.
* [x] **Danh sách dự án (Projects - Đạt 4 dự án, vượt yêu cầu $\ge 3$ dự án):**
  1. *CNS AI Face Model Tester (2025):* Hệ thống đo lường độ chính xác mô hình nhận diện khuôn mặt CNS (Python, OpenCV, Deep Learning).
  2. *TravelPlanner AI Agent Benchmark (2026):* Bộ công cụ kiểm thử năng lực lập kế hoạch đa bước của LLM Agents (Python, LLM Agents, NLP).
  3. *Trang Web Cá Nhân (Bài TH01 - 2026):* Website portfolio chuẩn RWD với Vanilla JS và CSS Grid/Flexbox.
  4. *Smart Scientific Calculator (2026):* Ứng dụng máy tính khoa học trên nền web với giao diện trực quan và lưu lịch sử.
* [x] **Form liên hệ (Contact Form):** 2 cột gồm thông tin liên hệ trực tiếp (Email PTIT, Email cá nhân, SĐT, Địa chỉ Học viện) và Form phản hồi có nhãn bắt buộc, ô đếm ký tự thời gian thực, nút gửi trạng thái tải (spinner).
* [x] **Footer:** Thông tin bản quyền, năm tự động, thông tin học phần PTIT và liên kết điều hướng nhanh.

#### 2.2. Kỹ thuật CSS (Layout, Hiệu ứng & Responsive)
* [x] **CSS Grid & Flexbox:** Dàn trang khoa học, kết hợp Flexbox cho Header/Hero/Nav và CSS Grid (`auto-fit`, đa cột) cho các section About, Skills, Projects và Contact.
* [x] **Hiệu ứng rê chuột (Hover Effects):**
  * Nút bấm (Buttons) trượt nhẹ lên trên (`translateY(-2px)`), đổ bóng màu neon tương ứng (`box-shadow`).
  * Thẻ dự án (Project cards) nâng độ cao (`translateY(-6px)`), viền phát sáng khi hover.
  * Avatar viền gradient phóng to nhẹ (`scale(1.02)`).
  * Menu link và social icons đổi màu và background chuyển tiếp mượt mà.
* [x] **Responsive Web Design (RWD - Đầy đủ 3 Breakpoint, vượt yêu cầu tối thiểu 2 breakpoint):**
  * **Breakpoint 1 - Tablet (`max-width: 1024px`):** Chuyển đổi lưới 3 cột thành 2 cột, tối ưu khoảng cách đệm (padding) và cỡ chữ.
  * **Breakpoint 2 - Mobile (`max-width: 768px`):** Ẩn thanh menu ngang, kích hoạt menu Hamburger mở ngăn kéo (Drawer) từ trên xuống; chuyển toàn bộ bố cục sang 1 cột đơn; Hero chuyển đổi xếp dọc `flex-direction: column-reverse`.
  * **Breakpoint 3 - Small Mobile (`max-width: 480px`):** Tự động dàn nút bấm toàn chiều rộng (full-width), co giãn form padding thân thiện với ngón tay cảm ứng.

#### 2.3. Lập trình JavaScript (Cài đặt 9 tính năng tương tác - Yêu cầu tối thiểu 5)
1. **Menu Hamburger cho Mobile & Tablet:** Đóng/mở drawer điều hướng mượt mà, tự động cập nhật `aria-expanded`, tự động đóng lại khi người dùng nhấp vào mục chuyển trang hoặc click ra bên ngoài.
2. **Kiểm tra tính hợp lệ dữ liệu Form (Form Validation):**
   * Kiểm tra họ tên: bắt buộc, độ dài $\ge 2$, không chứa ký tự số.
   * Kiểm tra email: bắt buộc, kiểm tra đúng định dạng email quốc tế bằng Regex.
   * Kiểm tra chủ đề liên hệ: bắt buộc phải chọn trong dropdown.
   * Kiểm tra nội dung tin nhắn: bắt buộc, tối thiểu 10 ký tự, tối đa 500 ký tự.
   * Hiển thị cảnh báo lỗi inline thời gian thực ngay dưới từng ô nhập và hiển thị **Toast Notification** thông báo thành công khi submit.
3. **Chế độ Sáng / Tối (Dark / Light Mode):**
   * Chuyển đổi giao diện thông qua thuộc tính `data-theme` trên thẻ `<html>`.
   * Tự động lưu lựa chọn vào `localStorage` (`hoang_portfolio_theme`).
   * Tự động nhận diện theme mặc định của hệ điều hành người dùng (`prefers-color-scheme`).
4. **Cuộn mượt mà (Smooth scroll) & Tự động highlight mục menu (Scrollspy):**
   * Bù trừ chiều cao thanh Header cố định khi cuộn.
   * Sử dụng `IntersectionObserver` để tự động gán class `active` cho mục menu tương ứng với vùng nội dung đang hiển thị trên màn hình.
5. **Đếm số ký tự nhập vào thời gian thực (Character counter):**
   * Đếm số lượng ký tự trong ô lời nhắn (`#char-count / 500`).
   * Đổi màu cảnh báo vàng khi đạt $\ge 450$ ký tự và màu đỏ khi chạm mốc tối đa 500 ký tự.
6. **Lọc danh mục & Tìm kiếm dự án theo từ khóa (Real-time Filter & Search):**
   * Lọc nhanh theo các nút danh mục: Tất cả, AI & Thị giác máy, Lập trình Web.
   * Ô tìm kiếm hỗ trợ gõ từ khóa lọc trực tiếp theo tên, công nghệ, tag dự án.
   * Có nút xóa nhanh từ khóa (`x`) và hiển thị giao diện thông báo rỗng (*Empty state*) khi không tìm thấy kết quả.
7. **Hiệu ứng xuất hiện khi cuộn trang (Scroll reveal animation):**
   * Sử dụng `IntersectionObserver` tối ưu hiệu năng quan sát các phần tử mang class `.reveal`.
   * Tự động kích hoạt hiệu ứng chuyển động mượt mà khi người dùng cuộn đến phần tử.
8. **Hiển thị năm hiện tại tự động ở Footer:**
   * Tự động lấy năm thông qua hàm `new Date().getFullYear()` và gán vào thẻ `<span id="current-year"></span>`.
9. **Nút cuộn nhanh lên đầu trang (Back to top button):**
   * Tự động xuất hiện khi cuộn xuống quá 320px và cuộn mượt về đỉnh trang khi click.

---

### 3. HƯỚNG DẪN KHỞI CHẠY VÀ KIỂM THỬ TRÊN TRÌNH DUYỆT
1. Mở thư mục bài làm `B25DCTV025 - TH1`.
2. Mở tệp `index.html` trực tiếp bằng bất kỳ trình duyệt web hiện đại nào (Opera, Chrome, Edge, Firefox) hoặc thông qua tiện ích **Live Server** trong VS Code.
3. Thử nghiệm các thao tác tương tác:
   * Bấm nút biểu tượng Mặt trời/Mặt trăng ở góc trên phải để đổi theme Sáng/Tối.
   * Thu nhỏ cửa sổ trình duyệt xuống dưới 768px để kiểm tra giao diện Mobile và nút bấm Hamburger menu.
   * Thử lọc dự án theo thẻ hoặc nhập từ khóa "python", "web", "deep learning" vào ô tìm kiếm.
   * Thử nhập dữ liệu vào Form liên hệ: nhập thiếu ký tự để xem báo lỗi inline, nhập lời nhắn để xem số đếm ký tự tăng dần, và bấm nút gửi để xem hiệu ứng spinner và Toast notification.

---

### 4. QUY TRÌNH NỘP BÀI GITHUB & PHÂN QUYỀN
Theo đúng quy định của đề bài:
1. Đặt tên repository: `B25DCTV025 - TH1`
2. Push toàn bộ mã nguồn lên GitHub.
3. Nếu repository ở chế độ **Private**, sinh viên thực hiện phân quyền theo các bước:
   * Vào repository trên GitHub $\rightarrow$ Chọn tab **Settings**.
   * Chọn mục **Collaborators** ở thanh bên trái.
   * Bấm **Add people** và nhập username của giảng viên: `nvnhan`.
   * Bấm gửi lời mời (Invite).
4. Sao chép liên kết repository và dán vào ô nộp bài trên hệ thống **SLink**.
