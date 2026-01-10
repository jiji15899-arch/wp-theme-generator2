/* * 통합된 테마 생성기 템플릿 파일 
 * (style.css, header.php, footer.php, index.php, functions.php, custom.js)
 */

// 1. style.css 생성
function generateStyleCSS(themeName, primaryColor) {
    const slug = themeName.toLowerCase().replace(/\s+/g, '-');
    return `/*
Theme Name: ${themeName}
Theme URI: https://example.com
Author: AI Theme Generator
Description: ${themeName} - AI generated wordpress theme
Version: 1.0.0
License: GNU General Public License v2 or later
Text Domain: ${slug}
*/

:root {
    --primary-color: ${primaryColor};
    --primary-light: ${primaryColor}15;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f8f9fa;
    word-break: keep-all;
}

a { text-decoration: none; color: inherit; transition: 0.3s; }
img { max-width: 100%; height: auto; }

/* 레이아웃 */
.site-container { min-height: 100vh; display: flex; flex-direction: column; }
.site-content { flex: 1; max-width: 1200px; margin: 0 auto; padding: 40px 20px; width: 100%; }

/* 헤더 */
.site-header { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05); position: sticky; top: 0; z-index: 1000; }
.header-container { max-width: 1200px; margin: 0 auto; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; }
.site-logo a { font-size: 24px; font-weight: 800; color: var(--primary-color); }
.site-navigation ul { list-style: none; display: flex; gap: 30px; }
.site-navigation a:hover { color: var(--primary-color); }
.mobile-menu-toggle { display: none; font-size: 24px; background: none; border: none; cursor: pointer; }

/* 인트로 & 히어로 */
.intro-section { text-align: center; margin-bottom: 50px; }
.intro-badge { background: var(--primary-light); color: var(--primary-color); padding: 5px 15px; border-radius: 20px; font-size: 14px; font-weight: 700; display: inline-block; margin-bottom: 15px; }
.intro-title { font-size: 32px; font-weight: 800; margin-bottom: 10px; }

/* 카드 그리드 */
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; margin-bottom: 60px; }
.info-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.05); transition: transform 0.3s, box-shadow 0.3s; border: 1px solid #eee; display: flex; flex-direction: column; }
.info-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
.card-header { background: linear-gradient(135deg, var(--primary-color), var(--primary-color)dd); padding: 25px; color: white; position: relative; }
.card-badge { position: absolute; top: 15px; right: 15px; background: rgba(255,255,255,0.25); font-size: 12px; padding: 4px 10px; border-radius: 12px; font-weight: bold; }
.card-amount { font-size: 24px; font-weight: 800; margin-bottom: 5px; }
.card-body { padding: 25px; flex: 1; display: flex; flex-direction: column; }
.card-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; color: #111; }
.card-desc { font-size: 14px; color: #666; margin-bottom: 20px; flex: 1; }
.card-meta { background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px; font-size: 13px; }
.card-meta div { display: flex; justify-content: space-between; margin-bottom: 5px; }
.card-meta div:last-child { margin-bottom: 0; }
.card-btn { background: var(--primary-color); color: white; text-align: center; padding: 15px; border-radius: 12px; font-weight: 700; display: block; margin-top: auto; }

/* 푸터 */
.site-footer { background: #2c3e50; color: #ecf0f1; padding: 50px 20px; text-align: center; }
.footer-container { max-width: 1200px; margin: 0 auto; }

/* 반응형 */
@media (max-width: 768px) {
    .site-navigation ul { display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; flex-direction: column; padding: 20px; box-shadow: 0 5px 10px rgba(0,0,0,0.1); }
    .site-navigation.active ul { display: flex; }
    .mobile-menu-toggle { display: block; }
    .intro-title { font-size: 26px; }
}`;
}

// 2. header.php 생성
function generateHeaderPHP(siteTitle, menus) {
    const menuItems = menus.map(m => `                    <li><a href="${m.link}">${m.name}</a></li>`).join('\n');
    return `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div class="site-container">
    <header class="site-header">
        <div class="header-container">
            <div class="site-logo">
                <a href="<?php echo esc_url(home_url('/')); ?>">${siteTitle}</a>
            </div>
            <nav class="site-navigation">
                <button class="mobile-menu-toggle">☰</button>
                <ul>
${menuItems || '                    <li><a href="/">Home</a></li>'}
                </ul>
            </nav>
        </div>
    </header>`;
}

