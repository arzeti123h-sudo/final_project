// =========================
// GLOBAL VARIABLES
// =========================
let currentSlide = 0;
let swiperAbout;

// =========================
// HERO SLIDER
// =========================
  function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    // Suara transisi setiap ganti slide
    const transSound = document.getElementById('transitionSound');
    if (transSound) {
        transSound.currentTime = 0;
        transSound.play();
    }

    currentSlide = (n + slides.length) % slides.length;

    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slides[currentSlide].classList.add('active');
}
// 1. Memperlambat durasi Auto-Swipe agar pengunjung sempat membaca
// Ganti bagian setInterval yang ada di script.js kamu:
// 1. Inisialisasi Interval (12 detik agar santai)
let autoSlideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 12000); 

// 2. Fungsi Reset (Supaya durasi dihitung ulang dari nol saat di-klik)
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 12000);
}

// 3. Navigasi Manual (Prev/Next)
const nextBtn = document.querySelector('.next-slide');
const prevBtn = document.querySelector('.prev-slide');

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        resetAutoSlide(); // Panggil reset di sini
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        resetAutoSlide(); // Panggil reset di sini
    });
}

// 4. Smooth Scroll untuk tombol EXPLORE
// Ganti bagian Smooth Scroll dengan ini agar tidak bentrok dengan tombol game
document.querySelectorAll('a.btn-main').forEach(button => {
    button.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// =========================
// ABOUT SECTION
// =========================
function toggleAbout(id) {
    const detail = document.getElementById(`detail-${id}`);
    const button = document.querySelector(
        `button[onclick="toggleAbout('${id}')"]`
    );

    if (!detail || !button) return;

    const isOpen = detail.style.display === 'block';

    // Tutup semua profile dulu
    document.querySelectorAll('.profile-detail').forEach(el => {
        el.style.display = 'none';
    });

    document.querySelectorAll('.info-toggle').forEach(btn => {
        btn.innerText = 'LIHAT PROFIL';
    });

    // Kalau sebelumnya belum buka → buka
    if (!isOpen) {
        detail.style.display = 'block';
        button.innerText = 'TUTUP PROFIL';
    }

    // Update swiper
    if (swiperAbout) {
        swiperAbout.update();
    }
}

// =========================
// MODAL TUTORIAL
// =========================
function openTutorial(id) {
    const modal = document.getElementById(
        'modal' + id.charAt(0).toUpperCase() + id.slice(1)
    );

    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeTutorial(id) {
    const modal = document.getElementById(
        'modal' + id.charAt(0).toUpperCase() + id.slice(1)
    );

    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// =========================
// MAIN
// =========================
document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // WELCOME SCREEN
    // =========================
    const startBtn = document.getElementById("startBtn");
    const welcome = document.getElementById("welcome");
    const mainPage = document.getElementById("mainPage");
    const countdown = document.getElementById("countdown");

    if (startBtn) {
        startBtn.addEventListener('click', () => {

            startBtn.style.display = "none";
            countdown.classList.remove('hidden');

            let count = 3;
            countdown.innerText = count;

            const timer = setInterval(() => {

                count--;

                if (count > 0) {
                    countdown.innerText = count;
                } else {

                    clearInterval(timer);

                    welcome.style.opacity = "0";

                    setTimeout(() => {

                        welcome.style.display = "none";
                        mainPage.style.display = "block";

                        showSlide(0);

                    }, 800);
                }

            }, 1000);
        });
    }

    // =========================
    // SWIPER ABOUT
    // =========================
    swiperAbout = new Swiper(".aboutSwiper", {
    effect: "coverflow", // Efek 3D yang lebih modern
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    });

    // =========================
    //  NAVIGATION
    // =========================
    const nextBtn = document.querySelector('.next-slide');
    const prevBtn = document.querySelector('.prev-slide');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }

    // Auto slide
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // =========================
    // SMOOTH SCROLL
    // =========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute('href')
            );

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }

        });

    });

});

// =========================
// FORM ASPIRASI
// =========================
const aspirasiForm = document.getElementById('aspirasiForm');

if (aspirasiForm) {
    aspirasiForm.addEventListener('submit', function(e) {
        // 1. Mencegah refresh halaman (ini solusinya!)
        e.preventDefault(); 
        
        // 2. Ambil data (opsional, untuk diproses nanti)
        const nama = document.getElementById('userName').value;
        const pesan = document.getElementById('userMessage').value;

        // 3. Efek visual tombol saat dikirim
        const submitBtn = this.querySelector('button');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = "SENDING...";
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;

        // Simulasi pengiriman (delay 1.5 detik)
        setTimeout(() => {
            // Mainkan suara klik/berhasil jika ada
            const clickSound = document.getElementById('clickSound');
            if (clickSound) clickSound.play();

            // Ubah tampilan tombol jadi sukses
            submitBtn.innerText = "MESSAGE SENT! ✓";
            submitBtn.style.background = "#00ff88"; // Warna hijau neon
            submitBtn.style.boxShadow = "0 0 20px #00ff88";
            
            // Reset form setelah 2 detik
            setTimeout(() => {
                aspirasiForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.style.background = ""; // Balik ke warna awal
                submitBtn.style.boxShadow = "";
                submitBtn.style.opacity = "1";
                submitBtn.disabled = false;
            }, 2000);
            
            alert(`Terima kasih ${nama}, aspirasi kamu sudah kami terima!`);
        }, 1500);
    });
}

// =========================
// FUNGSI PLAY GAME
// =========================
function openGame(url) {
    const gameModal = document.getElementById('gameModal');
    const gameFrame = document.getElementById('gameFrame');

    if (gameModal && gameFrame) {
        gameFrame.src = url;
        gameModal.style.display = 'flex'; // Gunakan flex agar ke tengah
        document.body.style.overflow = 'hidden';
    }
}

function closeGame() {
    const gameModal = document.getElementById('gameModal');
    const gameFrame = document.getElementById('gameFrame');

    if (gameModal && gameFrame) {
        gameModal.style.display = 'none';
        gameFrame.src = ''; // Matikan suara game saat ditutup
        document.body.style.overflow = 'auto';
    }
}
// Menangani penutupan modal saat user mengklik area di luar konten modal
window.addEventListener('click', function(event) {
    // Penanganan untuk Modal Game Utama
    const gameModal = document.getElementById('gameModal');
    if (event.target === gameModal) {
        closeGame();
    }

    // Penanganan untuk Semua Modal Tutorial (Maze & Focus)
    const tutorialModals = document.querySelectorAll('.tutorial-modal');
    tutorialModals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Mengaktifkan kembali scroll halaman
        }
    });
});