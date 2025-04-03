<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="logo">
                <router-link to="/">
                    <div class="logo-image">
                        <img src="/logo.png" alt="Logo" />
                    </div>
                </router-link>
            </div>

            <div class="footer-links text-sm text-gray-700 font-normal leading-relaxed">
                <!-- <a href="#" class="footer-link">공지사항</a> -->
                <router-link :to="{ path: '/customercenter', query: { type: 'notice' } }">
                    공지사항
                </router-link>
                <span class="separator"></span>
                <router-link :to="{ path: '/customercenter', query: { type: 'faq' } }">
                    자주 묻는 질문
                </router-link>
                <span class="separator"></span>
                <router-link :to="{ path: '/customercenter', query: { type: 'qna' } }">
                    1:1 문의
                </router-link>
            </div>
        </div>

        <div class="copyright">
            © 2025 GrapeField Inc. All rights reserved.
        </div>
    </footer>
</template>

<style scoped>
.footer {
    padding: 2vw 5vw;
    background-color: white;
    border-top: 0.07vw solid #EAEAEA;
    font-family: Arial, sans-serif;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2vw;
}

.logo-image img {
    width: 8vw;
    height: auto;
}

.footer-links {
    display: flex;
    align-items: center;
}

.footer-link {
    margin: 0 1vw;
    text-decoration: none;
    color: #333333;
    font-size: 1vw;
}

.footer-link:hover {
    color: #7B42C3;
}

.separator {
    width: 0.07vw;
    height: 2vw;
    background-color: #EAEAEA;
    margin: 0 0.5vw;
}

.copyright {
    color: #999999;
    font-size: 0.9vw;
    text-align: left;
    margin-top: 1vw;
}

/* 반응형 미디어 쿼리 */
@media screen and (max-width: 768px) {
    .footer {
        padding: 3vw 4vw;
    }

    .footer-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 2vw;
    }

    .logo-image img {
        width: 12vw;
    }

    .footer-link {
        font-size: 1.5vw;
    }

    .copyright {
        font-size: 1.2vw;
        margin-top: 2vw;
    }
}

@media screen and (max-width: 480px) {
    .footer {
        padding: 4vw 5vw;
    }

    .logo-image img {
        width: 20vw;
    }

    .footer-links {
        flex-wrap: wrap;
    }

    .footer-link {
        font-size: 2.5vw;
        margin: 0 2vw 2vw 0;
    }

    .separator {
        height: 4vw;
    }

    .copyright {
        font-size: 2vw;
    }
}
</style>