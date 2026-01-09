// footer.php 생성
function generateFooterPHP(companyName, businessNumber) {
    return `    <footer class="site-footer">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-left">
                    <div class="footer-brand"><?php echo esc_html('${companyName}'); ?></div>
                    <ul class="footer-info">
                        <li>사업자 번호: <?php echo esc_html('${businessNumber}'); ?></li>
                        <li>이메일: <?php echo esc_html(get_bloginfo('admin_email')); ?></li>
                    </ul>
                </div>
                <div class="footer-right">
                    <p>제작자: 아로스</p>
                    <p>Powered by WordPress</p>
                </div>
            </div>
            <div class="footer-copyright">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
            </div>
        </div>
    </footer>
</div>

<?php wp_footer(); ?>
</body>
</html>`
}

// index.php 생성
function generateIndexPHP(siteTitle, cardData, mainUrl) {
    const cardsHTML = cardData.map((card, idx) => {
        const featured = idx === 0 ? ' featured' : '';
        const badge = idx === 0 ? `                <span class="card-badge">🔥 인기</span>\n` : '';
        
        return `        <article class="info-card${featured}">
            <a href="<?php echo esc_url('${mainUrl}'); ?>">
                <div class="card-highlight">
${badge}                    <div class="card-amount"><?php echo esc_html('${card.amount}'); ?></div>
                    <div class="card-amount-sub"><?php echo esc_html('${card.amountSub}'); ?></div>
                </div>
                <div class="card-content">
                    <h3 class="card-title"><?php echo esc_html('${card.keyword}'); ?></h3>
                    <p class="card-description"><?php echo esc_html('${card.description}'); ?></p>
                    <div class="card-details">
                        <div class="card-detail-row">
                            <span class="card-detail-label">지원대상</span>
                            <span class="card-detail-value"><?php echo esc_html('${card.target}'); ?></span>
                        </div>
                        <div class="card-detail-row">
                            <span class="card-detail-label">신청시기</span>
                            <span class="card-detail-value"><?php echo esc_html('${card.period}'); ?></span>
                        </div>
                    </div>
                    <div class="card-button">
                        지금 바로 신청하기 →
                    </div>
                </div>
            </a>
        </article>`;
    }).join('\n\n');

    return `<?php get_header(); ?>

<main class="site-content">
    <!-- 인트로 섹션 -->
    <section class="intro-section fade-in">
        <span class="intro-badge">신청마감 임박</span>
        <h1 class="intro-title"><?php echo esc_html('${siteTitle}'); ?></h1>
        <p class="intro-subtitle">숨은 지원금 1분만에 찾기</p>
    </section>

    <!-- 정보 박스 -->
    <section class="info-box fade-in">
        <div class="info-box-title">💡 신청 안하면 절대 못 받아요</div>
        <div class="info-box-amount">1인 평균 127만원 환급</div>
        <p class="info-box-desc">
            대한민국 92%가 놓치고 있는 정부 지원금! 지금 확인하고 혜택 놓치지 마세요.
        </p>
    </section>

    <!-- 카드 그리드 -->
    <section class="card-grid">
${cardsHTML}
    </section>

    <!-- 히어로 섹션 -->
    <section class="hero-section fade-in">
        <span class="hero-urgent">🔥 신청마감 D-3일</span>
        <h2 class="hero-title">나의 <span style="color: #FFF59D;">숨은 지원금</span> 찾기</h2>
        <p class="hero-subtitle">신청자 1인 평균 127만원 수령</p>
        <a href="<?php echo esc_url('${mainUrl}'); ?>" class="hero-cta">
            30초만에 내 지원금 확인 <span>→</span>
        </a>
        <div style="margin-top: 30px; font-size: 14px; opacity: 0.9;">
            ✓ 무료 조회 &nbsp;&nbsp;|&nbsp;&nbsp; ✓ 30초 완료 &nbsp;&nbsp;|&nbsp;&nbsp; ✓ 개인정보 보호
        </div>
    </section>

    <?php
    // 워드프레스 루프 (블로그 게시물이 있는 경우)
    if (have_posts()) :
        echo '<section class="blog-posts" style="margin-top: 60px;">';
        echo '<h2 style="font-size: 32px; font-weight: 700; margin-bottom: 30px; text-align: center;">최근 소식</h2>';
        echo '<div class="card-grid">';
        
        while (have_posts()) : the_post();
            ?>
            <article class="info-card">
                <a href="<?php the_permalink(); ?>">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="card-highlight" style="padding: 0; height: 200px; overflow: hidden;">
                            <?php the_post_thumbnail('medium', ['style' => 'width: 100%; height: 100%; object-fit: cover;']); ?>
                        </div>
                    <?php endif; ?>
                    <div class="card-content">
                        <h3 class="card-title"><?php the_title(); ?></h3>
                        <p class="card-description">
                            <?php echo wp_trim_words(get_the_excerpt(), 20); ?>
                        </p>
                        <div class="card-button" style="margin-top: 20px;">
                            자세히 보기 →
                        </div>
                    </div>
                </a>
            </article>
            <?php
        endwhile;
        
        echo '</div>';
        echo '</section>';
    endif;
    ?>
</main>

<?php get_footer(); ?>`
}

