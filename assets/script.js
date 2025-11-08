function toggleSection(event) {
  const item = event.currentTarget.closest('[data-toggle]');
  const isOpen = item.getAttribute('data-open') === 'true';
  item.setAttribute('data-open', !isOpen);
}

function setupToggles() {
  document.querySelectorAll('[data-toggle] button, [data-toggle] .accordion-trigger, [data-toggle] .scenario-toggle').forEach((button) => {
    button.addEventListener('click', toggleSection);
  });
}

function setupQuiz() {
  const quiz = document.querySelector('[data-quiz]');
  if (!quiz) return;

  const options = Array.from(quiz.querySelectorAll('.quiz-option'));
  const feedback = quiz.querySelector('.quiz-feedback');
  const correct = quiz.dataset.correct;

  options.forEach((option) => {
    option.addEventListener('click', () => {
      options.forEach((opt) => opt.setAttribute('data-selected', 'false'));
      option.setAttribute('data-selected', 'true');

      const isCorrect = option.dataset.option === correct;
      feedback.textContent = isCorrect
        ? 'Richtig! Du hast die wichtigsten Methoden aus dem Unterricht erkannt.'
        : 'Nicht ganz. Schau dir die Unterrichtsmethoden noch einmal genauer an.';
      feedback.setAttribute('data-visible', 'true');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupToggles();
  setupQuiz();
});
