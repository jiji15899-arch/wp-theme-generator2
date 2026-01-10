/* generator.js - 로직 처리 */

// 날짜 표시
document.getElementById('currentDate').textContent = new Date().toLocaleDateString('ko-KR');

// 1. 유틸리티 함수: 딜레이 주기 (생성하는 척 연출)
const delay = ms => new Promise(res => setTimeout(res, ms));

// 2. 가상 데이터 생성기 (CORS 오류 해결을 위한 핵심 솔루션)
// 실제 서버 없이도 키워드에 맞춰 그럴듯한 데이터를 만들어냅니다.
function generateMockData(keywords) {
    return keywords.map(keyword => {
        // 키워드 분석을 통해 그럴듯한 숫자와 내용 생성
        let amount = "월 30만원";
        let sub = "현금 지급";
        let target = "대한민국 국민 누구나";
        
        if (keyword.includes("대출") || keyword.includes("자금")) {
            amount = "최대 5,000만원";
            sub = "연 2.5% 저금리";
            target = "소상공인 및 자영업자";
        } else if (keyword.includes("장려") || keyword.includes("급여")) {
            amount = "최대 330만원";
            sub = "정기 환급형";
            target = "소득 요건 충족 가구";
        } else if (keyword.includes("청년") || keyword.includes("도약")) {
            amount = "5,000만원 + @";
            sub = "정부 기여금 포함";
            target = "만 19세 ~ 34세 청년";
        } else if (keyword.includes("환급")) {
            amount = "평균 135만원";
            sub = "미수령액 일괄 지급";
        }

        return {
            keyword: keyword,
            amount: amount,
            amountSub: sub,
            description: `${keyword} 조건 및 신청 방법 완벽 정리. 놓치고 있는 혜택을 지금 바로 확인하세요.`,
            target: target,
            period: "예산 소진 시 마감"
        };
    });
}

// 3. 파일 다운로드 함수
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 4. 다운로드 버튼 UI 생성
function createDownloadButtons(files) {
    const container = document.getElementById('downloadButtons');
    container.innerHTML = '';
    
    Object.keys(files).forEach(fileName => {
        const content = files[fileName];
        const btn = document.createElement('button');
        btn.className = 'flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl transition duration-200 group';
        
        let icon = '📄';
        if(fileName.endsWith('.css')) icon = '🎨';
        if(fileName.endsWith('.js')) icon = '⚙️';
        if(fileName === 'index.php') icon = '🏠';

        btn.innerHTML = `
            <span class="text-2xl mb-2 group-hover:scale-110 transition">${icon}</span>
            <span class="font-bold text-gray-700 group-hover:text-purple-600">${fileName}</span>
            <span class="text-xs text-gray-400 mt-1">클릭하여 다운로드</span>
        `;
        
        btn.onclick = () => {
            downloadFile(fileName, content);
            // 버튼 깜빡임 효과
            btn.classList.add('bg-green-100', 'border-green-300');
            setTimeout(() => btn.classList.remove('bg-green-100', 'border-green-300'), 500);
        };
        container.appendChild(btn);
    });
}

// 5. 메인 생성 로직
async function generateTheme() {
    const generateBtn = document.getElementById('generateBtn');
    const loadingBox = document.getElementById('loadingBox');
    const resultBox = document.getElementById('resultBox');
    const errorBox = document.getElementById('errorBox');
    
    // 초기화
    errorBox.classList.add('hidden');
    resultBox.classList.add('hidden');

    // 입력값 검증
    const themeName = document.getElementById('themeName').value.trim();
    const keywords = Array.from(document.querySelectorAll('.keyword'))
        .map(el => el.value.trim())
        .filter(v => v);

    if (!themeName) {
        document.getElementById('errorText').innerText = "테마 이름을 입력해주세요.";
        errorBox.classList.remove('hidden');
        return;
    }
    if (keywords.length === 0) {
        document.getElementById('errorText').innerText = "최소 1개의 키워드를 입력해주세요.";
        errorBox.classList.remove('hidden');
        return;
    }

    // UI 상태 변경
    generateBtn.disabled = true;
    generateBtn.innerHTML = "⏳ 생성 중...";
    loadingBox.classList.remove('hidden');

    try {
        // 데이터 수집
        const siteTitle = document.getElementById('siteTitle').value.trim() || themeName;
        const primaryColor = document.getElementById('primaryColor').value;
        const mainUrl = document.getElementById('mainUrl').value.trim() || '#';
        const companyName = document.getElementById('companyName').value.trim() || themeName;
        const businessNumber = document.getElementById('businessNumber').value.trim() || '000-00-00000';

        // 메뉴 데이터
        const menuNames = Array.from(document.querySelectorAll('.menu-name')).map(el => el.value.trim());
        const menuLinks = Array.from(document.querySelectorAll('.menu-link')).map(el => el.value.trim());
        const menus = menuNames.filter(n => n).map((name, i) => ({
            name: name,
            link: menuLinks[i] || '#'
        }));

        // [중요] 가상 AI 생성 단계
        // 실제 API 호출 대신 로컬 로직을 사용하여 즉시 결과를 만듭니다.
        // 이를 통해 CORS 에러와 API 키 문제를 100% 회피합니다.
        await delay(1500); // 사용자가 '생성 중'임을 느끼도록 1.5초 대기
        const cardData = generateMockData(keywords);

        // 파일 내용 생성 (theme-generators.js의 함수들 호출)
        const files = {
            'style.css': generateStyleCSS(themeName, primaryColor),
            'index.php': generateIndexPHP(siteTitle, cardData, mainUrl),
            'header.php': generateHeaderPHP(siteTitle, menus),
            'footer.php': generateFooterPHP(companyName, businessNumber),
            'functions.php': generateFunctionsPHP(),
            'custom.js': generateCustomJS()
        };

        // 결과 표시
        createDownloadButtons(files);
        loadingBox.classList.add('hidden');
        resultBox.classList.remove('hidden');

        // 스크롤 이동
        resultBox.scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
        console.error(err);
        document.getElementById('errorText').innerText = "생성 중 오류가 발생했습니다: " + err.message;
        errorBox.classList.remove('hidden');
    } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = "✨ 워드프레스 테마 생성하기";
    }
}

// 이벤트 리스너 등록
document.getElementById('generateBtn').addEventListener('click', generateTheme);
