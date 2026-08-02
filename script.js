// Hiệu ứng gõ chữ cho tiêu đề
const texts = [
    "Competitive Programmer", 
    "AI & RPA Enthusiast", 
    "Tech Hardware Lover"
];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    
    if (isDeleting) {
        letter = currentText.slice(0, --index);
    } else {
        letter = currentText.slice(0, ++index);
    }
    
    document.querySelector('.typing-text').innerHTML = letter + '<span class="cursor">|</span>';
    
    let typeSpeed = 100;
    
    if (isDeleting) {
        typeSpeed /= 2;
    }
    
    if (!isDeleting && letter.length === currentText.length) {
        typeSpeed = 2000; // Dừng lại 2s khi gõ xong
        isDeleting = true;
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        typeSpeed = 500; // Dừng 0.5s trước khi gõ từ mới
    }
    
    setTimeout(type, typeSpeed);
}

// Khởi chạy khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});
