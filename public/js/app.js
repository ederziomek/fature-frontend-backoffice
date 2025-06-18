// App JavaScript para Fature Backoffice
class FatureBackoffice {
    constructor() {
        this.currentPage = 'dashboard';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initCharts();
        this.loadPage('dashboard');
    }

    setupEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('sidebar');

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
            });
        }

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.loadPage(page);
                
                // Update active state
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                link.closest('.nav-item').classList.add('active');
                
                // Close mobile menu
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                }
            });
        });

        // Close sidebar on outside click (mobile)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });

        // Search functionality
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Notification click
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                this.showNotifications();
            });
        }

        // User menu click
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            userMenu.addEventListener('click', () => {
                this.toggleUserMenu();
            });
        }
    }

    loadPage(pageName) {
        // Hide all page contents
        const pageContents = document.querySelectorAll('.page-content');
        pageContents.forEach(content => {
            content.style.display = 'none';
        });

        // Show selected page
        const targetPage = document.getElementById(`${pageName}-content`);
        if (targetPage) {
            targetPage.style.display = 'block';
        }

        // Update page title
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            const titles = {
                'dashboard': 'Dashboard',
                'users': 'Usuários',
                'affiliates': 'Afiliados',
                'transactions': 'Transações',
                'commissions': 'Comissões',
                'reports': 'Relatórios',
                'settings': 'Configurações'
            };
            pageTitle.textContent = titles[pageName] || 'Dashboard';
        }

        this.currentPage = pageName;

        // Load page-specific content
        this.loadPageContent(pageName);
    }

    loadPageContent(pageName) {
        switch (pageName) {
            case 'dashboard':
                this.updateDashboardData();
                break;
            case 'users':
                this.loadUsersData();
                break;
            case 'affiliates':
                this.loadAffiliatesData();
                break;
            case 'transactions':
                this.loadTransactionsData();
                break;
            case 'commissions':
                this.loadCommissionsData();
                break;
            case 'reports':
                this.loadReportsData();
                break;
            case 'settings':
                this.loadSettingsData();
                break;
        }
    }

    initCharts() {
        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart');
        if (revenueCtx) {
            new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [{
                        label: 'Receita (R$)',
                        data: [65000, 72000, 68000, 89000, 85000, 89432],
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'R$ ' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        // Users Chart
        const usersCtx = document.getElementById('usersChart');
        if (usersCtx) {
            new Chart(usersCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Ativos', 'Inativos', 'Pendentes'],
                    datasets: [{
                        data: [1234, 156, 89],
                        backgroundColor: [
                            '#667eea',
                            '#f093fb',
                            '#fbbf24'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    updateDashboardData() {
        // Simulate real-time data updates
        const stats = [
            { value: 1234, change: '+12%' },
            { value: 567, change: '+8%' },
            { value: 89432, change: '+15%' },
            { value: 2891, change: '-3%' }
        ];

        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            const valueElement = card.querySelector('h3');
            const changeElement = card.querySelector('.stat-change');
            
            if (valueElement && stats[index]) {
                if (index === 2) {
                    valueElement.textContent = `R$ ${stats[index].value.toLocaleString()}`;
                } else {
                    valueElement.textContent = stats[index].value.toLocaleString();
                }
            }
            
            if (changeElement && stats[index]) {
                changeElement.textContent = stats[index].change;
            }
        });
    }

    loadUsersData() {
        // Simulate loading users data
        console.log('Loading users data...');
    }

    loadAffiliatesData() {
        // Simulate loading affiliates data
        console.log('Loading affiliates data...');
    }

    loadTransactionsData() {
        // Simulate loading transactions data
        console.log('Loading transactions data...');
    }

    loadCommissionsData() {
        // Simulate loading commissions data
        console.log('Loading commissions data...');
    }

    loadReportsData() {
        // Simulate loading reports data
        console.log('Loading reports data...');
    }

    loadSettingsData() {
        // Simulate loading settings data
        console.log('Loading settings data...');
    }

    handleSearch(query) {
        console.log('Searching for:', query);
        // Implement search functionality
    }

    showNotifications() {
        // Show notifications dropdown
        alert('Você tem 3 notificações não lidas:\n\n1. Novo afiliado cadastrado\n2. Transação processada\n3. Comissão paga');
    }

    toggleUserMenu() {
        // Toggle user menu dropdown
        const userMenuOptions = [
            'Perfil',
            'Configurações',
            'Ajuda',
            'Sair'
        ];
        
        const option = prompt('Selecione uma opção:\n' + userMenuOptions.map((opt, i) => `${i + 1}. ${opt}`).join('\n'));
        
        if (option) {
            const selectedOption = userMenuOptions[parseInt(option) - 1];
            if (selectedOption) {
                alert(`Você selecionou: ${selectedOption}`);
                if (selectedOption === 'Sair') {
                    this.logout();
                }
            }
        }
    }

    logout() {
        if (confirm('Tem certeza que deseja sair?')) {
            alert('Logout realizado com sucesso!');
            // Implement logout logic
        }
    }

    // Utility methods
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    }

    showToast(message, type = 'info') {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.fatureApp = new FatureBackoffice();
});

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

