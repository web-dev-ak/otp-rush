const otpTextField = document.getElementById('otp-field');
const otpDiv = document.getElementById('otp-box');
const submitBtn = document.getElementById('submit-btn');
const genNewOtpBtn = document.getElementById('genrate-otp-btn');

// RANDOM OTP GENERATOR
function sixDigitOtpGenerator() {
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}

// GENERATING RANDOM COORDINATES
function getRandomOtpCoOrdinates() {
    const otpBoxWidth = otpDiv.offsetWidth;
    const otpBoxHeight = otpDiv.offsetHeight;
    const deviceWidth = window.innerWidth;
    const deviceHeight = window.innerHeight;

    const x = Math.floor(Math.random() * (deviceWidth - otpBoxWidth));
    const y = Math.floor(Math.random() * (deviceHeight - otpBoxHeight));

    return [x, y];
}

// RANDOMLY PLACING THE OTP BOX IN VIEWPORT
genNewOtpBtn.addEventListener('click', generateAndPlaceOtp);

// FUNCTION TO GENERATE AND PLACE OTP
function generateAndPlaceOtp() {
    let [x, y] = getRandomOtpCoOrdinates();
    let OTP = sixDigitOtpGenerator();

    otpTextField.textContent = OTP; // Display the generated OTP

    otpDiv.style.top = `${y}px`;
    otpDiv.style.left = `${x}px`;
    otpDiv.style.display = 'block';

    inputBoxes[0].focus();
}

// CHECKING IF USER ENTERED THE CORRECT OTP
let score = 0;
const scoreText = document.getElementById('score');

submitBtn.addEventListener('click', () => {
    let enteredOTP = [...document.querySelectorAll('#input-boxes-box input')].map(el => el.value).join('');
    let OTP = otpTextField.textContent; // Use the displayed OTP

    if (enteredOTP === OTP) {
        scoreText.textContent = score += 1;
        customAlert(`OTP Matched, Login Successful Score : ${score}`);
    } 
    
    else {
        customAlert('OTP not Matched, Login Failed');
    }
});

// INPUT BOX TYPE FOCUS
const inputBoxes = document.querySelectorAll('.input-boxes');

inputBoxes.forEach((inputBox, index) => {
    inputBox.addEventListener('input', () => {
        if (inputBox.value.length === 1 && index < inputBoxes.length - 1) {
            inputBoxes[index + 1].focus();
        }
    });

    inputBox.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && inputBox.value.length === 0 && index > 0) {
            inputBoxes[index - 1].focus();
        }
    });
});

// THEME SWITCH
let themeSwitchBtn = document.getElementById('theme-switch-btn');
let lightModeIcon = document.getElementById('light-mode-icon');
let darkModeIcon = document.getElementById('dark-mode-icon');

themeSwitchBtn.addEventListener('click', () => {
    const htmlTag = document.querySelector("html");
    const currentTheme = htmlTag.getAttribute("data-theme");

    if (currentTheme === "light") {
        darkModeIcon.style.display = 'block';
        lightModeIcon.style.display = 'none';
        htmlTag.setAttribute("data-theme", "dark");
        localStorage.setItem('data-theme', 'dark');
    } else {
        darkModeIcon.style.display = 'none';
        lightModeIcon.style.display = 'block';
        htmlTag.setAttribute("data-theme", "light");
        localStorage.setItem('data-theme', 'light');
    }
});

window.onload = function() {
    const savedTheme = localStorage.getItem('data-theme');

    if (savedTheme) {
        document.querySelector("html").setAttribute("data-theme", savedTheme);
        if (savedTheme === "dark") {
            darkModeIcon.style.display = 'block';
            lightModeIcon.style.display = 'none';
        } else {
            darkModeIcon.style.display = 'none';
            lightModeIcon.style.display = 'block';
        }
    }
};

// CUSTOM ALERT BOX
function customAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    const alertOkBtn = document.getElementById('alert-ok-btn');

    alertMessage.textContent = message;
    alertBox.style.display = 'flex';

    alertOkBtn.addEventListener('click', () => {
        alertBox.style.display = 'none';

        // Clear input boxes
        inputBoxes.forEach((inputBox) => {
            inputBox.value = '';
        });

        // Generate new OTP and place it randomly
        generateAndPlaceOtp();
    });
}

// KEYDOWNS OR SHORTCUTS -> ENTER TO SUBMIT
document.addEventListener('keydown', function (e) {
    const alertBox = document.getElementById('custom-alert');
    const alertOkBtn = document.getElementById('alert-ok-btn');

    if (e.key === 'Enter') {
        if (alertBox.style.display === 'none' || alertBox.style.display === ''){
            submitBtn.click();
        } else if (alertBox.style.display == 'flex') {
            alertOkBtn.click();
        }
    }
});

// KEYDOWNS OR SHORTCUTS -> SPACE TO GENERATE A NEW OTP
document.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Spacebar') {
        genNewOtpBtn.click();
        e.preventDefault(); 
    }
});