// functions.php 생성
function generateFunctionsPHP() {
    return `<?php
/**
 * Theme Functions
 */

// 테마 지원 기능 활성화
function mytheme_setup() {
    // 타이틀 태그 지원
    add_theme_support('title-tag');
    
    // 썸네일 이미지 지원
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(800, 600, true);
    
    // HTML5 지원
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // RSS 피드 링크
    add_theme_support('automatic-feed-links');
    
    // 커스텀 로고
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    
    // 메뉴 등록
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'mytheme'),
        'footer'  => __('Footer Menu', 'mytheme'),
    ));
}
add_action('after_setup_theme', 'mytheme_setup');

// 스타일시트와 스크립트 로드
function mytheme_scripts() {
    // 메인 스타일
    wp_enqueue_style('mytheme-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Google Fonts
    wp_enqueue_style('mytheme-fonts', 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap', array(), null);
    
    // 커스텀 자바스크립트
    wp_enqueue_script('mytheme-custom', get_template_directory_uri() . '/custom.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'mytheme_scripts');

// 위젯 영역 등록
function mytheme_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar', 'mytheme'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here.', 'mytheme'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer 1', 'mytheme'),
        'id'            => 'footer-1',
        'description'   => __('Footer widget area 1', 'mytheme'),
        'before_widget' => '<div class="footer-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3>',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'mytheme_widgets_init');

// 발췌문 길이 변경
function mytheme_excerpt_length($length) {
    return 30;
}
add_filter('excerpt_length', 'mytheme_excerpt_length');

// 발췌문 더보기 텍스트
function mytheme_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'mytheme_excerpt_more');

// 페이지네이션
function mytheme_pagination() {
    if (is_singular()) {
        return;
    }

    global $wp_query;

    if ($wp_query->max_num_pages <= 1) {
        return;
    }

    $paged = get_query_var('paged') ? absint(get_query_var('paged')) : 1;
    $max   = intval($wp_query->max_num_pages);

    if ($paged >= 1) {
        $links[] = $paged;
    }

    if ($paged >= 3) {
        $links[] = $paged - 1;
        $links[] = $paged - 2;
    }

    if (($paged + 2) <= $max) {
        $links[] = $paged + 2;
        $links[] = $paged + 1;
    }

    echo '<div class="pagination"><ul>' . "\\n";

    if (get_previous_posts_link()) {
        printf('<li>%s</li>' . "\\n", get_previous_posts_link('« Previous'));
    }

    if (!in_array(1, $links)) {
        $class = 1 == $paged ? ' class="active"' : '';
        printf('<li%s><a href="%s">%s</a></li>' . "\\n", $class, esc_url(get_pagenum_link(1)), '1');

        if (!in_array(2, $links)) {
            echo '<li>…</li>';
        }
    }

    sort($links);
    foreach ((array) $links as $link) {
        $class = $paged == $link ? ' class="active"' : '';
        printf('<li%s><a href="%s">%s</a></li>' . "\\n", $class, esc_url(get_pagenum_link($link)), $link);
    }

    if (!in_array($max, $links)) {
        if (!in_array($max - 1, $links)) {
            echo '<li>…</li>' . "\\n";
        }
        $class = $paged == $max ? ' class="active"' : '';
        printf('<li%s><a href="%s">%s</a></li>' . "\\n", $class, esc_url(get_pagenum_link($max)), $max);
    }

    if (get_next_posts_link()) {
        printf('<li>%s</li>' . "\\n", get_next_posts_link('Next »'));
    }

    echo '</ul></div>' . "\\n";
}

// 보안: 워드프레스 버전 숨기기
remove_action('wp_head', 'wp_generator');

// 코멘트 관련 스크립트 조건부 로드
function mytheme_comment_script() {
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'mytheme_comment_script');

// 커스텀 로고 출력 함수
function mytheme_custom_logo() {
    if (function_exists('the_custom_logo') && has_custom_logo()) {
        the_custom_logo();
    } else {
        echo '<a href="' . esc_url(home_url('/')) . '">' . get_bloginfo('name') . '</a>';
    }
}

// 이미지 최적화
add_filter('jpeg_quality', function($arg){return 85;});

// 불필요한 메타 태그 제거
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head');

// 성능 최적화: 이모지 스크립트 제거
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

?>`
}

