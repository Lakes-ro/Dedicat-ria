// ===== CONFIGURAÇÃO DA GALERIA =====
const GALLERY_CONFIG = {
    categories: [
        {
            title: "Momentos Especiais",
            emoji: "🌹",
            description: "Aqui estão nossos momentos mais especiais juntos...",
            images: [
                "m (1).jpeg", "m (2).jpeg", "m (3).jpeg",
                "m (4).jpeg", "m (5).jpeg", "m (6).jpeg"
            ]
        },
        {
            title: "Nossos Lugares",
            emoji: "💕",
            description: "Os lugares que marcaram nossa história de amor...",
            images: [
                "l (1).jpeg", "l (2).jpeg", "l (3).jpeg", "l (4).jpeg",
                "eu e ela 4.jpeg", "eu e ela 5.jpeg"
            ]
        },
        {
            title: "Músicas Favoritas",
            emoji: "🎵",
            description: "As músicas que tocam nossos corações...",
            images: [
                "mu (1).jpeg", "mu (2).jpeg", "mu (3).jpeg", "mu (4).jpeg",
                "mu (5).jpeg", "mu (6).jpeg", "mu (7).jpeg", "nao temas.jpg"
            ]
        },
        {
            title: "Fotos Juntos",
            emoji: "📸",
            description: "Nossas memórias capturadas em imagens...",
            images: [
                "j (1).jpeg", "j (2).jpeg", "j (3).jpeg", "j (4).jpeg",
                "j (5).jpeg", "j (6).jpeg", "j (7).jpeg",
                "eu e ela 1.jpeg", "eu e ela 2.jpeg", "eu e ela 3.jpeg"
            ]
        },
        {
            title: "Aviões a jatos",
            emoji: "✈",
            description: "zuuummm...",
            images: [
                "aviao.webp"
            ]
        },
        {
            title: "Coisas preferidas",
            emoji: "🌟",
            description: "Lembranças que nos fazem sorrir sempre...",
            images: [
                "all star.jfif", "inabalavel.jpg", "mulan.jpg"
            ]
        }
    ]
};

// =======================================================
// ===== CONFIGURAÇÃO DO JSONBIN ======
// =======================================================


const JSONBIN_BIN_ID  = "69a7777ed0ea881f40ec1dc0";   // ex: "6634abc123def456"
const JSONBIN_API_KEY = "$2a$10$/o.eUT1XEJbbNVDFZo.Z3e/2PGepiLi18J092/kBMwmHGgQWZeuZK";   // ex: "$2a$10$abc..."

// =======================================================

const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// ===== SISTEMA DE MENSAGENS =====
const messageSystem = {

    async getAllMessages() {
        try {
            const res = await fetch(JSONBIN_URL + "/latest", {
                headers: { "X-Master-Key": JSONBIN_API_KEY }
            });
            if (!res.ok) throw new Error("Erro ao buscar");
            const data = await res.json();
            return data.record?.mensagens || [];
        } catch (err) {
            console.error("Erro ao buscar mensagens:", err);
            return [];
        }
    },

    async addMessage(name, message) {
        try {
            const mensagens = await this.getAllMessages();
            mensagens.unshift({
                id: Date.now(),
                name: name || "Anônimo",
                message: message,
                timestamp: new Date().toLocaleString("pt-BR")
            });
            const res = await fetch(JSONBIN_URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": JSONBIN_API_KEY
                },
                body: JSON.stringify({ mensagens })
            });
            return res.ok;
        } catch (err) {
            console.error("Erro ao salvar:", err);
            return false;
        }
    },

    async clearAllMessages() {
        try {
            const res = await fetch(JSONBIN_URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": JSONBIN_API_KEY
                },
                body: JSON.stringify({ mensagens: [] })
            });
            return res.ok;
        } catch (err) {
            console.error("Erro ao limpar:", err);
            return false;
        }
    }
};

// ===== CONFIGURAÇÃO DAS DATAS =====

// Natal - 25 de dezembro (mês 11 = dezembro)
const natal = new Date(new Date().getFullYear(), 11, 25);

// Aniversário de namoro - 07 de junho (mês 5 = junho, comemora todo ano)
const aniversarioNamoro = new Date(new Date().getFullYear(), 5, 7);

// Aniversário da Gisele - 04 de março (mês 2 = março)
const aniversarioGisele = new Date(new Date().getFullYear(), 2, 4);

