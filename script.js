const quizData = [
    {
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'Hyper Transfer Markup Language', 'Hyperlink and Text Markup Language', 'Home Tool Markup Language'],
        answer: 'Hyper Text Markup Language',
      },
      {
        question: 'Which of the following is a programming language?',
        options: ['HTML', 'CSS', 'JavaScript', 'XML'],
        answer: 'JavaScript',
      },
      {
        question: 'What does CSS stand for?',
        options: ['Counter Strike: Source', 'Computer Style Sheet', 'Creative Style System', 'Cascading Style Sheet'],
        answer: 'Cascading Style Sheet',
      },
      {
        question: 'Which programming language is known for its use in machine learning and data science?',
        options: ['Java', 'Python', 'C++', 'Ruby'],
        answer: 'Python',
      },
      {
        question: 'What is the purpose of the JavaScript library jQuery?',
        options: ['Server-side scripting', 'Database management', 'DOM manipulation and event handling', 'Styling and layout'],
        answer: 'DOM manipulation and event handling',
      },
      {
        question: 'What does CSS3 introduce for the first time?',
        options: ['Flexbox', 'Grid Layout', 'Transitions', 'Media Queries'],
        answer: 'Flexbox',
      },
      {
        question: 'Which data structure follows the Last In, First Out (LIFO) principle?',
        options: ['Queue', 'Stack', 'Linked List', 'Tree'],
        answer: 'Stack',
      },
      {
        question: 'In JavaScript, what is the purpose of the `parseInt` function?',
        options: ['Parse a string into an integer', 'Parse a string into a floating-point number', 'Convert an object to a string', 'Convert a string to lowercase'],
        answer: 'Parse a string into an integer',
      },

     
      {
        question: 'Which of the following is an example of a block-level element in HTML?',
        options: ['<span>', '<a>', '<em>', '<div>'],
        answer: '<div>',
      },
      {
        question: 'What is the primary role of the `box-sizing: border-box;` CSS property?',
        options: ['Add padding to the element', 'Include border and padding in the element\'s total width and height', 'Create a border around the element', 'Remove the border from the element'],
        answer: 'Include border and padding in the element\'s total width and height',
      },
      // Add more questions as needed
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();