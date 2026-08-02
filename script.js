// --- 1. Hiệu ứng gõ chữ cho tiêu đề ---
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

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// --- 2. Xử lý API Phát nhạc nền YouTube ---
let player;
let isMusicPlaying = false;
const musicToggleBtn = document.getElementById('music-toggle');
const musicIcon = musicToggleBtn.querySelector('i');

// Hàm này được YouTube API tự động gọi khi API load xong
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '0', // Ẩn video đi
        width: '0',
        videoId: 'LZoIIqeQ3DQ', // ID của video nhạc bạn chọn
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'start': 4318, // Bắt đầu ở giây thứ 4318
            'loop': 1,
            'playlist': 'LZoIIqeQ3DQ', // Bắt buộc phải có để lặp lại
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    player.setVolume(30); // Đặt âm lượng 30% để nhẹ nhàng

    // Cố gắng kích hoạt nhạc ngay khi người dùng click lần đầu vào trang
    document.body.addEventListener('click', function firstPlay() {
        if (!isMusicPlaying && player && player.playVideo) {
            player.playVideo();
        }
        // Xóa sự kiện lắng nghe sau lần click đầu tiên
        document.body.removeEventListener('click', firstPlay);
    }, { once: true });
}

function onPlayerStateChange(event) {
    // Nếu trạng thái là đang phát (PLAYING = 1)
    if (event.data === YT.PlayerState.PLAYING) {
        isMusicPlaying = true;
        musicIcon.className = 'fa-solid fa-music'; // Đổi icon sang nốt nhạc
        musicToggleBtn.classList.add('playing');   // Thêm hiệu ứng nhịp đập
    }
}

// Xử lý sự kiện khi click trực tiếp vào nút nhạc
musicToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Ngăn sự kiện click của body
    
    if (isMusicPlaying) {
        player.pauseVideo();
        isMusicPlaying = false;
        musicIcon.className = 'fa-solid fa-volume-xmark';
        musicToggleBtn.classList.remove('playing');
    } else {
        player.playVideo();
        isMusicPlaying = true;
        musicIcon.className = 'fa-solid fa-music';
        musicToggleBtn.classList.add('playing');
    }
});
