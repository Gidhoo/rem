// Базовая логика для PWA и взаимодействий

// --- Установка PWA (кнопка "Установить") ---
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Предотвращаем автоматическое отображение мини-окна
    e.preventDefault();
    deferredPrompt = e;
    // Показываем кнопку установки
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
        // Показать приглашение
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Пользователь установил PWA');
            }
            deferredPrompt = null;
            installBtn.style.display = 'none';
        });
    });
});

// --- Открытие модалки заявки ---
document.getElementById('requestCallBtn').addEventListener('click', () => {
    document.getElementById('requestModal').classList.add('active');
});

// Закрытие модалки при клике вне области
document.getElementById('requestModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('requestModal')) {
        document.getElementById('requestModal').classList.remove('active');
    }
});

// --- Нижняя навигация (переключение активного статуса) ---
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', function() {
        navItems.forEach(n => n.classList.remove('active'));
        this.classList.add('active');
        // В реальном приложении здесь маршрутизация
        alert(`Переход в раздел: ${this.innerText.trim()}`);
    });
});

// --- Симуляция клика по услуге (можно привязать к форме) ---
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('click', () => {
        const serviceName = item.querySelector('span:first-child').innerText;
        alert(`Выбрана услуга: ${serviceName}. Можно открыть заявку.`);
        document.getElementById('requestModal').classList.add('active');
    });
});