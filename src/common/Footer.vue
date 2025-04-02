<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="logo">
                <router-link to="/">
                    <div class="logo-image">
                        <img src="/logo.png" alt="Logo" width="auto" height="auto" />
                    </div>
                </router-link>
            </div>

            <div class="footer-links">
                <a href="#" class="footer-link">공지사항</a>
                <span class="separator"></span>
                <a href="#" class="footer-link">자주 묻는 질문</a>
                <span class="separator"></span>
                <a href="#" class="footer-link">1:1 문의</a>
            </div>
        </div>

        <div class="copyright">
            © 2025 GrapeField Inc. All rights reserved.
        </div>
    </footer>
</template>

<style scoped>
.footer {
    padding: 30px 70px;
    background-color: white;
    border-top: 1px solid #EAEAEA;
    font-family: Arial, sans-serif;
}

.footer-content {
    display: flex;
    justify-content: flex-start;
    /* 왼쪽 정렬 */
    align-items: center;
    gap: 40vw;
    /* 좌우 간격 조정 */
}

.logo-image img {
    width: 60%;
    height: 100%;
}


.footer-links {
    display: flex;
    align-items: center;
}

.footer-link {
    margin: 0 15px;
    text-decoration: none;
    color: #333333;
    font-size: 16px;
}

.footer-link:hover {
    color: #7B42C3;
}

.separator {
    width: 1px;
    height: 30px;
    background-color: #EAEAEA;
}

.copyright {
    color: #999999;
    font-size: 14px;
    text-align: left;
}
</style>