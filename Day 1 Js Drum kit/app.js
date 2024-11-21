
document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.key');

    const removeTransition = (e) => {
        if (e.propertyName !== 'transform') return;
        e.target.classList.remove('playing');
    };

    const playSound = (e) => {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
        if (!audio || !key) return;

        key.classList.add('playing');
        audio.currentTime = 0; // Rewind to the start
        audio.play();
    };

    keys.forEach((key) => key.addEventListener('transitionend', removeTransition));
    window.addEventListener('keydown', playSound);
});
