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

// Khởi chạy khi DOM load xong
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
    
    // --- 2. Xử lý Logic Click Thành Tích (Accordion) ---
    const timelineItems = document.querySelectorAll('.timeline-content');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            // Kiểm tra xem mục đang click có đang mở không
            const isActive = item.classList.contains('active');
            
            // Đóng tất cả các mục khác lại
            timelineItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Nếu nó chưa mở thì bật lên (Nếu đang mở thì giữ nguyên trạng thái đóng do lệnh trên)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// --- 3. Xử lý API Phát nhạc nền YouTube ---
let player;
let isMusicPlaying = false;
const musicToggleBtn = document.getElementById('music-toggle');
const musicIcon = musicToggleBtn.querySelector('i');

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '0', 
        width: '0',
        videoId: 'LZoIIqeQ3DQ', 
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'start': 4318, 
            'loop': 1,
            'playlist': 'LZoIIqeQ3DQ', 
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    player.setVolume(30); 

    // Kích hoạt nhạc ngay khi người dùng click lần đầu vào trang
    document.body.addEventListener('click', function firstPlay() {
        if (!isMusicPlaying && player && player.playVideo) {
            player.playVideo();
        }
        document.body.removeEventListener('click', firstPlay);
    }, { once: true });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isMusicPlaying = true;
        musicIcon.className = 'fa-solid fa-music'; 
        musicToggleBtn.classList.add('playing');   
    }
}

musicToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    
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
