const app = {
    state: {
        currentView: 'home',
        filters: [],
        selectedProject: null
    },

    init() {
        window.addEventListener('hashchange', () => this.handleRouting());
        this.handleRouting();
    },

    handleRouting() {
        const hash = window.location.hash;
        if (hash.startsWith('#project/')) {
            const id = hash.replace('#project/', '');
            this.showProject(id);
        } else {
            this.showHome();
        }
    },


    showHome() {
        if (window.location.hash && !window.location.hash.startsWith('#home')) {
            window.history.replaceState(null, null, window.location.pathname + window.location.search);
        }
        this.state.currentView = 'home';
        this.state.selectedProject = null;
        window.scrollTo(0, 0);

        const main = document.getElementById('app');
        if (!main) return;

        main.innerHTML = `
            <section class="hero">
                <div class="hero-logo"></div>
                <h1>${bio.title}</h1>
                </br>
                ${bio.paragraphs.map(p => `<p>${this.linkify(p)}</p>  </br>`).join('')}
                  <p style="font-weight: 500;">Social networks : </p>
                <div class="hero-socials">
                    ${bio.socials.map(s => `
                        <a href="${s.url}" target="_blank" title="${s.name}">
                            ${s.icon.trim().startsWith('<svg')
                ? s.icon
                : s.icon.includes('/')
                    ? `<img src="${s.icon}" alt="${s.name}" class="social-icon">`
                    : s.name}
                        </a>
                    `).join('')}
                </div>
                  </br>
                <div style="margin-top: 32px;">
                    <p style="font-weight: 500;">Programmatic generative art :</p>
                    <div class="hero-socials" style="margin-top: 16px;">
                        ${bio.art_links.map(s => `
                            <a href="${s.url}" target="_blank" title="${s.name}">
                                ${s.icon.trim().startsWith('<svg')
                            ? s.icon
                            : s.icon.includes('/')
                                ? `<img src="${s.icon}" alt="${s.name}" class="social-icon">`
                                : s.name}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </section>

            <div class="filter-bar">
                ${['All', 'Creative Coding', 'Audio Tools', 'Audio Toys', 'Teaching', 'Experiments', 'Games', 'IA'].map(cat => {
                                    const isActive = cat === 'All'
                                        ? this.state.filters.length === 0
                                        : this.state.filters.includes(cat);

                                    return `
                    <button class="filter-btn ${isActive ? 'active' : ''}" 
                            onclick="app.setFilter('${cat}')">
                        ${cat}
                    </button>
                    `;
                                }).join('')}
            </div>

            <div class="container">
                <div class="project-grid" id="project-grid">
                    <!-- Projects injected here -->
                </div>
            </div>
        `;

        this.renderProjects();
    },

    setFilter(category) {
        if (category === 'All') {
            this.state.filters = [];
        } else {
            const index = this.state.filters.indexOf(category);
            if (index > -1) {
                this.state.filters.splice(index, 1);
            } else {
                this.state.filters.push(category);
            }
        }

        this.renderProjects();

        // Update buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const btnCat = btn.textContent.trim();
            if (btnCat === 'All') {
                if (this.state.filters.length === 0) btn.classList.add('active');
                else btn.classList.remove('active');
            } else {
                if (this.state.filters.includes(btnCat)) btn.classList.add('active');
                else btn.classList.remove('active');
            }
        });
    },

    renderProjects() {
        const grid = document.getElementById('project-grid');
        if (!grid) return;

        let filtered = this.state.filters.length === 0
            ? [...projects]
            : projects.filter(p => {
                const projectCategories = (p.category || "").split(',').map(c => c.trim());
                return this.state.filters.every(f => projectCategories.includes(f));
            });

        // Sort by year descending
        filtered.sort((a, b) => parseInt(b.year || 0) - parseInt(a.year || 0));

        grid.innerHTML = filtered.map(project => {
            const tags = project.tags || [];

            return `
            <div class="project-card" onclick="window.location.hash = '#project/${project.id}'">
                <div class="card-image">
                    <img src="${project.thumbnail}" alt="${project.title}" loading="lazy" referrerPolicy="no-referrer">
                    <span class="card-category">${project.category}</span>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${project.title} <span style="font-size:0.8em; color:var(--color-text-secondary);">(${project.year})</span></h3>
                    <p class="card-description">${project.description}</p>
                    <div class="card-tags">
                        ${tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
            `;
        }).join('');
    },

    showProject(id) {
        if (window.location.hash !== '#project/' + id) {
            window.location.hash = '#project/' + id;
            return; // The hashchange event will trigger handleRouting and call showProject again
        }

        const project = projects.find(p => p.id === id);
        if (!project) {
            this.showHome(); // Fallback if invalid ID
            return;
        }

        this.state.currentView = 'project';
        this.state.selectedProject = project;
        window.scrollTo(0, 0);

        const main = document.getElementById('app');
        if (!main) return;

        const tags = project.tags || [];

        // Parse markdown content
        const contentHtml = marked.parse(project.content || "");

        main.innerHTML = `
            <div class="container project-detail">
                <div class="back-btn" onclick="window.location.hash = ''">
                    ← Back to Portfolio
                </div>

                <div class="detail-header">
                    <div class="detail-meta">
                        <span class="detail-category">${project.category}</span>
                        <span class="detail-category" style="color:var(--color-text-secondary);">${project.year}</span>
                        ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>

                <div class="detail-content">
                    ${contentHtml}
                </div>
            </div>
        `;
    },
    linkify(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        // Handle markdown links [text](url)
        let processed = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        // Handle raw URLs if not already linked (simple check)
        if (!processed.includes('<a href')) {
            processed = processed.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);
        }
        return processed;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        // Initialization check
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('moon-icon').style.display = 'none';
            document.getElementById('sun-icon').style.display = 'block';
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            if (newTheme === 'dark') {
                document.getElementById('moon-icon').style.display = 'none';
                document.getElementById('sun-icon').style.display = 'block';
            } else {
                document.getElementById('moon-icon').style.display = 'block';
                document.getElementById('sun-icon').style.display = 'none';
            }
        });
    }
});
