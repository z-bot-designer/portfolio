// ===== 数据存储 =====
const STORAGE_KEY = 'portfolio_works';

function getWorks() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveWorks(works) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
}

// 初始化示例数据
function initDemoData() {
    const works = getWorks();
    if (works.length === 0) {
        const demoWorks = [
            {
                id: 'demo-1',
                title: '山间晨曦',
                description: '清晨的山谷被薄雾笼罩，阳光穿透云层洒在连绵的山峦上，金色的光芒与青黛色的山体形成绝美的对比。这是我在海拔2800米处守候三天拍摄的珍贵瞬间。',
                category: '摄影',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
                date: '2024-11-15',
                isExternal: true
            },
            {
                id: 'demo-2',
                title: '城市夜景',
                description: '繁华都市的霓虹夜景，车水马龙的光轨交织成一幅流动的画卷。长时间曝光捕捉城市脉动，展现现代都市的活力与魅力。',
                category: '摄影',
                image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
                date: '2024-10-22',
                isExternal: true
            },
            {
                id: 'demo-3',
                title: '极简品牌设计',
                description: '为一家新兴咖啡品牌打造的视觉识别系统，从Logo到包装的整体设计，以简约的几何图形和暖色调传达温馨与品质。',
                category: '设计',
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
                date: '2024-09-08',
                isExternal: true
            },
            {
                id: 'demo-4',
                title: '手绘插画集',
                description: '《四季》系列水彩插画，以细腻的笔触描绘春夏秋冬的更迭，每幅作品耗时约40小时，展现自然之美与时间的流转。',
                category: '插画',
                image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
                date: '2024-08-30',
                isExternal: true
            },
            {
                id: 'demo-5',
                title: '个人网站设计',
                description: '为自由摄影师打造的个人作品展示网站，采用极简风格与大量留白，让作品本身成为视觉焦点。响应式设计适配各种设备。',
                category: '设计',
                image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
                date: '2024-07-12',
                isExternal: true
            },
            {
                id: 'demo-6',
                title: '海边日落',
                description: '太平洋海岸的壮丽日落，金色的夕阳将海面染成一片橙红，浪花拍打着礁石，海鸥在余晖中翱翔。',
                category: '摄影',
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
                date: '2024-06-20',
                isExternal: true
            }
        ];
        saveWorks(demoWorks);
    }
}

// ===== 工具函数 =====
function generateId() {
    return 'work-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    setTimeout(() => toast.classList.add('active'), 10);
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ===== 页面渲染 =====
const app = document.getElementById('app');
let currentPage = 'home';
let currentFilter = '全部';

function renderPage(page) {
    currentPage = page;
    app.innerHTML = '';
    
    switch (page) {
        case 'home':
            renderHome();
            break;
        case 'portfolio':
            renderPortfolio();
            break;
        case 'upload':
            renderUpload();
            break;
    }
    
    // 更新导航状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
}

// 首页
function renderHome() {
    const works = getWorks();
    const categories = [...new Set(works.map(w => w.category))];
    
    app.innerHTML = `
        <section class="hero">
            <div class="hero-content">
                <div class="hero-avatar">我</div>
                <h1 class="hero-title">创作者作品集</h1>
                <p class="hero-subtitle">
                    这里记录着我的创作历程与灵感瞬间。<br>
                    摄影、设计、插画 — 用作品讲述故事。
                </p>
                <div class="hero-stats">
                    <div class="stat-item">
                        <div class="stat-number">${works.length}</div>
                        <div class="stat-label">作品数量</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${categories.length}</div>
                        <div class="stat-label">创作类别</div>
                    </div>
                </div>
                <div class="hero-buttons">
                    <button class="btn btn-primary" onclick="renderPage('portfolio')">
                        浏览作品 →
                    </button>
                    <button class="btn btn-secondary" onclick="renderPage('upload')">
                        上传作品
                    </button>
                </div>
            </div>
        </section>
    `;
}

// 作品展示页
function renderPortfolio() {
    const works = getWorks();
    const categories = ['全部', ...new Set(works.map(w => w.category))];
    
    const filteredWorks = currentFilter === '全部' 
        ? works 
        : works.filter(w => w.category === currentFilter);
    
    let worksHtml = '';
    if (filteredWorks.length === 0) {
        worksHtml = `
            <div class="empty-state">
                <div class="empty-state-icon">🎨</div>
                <div class="empty-state-title">暂无作品</div>
                <p>该分类下还没有作品，快去上传你的第一件作品吧！</p>
                <br>
                <button class="btn btn-primary" onclick="renderPage('upload')">上传作品</button>
            </div>
        `;
    } else {
        worksHtml = `
            <div class="works-grid">
                ${filteredWorks.map(work => `
                    <div class="work-card" onclick="openModal('${work.id}')">
                        <div style="overflow: hidden; position: relative;">
                            <img class="work-card-image" src="${work.image}" alt="${work.title}" loading="lazy">
                            <div class="work-card-actions" onclick="event.stopPropagation()">
                                <button class="action-btn" onclick="deleteWork('${work.id}')" title="删除">🗑</button>
                            </div>
                        </div>
                        <div class="work-card-body">
                            <h3 class="work-card-title">${work.title}</h3>
                            <p class="work-card-desc">${work.description}</p>
                            <div class="work-card-meta">
                                <span class="work-card-tag">${work.category}</span>
                                <span>${formatDate(work.date)}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    app.innerHTML = `
        <section class="page-section">
            <div class="page-header">
                <h2 class="page-title">作品展示</h2>
                <div class="filter-bar">
                    ${categories.map(cat => `
                        <button class="filter-btn ${cat === currentFilter ? 'active' : ''}" onclick="setFilter('${cat}')">
                            ${cat}
                        </button>
                    `).join('')}
                </div>
            </div>
            ${worksHtml}
        </section>
        <footer class="footer">
            <p>共 ${filteredWorks.length} 件作品 · ${works.length} 件总作品</p>
        </footer>
    `;
}

function setFilter(category) {
    currentFilter = category;
    renderPortfolio();
}

// 上传页
function renderUpload() {
    app.innerHTML = `
        <section class="page-section upload-container">
            <div class="page-header">
                <h2 class="page-title">上传作品</h2>
            </div>
            <form class="upload-form" id="uploadForm" onsubmit="handleUpload(event)">
                <div class="form-group">
                    <label class="form-label">作品图片 <span>*</span></label>
                    <div class="upload-dropzone" id="dropzone">
                        <div class="upload-dropzone-icon">📷</div>
                        <p class="upload-dropzone-text">拖拽图片到此处，或 <span>点击选择</span></p>
                        <p class="upload-dropzone-text" style="font-size: 0.8rem; margin-top: 8px;">支持 JPG、PNG、GIF、WebP 格式</p>
                        <input type="file" id="fileInput" accept="image/*" style="display: none;">
                    </div>
                    <div class="upload-preview" id="preview">
                        <img id="previewImg" src="" alt="预览">
                        <button type="button" class="upload-preview-remove" onclick="clearImage()">&times;</button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="title">作品标题 <span>*</span></label>
                    <input type="text" class="form-input" id="title" placeholder="给你的作品起个名字" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="category">分类 <span>*</span></label>
                    <select class="form-select" id="category" required>
                        <option value="">选择分类</option>
                        <option value="摄影">摄影</option>
                        <option value="设计">设计</option>
                        <option value="插画">插画</option>
                        <option value="绘画">绘画</option>
                        <option value="视频">视频</option>
                        <option value="音乐">音乐</option>
                        <option value="写作">写作</option>
                        <option value="其他">其他</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="description">作品描述</label>
                    <textarea class="form-textarea" id="description" placeholder="介绍一下你的作品创作背景、灵感来源或技术细节..."></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="date">创作日期</label>
                    <input type="date" class="form-input" id="date" value="${new Date().toISOString().split('T')[0]}">
                </div>
                
                <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">
                    发布作品
                </button>
            </form>
        </section>
    `;
    
    setupUploadEvents();
}

// 上传事件绑定
let uploadedImage = null;

function setupUploadEvents() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const previewImg = document.getElementById('previewImg');
    
    dropzone.addEventListener('click', () => fileInput.click());
    
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });
    
    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });
    
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length) handleFile(files[0]);
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) handleFile(e.target.files[0]);
    });
    
    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            showToast('请选择图片文件', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage = e.target.result;
            previewImg.src = uploadedImage;
            preview.classList.add('active');
        };
        reader.readAsDataURL(file);
    }
}