// 3. footer.php 생성
function generateFooterPHP(companyName, businessNumber) {
    return `    <footer class="site-footer">
        <div class="footer-container">
            <div class="footer-info">
                <h3>${companyName}</h3>
                <p>사업자번호: ${businessNumber}</p>
                <p>&copy; <?php echo date('Y'); ?> ${companyName}. All rights reserved.</p>
            </div>
        </div>
    </footer>
</div>
<?php wp_footer(); ?>
</body>
</html>`;
}

// 4. index.php 생성 (AI 데이터 연동 부분)
function generateIndexPHP(siteTitle, cardData, mainUrl) {
    // 카드 데이터가 없을 경우를 대비한 안전 장치
    const safeCardData = Array.isArray(cardData) ? cardData : [];
    
    const cardsHTML = safeCardData.map(card => `
        <article class="info-card">
            <a href="${mainUrl}">
                <div class="card-header">
                    <span class="card-badge">지원정보</span>
                    <div class="card-amount">${card.amount || '지원금 확인'}</div>
                    <div class="card-sub" style="opacity:0.9; font-size:14px;">${card.amountSub || ''}</div>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${card.keyword || '지원 항목'}</h3>
                    <p class="card-desc">${card.description || '지금 바로 내용을 확인해보세요.'}</p>
                    <div class="card-meta">
                        <div><span style="color:#888">대상</span> <span>${card.target || '전국민'}</span></div>
                        <div><span style="color:#888">기간</span> <span>${card.period || '상시'}</span></div>
                    </div>
                    <div class="card-btn">자세히 보기 →</div>
                </div>
            </a>
        </article>
    `).join('\n');

    return `<?php get_header(); ?>

<main class="site-content">
    <section class="intro-section">
        <span class="intro-badge">업데이트</span>
        <h1 class="intro-title">${siteTitle}</h1>
        <p>놓치면 안되는 혜택 정보를 한눈에 확인하세요.</p>
    </section>

    <section class="card-grid">
${cardsHTML}
    </section>

    <?php if (have_posts()) : ?>
    <section class="blog-posts" style="margin-top: 60px;">
        <h2 style="margin-bottom: 20px; font-size: 24px;">최근 게시글</h2>
        <div class="card-grid">
            <?php while (have_posts()) : the_post(); ?>
            <article class="info-card" style="border:none; box-shadow:none; background:none;">
                <a href="<?php the_permalink(); ?>" style="text-decoration:underline;">
                    <h3 style="font-size: 18px; margin-bottom: 5px;"><?php the_title(); ?></h3>
                    <p style="color:#666; font-size:14px;"><?php echo get_the_date(); ?></p>
                </a>
            </article>
            <?php endwhile; ?>
        </div>
    </section>
    <?php endif; ?>
</main>

<?php get_footer(); ?>`;
}

// 5. functions.php 생성
function generateFunctionsPHP() {
    return `<?php
function my_ai_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(['primary' => 'Primary Menu']);
}
add_action('after_setup_theme', 'my_ai_theme_setup');

function my_ai_theme_scripts() {
    wp_enqueue_style('style', get_stylesheet_uri());
    wp_enqueue_script('custom-js', get_template_directory_uri() . '/custom.js', ['jquery'], '1.0', true);
}
add_action('wp_enqueue_scripts', 'my_ai_theme_scripts');
?>`;
}

// 6. custom.js 생성
function generateCustomJS() {
    return `jQuery(document).ready(function($) {
    // 모바일 메뉴 토글
    $('.mobile-menu-toggle').on('click', function() {
        $('.site-navigation').toggleClass('active');
    });
    
    // 카드 호버 효과 강조
    $('.info-card').hover(
        function() { $(this).css('z-index', '10'); },
        function() { $(this).css('z-index', '1'); }
    );
    
    console.log('Theme Loaded.');
});`;
}
