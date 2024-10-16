const questions = [
    {
        question: "엘리베이터를 탔을때 나는?",
        options: [
            { text: "빨리 올라갔으면 좋겠다", value: 1 },
            { text: "사고가 나면 어떻게 탈출하지?", value: 2 }
        ]
    },
    {
        question: "방문을 열었는데....",
        options: [
            { text: "3cm 짜리 바퀴벌레 100마리^^", value: 1 },
            { text: "2m 짜리 바퀴벌레 한마리^^", value: 2 }
        ]
    },
    {
        question: "친구와 약속을 잡고 만났다. 그 때 나는?",
        options: [
            { text: "우리 이제 어디갈까?", value: 1 },
            { text: "내가 다 계획이 있어 나만 따라오셈><", value: 2 }
        ]
    },
    {
        question: "오늘 길을 가다가 자빠져버렸다..그 때 나는?",
        options: [
            { text: "너무 쪽팔려어어… 누가 봤으면 어떡하짐?..?'하루종일 생각하며 초능력을 발휘해 넘어지지 않는 상상한다.", value: 1 },
            { text: "(툭툭 털고 일어서며) '아 개쪽팔려.' 아무일도 없는 척 일어서며 친구들에게 썰 풀 준비를 한다.", value: 2 }
        ]
    },
    {
        question: "선생님께서 어마어마한 겨울 방학 과제를 주시며 2주라는 시간을 주셨다. 그 때 나는?",
        options: [
            { text: "오늘부터 차근차근 해야겟땅><", value: 1 },
            { text: "2주일이나 시간이 잇짜나? 1주일부터 해도 쌉가능이지이><", value: 2 }
        ]
    },
    {
        question: "나는 누구인가.",
        options: [
            { text: "불법도 괜찮아... 결과만 좋으면..- 결과주의 성향", value: 1 },
            { text: "올바르고 열심히 하자!! 결과: 전교 꼴등 -과정주의 성향", value: 2 }
        ]
    },
    {
        question: "나는 샤워할 때~~",
        options: [
            { text: "아 더워 숨막히노...", value: 1 },
            { text: "아 내가 오늘 왜 그랬지 아 맞다 내일 그건 어떡하냐", value: 2 }
        ]
    },
    {
        question: "중간고사를 망했다. 그 때 나는?",
        options: [
            { text: "조졌네, 하지만 기말을 잘보면 되쥬~~", value: 1 },
            { text: "아 더 일찍 준비 할 걸..'스트레스 받으며 기말고사 계획을 짠다.", value: 2 }
        ]
    },
    {
        question: "학교가 끝난 후",
        options: [
            { text: "친구들이랑 놀면서 스트레스와 피로를 푼다.", value: 1 },
            { text: "집.집.집.집. 누가 뭐래도 집에 간다.", value: 2 }
        ]
    },
    {
        question: "친구가 날보자 마자 눈물을 흘린다.",
        options: [
            { text: "왜, 왜 무슨 일인데! (원인 파악 후 해결책 생각)", value: 1 },
            { text: " 헉 무슨 일인데 그래ㅠㅠ (선공감 후 해결책 생각)", value: 2 }
        ]
    },
    {
        question: "연인이 바빠서 연락이 없네. 이때 나는?",
        options: [
            { text: "무슨일 있나? 폭풍연락 보내기.", value: 1 },
            { text: "나중에 연락오겠지 머... 내버려둔다.", value: 2 }
        ]
    }
    // 추가 질문들...
];



let currentQuestionIndex = 0; // 현재 질문의 인덱스를 추적
let responses = []; // 응답을 저장할 배열

// 테스트 시작 함수
function startTest() {
    document.getElementById('startScreen').style.display = 'none'; // 시작 화면을 숨김
    document.getElementById('questionForm').classList.remove('hidden'); // 질문 폼을 표시
    showQuestion(currentQuestionIndex); // 첫 번째 질문을 표시
}

// 현재 질문을 화면에 표시하는 함수
function showQuestion(index) {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = ''; // 기존 질문을 삭제

    const questionObj = questions[index]; // 현재 질문 객체 가져오기
    const question = document.createElement('div'); // 새로운 질문을 위한 div 생성
    question.className = 'question';
    question.innerHTML = `<p>${index + 1}. ${questionObj.question}</p>`; // 질문 텍스트 추가

    questionObj.options.forEach(option => {
        const button = document.createElement('button'); // 각 옵션에 대한 버튼 생성
        button.type = 'button';
        button.className = 'answer-button';
        button.textContent = option;
        button.onclick = () => handleAnswer(option, button); // 버튼 클릭 시 응답 처리 함수 호출

        // 이전에 저장된 응답이 있으면 해당 버튼을 선택된 상태로 표시
        if (responses[index] === option) {
            button.classList.add('selected');
        }

        question.appendChild(button); // 질문 div에 버튼 추가
    });

    questionsContainer.appendChild(question); // 질문을 화면에 표시

    updateSelectedAnswer(); // 선택한 응답 표시 업데이트

    // 마지막 질문인 경우 제출 버튼 표시
    if (index === questions.length - 1) {
        document.getElementById('submitButton').classList.remove('hidden');
    } else {
        document.getElementById('submitButton').classList.add('hidden');
    }
}

// 사용자가 응답을 선택했을 때 호출되는 함수
function handleAnswer(answer, button) {
    responses[currentQuestionIndex] = answer; // 현재 질문의 응답을 저장

    // 선택된 버튼 스타일 업데이트
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach(btn => btn.classList.remove('selected')); // 모든 버튼에서 선택 상태 제거
    button.classList.add('selected'); // 클릭된 버튼에 선택 상태 추가

    // 다음 질문으로 넘어감
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++; // 인덱스를 다음 질문으로 증가
        showQuestion(currentQuestionIndex); // 다음 질문을 표시
    }
}

// 선택한 응답을 화면에 표시하는 함수
function updateSelectedAnswer() {
    const selectedAnswerDiv = document.getElementById('selectedAnswer');
    if (responses[currentQuestionIndex]) {
        selectedAnswerDiv.textContent = `선택한 답변: ${responses[currentQuestionIndex]}`; // 선택한 답변을 표시
        selectedAnswerDiv.classList.remove('hidden'); // 선택한 답변 표시 영역을 보여줌
    } else {
        selectedAnswerDiv.classList.add('hidden'); // 선택한 답변 표시 영역을 숨김
    }
}

// 제출 폼 처리 함수
function submitForm(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 방지

    // 결과 화면으로 전환
    document.getElementById('questionForm').classList.add('hidden'); // 질문 폼 숨기기
    document.getElementById('resultScreen').classList.remove('hidden'); // 결과 화면 표시
    showResult(); // 결과를 표시
}

// 사용자가 선택한 응답에 따른 결과를 표시하는 함수
function showResult() {
    const resultMessage = document.getElementById('resultMessage');
    resultMessage.textContent = '검사가 완료되었습니다! 선택한 답변들을 확인하세요:\n' + 
                                responses.map((response, index) => `질문 ${index + 1}: ${response}`).join('\n'); // 응답을 결과로 표시
}

// 테스트를 다시 시작하는 함수
function restartTest() {
    responses = []; // 응답 배열 초기화
    currentQuestionIndex = 0; // 질문 인덱스 초기화

    // 결과 화면을 숨기고 시작 화면을 다시 표시
    document.getElementById('resultScreen').classList.add('hidden');
    document.getElementById('startScreen').style.display = 'block';
    document.getElementById('questionForm').classList.add('hidden'); // 질문 폼을 숨김
}