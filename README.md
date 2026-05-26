# Whyme's Finance — Nền Tảng Quản Lý Tài Chính Doanh Nghiệp & Cố Vấn Đầu Tư Cao Cấp

**Whyme's Finance (Business Finance Platform)** là một ứng dụng quản lý tài chính doanh nghiệp và cố vấn phân bổ tài sản dài hạn toàn diện với giao diện **Aurora Indigo & Rose Gold Glassmorphism** (Cực quang Tím Chàm & Vàng Hồng Kính Mờ) — xu hướng thiết kế Fintech thời thượng, lộng lẫy và cao cấp nhất.

Ứng dụng kết hợp hai công cụ cốt lõi: hệ thống theo dõi dòng tiền vận hành nghiệp vụ thời gian thực của doanh nghiệp và trình mô phỏng tăng trưởng tài sản 30 năm dựa trên lãi kép để đưa ra gợi ý tái cân bằng tự động theo Benchmark tiêu chuẩn quốc tế.

---

## 🌟 Tính Năng Nổi Bật

### 1. Dashboard Trung Tâm (Home)
* **Thẻ Chỉ Số KPI**: Hiển thị Tổng Doanh Thu (Total Revenue), Tổng Chi Phí (Total Expenses), Dòng Tiền Ròng (Net Cash Flow), và Biên Lợi Nhuận (Profit Margin) kèm theo phần trăm so sánh tự động tính toán từ tháng trước.
* **Biểu Đồ Xu Hướng**: 03 biểu đồ động (Chart.js) trực quan hóa doanh thu vs chi phí 6 tháng gần nhất.
* **Bảng Giá VNIndex Top 10 Live**: Tải dữ liệu thời gian thực của 10 mã chứng khoán hàng đầu Việt Nam, **vẽ biểu đồ mini Sparkline** tự động hiển thị xu hướng và biến động phần trăm thực tế.

### 2. Quản Lý Thu Nhập (Income) & Chi Phí (Expenses)
* **Ghi Nhận Giao Dịch**: Thêm, sửa, xóa bản ghi giao dịch thu/chi với danh mục chuẩn hóa.
* **Bộ Lọc Nâng Cao (Month Picker)**: Cho phép lọc xem dữ liệu theo cả Năm, từng Tháng hoặc một Ngày cụ thể một cách linh hoạt. Lọc giao dịch theo danh mục nghiệp vụ.
* **Biểu Đồ Phân Tích**: Tích hợp biểu đồ cột chồng theo ngày và biểu đồ tròn phân tích chi tiết cơ cấu nguồn thu/khoản chi.
* **Nhập/Xuất Excel (SheetJS)**: Tải tệp mẫu Excel nghiệp vụ và nạp ngược lại dữ liệu giao dịch từ Excel trực tiếp vào hệ thống mượt mà.

### 3. Phân Tích Dòng Tiền (Cash Flow)
* Thống kê dòng tiền ròng thặng dư/thâm hụt trung bình tháng.
* Biểu đồ vùng (stacked area chart) dòng tiền tích lũy lũy kế trong 6 tháng giúp doanh nghiệp dự báo số dư dự phòng.

### 4. Máy Tính Mô Phỏng Tích Lũy 30 Năm (Simulator)
* **Kéo Slider Tự Động**: Trích lập tỷ lệ đầu tư hàng tháng từ dòng tiền ròng thực tế (0% đến 50%).
* **Danh Mục Cổ Phiếu Live**: Tự động kết nối API lấy giá live 5 mã cổ phiếu VN30 để tính giá trị danh mục thực tế.
* **Đa Dạng Hóa Lớp Tài Sản**: Thiết lập số tiền nạp hàng tháng cho *Gửi tiết kiệm ngân hàng*, *Vàng*, *USD Reserve*. Dòng tiền còn dư sẽ ở dạng *Tiền mặt* chịu lạm phát -3%/năm.
* **Tính Lãi Kép Trực Quan**: Biểu đồ Stacked Area Chart biểu diễn sự tăng trưởng tài sản 30 năm và biểu đồ cột tài sản tại mốc 10, 20, 30 năm cực kỳ chính xác.
* **Quản lý Snapshot**: Chụp và khôi phục các bản cấu hình đầu tư theo tháng.

### 5. Cố Vấn Phân Bổ Tài Sản (Allocation Advisor)
* **So Sánh Benchmark Tiêu Chuẩn**: Tự động so sánh tỷ lệ phân bổ tài sản thực tế của bạn với Benchmark chuẩn (Cổ phiếu 50%, Tiết kiệm 10%, Tiền mặt 20%, Vàng 10%, USD 10%).
* **Hũ Tài Sản Hoạt Họa (Jars)**: Trực quan hóa số dư thực tế bằng hiệu ứng các hũ thủy tinh dâng đầy nước màu sắc theo tỷ lệ phân bổ động.
* **Gợi Ý Tái Cân Bằng**: Tự động đưa ra gợi ý bằng tiếng Việt (cần tăng/giảm bao nhiêu tiền một tháng) khi phát hiện sai lệch quá 3%.
* **Bảng Giá Live Tiền Tệ**: Nạp dữ liệu **Giá vàng thế giới quy đổi** và **Tỷ giá USD/VND** thời gian thực.

