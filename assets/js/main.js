(() => {
    "use strict";

    const background = document.getElementById("background");
    const yearElement = document.getElementById("current-year");
    const greetingElement = document.getElementById("greeting-text");
    const clockElement = document.getElementById("clock-text");
    const socialLinks = document.querySelectorAll(".social-link");

    const mobileDevicePattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    function getBingWallpaperUrl() {
        return mobileDevicePattern.test(navigator.userAgent)
            ? "https://bing.img.run/m.php"
            : "https://bing.img.run/1920x1080.php";
    }

    function applyFallbackBackground() {
        if (!background) {
            return;
        }

        background.style.backgroundImage =
            "linear-gradient(140deg, #0a182d 0%, #122646 46%, #203d5e 100%)";
    }

    function setBackgroundImage() {
        if (!background) {
            return;
        }

        const wallpaperUrl = getBingWallpaperUrl();
        const preloadImage = new Image();

        preloadImage.onload = () => {
            background.style.backgroundImage = `url(${wallpaperUrl})`;
        };

        preloadImage.onerror = () => {
            applyFallbackBackground();
        };

        preloadImage.src = wallpaperUrl;
    }

    function updateYear() {
        if (yearElement) {
            yearElement.textContent = String(new Date().getFullYear());
        }
    }

    function updateGreeting() {
        if (!greetingElement) {
            return;
        }

        const hour = new Date().getHours();
        let greeting = "你好呀，欢迎来玩 👋";

        if (hour >= 5 && hour < 11) {
            greeting = "早上好呀，今天也要开心哦 ☀️";
        } else if (hour >= 11 && hour < 14) {
            greeting = "中午好，别忘了好好吃饭 🍚";
        } else if (hour >= 14 && hour < 18) {
            greeting = "下午好，摸摸鱼休息一下 ☕";
        } else if (hour >= 18 && hour < 23) {
            greeting = "晚上好，又是美好的一天 🌙";
        } else {
            greeting = "夜深了，早点休息别熬夜 💤";
        }

        greetingElement.textContent = greeting;
    }

    function updateClock() {
        if (!clockElement) {
            return;
        }

        const now = new Date();
        const dateText = now.toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
        });
        const timeText = now.toLocaleTimeString("zh-CN", {
            hour12: false
        });

        clockElement.textContent = `${dateText} ${timeText}`;
    }

    function animateSocialLinks() {
        socialLinks.forEach((link, index) => {
            link.style.setProperty("--item-delay", `${index * 90}ms`);
        });
    }

    function init() {
        setBackgroundImage();
        updateYear();
        updateGreeting();
        updateClock();
        animateSocialLinks();

        window.setInterval(updateClock, 1000);

        requestAnimationFrame(() => {
            document.body.classList.add("is-ready");
        });
    }

    init();
})();
