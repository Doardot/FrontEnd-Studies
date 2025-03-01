const drumButtons = document.querySelectorAll(".drum");

drumButtons.forEach(button => {
    button.addEventListener("click", function() {
        const btnInnerHTML = this.innerHTML;
        makeSound(btnInnerHTML);
        btnAnimation(btnInnerHTML);
    });
});

document.addEventListener("keydown", function(e) {
    makeSound(e.key);
    btnAnimation(e.key);
});

function makeSound(key) {
    const sounds = {
        "w": 'sounds/tom-1.mp3',
        "a": 'sounds/tom-2.mp3',
        "s": 'sounds/tom-3.mp3',
        "d": 'sounds/tom-4.mp3',
        "j": 'sounds/snare.mp3',
        "k": 'sounds/kick-bass.mp3',
        "l": 'sounds/crash.mp3'
    };

    const soundFile = sounds[key];
    if (soundFile) {
        const audio = new Audio(soundFile);
        audio.play();
    }
}

function btnAnimation(currentKey) {
    let activeBtn = document.querySelector("." + currentKey);

    if (activeBtn) {
        activeBtn.classList.add("pressed");
        setTimeout(function() {
            activeBtn.classList.remove("pressed");
        }, 100);
    }
}