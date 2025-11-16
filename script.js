// ===== CONFIGURAÇÃO DA GALERIA =====
// VOCÊ PODE MODIFICAR FACILMENTE AS IMAGENS E CATEGORIAS AQUI
const GALLERY_CONFIG = {
    // Para adicionar uma nova categoria, adicione um objeto com:
    // - title: título da categoria
    // - emoji: emoji para exibir
    // - description: descrição que aparece quando clicada
    // - images: array com caminhos das imagens (adicione suas próprias imagens aqui)
    categories: [
        {
            title: "Momentos Especiais",
            emoji: "🌹",
            description: "Aqui estão nossos momentos mais especiais juntos...",
            images: [
                // ADICIONE SUAS IMAGENS AQUI:
                "imagens/momentos/m (1).jpeg",
                "imagens/momentos/m (2).jpeg",
                "imagens/momentos/m (3).jpeg",
                "imagens/momentos/m (4).jpeg",
                "imagens/momentos/m (5).jpeg",
                "imagens/momentos/m (6).jpeg"
            ]
        },
        {
            title: "Nossos Lugares",
            emoji: "💕",
            description: "Os lugares que marcaram nossa história de amor...",
            images: [
                // ADICIONE SUAS IMAGENS AQUI:
                 "imagens/lugares/l (1).jpeg",
                 "imagens/lugares/l (2).jpeg",
                 "imagens/lugares/l (3).jpeg",
                 "imagens/lugares/l (4).jpeg",
            ]
        },
        {
            title: "Músicas Favoritas",
            emoji: "🎵",
            description: "As músicas que tocam nossos corações...",
            images: [
                // ADICIONE SUAS IMAGENS AQUI:
                 
                 
                 "imagens/musicas/mu (1).jpeg",
                 "imagens/musicas/mu (2).jpeg",
                 "imagens/musicas/mu (3).jpeg",
                 "imagens/musicas/mu (4).jpeg",
                 "imagens/musicas/mu (5).jpeg",
                 "imagens/musicas/mu (6).jpeg",
                 "imagens/musicas/mu (7).jpeg"

            ]
        },
        {
            title: "Fotos Juntos",
            emoji: "📸",
            description: "Nossas memórias capturadas em imagens...",
            images: [
                // ADICIONE SUAS IMAGENS AQUI:
                 "imagens/juntos/j (1).jpeg",
                 "imagens/juntos/j (2).jpeg",
                 "imagens/juntos/j (3).jpeg",
                 "imagens/juntos/j (4).jpeg",
                 "imagens/juntos/j (5).jpeg",
                 "imagens/juntos/j (6).jpeg",
                 "imagens/juntos/j (7).jpeg",
            ]
        },
        {
            title: "Cartas de Amor",
            emoji: "💌",
            description: "Palavras de amor que guardamos no coração...",
            images: [
                // ADICIONE SUAS IMAGENS AQUI:
                // "imagens/carta1.jpg",
                // "imagens/carta2.jpg"
            ]
        },
        {
            title: "Desenhos preferidos",
            emoji: "🌟",
            description: "Lembranças que nos fazem sorrir sempre...",
            images: [
                // ADICIONE SUAS IMAGENS AQUI: Sitio pica pau amarelo, princesinha sofia, backardgans, mushu mulan
                 "imagens/memoria1.jpg",
                 "imagens/memoria2.jpg"
            ]
        }
    ]
};

// ===== SISTEMA DE MENSAGENS PERSISTENTES =====
class MessageSystem {
    constructor() {
        this.storageKey = 'perfil_romantico_mensagens';
        this.loadMessages();
    }

    // Carrega mensagens do localStorage
    loadMessages() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.messages = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Erro ao carregar mensagens:', error);
            this.messages = [];
        }
    }

    // Salva mensagens no localStorage
    saveMessages() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.messages));
        } catch (error) {
            console.error('Erro ao salvar mensagens:', error);
        }
    }

    // Adiciona nova mensagem
    addMessage(name, email, message) {
        const newMessage = {
            id: Date.now(),
            name: name || 'Anônimo',
            email: email || '',
            message: message,
            timestamp: new Date().toLocaleString('pt-BR'),
            date: new Date().toISOString()
        };
        
        this.messages.unshift(newMessage); // Adiciona no início
        this.saveMessages();
        return newMessage;
    }

    // Obtém todas as mensagens
    getAllMessages() {
        return this.messages;
    }

    // Remove uma mensagem (opcional)
    removeMessage(id) {
        this.messages = this.messages.filter(msg => msg.id !== id);
        this.saveMessages();
    }

    // Limpa todas as mensagens (opcional)
    clearAllMessages() {
        this.messages = [];
        this.saveMessages();
    }
}

