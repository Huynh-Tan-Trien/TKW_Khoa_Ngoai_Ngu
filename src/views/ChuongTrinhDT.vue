<template>
    <HeaderWeb />
    <div class="tuyensinh-container">
        <div class="section">
            <h2>CHƯƠNG TRÌNH HỌC VÀ ĐÀO TẠO CỦA KHOA NGOẠI NGỮ</h2>
            <img src="https://khpt.1cdn.vn/2024/11/08/hce-ky-ket-cac-cong-ty-cong-nghe.jpg"
                alt="Chương trình đào tạotạo" class="section-img">
            <ul class="info-list">
                <li>
                    Khoa Ngoại ngữ của trường đào tạo các ngôn ngữ như:
                    <ul class="sub-list">
                        <li>Tiếng Anh</li>
                        <li>Tiếng Hàn</li>
                        <li>Tiếng Trung</li>
                        <li>...</li>
                    </ul>
                    với chất lượng đào tạo chuyên sâu và hiện đại.
                </li>
                <li>
                    Khoa thường xuyên tổ chức các khóa học tiếng Anh ngắn hạn, tập trung vào các kỹ năng:
                    <ul class="sub-list">
                        <li>Nghe</li>
                        <li>Nói</li>
                        <li>Đọc</li>
                        <li>Viết</li>
                    </ul>
                    và tổ chức các kỳ thi lấy bằng từ trình độ thấp đến cao.
                </li>
            </ul>
        </div>



        <div class="section">
            <h2>QUY ĐỊNH VÀ CHÍNH SÁCH ĐÀO TẠO</h2>
            <div class="section-body">
                <div class="section">
                    <ul class="info-list">
                        <li>
                            <strong>1. Thời gian đào tạo:</strong>
                            <ul class="sub-list">
                                <li>Chương trình đào tạo kéo dài 2,5 - 3 năm tùy theo ngành học và hình thức đào tạo.
                                </li>
                                <li>Hình thức đào tạo: Chính quy tập trung.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>2. Điều kiện đăng ký học và tốt nghiệp:</strong>
                            <ul class="sub-list">
                                <li>Sinh viên phải hoàn thành đủ số tín chỉ theo quy định của chương trình đào tạo.</li>
                                <li>Điểm trung bình chung tích lũy tối thiểu 5.0/10.0 để đủ điều kiện xét tốt nghiệp.
                                </li>
                                <li>Hoàn thành kỳ thực tập và đạt yêu cầu đánh giá từ doanh nghiệp hoặc cơ sở thực tập.
                                </li>
                                <li>Đạt chuẩn đầu ra ngoại ngữ tương đương B2 (CEFR) hoặc các chứng chỉ tương đương.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>3. Quy định về thi cử và đánh giá:</strong>
                            <ul class="sub-list">
                                <li>Sinh viên phải tham gia đầy đủ các bài kiểm tra, thi giữa kỳ, cuối kỳ theo quy định.
                                </li>
                                <li>Điểm đánh giá gồm:
                                    <ul class="sub-list">
                                        <li>Điểm chuyên cần: 10%</li>
                                        <li>Bài tập, kiểm tra giữa kỳ: 30%</li>
                                        <li>Thi cuối kỳ: 60%</li>
                                    </ul>
                                </li>
                                <li>Hình thức thi: Thi viết, vấn đáp hoặc thực hành tùy theo môn học.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>4. Kỷ luật học tập:</strong>
                            <ul class="sub-list">
                                <li>Sinh viên vắng quá 20% số buổi học của một môn sẽ không được thi cuối kỳ.</li>
                                <li>Vi phạm nội quy thi cử (gian lận, quay cóp…) có thể bị xử lý kỷ luật từ cảnh cáo đến
                                    đình chỉ học tập.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>5. Thực tập và tốt nghiệp:</strong>
                            <ul class="sub-list">
                                <li>Sinh viên phải tham gia thực tập tại các doanh nghiệp, trường học, công ty du lịch,
                                    hoặc tổ chức quốc tế theo chuyên ngành.</li>
                                <li>Hoàn thành bài báo cáo thực tập đạt yêu cầu.</li>
                                <li>Đăng ký và bảo vệ khóa luận tốt nghiệp (đối với chương trình có yêu cầu).</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <FooterWeb />
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
    background-color: #f8f8f8;
    margin-top: 3.5rem;
    margin-bottom: 3.5rem;
}

/* --- SECTION CHUNG --- */
.section {
    margin: 1rem 0;
    background: white;
    padding: 20px;
    border-radius: 10px;
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

/* --- DANH SÁCH --- */
.info-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.info-list li {
    margin-bottom: 12px;
    line-height: 1.6;
}

.sub-list {
    padding-left: 20px;
    list-style-type: disc;
}

/* --- HÌNH ẢNH --- */
.section-img {
    display: block;
    max-width: 100%;
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 10px;
    margin: 0 auto 20px auto;
}

/* --- PHÂN THÂN SECTION (nếu chia cột hoặc vùng nội dung) --- */
.section-body {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1200px;
    margin: auto;
}

/* --- ĐOẠN VĂN BẢN (nếu dùng riêng) --- */
p {
    line-height: 1.6;
    margin: 10px 0;
    color: #333;
}

/* --- LIÊN KẾT --- */
a {
    color: #2980b9;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
h2{
    text-align: center;
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
    .section-body {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .section-img {
        width: 90%;
    }
}

.tuyensinh-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: #f8f8f8;
    margin-top: 3.5rem;
    margin-bottom: 3.5rem;

    /* Thêm các dòng sau */
    max-width: 960px;       /* hoặc 1140px nếu bạn muốn rộng hơn */
    margin-left: auto;
    margin-right: auto;
}

@media (min-width: 1200px) {
    .tuyensinh-container {
        max-width: 1140px;
    }
}

</style>