### 6. Settings & Data Management
* Thay đổi đơn vị tiền tệ toàn cầu (format số theo vi-VN hoặc en-US) và định dạng ngày tháng.
* Thêm/xóa danh mục tự chỉnh kèm bảng màu sắc cá nhân hóa.
* Sao lưu (Export JSON) và khôi phục (Import JSON) dữ liệu an toàn.
* Đăng nhập bằng Google Auth và đồng bộ đám mây trực tiếp qua Google Sheets API.

---

## 🛠️ Công Nghệ Sử Dụng

1. **Khung giao diện (Frontend Core)**: HTML5 & Vanilla Javascript (Không React/Angular/Vue giúp ứng dụng cực kỳ nhẹ, tối ưu hóa tốc độ tải trang).
2. **Làm đẹp giao diện (Styles)**: Vanilla CSS (Hệ thiết kế Aurora Indigo & Rose Gold Glassmorphism thời thượng, hiệu ứng kính mờ Frosted Glassmorphism lộng lẫy, màu sắc cực quang động, Bento Grid và bình thủy tinh Rose Gold Jars tinh xảo).
3. **Thư viện vẽ biểu đồ**: [Chart.js (v4.4.0) CDN](https://www.chartjs.org/)
4. **Xử lý tệp tin Excel**: [SheetJS (xlsx) CDN](https://sheetjs.com/)
5. **Dịch Vụ Cloud & Xác thực**: [Google Identity Services Client API](https://developers.google.com/identity/gsi/web)
6. **API Dữ Liệu Live**:
   - Tỷ giá tiền tệ & giá Vàng thế giới: [Fawazahmed Currency API](https://github.com/fawazahmed0/currency-api)
   - Live Chứng khoán: TCBS Stock API & Yahoo Finance API.

---

## 📁 Cấu Trúc Thư Mục Modular

Dự án được cấu trúc modular sạch đẹp, phân tách rõ ràng để thuận tiện cho việc phát triển và bảo trì:

```text
d:\support-ftuer\
├── index.html       # Khung giao diện HTML5 chính và nạp thư viện ngoài
├── style.css        # Toàn bộ CSS làm đẹp giao diện, bento grid và hoạt họa
├── data.js         # Module quản lý cơ sở dữ liệu LocalStorage & demo data
├── charts.js       # Module cấu hình và vẽ các loại biểu đồ bằng Chart.js
├── app.js          # Logic điều hướng chính, Simulator 30 năm, các API Live
└── README.md        # Hướng dẫn sử dụng và giới thiệu dự án
```

---

## 🚀 Hướng Dẫn Khởi Chạy Ứng Dụng

Do ứng dụng có các tính năng nâng cao yêu cầu nạp thư viện ngoài và gọi các API trực tiếp (như tỷ giá USD, giá vàng, live chứng khoán VN100), bạn nên chạy ứng dụng thông qua một máy chủ local tĩnh (Local Web Server) thay vì mở trực tiếp bằng cách nhấp đúp file HTML (để tránh lỗi chặn tài nguyên CORS từ trình duyệt).

### 1. Dùng VS Code Live Server
Nếu bạn sử dụng VS Code, bạn chỉ cần click chuột phải vào file `index.html` và chọn **Open with Live Server**.

### 2. Dùng Python
Mở terminal hoặc CMD tại thư mục dự án và chạy:
```bash
python -m http.server 8000
```
Sau đó mở trình duyệt truy cập `http://localhost:8000`.

### 3. Dùng Node.js / npx
Mở terminal hoặc CMD tại thư mục dự án và chạy:
```bash
npx serve ./
```
Sau đó mở trình duyệt truy cập `http://localhost:3000`.

---

## 💾 Lưu Trữ & Đồng Bộ Hóa Dữ Liệu
* **Bộ nhớ cục bộ**: Mặc định, tất cả các giao dịch và thiết lập cấu hình của bạn đều được lưu trữ an toàn trong LocalStorage của trình duyệt.
* **Đồng bộ hóa đám mây**: Bạn có thể bấm nút **Sign In** ở góc trên bên phải để đăng nhập bằng tài khoản Google, sau đó sử dụng tính năng **Sync to Cloud** ở tab *Settings* để đồng bộ dữ liệu vào trang Google Sheets cá nhân.
