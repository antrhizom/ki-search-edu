const scrollButtons = document.querySelectorAll('[data-scroll-target]');
scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const timelineSteps = document.querySelectorAll('.timeline__step');
const timelinePanels = document.querySelectorAll('.timeline__panel');

timelineSteps.forEach((step) => {
  step.addEventListener('click', () => activateTimeline(step));
  step.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activateTimeline(step);
    }
  });
});

function activateTimeline(step) {
  const targetId = step.dataset.target;
  timelineSteps.forEach((btn) => {
    btn.classList.toggle('timeline__step--active', btn === step);
    btn.setAttribute('aria-selected', btn === step);
  });
  timelinePanels.forEach((panel) => {
    const isActive = panel.id === targetId;
    panel.classList.toggle('timeline__panel--hidden', !isActive);
    panel.toggleAttribute('hidden', !isActive);
  });
}

const perspectiveContent = {
  lernende:
    '<p><strong>Nutzen:</strong> Sofortige Unterstützung, adaptive Lernpfade, Motivation durch personalisierte Inhalte.</p><p><strong>Aufgaben:</strong> Quellen kritisch prüfen, eigene Lernziele formulieren, Ergebnisse mit Peers reflektieren.</p>',
  lehrkraefte:
    '<p><strong>Nutzen:</strong> Automatisierte Zusammenfassungen, Vorschläge für Differenzierung, Einsicht in Lernfortschritte.</p><p><strong>Aufgaben:</strong> Lernziele steuern, Aufgaben personalisieren und Datenschutz wahren.</p>',
  schulleitung:
    '<p><strong>Nutzen:</strong> Datenbasierte Entscheidungen, Monitoring von Nutzungsmustern, strategische Innovationsplanung.</p><p><strong>Aufgaben:</strong> Ressourcen bereitstellen, Fortbildungen ermöglichen, Qualitätsstandards definieren.</p>',
};

const perspectiveCards = document.querySelectorAll('.perspective-card');
const perspectiveDetail = document.querySelector('#perspektive-detail');

function updatePerspective(card) {
  perspectiveCards.forEach((item) =>
    item.classList.toggle('perspective-card--active', item === card)
  );
  const key = card.dataset.perspective;
  perspectiveDetail.innerHTML = perspectiveContent[key];
}

perspectiveCards.forEach((card) => {
  card.addEventListener('click', () => updatePerspective(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      updatePerspective(card);
    }
  });
});

if (perspectiveCards.length && perspectiveDetail) {
  updatePerspective(perspectiveCards[0]);
}

const modalButtons = document.querySelectorAll('[data-modal-target]');
const modalCloseButtons = document.querySelectorAll('[data-modal-close]');

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    modal?.removeAttribute('hidden');
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('.modal')?.setAttribute('hidden', '');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document
      .querySelectorAll('.modal:not([hidden])')
      .forEach((modal) => modal.setAttribute('hidden', ''));
  }
});

const quizForm = document.querySelector('.quiz');
if (quizForm) {
  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = quizForm.querySelector('.quiz__result');

    const q1 = quizForm.querySelector('input[name="q1"]:checked');
    const q2Values = Array.from(
      quizForm.querySelectorAll('input[name="q2"]:checked')
    ).map((input) => input.value);

    const q1Correct = q1?.value === 'korrekt';
    const q2Correct =
      q2Values.includes('diverse') &&
      q2Values.includes('feedback') &&
      !q2Values.includes('geheimhaltung');

    if (q1Correct && q2Correct) {
      result.textContent = 'Super! Du hast alle Fragen richtig beantwortet.';
      result.style.color = '#16a34a';
    } else {
      result.textContent =
        'Fast! Überprüfe deine Antworten noch einmal und denke an Datenschutz und Bias.';
      result.style.color = '#f97316';
    }
  });
}

const noteField = document.querySelector('#reflexion-eingabe');
const saveButton = document.querySelector('#reflexion-speichern');
const deleteButton = document.querySelector('#reflexion-loeschen');
const feedback = document.querySelector('.reflection__feedback');

const STORAGE_KEY = 'ki-suche-reflexion';

function showFeedback(message, tone = 'info') {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.style.color = tone === 'success' ? '#16a34a' : '#f97316';
}

function loadNote() {
  if (!noteField) return;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    noteField.value = stored;
    showFeedback('Gespeicherte Notiz geladen.');
  }
}

saveButton?.addEventListener('click', () => {
  if (!noteField?.value.trim()) {
    showFeedback('Bitte formuliere zuerst eine Notiz.');
    return;
  }
  localStorage.setItem(STORAGE_KEY, noteField.value.trim());
  showFeedback('Notiz gespeichert!', 'success');
});

deleteButton?.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  if (noteField) {
    noteField.value = '';
  }
  showFeedback('Notiz gelöscht.');
});

loadNote();
