const questions = [
    {
        question: "1.엘리베이터를 탔을때 나는?",
        options: [
            { text: "빨리 올라갔으면 좋겠다", value: 1 },
            { text: "사고가 나면 어떻게 탈출하지?", value: 2 }
        ]
    },
    {
        question: "2.방문을 열었는데....",
        options: [
            { text: "3cm 짜리 바퀴벌레 100마리^^", value: 1 },
            { text: "2m 짜리 바퀴벌레 한마리^^", value: 2 }
        ]
    },
    {
        question: "3.친구와 약속을 잡고 만났다. 그 때 나는?",
        options: [
            { text: "우리 이제 어디갈까?", value: 1 },
            { text: "내가 다 계획이 있어 나만 따라오셈><", value: 2 }
        ]
    },
    {
        question: "4.오늘 길을 가다가 자빠져버렸다..그 때 나는?",
        options: [
            { text: "너무 쪽팔려어어… 누가 봤으면 어떡하짐?..?'하루종일 생각하며 초능력을 발휘해 넘어지지 않는 상상한다.", value: 1 },
            { text: "(툭툭 털고 일어서며) '아 개쪽팔려.' 아무일도 없는 척 일어서며 친구들에게 썰 풀 준비를 한다.", value: 2 }
        ]
    },
    {
        question: "5.선생님께서 어마어마한 겨울 방학 과제를 주시며 2주라는 시간을 주셨다. 그 때 나는?",
        options: [
            { text: "오늘부터 차근차근 해야겟땅><", value: 1 },
            { text: "2주일이나 시간이 잇짜나? 1주일부터 해도 쌉가능이지이><", value: 2 }
        ]
    },
    {
        question: "6.나는 누구인가.",
        options: [
            { text: "불법도 괜찮아... 결과만 좋으면..- 결과주의 성향", value: 1 },
            { text: "올바르고 열심히 하자!! 결과: 전교 꼴등 -과정주의 성향", value: 2 }
        ]
    },
    {
        question: "7.나는 샤워할 때~~",
        options: [
            { text: "아 더워 숨막히노...", value: 1 },
            { text: "아 내가 오늘 왜 그랬지 아 맞다 내일 그건 어떡하냐", value: 2 }
        ]
    },
    {
        question: "8.중간고사를 망했다. 그 때 나는?",
        options: [
            { text: "조졌네, 하지만 기말을 잘보면 되쥬~~", value: 1 },
            { text: "아 더 일찍 준비 할 걸..'스트레스 받으며 기말고사 계획을 짠다.", value: 2 }
        ]
    },
    {
        question: "9.학교가 끝난 후",
        options: [
            { text: "친구들이랑 놀면서 스트레스와 피로를 푼다.", value: 1 },
            { text: "집.집.집.집. 누가 뭐래도 집에 간다.", value: 2 }
        ]
    },
    {
        question: "10.친구가 날보자 마자 눈물을 흘린다.",
        options: [
            { text: "왜, 왜 무슨 일인데! (원인 파악 후 해결책 생각)", value: 1 },
            { text: " 헉 무슨 일인데 그래ㅠㅠ (선공감 후 해결책 생각)", value: 2 }
        ]
    },
    {
        question: "11.연인이 바빠서 연락이 없네. 이때 나는?",
        options: [
            { text: "무슨일 있나? 폭풍연락 보내기.", value: 1 },
            { text: "나중에 연락오겠지 머... 내버려둔다.", value: 2 }
        ]
    }
    // 추가 질문들...
];


let currentQuestionIndex = 0;  // 현재 질문 인덱스
const responses = [];  // 사용자의 답변을 저장할 배열

// 시작 버튼을 눌렀을 때 실행될 함수
function startTest() {
    hideElement('startScreen'); // 시작 화면 숨기기
    showElement('questionForm'); // 질문 폼 표시
    showQuestion(currentQuestionIndex); // 첫 질문 표시
}

// 현재 질문을 화면에 표시하는 함수
function showQuestion(index) {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = ''; // 이전 질문 내용 초기화

    const questionText = document.createElement('p');
    questionText.textContent = questions[index].question;
    questionsContainer.appendChild(questionText); // 질문 텍스트 추가

    questions[index].options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.className = 'answer-button';
        button.onclick = () => handleAnswer(option.value, button);
        questionsContainer.appendChild(button); // 선택지 버튼 추가
    });

    updateSelectedAnswer(); // 선택한 답변 업데이트

    if (index === questions.length - 1) {
        showElement('submitButton'); // 마지막 질문일 경우 제출 버튼 표시
    }
}
 
// 사용자가 답변을 선택했을 때 실행되는 함수
function handleAnswer(value, button) {
    responses[currentQuestionIndex] = value;  // 현재 질문에 대한 답변 저장
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');  // 선택된 버튼 강조

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);  // 다음 질문 표시
    }
}

// 선택한 답변을 업데이트하는 함수
function updateSelectedAnswer() {
    const selectedAnswerDiv = document.getElementById('selectedAnswer');
    if (responses[currentQuestionIndex] !== undefined) {
        selectedAnswerDiv.textContent = `선택한 답변 값: ${responses[currentQuestionIndex]}`;
        showElement('selectedAnswer');  // 선택한 답변 표시
    } else {
        hideElement('selectedAnswer');  // 선택한 답변 숨기기
    }
}

// 폼이 제출될 때 실행되는 함수
function submitForm(event) {
    event.preventDefault();
    hideElement('questionForm');  // 질문 폼 숨기기
    showElement('resultScreen');  // 결과 화면 표시
    showResult();  // 결과 표시
}

// 결과를 화면에 표시하는 함수
function showResult() {
    const resultMessage = document.getElementById('resultMessage');
    resultMessage.textContent = '검사가 완료되었습니다! 선택한 답변 값들을 확인하세요:\n' + 
                                responses.map((response, index) => `질문 ${index + 1}: ${response}`).join('\n');
}

// 다시 시작 버튼을 눌렀을 때 실행되는 함수
function restartTest() {
    hideElement('resultScreen');  // 결과 화면 숨기기
    showElement('startScreen');  // 시작 화면 표시
    currentQuestionIndex = 0;
    responses.length = 0;  // 답변 초기화
}

// 요소를 숨기는 함수
function hideElement(id) {
    document.getElementById(id).classList.add('hidden');
}

// 요소를 표시하는 함수
function showElement(id) {
    document.getElementById(id).classList.remove('hidden');
}
