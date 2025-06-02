<template>
    <HeaderWeb />
    <div class="tuyensinh-container">
        <!-- GIỚI THIỆU -->
        <div class="section">
            <h2>GIỚI THIỆU</h2>
            <ul class="info-list">
                <li><strong>Tên trường:</strong> Cao đẳng Kinh tế TP.HCM</li>
                <li><strong>Tên tiếng Anh:</strong> Ho Chi Minh College of Economics (HCE)</li>
                <li><strong>Mã trường:</strong> CDD0212</li>
                <li><strong>Loại trường:</strong> Công lập</li>
                <li><strong>Hệ đào tạo:</strong> Trung cấp - Cao đẳng - Liên thông</li>
                <li><strong>Địa chỉ:</strong> Số 33 Vĩnh Viễn, Phường 02, Quận 10, TP.HCM</li>
                <li><strong>SĐT:</strong> 08.8833.0108 / 08.8833.0608</li>
                <li><strong>Email:</strong> hce@kthcm.edu.vn</li>
                <li><strong>Website:</strong> <a href="http://www.kthcm.edu.vn/" target="_blank">www.kthcm.edu.vn</a>
                </li>
                <li><strong>Facebook:</strong> <a href="https://www.facebook.com/kthcm.edu.vn/"
                        target="_blank">facebook.com/kthcm.edu.vn</a></li>
            </ul>
        </div>

        <!-- THÔNG TIN TUYỂN SINH -->
        <div class="section">
            <h2>THÔNG TIN TUYỂN SINH NĂM 2024</h2>

            <h3>I. Thông tin chung</h3>
            <ul class="info-list">
                <li>
                    <strong>1. Thời gian tuyển sinh:</strong><br />
                    Trường tuyển sinh nhiều đợt trong năm và nhận hồ sơ đăng ký xét tuyển liên tục.
                </li>
                <li>
                    <strong>2. Đối tượng tuyển sinh:</strong><br />
                    - Học sinh tốt nghiệp THPT hoặc tương đương.<br />
                    - Ngành Công tác xã hội: chấp nhận học sinh tốt nghiệp THCS trở lên.
                </li>
                <li>
                    <strong>3. Phạm vi tuyển sinh:</strong><br />
                    Tuyển sinh trên toàn quốc.
                </li>
                <li>
                    <strong>4. Phương thức tuyển sinh:</strong>
                    <ul class="sub-list">
                        <li><strong>4.1 Trình độ Cao đẳng:</strong>
                            <ul>
                                <li>Xét học bạ lớp 12 (điểm trung bình từng môn trong tổ hợp).</li>
                                <li>Xét điểm thi tốt nghiệp THPT.</li>
                                <li>Không phân biệt năm tốt nghiệp.</li>
                            </ul>
                        </li>
                        <li><strong>4.2 Trình độ Trung cấp:</strong>
                            <ul>
                                <li>Xét học bạ lớp 12 hoặc điểm tốt nghiệp THPT.</li>
                                <li>Xét học bạ lớp 9 hoặc điểm tốt nghiệp THCS (ngành CTXH).</li>
                                <li>Không phân biệt năm tốt nghiệp.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="section">
            <h3>II. Phương thức xét tuyển theo điểm thi THPT</h3>
            <ul class="info-list">
                <li>
                    <strong>Từ 14 điểm trở lên:</strong>
                    <ul class="sub-list">
                        <li>Công tác xã hội</li>
                        <li>Quản lý công nghiệp</li>
                        <li>Hướng dẫn du lịch</li>
                    </ul>
                </li>
                <li>
                    <strong>Từ 15 điểm trở lên:</strong>
                    <ul class="sub-list">
                        <li>Công nghệ thông tin</li>
                        <li>Công nghệ thông tin - Ứng dụng phần mềm</li>
                        <li>Kế toán</li>
                        <li>Kiểm toán</li>
                        <li>Quản trị khách sạn</li>
                        <li>Tài chính – Ngân hàng</li>
                        <li>Tiếng Anh</li>
                        <li>Tiếng Hàn Quốc</li>
                        <li>Kinh doanh thương mại</li>
                        <li>Kinh doanh xuất nhập khẩu</li>
                        <li>Logistics</li>
                        <li>Quản trị kinh doanh</li>
                        <li>Đồ họa đa phương tiện</li>
                        <li>Tài chính doanh nghiệp</li>
                    </ul>
                </li>
                <li>
                    <strong>Từ 16 điểm trở lên:</strong>
                    <ul class="sub-list">
                        <li>Marketing</li>
                    </ul>
                </li>
            </ul>

            <p class="note">
                <strong>Điều kiện phụ:</strong><br />
                Ngành <em>Kế toán</em>, <em>Kiểm toán</em>: điểm môn Toán trong tổ hợp môn xét tuyển phải từ 5 điểm trở
                lên (theo học bạ).
            </p>
        </div>
    </div>
    <FooterWeb/>
</template>

<script setup>
import HeaderWeb from '../components/HeaderWeb.vue';
import FooterWeb from '../components/FooterWeb.vue';
</script>

<style scoped>
.tuyensinh-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background: linear-gradient(to right, #cceaff, #85e3f8, #2fc9f0); /* Một gradient ba màu */
    margin-top: 3.5rem;
    margin-bottom: 3.5rem;
}

.section {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.section h2 {
    text-align: center;
    font-size: 26px;
    margin-bottom: 20px;
    color: #2c3e50;
}

.section h3 {
    margin-top: 15px;
    color: #34495e;
    font-size: 20px;
}

.info-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.info-list li {
    margin-bottom: 10px;
    line-height: 1.6;
}

.sub-list {
    padding-left: 20px;
    list-style-type: disc;
}

a {
    color: #2980b9;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.tuyensinh-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 40px 20px;
  background: linear-gradient(to bottom right, #f0f8ff, #e0f7fa); /* dịu hơn, hướng góc */
  margin-top: 0; /* Xóa margin trên/dưới nếu header/footer đã có padding */
  margin-bottom: 0;
}

.section {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.section h2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 24px;
  color: #005b8f;
  font-weight: 600;
}

.section h3 {
  margin-top: 20px;
  color: #00695c;
  font-size: 22px;
  font-weight: 600;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-list li {
  margin-bottom: 12px;
  line-height: 1.8;
}

.sub-list {
  padding-left: 20px;
  list-style-type: disc;
}

a {
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
}

a:hover {
  text-decoration: underline;
  color: #004999;
}

@media (max-width: 768px) {
  .tuyensinh-container {
    padding: 20px 12px;
  }

  .section h2 {
    font-size: 22px;
  }

  .section h3 {
    font-size: 18px;
  }

  .info-list li {
    font-size: 15px;
  }
}

.tuyensinh-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 40px 20px;
  background: linear-gradient(to bottom right, #f0f8ff, #e0f7fa);
  margin-top: 0;
  margin-bottom: 0;

  /* Thêm các dòng sau */
  max-width: 960px;        /* hoặc 1140px nếu muốn rộng hơn */
  margin-left: auto;
  margin-right: auto;
}

</style>