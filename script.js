const FILTERS = ['All', 'Creative Coding', 'Audio', 'Data Art', 'Experiments', 'Games', 'Graphics', 'IA', 'Installations', 'Teaching'];
const SITE_TITLE = 'b2renger | Creative Coding Portfolio';

const app = {
    state: {
        currentView: 'home',
        filters: [],
        selectedProject: null,
        homeScroll: 0
    },

    init() {
        window.addEventListener('hashchange', () => this.handleRouting());
        this.handleRouting();
    },

    handleRouting() {
        const hash = window.location.hash;
        if (hash.startsWith('#project/')) {
            const id = decodeURIComponent(hash.replace('#project/', ''));
            this.showProject(id);
        } else {
            this.showHome();
        }
    },

    // Projects sorted newest first (stable sort keeps authoring order within a year)
    sortedProjects() {
        return [...projects].sort((a, b) => parseInt(b.year || 0) - parseInt(a.year || 0));
    },

    categoriesOf(project) {
        return (project.category || '').split(',').map(c => c.trim()).filter(Boolean);
    },

    renderLinks(links) {
        return links.map(s => `
            <li>
                <a href="${s.url}" target="_blank" rel="noopener" title="${s.name}" aria-label="${s.name}">
                    ${s.icon.trim().startsWith('<svg')
                ? s.icon
                : s.icon.includes('/')
                    ? `<img src="${s.icon}" alt="" class="social-icon">`
                    : s.name}
                </a>
            </li>`).join('');
    },

    showHome() {
        if (window.location.hash && !window.location.hash.startsWith('#home')) {
            window.history.replaceState(null, null, window.location.pathname + window.location.search);
        }
        this.state.currentView = 'home';
        this.state.selectedProject = null;
        document.title = SITE_TITLE;

        const main = document.getElementById('app');
        if (!main) return;

        main.innerHTML = `
            <header class="hero">
                <div class="hero-logo" role="img" aria-label="Noisy Works, a generative drawing made with Processing"></div>
                <h1>${bio.title}</h1>
                ${bio.paragraphs.map(p => `<p>${this.linkify(p)}</p>`).join('')}
                <h2 class="hero-label">Social networks</h2>
                <ul class="hero-socials">${this.renderLinks(bio.socials)}</ul>
                <h2 class="hero-label">Programmatic generative art</h2>
                <ul class="hero-socials">${this.renderLinks(bio.art_links)}</ul>
            </header>

            <section class="container" aria-labelledby="projects-heading">
                <h2 id="projects-heading" class="visually-hidden">Projects</h2>
                <div class="filter-bar" role="group" aria-label="Filter projects by category">
                    ${FILTERS.map(cat => `
                    <button type="button" class="filter-btn" data-category="${cat}" aria-pressed="false">${cat}</button>`).join('')}
                </div>
                <p class="project-count" id="project-count" aria-live="polite"></p>
                <ul class="project-grid" id="project-grid"></ul>
            </section>
        `;

        main.querySelector('.filter-bar').addEventListener('click', e => {
            const btn = e.target.closest('.filter-btn');
            if (btn) this.setFilter(btn.dataset.category);
        });

        this.renderProjects();
        this.updateFilterButtons();
        window.scrollTo(0, this.state.homeScroll || 0);
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
        this.updateFilterButtons();
    },

    updateFilterButtons() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const cat = btn.dataset.category;
            const isActive = cat === 'All'
                ? this.state.filters.length === 0
                : this.state.filters.includes(cat);
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
    },

    renderProjects() {
        const grid = document.getElementById('project-grid');
        if (!grid) return;

        const filtered = this.sortedProjects().filter(p => {
            const projectCategories = this.categoriesOf(p);
            return this.state.filters.every(f => projectCategories.includes(f));
        });

        const count = document.getElementById('project-count');
        if (count) {
            count.textContent = filtered.length
                ? `${filtered.length} project${filtered.length > 1 ? 's' : ''}`
                : 'No project matches all the selected categories.';
        }

        grid.innerHTML = filtered.map(project => {
            const tags = project.tags || [];

            return `
            <li>
                <a class="project-card" href="#project/${project.id}">
                    <div class="card-image">
                        <img src="${project.thumbnail}" alt="" loading="lazy" referrerpolicy="no-referrer">
                        <span class="card-category">${this.categoriesOf(project).join(' · ')}</span>
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${project.title.trim()} <span class="card-year">(${project.year})</span></h3>
                        <p class="card-description">${project.description}</p>
                        <ul class="card-tags">
                            ${tags.slice(0, 3).map(tag => `<li class="tag">${tag}</li>`).join('')}
                        </ul>
                    </div>
                </a>
            </li>
            `;
        }).join('');
    },

    // Turns the parsed markdown into the article body; returns the title found in it
    prepareContent(fragment, fallbackTitle) {
        let title = fallbackTitle;
        const first = fragment.firstElementChild;
        if (first && first.tagName === 'H1') {
            title = first.innerHTML.trim();
            first.remove();
        }

        // The page has a single h1: demote the remaining ones
        fragment.querySelectorAll('h1').forEach(h => {
            const h2 = document.createElement('h2');
            h2.innerHTML = h.innerHTML;
            h.replaceWith(h2);
        });

        fragment.querySelectorAll('p').forEach(p => {
            // Several images in one paragraph become a gallery
            if (p.querySelectorAll('img').length > 1 && !p.textContent.trim()) {
                p.classList.add('gallery');
            }
            // A paragraph made only of links ("Live demo", "Code"...) becomes a row of buttons
            const links = p.querySelectorAll('a');
            if (links.length && !p.querySelector('img, iframe, video, audio')) {
                let rest = p.textContent;
                links.forEach(a => { rest = rest.replace(a.textContent, ''); });
                if (/^[\s,.:;|·&\-–—]*(?:(?:and|et|or)[\s,.:;|·&\-–—]*)*$/i.test(rest)) {
                    p.classList.add('link-row');
                }
            }
        });

        fragment.querySelectorAll('a[href^="http"]').forEach(a => {
            a.target = '_blank';
            a.rel = 'noopener';
        });

        fragment.querySelectorAll('img').forEach(img => {
            img.loading = 'lazy';
            if (/^image$/i.test(img.getAttribute('alt') || '')) img.alt = '';
        });

        fragment.querySelectorAll('iframe').forEach(frame => {
            frame.loading = 'lazy';
            if (/soundcloud\.com/.test(frame.src)) frame.classList.add('audio-embed');
            if (!frame.title) frame.title = 'Embedded media';
        });

        return title;
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

        if (this.state.currentView === 'home') {
            this.state.homeScroll = window.scrollY;
        }
        this.state.currentView = 'project';
        this.state.selectedProject = project;

        const main = document.getElementById('app');
        if (!main) return;

        const tags = project.tags || [];

        // Parse markdown content
        const template = document.createElement('template');
        template.innerHTML = marked.parse(project.content || '');
        const title = this.prepareContent(template.content, project.title.trim());

        // Previous / next in the order of the grid
        const ordered = this.sortedProjects();
        const index = ordered.findIndex(p => p.id === project.id);
        const newer = ordered[index - 1];
        const older = ordered[index + 1];

        main.innerHTML = `
            <article class="container project-detail">
                <nav class="detail-nav" aria-label="Breadcrumb">
                    <a class="back-btn" href="#">← Back to portfolio</a>
                </nav>

                <header class="detail-header">
                    <p class="detail-meta">
                        <span class="detail-year">${project.year}</span>
                        ${this.categoriesOf(project).map(c => `<span class="detail-category">${c}</span>`).join('')}
                    </p>
                    <h1 class="detail-title" tabindex="-1">${title}</h1>
                    ${tags.length ? `<ul class="detail-tags" aria-label="Tags">${tags.map(tag => `<li class="tag">${tag}</li>`).join('')}</ul>` : ''}
                </header>

                <div class="detail-content"></div>

                <footer class="detail-footer">
                    <nav class="pager" aria-label="More projects">
                        ${newer ? `<a class="pager-link pager-newer" href="#project/${newer.id}"><span class="pager-label">← Newer</span><span class="pager-title">${newer.title.trim()}</span></a>` : '<span></span>'}
                        ${older ? `<a class="pager-link pager-older" href="#project/${older.id}"><span class="pager-label">Older →</span><span class="pager-title">${older.title.trim()}</span></a>` : ''}
                    </nav>
                    <a class="back-btn" href="#">← Back to portfolio</a>
                </footer>
            </article>
        `;

        main.querySelector('.detail-content').appendChild(template.content);
        document.title = `${main.querySelector('.detail-title').textContent} | b2renger`;
        window.scrollTo(0, 0);
        main.querySelector('.detail-title').focus({ preventScroll: true });
    },

    linkify(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        // Handle markdown links [text](url)
        let processed = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        // Handle raw URLs if not already linked (simple check)
        if (!processed.includes('<a href')) {
            processed = processed.replace(urlRegex, url => `<a href="${url}" target="_blank" rel="noopener">${url}</a>`);
        }
        return processed;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const setIcons = theme => {
            document.getElementById('moon-icon').style.display = theme === 'dark' ? 'none' : 'block';
            document.getElementById('sun-icon').style.display = theme === 'dark' ? 'block' : 'none';
            themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        };

        // Initialization check
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        setIcons(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            setIcons(newTheme);
        });
    }
});