// Instância global do sistema de mensagens
const messageSystem = new MessageSystem();

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos principais
    const profileCard = document.querySelector('.profile-card');
    const profilePicture = document.querySelector('.profile-picture');
    const primaryButton = document.querySelector('.action-button.primary');
    const secondaryButton = document.querySelector('.action-button.secondary');
    
    // Inicialização
    initializeAnimations();
    setupButtonEvents();
    createFloatingHearts();
    addInteractiveEffects();
    
    // Função para inicializar animações
    function initializeAnimations() {
        // Animação de entrada do card
        profileCard.style.opacity = '0';
        profileCard.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            profileCard.style.transition = 'all 0.8s ease-out';
            profileCard.style.opacity = '1';
            profileCard.style.transform = 'translateY(0)';
        }, 100);
        
        // Animação sequencial dos elementos
        const detailElements = document.querySelectorAll('.profile-details p');
        detailElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }, 500 + (index * 150));
        });
    }
    
    // Configuração dos eventos dos botões
    function setupButtonEvents() {
        // Botão "Enviar Mensagem"
        primaryButton.addEventListener('click', function() {
            showMessageModal();
            createHeartBurst(this);
        });
        
        // Botão "Ver Galeria"
        secondaryButton.addEventListener('click', function() {
            showGalleryModal();
            createHeartBurst(this);
        });
    }
    
    // Modal para enviar mensagem
    function showMessageModal() {
        const modal = createModal('Enviar Mensagem Romântica', `
            <form class="message-form" id="messageForm">
                <textarea name="message" placeholder="Escreva sua mensagem romântica aqui..." required></textarea>
                <button type="submit" class="action-button primary">💕 Enviar Mensagem</button>
            </form>
            <div style="margin-top: 20px;">
                <button type="button" class="action-button secondary" onclick="showMessagesModal()">
                    📝 Ver Mensagens Enviadas (${messageSystem.getAllMessages().length})
                </button>
            </div>
        `);
        
        // Evento do formulário
        const form = modal.querySelector('#messageForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleMessageSubmit(form);
        });
    }
    
    // Modal para galeria com imagens configuráveis
    function showGalleryModal() {
        const galleryHTML = `
            <div class="gallery-grid">
                ${GALLERY_CONFIG.categories.map((category, index) => `
                    <div class="gallery-item" onclick="showGalleryDetail(${index})">
                        ${category.emoji} ${category.title}
                    </div>
                `).join('')}
            </div>
        `;
        
        createModal('Galeria Romântica', galleryHTML);
    }
    
    // Modal para exibir mensagens enviadas
    window.showMessagesModal = function() {
        const messages = messageSystem.getAllMessages();
        
        let messagesHTML = '';
        if (messages.length === 0) {
            messagesHTML = '<p style="text-align: center; color: var(--light-text-color); font-style: italic;">Nenhuma mensagem enviada ainda. 💕</p>';
        } else {
            messagesHTML = `
                <div class="messages-container">
                    ${messages.map(msg => `
                        <div class="message-item">
                            <div class="message-header">
                                <strong>${msg.name}</strong>
                                <span class="message-date">${msg.timestamp}</span>
                            </div>
                            <div class="message-content">${msg.message}</div>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="action-button secondary" onclick="clearAllMessages()" style="font-size: 0.9em;">
                        🗑️ Limpar Todas as Mensagens
                    </button>
                </div>
            `;
        }
        
        createModal(`Mensagens de Amor (${messages.length})`, messagesHTML);
    };
    
    // Função para limpar todas as mensagens
    window.clearAllMessages = function() {
        if (confirm('Tem certeza que deseja limpar todas as mensagens? Esta ação não pode ser desfeita.')) {
            messageSystem.clearAllMessages();
            showSuccessMessage('Todas as mensagens foram removidas! 🗑️');
            document.querySelector('.modal').style.display = 'none';
        }
    };
    
    // Função para criar modal genérico
    function createModal(title, content) {
        // Remove modal existente se houver
        const existingModal = document.querySelector('.modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 style="color: var(--primary-color); font-family: 'Playfair Display', serif; margin-bottom: 20px;">${title}</h2>
                ${content}
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'block';
        
        // Evento para fechar modal
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        });
        
        // Fechar ao clicar fora do modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        return modal;
    }
    
    // Manipular envio de mensagem
    function handleMessageSubmit(form) {
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simular envio
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '💕 Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Salvar mensagem no sistema persistente
            messageSystem.addMessage(name, email, message);
            
            submitBtn.textContent = '✅ Mensagem Enviada!';
            submitBtn.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                showSuccessMessage(`Obrigada pela mensagem, ${name}! 💕 Sua mensagem foi salva e pode ser vista por outros visitantes.`);
                document.querySelector('.modal').style.display = 'none';
            }, 1500);
        }, 2000);
    }
    
    // Mostrar mensagem de sucesso
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            font-family: 'Lora', serif;
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
        `;
        successDiv.textContent = message;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => successDiv.remove(), 500);
        }, 4000);
    }
    
    // Criar explosão de corações
    function createHeartBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createFloatingHeart(centerX, centerY);
            }, i * 100);
        }
    }
    
    // Criar coração flutuante
    function createFloatingHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'floating-hearts';
        heart.textContent = '💕';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        
        // Adicionar variação na posição
        const randomX = (Math.random() - 0.5) * 100;
        heart.style.transform = `translateX(${randomX}px)`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
    
    // Corações flutuantes automáticos
    function createFloatingHearts() {
        setInterval(() => {
            const x = Math.random() * window.innerWidth;
            const y = window.innerHeight + 50;
            createFloatingHeart(x, y);
        }, 3000);
    }
    
    // Efeitos interativos adicionais
    function addInteractiveEffects() {
        // Efeito de hover na foto de perfil
        profilePicture.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) saturate(1.2)';
            createHeartBurst(this);
        });
        
        profilePicture.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
        
        // Efeito de clique nos detalhes
        const detailValues = document.querySelectorAll('.detail-value');
        detailValues.forEach(detail => {
            detail.addEventListener('click', function() {
                this.style.transform = 'scale(1.05)';
                this.style.backgroundColor = 'var(--secondary-color)';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.backgroundColor = '';
                }, 200);
                
                // Criar coração no local do clique
                const rect = this.getBoundingClientRect();
                createFloatingHeart(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2
                );
            });
        });
        
        // Efeito de parallax suave no card
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const rotateX = (mouseY - 0.5) * 5;
            const rotateY = (mouseX - 0.5) * -5;
            
            profileCard.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                translateZ(0)
            `;
        });
        
        // Resetar transformação quando o mouse sair da janela
        document.addEventListener('mouseleave', function() {
            profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
    
    // Função global para detalhes da galeria
    window.showGalleryDetail = function(categoryIndex) {
        const category = GALLERY_CONFIG.categories[categoryIndex];
        
        let imagesHTML = '';
        if (category.images && category.images.length > 0) {
            imagesHTML = `
                <div class="gallery-images">
                    ${category.images.map(imagePath => `
                        <img src="${imagePath}" alt="${category.title}" class="gallery-image" onclick="showFullImage('${imagePath}')">
                    `).join('')}
                </div>
            `;
        } else {
            imagesHTML = `
                <p style="text-align: center; color: var(--light-text-color); font-style: italic; margin: 20px 0;">
                    📷 Adicione imagens editando o arquivo script.js na seção GALLERY_CONFIG
                </p>
            `;
        }
        
        createModal(`${category.emoji} ${category.title}`, `
            <p style="font-size: 1.1em; line-height: 1.8; color: var(--text-color); margin-bottom: 20px;">
                ${category.description}
            </p>
            ${imagesHTML}
            <div style="text-align: center; margin-top: 20px;">
                <button class="action-button primary" onclick="document.querySelector('.modal').style.display='none'">
                    💕 Fechar
                </button>
            </div>
        `);
    };
    
    // Função para mostrar imagem em tamanho completo
    window.showFullImage = function(imagePath) {
        createModal('Imagem', `
            <div style="text-align: center;">
                <img src="${imagePath}" style="max-width: 100%; max-height: 70vh; border-radius: 10px;">
            </div>
        `);
    };
    
    // Adicionar animações CSS dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .profile-details p {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .profile-details p:hover {
            background-color: rgba(255, 107, 107, 0.05);
            border-radius: 8px;
            padding: 5px;
        }
        
        .action-button {
            position: relative;
            overflow: hidden;
        }
        
        .action-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.6s ease;
        }
        
        .action-button:active::before {
            width: 300px;
            height: 300px;
        }
        
        .messages-container {
            max-height: 400px;
            overflow-y: auto;
            margin: 20px 0;
        }
        
        .message-item {
            background: #f8f9fa;
            border-left: 4px solid var(--primary-color);
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            transition: transform 0.2s ease;
        }
        
        .message-item:hover {
            transform: translateX(5px);
        }
        
        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .message-header strong {
            color: var(--primary-color);
            font-family: 'Playfair Display', serif;
        }
        
        .message-date {
            font-size: 0.8em;
            color: var(--light-text-color);
        }
        
        .message-content {
            color: var(--text-color);
            line-height: 1.6;
        }
        
        .gallery-images {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .gallery-image {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 10px;
            cursor: pointer;
            transition: transform 0.3s ease;
            border: 2px solid var(--border-color);
        }
        
        .gallery-image:hover {
            transform: scale(1.05);
            border-color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
    
    // Mensagem de boas-vindas
    setTimeout(() => {
        const totalMessages = messageSystem.getAllMessages().length;
        showSuccessMessage(`💕 Bem-vindo ao perfil da Gisele! ${totalMessages > 0 ? `Já temos ${totalMessages} mensagem(ns) de amor!` : ''} 💕`);
    }, 1000);
    
    console.log('💕 Perfil Romântico carregado com sucesso! 💕');
    console.log('📝 Sistema de mensagens persistentes ativo!');
    console.log('🖼️ Galeria configurável disponível!');
});

// ===== CONFIGURAÇÃO DAS DATAS =====
// Altere essas datas conforme necessário

// Natal sempre no ano atual (25 de dezembro)
const natal = new Date(new Date().getFullYear(), 11, 25);

// Aniversário de namoro - ALTERE AQUI (exemplo: 15 de março de 2026)
const aniversarioNamoro = new Date(2026, 2, 15); // mês 2 = março (começa em 0)

// Aniversário da Gisele - 7 de maio
const aniversarioGisele = new Date(new Date().getFullYear(), 4, 7); // mês 4 = maio

// ===== FUNÇÃO PARA CALCULAR DIAS =====
function calcularDias(dataFutura) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const futuro = new Date(dataFutura);
    futuro.setHours(0, 0, 0, 0);
    
    // Se a data já passou este ano, calcula para o próximo ano
    if (futuro < hoje) {
        futuro.setFullYear(hoje.getFullYear() + 1);
    }
    
    // Calcula a diferença em milissegundos e converte para dias
    const diferenca = futuro - hoje;
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
    
    return dias;
}

// ===== FUNÇÃO PARA ATUALIZAR OS CONTADORES =====
function atualizarContadores() {
    // Calcula os dias para cada data
    const diasNatal = calcularDias(natal);
    const diasNamoro = calcularDias(aniversarioNamoro);
    const diasAniversario = calcularDias(aniversarioGisele);
    
    // Atualiza o HTML
    document.getElementById('diasNatal').textContent = diasNatal;
    document.getElementById('diasNamoro').textContent = diasNamoro;
    document.getElementById('diasAniversario').textContent = diasAniversario;
    
    // Atualiza os textos (singular/plural)
    document.getElementById('textoNatal').textContent = diasNatal === 1 ? 'dia restante' : 'dias restantes';
    document.getElementById('textoNamoro').textContent = diasNamoro === 1 ? 'dia restante' : 'dias restantes';
    document.getElementById('textoAniversario').textContent = diasAniversario === 1 ? 'dia restante' : 'dias restantes';
}

// ===== EXECUTA QUANDO A PÁGINA CARREGAR =====
window.addEventListener('DOMContentLoaded', function() {
    // Atualiza imediatamente
    atualizarContadores();
    
    // Atualiza a cada 1 hora
    setInterval(atualizarContadores, 3600000);
});
