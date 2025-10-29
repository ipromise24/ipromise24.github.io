// sakura.js
class SakuraEffect {
    constructor() {
        this.sakuraCount = 60; // 适当减少数量，避免过于密集
        this.sakuras = [];
        this.initStyles();
        this.init();
    }

    // 初始化样式（优化樱花形状）
    initStyles() {
        if (!document.getElementById('sakura-style')) {
            const style = document.createElement('style');
            style.id = 'sakura-style';
            style.textContent = `
                .sakura {
                    position: absolute;
                    pointer-events: none;
                    background: radial-gradient(ellipse at center, 
                        rgba(255,220,230,0.9) 0%, 
                        rgba(255,180,200,0.7) 70%, 
                        rgba(255,160,180,0.4) 100%);
                    border-radius: 70% 30% 70% 30% / 60% 40% 60% 40%; /* 更自然的花瓣形状 */
                    box-shadow: 0 0 6px rgba(255,255,255,0.6); /* 增加光泽感 */
                }
                .sakura:before {
                    content: '';
                    position: absolute;
                    top: 15%;
                    left: 15%;
                    width: 70%;
                    height: 70%;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3); /* 花瓣上的高光 */
                }
            `;
            document.head.appendChild(style);
        }
    }

    // 初始化樱花
    init() {
        if (document.body) {
            this.createSakuras();
            this.animate();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                this.createSakuras();
                this.animate();
            });
        }
    }

    // 创建所有樱花
    createSakuras() {
        for (let i = 0; i < this.sakuraCount; i++) {
            this.createSakura();
        }
    }

    // 创建单个樱花（调整速度参数）
    createSakura() {
        const sakura = document.createElement('div');
        sakura.classList.add('sakura');
        
        // 随机大小（稍大一些，更明显）
        const size = Math.random() * 10 + 5;
        sakura.style.width = `${size}px`;
        sakura.style.height = `${size * 0.9}px`; // 高度略小于宽度，更像花瓣
        
        // 随机初始位置
        sakura.style.left = `${Math.random() * window.innerWidth}px`;
        sakura.style.top = `-${Math.random() * 80 + 20}px`;
        
        // 随机透明度
        sakura.style.opacity = Math.random() * 0.5 + 0.4;
        
        // 随机初始旋转角度
        const initialRotate = Math.random() * 360;
        sakura.style.transform = `rotate(${initialRotate}deg)`;
        
        // 存储樱花的运动参数（降低速度）
        const sakuraData = {
            element: sakura,
            x: parseFloat(sakura.style.left),
            y: -parseFloat(sakura.style.top),
            size: size,
            // 水平速度降低，左右飘动更柔和
            speedX: (Math.random() * 1.2 - 0.6) * (0.8 + size / 20),
            // 垂直速度降低，飘落更缓慢
            speedY: (Math.random() * 1.2 + 0.8) * (0.8 + size / 20),
            rotation: initialRotate,
            // 旋转速度降低
            rotationSpeed: (Math.random() * 1.2 - 0.6) * 0.5,
            // 增加左右摇摆的波浪效果
            swingAngle: Math.random() * Math.PI * 2,
            swingSpeed: Math.random() * 0.03 + 0.01
        };
        
        document.body.appendChild(sakura);
        this.sakuras.push(sakuraData);
    }

    // 更新樱花位置（增加波浪运动）
    update() {
        this.sakuras.forEach((sakura, index) => {
            // 增加波浪式左右运动，更自然
            sakura.swingAngle += sakura.swingSpeed;
            const swingOffset = Math.sin(sakura.swingAngle) * 0.8;
            
            // 更新位置（应用波浪偏移）
            sakura.x += sakura.speedX + swingOffset;
            sakura.y += sakura.speedY;
            
            // 更新旋转
            sakura.rotation += sakura.rotationSpeed;
            
            // 应用更新
            sakura.element.style.left = `${sakura.x}px`;
            sakura.element.style.top = `${sakura.y}px`;
            sakura.element.style.transform = `rotate(${sakura.rotation}deg)`;
            
            // 当樱花超出屏幕范围时重置
            if (sakura.y > window.innerHeight + sakura.size * 2 || 
                sakura.x < -sakura.size * 2 || 
                sakura.x > window.innerWidth + sakura.size * 2) {
                document.body.removeChild(sakura.element);
                this.sakuras.splice(index, 1);
                this.createSakura();
            }
        });
    }

    // 动画循环
    animate() {
        this.update();
        requestAnimationFrame(() => this.animate());
    }
}

// 自动初始化樱花特效
window.addEventListener('load', () => {
    new SakuraEffect();
});

// 窗口大小变化时重新调整
window.addEventListener('resize', () => {
    // 移除超出新窗口范围的樱花
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    
    this.sakuras.forEach((sakura, index) => {
        if (sakura.x < -sakura.size || 
            sakura.x > currentWidth + sakura.size ||
            sakura.y > currentHeight + sakura.size) {
            document.body.removeChild(sakura.element);
            this.sakuras.splice(index, 1);
            this.createSakura();
        }
    });
});