// custom.js 생성
function generateCustomJS() {
    return `/**
 * Custom JavaScript
 */

(function($) {
    'use strict';

    // DOM Ready
    $(document).ready(function() {
        
        // 모바일 메뉴 토글
        $('.mobile-menu-toggle').on('click', function() {
            $('.site-navigation').toggleClass('active');
        });

        // 외부 클릭시 메뉴 닫기
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.site-navigation, .mobile-menu-toggle').length) {
                $('.site-navigation').removeClass('active');
            }
        });

        // 스크롤 애니메이션
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function checkAnimation() {
            $('.fade-in').each(function() {
                if (isInViewport(this)) {
                    $(this).css({
                        opacity: '1',
                        transform: 'translateY(0)'
                    });
                }
            });
        }

        // 초기 페이드인 요소 스타일
        $('.fade-in').css({
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all 0.6s ease-out'
        });

        // 스크롤 이벤트
        $(window).on('scroll', checkAnimation);
        checkAnimation(); // 초기 체크

        // 스무스 스크롤
        $('a[href*="#"]').on('click', function(e) {
            const target = $(this.hash);
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800);
            }
        });

        // 카드 호버 효과
        $('.info-card').on('mouseenter', function() {
            $(this).addClass('pulse');
        }).on('mouseleave', function() {
            $(this).removeClass('pulse');
        });

        // 이탈 방지 팝업
        let exitIntentShown = false;
        
        $(document).on('mouseleave', function(e) {
            if (e.clientY < 0 && !exitIntentShown) {
                showExitIntent();
                exitIntentShown = true;
            }
        });

        function showExitIntent() {
            if (confirm('잠깐! 지원금 혜택을 확인하지 않고 나가시나요?\\n\\n최대 300만원 지원금을 놓칠 수 있습니다!')) {
                // 사용자가 확인을 누르면 히어로 섹션으로 스크롤
                $('html, body').animate({
                    scrollTop: $('.hero-section').offset().top - 80
                }, 800);
            }
        }

        // 뒤로가기 방지
        if (window.history && window.history.pushState) {
            window.history.pushState('forward', null, window.location.href);
            $(window).on('popstate', function() {
                if (confirm('정말 나가시겠습니까?\\n확인하지 않은 지원금이 있을 수 있습니다!')) {
                    window.history.back();
                } else {
                    window.history.pushState('forward', null, window.location.href);
                }
            });
        }

        // 로딩 애니메이션
        $(window).on('load', function() {
            $('body').addClass('loaded');
        });

        // 카드 순차 애니메이션
        $('.info-card').each(function(index) {
            $(this).css({
                'animation-delay': (index * 0.1) + 's'
            });
        });

        // 반응형 테이블
        $('table').wrap('<div class="table-responsive"></div>');

        // 외부 링크 새창
        $('a[href^="http"]').not('[href*="' + window.location.host + '"]').attr('target', '_blank').attr('rel', 'noopener noreferrer');

        // 이미지 레이지 로딩
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }

        console.log('테마 스크립트 로드 완료');
    });

})(jQuery);`
}

// generator.js에 추가할 코드 (파일 끝에 추가)
// 이 함수들을 generator.js에서 사용할 수 있도록 전역으로 설정
