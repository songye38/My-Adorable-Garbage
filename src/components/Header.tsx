
import './Header.css';

export default function Header() {
    return (
        <header className="site-header">
            <a href="/" className="site-header__brand">
                <img
                    src="/images/common/logo.png"
                    alt="반려쓰레기"
                    className="site-header__logo"
                />
            </a>

            <nav
                className="site-header__nav"
                aria-label="주요 메뉴"
            >

                <span className="site-header__link">
                    전시
                </span>

                <span className="site-header__link">
                    고민 상담소
                </span>
                <span className="site-header__link">
                    정체성 실험
                </span>
                <span className="site-header__link">
                    프로젝트 소개
                </span>
                <span className="site-header__link">
                    팟캐스트 듣기
                </span>
            </nav>
        </header>
    );
}
