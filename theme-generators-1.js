// style.css 생성
function generateStyleCSS(themeName, primaryColor) {
    return `/*
Theme Name: ${themeName}
Theme URI: https://example.com
Author: AI Generated
Author URI: https://example.com
Description: AI로 생성된 지원금 전용 워드프레스 테마
Version: 1.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: ${themeName.toLowerCase().replace(/\s+/g, '-')}
*/

/* ========== 기본 리셋 ========== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f8f9fa;
}

a {
    text-decoration: none;
    color: inherit;
}

img {
    max-width: 100%;
    height: auto;
}

/* ========== 레이아웃 ========== */
.site-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.site-content {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    width: 100%;
}

/* ========== 헤더 ========== */
.site-header {
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.site-logo {
    font-size: 24px;
    font-weight: 700;
    color: ${primaryColor};
}

.site-navigation ul {
    list-style: none;
    display: flex;
    gap: 30px;
}

.site-navigation a {
    color: #666;
    font-weight: 500;
    transition: color 0.3s;
}

.site-navigation a:hover {
    color: ${primaryColor};
}

.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
}

/* ========== 인트로 섹션 ========== */
.intro-section {
    text-align: center;
    padding: 40px 20px;
    background: white;
    border-radius: 20px;
    margin-bottom: 30px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.intro-badge {
    display: inline-block;
    background: ${primaryColor}20;
    color: ${primaryColor};
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 15px;
}

.intro-title {
    font-size: 36px;
    font-weight: 800;
    color: ${primaryColor};
    margin: 10px 0;
}

.intro-subtitle {
    font-size: 20px;
    color: #666;
    margin-top: 10px;
}

/* ========== 정보 박스 ========== */
.info-box {
    background: linear-gradient(135deg, ${primaryColor}15 0%, ${primaryColor}05 100%);
    border-radius: 16px;
    padding: 30px;
    margin-bottom: 40px;
    border-left: 4px solid ${primaryColor};
}

.info-box-title {
    font-size: 20px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 10px;
}

.info-box-amount {
    font-size: 28px;
    font-weight: 800;
    color: ${primaryColor};
    margin-bottom: 10px;
}

.info-box-desc {
    font-size: 16px;
    color: #666;
    line-height: 1.8;
}

/* ========== 카드 그리드 ========== */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
}

.info-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
    cursor: pointer;
}

.info-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.info-card.featured {
    border: 2px solid ${primaryColor};
}

.card-highlight {
    background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%);
    padding: 30px 25px;
    position: relative;
}

.card-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(255,255,255,0.3);
    color: white;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
}

.card-amount {
    font-size: 32px;
    font-weight: 800;
    color: white;
    line-height: 1.2;
    margin-bottom: 8px;
}

.card-amount-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.9);
}

.card-content {
    padding: 25px;
}

.card-title {
    font-size: 20px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 12px;
}

.card-description {
    font-size: 15px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
}

.card-details {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
}

.card-detail-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
}

.card-detail-row:not(:last-child) {
    border-bottom: 1px dashed #ddd;
    margin-bottom: 8px;
}

.card-detail-label {
    font-size: 14px;
    color: #888;
    font-weight: 500;
}

.card-detail-value {
    font-size: 14px;
    color: #333;
    font-weight: 600;
}

.card-button {
    display: block;
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%);
    color: white;
    text-align: center;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    transition: all 0.3s;
}

.card-button:hover {
    background: linear-gradient(135deg, ${primaryColor}dd 0%, ${primaryColor}aa 100%);
    transform: scale(1.02);
}

/* ========== 히어로 섹션 ========== */
.hero-section {
    background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%);
    border-radius: 24px;
    padding: 50px 40px;
    text-align: center;
    color: white;
    margin-bottom: 40px;
    position: relative;
    overflow: hidden;
}

.hero-section::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 300px;
    height: 300px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
}

.hero-urgent {
    display: inline-block;
    background: rgba(255,255,255,0.95);
    color: #DC2626;
    padding: 8px 18px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 20px;
}

.hero-title {
    font-size: 42px;
    font-weight: 800;
    margin-bottom: 15px;
    position: relative;
    z-index: 1;
}

.hero-subtitle {
    font-size: 18px;
    margin-bottom: 30px;
    opacity: 0.95;
}

.hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: white;
    color: ${primaryColor};
    padding: 18px 40px;
    border-radius: 16px;
    font-size: 18px;
    font-weight: 700;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    transition: all 0.3s;
}

.hero-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.2);
}

/* ========== 푸터 ========== */
.site-footer {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
    padding: 40px 20px 20px;
    margin-top: 60px;
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 20px;
}

.footer-brand {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
}

.footer-info {
    list-style: none;
    font-size: 14px;
    opacity: 0.9;
}

.footer-info li {
    margin-bottom: 8px;
}

.footer-copyright {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.2);
    font-size: 14px;
    opacity: 0.8;
}

/* ========== 반응형 ========== */
@media (max-width: 768px) {
    .site-navigation ul {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .site-navigation.active ul {
        display: flex;
    }
    
    .mobile-menu-toggle {
        display: block;
    }
    
    .card-grid {
        grid-template-columns: 1fr;
    }
    
    .intro-title {
        font-size: 28px;
    }
    
    .hero-title {
        font-size: 32px;
    }
    
    .footer-content {
        flex-direction: column;
        gap: 20px;
    }
}

/* ========== 유틸리티 ========== */
.hidden {
    display: none !important;
}

.text-center {
    text-align: center;
}

.mt-20 {
    margin-top: 20px;
}

.mb-20 {
    margin-bottom: 20px;
}

/* ========== 애니메이션 ========== */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.fade-in {
    animation: fadeIn 0.6s ease-out;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
}

.pulse {
    animation: pulse 2s ease-in-out infinite;
}`
}

// header.php 생성
function generateHeaderPHP(siteTitle, menus) {
    const menuHTML = menus.map(m => 
        `                    <li><a href="${m.link}">${m.name}</a></li>`
    ).join('\n');

    return `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div class="site-container">
    <header class="site-header">
        <div class="header-container">
            <div class="site-logo">
                <a href="<?php echo esc_url(home_url('/')); ?>">
                    <?php echo esc_html('${siteTitle}'); ?>
                </a>
            </div>
            
            <nav class="site-navigation">
                <button class="mobile-menu-toggle" aria-label="메뉴 토글">☰</button>
                <ul>
${menuHTML || '                    <li><a href="<?php echo esc_url(home_url(\'/\')); ?>">홈</a></li>'}
                </ul>
            </nav>
        </div>
    </header>`
}
