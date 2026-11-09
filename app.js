/**
 * Guardião Digital - Interatividade e Usabilidade (app.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Fechar ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });

    // Toggle do Dropdown no Mobile
    const projectDropdown = document.getElementById('projectDropdown');
    const dropdownTrigger = projectDropdown ? projectDropdown.querySelector('.dropdown-trigger') : null;
    if (dropdownTrigger && projectDropdown) {
      dropdownTrigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          projectDropdown.classList.toggle('open');
        }
      });
    }
  }

  // 2. Abas do Passo a Passo 2FA (WhatsApp, Instagram, Google, Bancos)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = `tab-${btn.dataset.tab}`;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // 3. Simulador de Criptografia Interativo
  const plainInput = document.getElementById('plainInput');
  const btnEncrypt = document.getElementById('btnEncrypt');
  const btnDecrypt = document.getElementById('btnDecrypt');
  const cipherOutput = document.getElementById('cipherOutput');
  const cipherStatus = document.getElementById('cipherStatus');

  let originalStoredText = plainInput ? plainInput.value : '';

  // Função simples e visual de cifra (substituição + Base64 simulado para fins didáticos)
  function simpleCipher(text) {
    if (!text.trim()) return 'Digite algo para criptografar!';
    originalStoredText = text;
    try {
      // Inverte e converte para base64 com salting visual
      const encoded = btoa(unescape(encodeURIComponent(text)));
      return 'ENC::' + encoded.split('').reverse().join('') + '::AES256#';
    } catch (e) {
      return 'X8$91#kLqZ::0942';
    }
  }

  function simpleDecipher(cipherText) {
    if (!originalStoredText) return 'Nenhum texto anterior armazenado.';
    return originalStoredText;
  }

  if (btnEncrypt && cipherOutput) {
    btnEncrypt.addEventListener('click', () => {
      const text = plainInput.value;
      cipherOutput.innerText = simpleCipher(text);
      if (cipherStatus) {
        cipherStatus.innerText = 'Criptografado';
        cipherStatus.style.background = 'rgba(56, 189, 248, 0.2)';
        cipherStatus.style.color = '#38bdf8';
      }
    });
  }

  if (btnDecrypt && cipherOutput) {
    btnDecrypt.addEventListener('click', () => {
      cipherOutput.innerText = simpleDecipher(cipherOutput.innerText);
      if (cipherStatus) {
        cipherStatus.innerText = 'Decifrado (Original)';
        cipherStatus.style.background = 'rgba(16, 185, 129, 0.2)';
        cipherStatus.style.color = '#10b981';
      }
    });
  }

  // Executar uma vez no carregamento para exibir texto cifrado inicial
  if (plainInput && cipherOutput) {
    cipherOutput.innerText = simpleCipher(plainInput.value);
  }

  // 4. Checklist Interativo com Cálculo de Score
  const checkboxes = document.querySelectorAll('.chk-task');
  const scoreNumber = document.getElementById('scoreNumber');
  const scoreFeedback = document.getElementById('scoreFeedback');
  const scoreCircle = document.querySelector('.score-circle');

  function updateSecurityScore() {
    let currentScore = 0;
    let checkedCount = 0;

    checkboxes.forEach(chk => {
      const parentLabel = chk.closest('.check-item');
      if (chk.checked) {
        currentScore += parseInt(chk.dataset.points, 10) || 20;
        checkedCount++;
        if (parentLabel) parentLabel.classList.add('completed');
      } else {
        if (parentLabel) parentLabel.classList.remove('completed');
      }
    });

    if (scoreNumber) {
      scoreNumber.innerText = `${currentScore}%`;
    }

    // Feedback visual adaptativo
    if (scoreFeedback && scoreCircle) {
      if (currentScore === 0) {
        scoreCircle.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        scoreFeedback.innerText = 'Marque os hábitos acima para calcular seu índice de proteção!';
      } else if (currentScore <= 40) {
        scoreCircle.style.borderColor = '#f43f5e'; // Vermelho
        scoreFeedback.innerHTML = '<strong style="color:#f43f5e;">Alerta de Risco:</strong> Suas contas estão vulneráveis a golpes e invasões comuns. Ative o 2FA o quanto antes!';
      } else if (currentScore <= 80) {
        scoreCircle.style.borderColor = '#f59e0b'; // Amarelo
        scoreFeedback.innerHTML = '<strong style="color:#f59e0b;">Bom Caminho:</strong> Você já possui proteções essenciais, mas ainda há brechas para fechar.';
      } else {
        scoreCircle.style.borderColor = '#10b981'; // Verde
        scoreFeedback.innerHTML = '<strong style="color:#10b981;">Excelente Proteção!</strong> Parabéns! Seus hábitos digitais estão alinhados com as melhores práticas de segurança.';
      }
    }
  }

  checkboxes.forEach(chk => {
    chk.addEventListener('change', updateSecurityScore);
  });

  // 5. Destaque de navegação ativa conforme rolagem da página
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSectionId}`) {
        item.classList.add('active');
      }
    });
  });
});