// ===== CALCULAR DIAS =====
function calcularDias(dataFutura) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const futuro = new Date(dataFutura);
    futuro.setHours(0, 0, 0, 0);

    // Se a data já passou este ano, avança para o próximo
    if (futuro < hoje) {
        futuro.setFullYear(hoje.getFullYear() + 1);
    }

    const diferenca = futuro - hoje;
    return Math.ceil(diferenca / (1000 * 60 * 60 * 24));
}

// ===== ATUALIZAR CONTADORES =====
function atualizarContadores() {
    const diasNatal       = calcularDias(natal);
    const diasNamoro      = calcularDias(aniversarioNamoro);
    const diasAniversario = calcularDias(aniversarioGisele);

    document.getElementById("diasNatal").textContent       = diasNatal;
    document.getElementById("diasNamoro").textContent      = diasNamoro;
    document.getElementById("diasAniversario").textContent = diasAniversario;

    document.getElementById("textoNatal").textContent       = diasNatal === 1       ? "dia restante" : "dias restantes";
    document.getElementById("textoNamoro").textContent      = diasNamoro === 1      ? "dia restante" : "dias restantes";
    document.getElementById("textoAniversario").textContent = diasAniversario === 1 ? "dia restante" : "dias restantes";
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", function () {

    const profileCard     = document.querySelector(".profile-card");
    const profilePicture  = document.querySelector(".profile-picture");
    const primaryButton   = document.querySelector(".action-button.primary");
    const secondaryButton = document.querySelector(".action-button.secondary");

    atualizarContadores();
    setInterval(atualizarContadores, 3600000);

    initializeAnimations();
    setupButtonEvents();
    createFloatingHearts();
    addInteractiveEffects();
    injectExtraStyles();

    setTimeout(() => showSuccessMessage("💕 Bem-vinda ao seu espaço especial, Gisele! 💕"), 1000);

    // ===== ANIMAÇÕES =====
    function initializeAnimations() {
        profileCard.style.opacity   = "0";
        profileCard.style.transform = "translateY(50px)";

        setTimeout(() => {
            profileCard.style.transition = "all 0.8s ease-out";
            profileCard.style.opacity    = "1";
            profileCard.style.transform  = "translateY(0)";
        }, 100);

        document.querySelectorAll(".profile-details p").forEach((el, i) => {
            el.style.opacity   = "0";
            el.style.transform = "translateX(-30px)";
            setTimeout(() => {
                el.style.transition = "all 0.6s ease-out";
                el.style.opacity    = "1";
                el.style.transform  = "translateX(0)";
            }, 500 + i * 150);
        });
    }

    // ===== BOTÕES =====
    function setupButtonEvents() {
        primaryButton.addEventListener("click", function () {
            showMessageModal();
            createHeartBurst(this);
        });
        secondaryButton.addEventListener("click", function () {
            showGalleryModal();
            createHeartBurst(this);
        });
    }

    // ===== MODAL: ENVIAR MENSAGEM =====
    function showMessageModal() {
        const modal = createModal("Enviar Mensagem 💕", `
            <form class="message-form" id="messageForm">
                <input name="name" type="text" placeholder="Seu nome (opcional)" maxlength="50" />
                <textarea name="message" placeholder="Escreva sua mensagem aqui..." required maxlength="500"></textarea>
                <button type="submit" class="action-button primary">💕 Enviar Mensagem</button>
            </form>
            <div style="margin-top: 15px; text-align:center;">
                <button type="button" class="action-button secondary" id="btnVerMensagens">
                    📝 Ver Mensagens
                </button>
            </div>
        `);

        modal.querySelector("#btnVerMensagens").addEventListener("click", showMessagesModal);

        modal.querySelector("#messageForm").addEventListener("submit", async function (e) {
            e.preventDefault();
            await handleMessageSubmit(this);
        });
    }

    // ===== MODAL: VER MENSAGENS =====
    window.showMessagesModal = async function () {
        const modal = createModal("Mensagens de Amor 💌", `
            <div id="messagesListContainer">
                <p style="text-align:center; color:var(--light-text-color);">⏳ Carregando mensagens...</p>
            </div>
        `);

        const msgs = await messageSystem.getAllMessages();
        const container = document.getElementById("messagesListContainer");
        if (!container) return;

        if (msgs.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:var(--light-text-color); font-style:italic;">
                Nenhuma mensagem ainda. 💕
            </p>`;
        } else {
            container.innerHTML = `
                <div class="messages-container">
                    ${msgs.map(msg => `
                        <div class="message-item">
                            <div class="message-header">
                                <strong>${escapeHtml(msg.name)}</strong>
                                <span class="message-date">${msg.timestamp}</span>
                            </div>
                            <div class="message-content">${escapeHtml(msg.message)}</div>
                        </div>
                    `).join("")}
                </div>
                <div style="text-align:center; margin-top:20px;">
                    <button class="action-button secondary" id="btnLimpar" style="font-size:0.9em;">
                        🗑️ Limpar Todas
                    </button>
                </div>
            `;

            document.getElementById("btnLimpar").addEventListener("click", async () => {
                if (confirm("Tem certeza? Esta ação não pode ser desfeita.")) {
                    await messageSystem.clearAllMessages();
                    showSuccessMessage("Mensagens removidas! 🗑️");
                    document.querySelector(".modal")?.remove();
                }
            });
        }
    };

    // ===== ENVIO DA MENSAGEM =====
    async function handleMessageSubmit(form) {
        const name    = form.querySelector("[name='name']").value.trim();
        const message = form.querySelector("[name='message']").value.trim();

        if (!message) return;

        const btn = form.querySelector("button[type='submit']");
        btn.textContent = "💕 Enviando...";
        btn.disabled    = true;

        const ok = await messageSystem.addMessage(name, message);

        if (ok) {
            btn.textContent           = "✅ Enviado!";
            btn.style.backgroundColor = "#27ae60";
            setTimeout(() => {
                document.querySelector(".modal")?.remove();
                showSuccessMessage("Mensagem enviada com amor! 💕");
            }, 1200);
        } else {
            btn.textContent           = "❌ Erro ao enviar";
            btn.style.backgroundColor = "#e74c3c";
            btn.disabled              = false;
            showSuccessMessage("Erro! Verifique o BIN ID e API KEY do JSONBin.", true);
        }
    }

    // ===== MODAL: GALERIA =====
    function showGalleryModal() {
        createModal("Galeria Romântica", `
            <div class="gallery-grid">
                ${GALLERY_CONFIG.categories.map((cat, i) => `
                    <div class="gallery-item" onclick="showGalleryDetail(${i})">
                        ${cat.emoji} ${cat.title}
                    </div>
                `).join("")}
            </div>
        `);
    }

    window.showGalleryDetail = function (index) {
        const cat = GALLERY_CONFIG.categories[index];
        const imagesHTML = cat.images?.length
            ? `<div class="gallery-images">
                ${cat.images.map(src => `
                    <img src="${src}" alt="${cat.title}" class="gallery-image"
                         onclick="showFullImage('${src}')">
                `).join("")}
               </div>`
            : `<p style="text-align:center; font-style:italic; color:var(--light-text-color);">
                📷 Adicione imagens no GALLERY_CONFIG do script.js
               </p>`;

        createModal(`${cat.emoji} ${cat.title}`, `
            <p style="font-size:1.1em; line-height:1.8; color:var(--text-color); margin-bottom:20px;">
                ${cat.description}
            </p>
            ${imagesHTML}
            <div style="text-align:center; margin-top:20px;">
                <button class="action-button primary"
                    onclick="document.querySelector('.modal').remove()">💕 Fechar</button>
            </div>
        `);
    };

    window.showFullImage = function (src) {
        createModal("", `
            <div style="text-align:center;">
                <img src="${src}" style="max-width:100%; max-height:70vh; border-radius:10px;">
            </div>
        `);
    };

    // ===== MODAL GENÉRICO =====
    function createModal(title, content) {
        document.querySelector(".modal")?.remove();

        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                ${title ? `<h2 style="color:var(--primary-color); font-family:'Playfair Display',serif; margin-bottom:20px;">${title}</h2>` : ""}
                ${content}
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = "block";

        modal.querySelector(".close").addEventListener("click", () => modal.remove());
        modal.addEventListener("click", (e) => { if (e.target === modal) modal.remove(); });

        return modal;
    }

    // ===== TOAST =====
    function showSuccessMessage(text, isError = false) {
        const div = document.createElement("div");
        div.style.cssText = `
            position: fixed; top: 20px; right: 20px;
            background: linear-gradient(135deg, ${isError ? "#e74c3c, #c0392b" : "#27ae60, #2ecc71"});
            color: white; padding: 15px 25px; border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2); z-index: 1001;
            font-family: 'Lora', serif; max-width: 300px;
            animation: slideInRight 0.5s ease-out;
        `;
        div.textContent = text;
        document.body.appendChild(div);
        setTimeout(() => {
            div.style.animation = "slideOutRight 0.5s ease-in forwards";
            setTimeout(() => div.remove(), 500);
        }, 4000);
    }

    // ===== CORAÇÕES =====
    function createHeartBurst(el) {
        const rect = el.getBoundingClientRect();
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createFloatingHeart(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            ), i * 100);
        }
    }

    function createFloatingHeart(x, y) {
        const heart = document.createElement("div");
        heart.className   = "floating-hearts";
        heart.textContent = "💕";
        heart.style.left      = x + "px";
        heart.style.top       = y + "px";
        heart.style.transform = `translateX(${(Math.random() - 0.5) * 100}px)`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }

    function createFloatingHearts() {
        setInterval(() => {
            createFloatingHeart(Math.random() * window.innerWidth, window.innerHeight + 50);
        }, 3000);
    }

    // ===== EFEITOS INTERATIVOS =====
    function addInteractiveEffects() {
        profilePicture.addEventListener("mouseenter", function () {
            this.style.filter = "brightness(1.1) saturate(1.2)";
            createHeartBurst(this);
        });
        profilePicture.addEventListener("mouseleave", function () {
            this.style.filter = "none";
        });

        document.querySelectorAll(".detail-value").forEach(el => {
            el.addEventListener("click", function () {
                this.style.transform       = "scale(1.05)";
                this.style.backgroundColor = "var(--secondary-color)";
                setTimeout(() => {
                    this.style.transform       = "scale(1)";
                    this.style.backgroundColor = "";
                }, 200);
                const r = this.getBoundingClientRect();
                createFloatingHeart(r.left + r.width / 2, r.top + r.height / 2);
            });
        });

        document.addEventListener("mousemove", function (e) {
            const rx = (e.clientY / window.innerHeight - 0.5) * 5;
            const ry = (e.clientX / window.innerWidth  - 0.5) * -5;
            profileCard.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });

        document.addEventListener("mouseleave", function () {
            profileCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        });
    }

    // ===== SEGURANÇA =====
    function escapeHtml(str) {
        if (!str) return "";
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // ===== ESTILOS EXTRAS =====
    function injectExtraStyles() {
        const style = document.createElement("style");
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to   { transform: translateX(0);    opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0);    opacity: 1; }
                to   { transform: translateX(100%); opacity: 0; }
            }
            .profile-details p { cursor: pointer; transition: all 0.3s ease; }
            .profile-details p:hover { background-color: rgba(255,107,107,0.05); border-radius: 8px; padding: 5px; }
            .action-button { position: relative; overflow: hidden; }
            .action-button::before {
                content: ""; position: absolute; top: 50%; left: 50%;
                width: 0; height: 0; background: rgba(255,255,255,0.3);
                border-radius: 50%; transform: translate(-50%,-50%); transition: all 0.6s ease;
            }
            .action-button:active::before { width: 300px; height: 300px; }
            .messages-container { max-height: 400px; overflow-y: auto; margin: 20px 0; }
            .message-item {
                background: #f8f9fa; border-left: 4px solid var(--primary-color);
                padding: 15px; margin-bottom: 15px; border-radius: 8px; transition: transform 0.2s ease;
            }
            .message-item:hover { transform: translateX(5px); }
            .message-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
            .message-header strong { color: var(--primary-color); font-family: "Playfair Display", serif; }
            .message-date { font-size: 0.8em; color: var(--light-text-color); }
            .message-content { color: var(--text-color); line-height: 1.6; }
            .gallery-images { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 20px 0; }
            .gallery-image { width: 100%; height: 150px; object-fit: cover; border-radius: 10px; cursor: pointer; transition: transform 0.3s ease; border: 2px solid var(--border-color); }
            .gallery-image:hover { transform: scale(1.05); border-color: var(--primary-color); }
            .message-form input { padding: 12px; border: 2px solid var(--border-color); border-radius: 8px; font-family: "Lora", serif; font-size: 1em; width: 100%; box-sizing: border-box; margin-bottom: 5px; }
            .message-form input:focus { outline: none; border-color: var(--primary-color); }
        `;
        document.head.appendChild(style);
    }
});
