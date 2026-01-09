// 현재 날짜 표시
document.getElementById('currentDate').textContent = new Date().toLocaleDateString('ko-KR');

// 전역 변수
let generatedFiles = {};

// 에러 표시
function showError(msg) {
    const box = document.getElementById('errorBox');
    document.getElementById('errorText').textContent = msg;
    box.classList.remove('hidden');
    setTimeout(() => box.classList.add('hidden'), 5000);
}

// 성공 표시
function showSuccess(msg) {
    const box = document.getElementById('successBox');
    document.getElementById('successText').textContent = msg;
    box.classList.remove('hidden');
    setTimeout(() => box.classList.add('hidden'), 3000);
}

// 입력값 검증
function validateInputs() {
    const themeName = document.getElementById('themeName').value.trim();
    const keywords = Array.from(document.querySelectorAll('.keyword'))
        .map(el => el.value.trim())
        .filter(v => v);

    if (!themeName) {
        showError('테마 이름을 입력해주세요');
        return false;
    }
    if (keywords.length === 0) {
        showError('최소 1개의 키워드를 입력해주세요');
        return false;
    }
    return true;
}

// 메뉴 데이터 수집
function getMenuData() {
    const menuNames = Array.from(document.querySelectorAll('.menu-name')).map(el => el.value.trim());
    const menuLinks = Array.from(document.querySelectorAll('.menu-link')).map(el => el.value.trim());
    
    const menus = [];
    for (let i = 0; i < menuNames.length; i++) {
        if (menuNames[i]) {
            menus.push({ name: menuNames[i], link: menuLinks[i] || '#' });
        }
    }
    return menus;
}

// 키워드 데이터 수집
function getKeywords() {
    return Array.from(document.querySelectorAll('.keyword'))
        .map(el => el.value.trim())
        .filter(v => v);
}

// AI로 카드 데이터 생성
async function generateCardData(keywords) {
    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 2000,
                messages: [{
                    role: "user",
                    content: `다음 키워드들에 대해 각각 지원금 카드 내용을 만들어줘.

키워드: ${keywords.join(', ')}

각 키워드에 대해 다음 형식의 JSON 배열로만 답변해:
[
  {
    "keyword": "키워드명",
    "amount": "금액/혜택 (예: 최대 4.5% 금리, 월 50만원)",
    "amountSub": "부가 설명",
    "description": "한 줄 설명",
    "target": "지원대상 (20글자 이내)",
    "period": "신청시기"
  }
]

JSON만 출력, 다른 텍스트 없이`
                }]
            })
        });

        const data = await response.json();
        let jsonText = data.content?.find(item => item.type === "text")?.text || "[]";
        jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?$/g, "").trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("AI 생성 오류:", error);
        throw error;
    }
}

// 파일 다운로드
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

// 다운로드 버튼 생성
function createDownloadButtons() {
    const container = document.getElementById('downloadButtons');
    container.innerHTML = '';
    
    const files = [
        { name: 'style.css', icon: '🎨', desc: '테마 스타일' },
        { name: 'index.php', icon: '🏠', desc: '메인 페이지' },
        { name: 'header.php', icon: '📄', desc: '헤더' },
        { name: 'footer.php', icon: '📄', desc: '푸터' },
        { name: 'functions.php', icon: '⚙️', desc: '기능' },
        { name: 'custom.js', icon: '💻', desc: '스크립트' }
    ];
    
    files.forEach(file => {
        const btn = document.createElement('button');
        btn.className = 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center';
        btn.innerHTML = `
            <span class="text-2xl mr-2">${file.icon}</span>
            <div class="text-left">
                <div class="text-sm">${file.name}</div>
                <div class="text-xs opacity-80">${file.desc}</div>
            </div>
        `;
        btn.onclick = () => {
            downloadFile(file.name, generatedFiles[file.name]);
            showSuccess(`${file.name} 다운로드 완료!`);
        };
        container.appendChild(btn);
    });
}

// 메인 생성 함수
async function generateTheme() {
    if (!validateInputs()) return;

    const loadingBox = document.getElementById('loadingBox');
    const resultBox = document.getElementById('resultBox');
    const generateBtn = document.getElementById('generateBtn');
    
    generateBtn.disabled = true;
    loadingBox.classList.remove('hidden');
    resultBox.classList.add('hidden');

    try {
        // 데이터 수집
        const themeName = document.getElementById('themeName').value.trim();
        const siteTitle = document.getElementById('siteTitle').value.trim() || themeName;
        const menus = getMenuData();
        const keywords = getKeywords();
        const primaryColor = document.getElementById('primaryColor').value;
        const mainUrl = document.getElementById('mainUrl').value.trim() || '#';
        const companyName = document.getElementById('companyName').value.trim() || '회사명';
        const businessNumber = document.getElementById('businessNumber').value.trim() || '사업자번호';

        // AI로 카드 데이터 생성
        const cardData = await generateCardData(keywords);

        // 테마 파일 생성
        generatedFiles = {
            'style.css': generateStyleCSS(themeName, primaryColor),
            'index.php': generateIndexPHP(siteTitle, cardData, mainUrl),
            'header.php': generateHeaderPHP(siteTitle, menus),
            'footer.php': generateFooterPHP(companyName, businessNumber),
            'functions.php': generateFunctionsPHP(),
            'custom.js': generateCustomJS()
        };

        // 결과 표시
        loadingBox.classList.add('hidden');
        resultBox.classList.remove('hidden');
        createDownloadButtons();
        showSuccess('테마 생성 완료! 파일을 다운로드하세요.');
    } catch (error) {
        console.error('생성 오류:', error);
        showError('테마 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
        loadingBox.classList.add('hidden');
    } finally {
        generateBtn.disabled = false;
    }
}

// 이벤트 리스너
document.getElementById('generateBtn').addEventListener('click', generateTheme);