function clearImage() {
    uploadedImage = null;
    document.getElementById('preview').classList.remove('active');
    document.getElementById('fileInput').value = '';
}

function handleUpload(e) {
    e.preventDefault();
    
    if (!uploadedImage) {
        showToast('请上传作品图片', 'error');
        return;
    }
    
    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value.trim();
    const date = document.getElementById('date').value;
    
    if (!title || !category) {
        showToast('请填写必填项', 'error');
        return;
    }
    
    const works = getWorks();
    works.unshift({
        id: generateId(),
        title,
        description: description || '暂无描述',
        category,
        image: uploadedImage,
        date: date || new Date().toISOString().split('T')[0],
        isExternal: false
    });
    
    saveWorks(works);
    showToast('作品上传成功！');
    
    // 清空表单
    document.getElementById('uploadForm').reset();
    clearImage();
    
    // 2秒后跳转到作品展示页
    setTimeout(() => renderPage('portfolio'), 1200);
}

// 删除作品
function deleteWork(id) {
    if (!confirm('确定要删除这件作品吗？此操作不可撤销。')) return;
    
    const works = getWorks().filter(w => w.id !== id);
    saveWorks(works);
    showToast('作品已删除');
    renderPortfolio();
}

// 弹窗详情
function openModal(id) {
    const work = getWorks().find(w => w.id === id);
    if (!work) return;
    
    const modal = document.getElementById('modal');
    const modalBody = document.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <img class="modal-image" src="${work.image}" alt="${work.title}">
        <div class="modal-info">
            <h2 class="modal-title">${work.title}</h2>
            <div class="modal-meta">
                <span class="work-card-tag">${work.category}</span>
                <span>📅 ${formatDate(work.date)}</span>
            </div>
            <p class="modal-desc">${work.description}</p>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== 导航与事件 =====
document.addEventListener('DOMContentLoaded', () => {
    initDemoData();
    renderPage('home');
    
    // 导航点击
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            renderPage(page);
            
            // 移动端关闭菜单
            document.querySelector('.nav-menu').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        });
    });
    
    // Logo 点击
    document.querySelector('.nav-logo').addEventListener('click', (e) => {
        e.preventDefault();
        renderPage('home');
    });
    
    // 汉堡菜单
    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.toggle('active');
        document.querySelector('.hamburger').classList.toggle('active');
    });
    
    // 弹窗关闭
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') closeModal();
    });
    
    // ESC 关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
