// ==========================================================================
// Abhishek Kinagi - Interactive Portfolio Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Theme Toggle (Light by default, persistent with localStorage)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeIcon) {
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      if (themeIcon) {
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      }
      showToast(`Switched to <strong>${newTheme === 'dark' ? 'Dark' : 'Light'} Mode</strong>`);
    });
  }

  // 2. Live IST Clock in Top Status Bar
  const clockElement = document.getElementById('live-ist-clock');
  const updateISTClock = () => {
    if (!clockElement) return;
    const now = new Date();
    const istOptions = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    clockElement.textContent = now.toLocaleTimeString('en-US', istOptions) + ' IST';
  };
  updateISTClock();
  setInterval(updateISTClock, 1000);

  // 3. Toast Notification Helper
  const toastContainer = document.getElementById('toast-container');
  const showToast = (message, isMatcha = false) => {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${isMatcha ? 'toast-matcha' : ''}`;
    toast.innerHTML = message;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  // 4. One-Click Copy Email
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-text');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'kinagiabhishek@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (copyText) copyText.textContent = '✓ Copied!';
        showToast(`📋 <strong>Copied to clipboard:</strong> ${email}`);
        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copy Email';
        }, 2200);
      }).catch(() => {
        showToast(`📧 Email: ${email}`);
      });
    });
  }

  // 5. Fun "Sip Matcha" Button
  const matchaBtn = document.getElementById('sip-matcha-btn');
  const matchaQuotes = [
    "🍵 Ceremonial Uji matcha sipped! +10 Focus, 0 compiler warnings.",
    "🍵 Whisked to perfection. Clean agentic architecture mode unlocked.",
    "🍵 Pure matcha energy: O(1) latency, zero jitters.",
    "🍵 Smooth sip. Ready to turn complex epics into production code in days."
  ];
  let quoteIdx = 0;
  if (matchaBtn) {
    matchaBtn.addEventListener('click', () => {
      const quote = matchaQuotes[quoteIdx % matchaQuotes.length];
      quoteIdx++;
      showToast(quote, true);
    });
  }

  // 6. Interactive Terminal CLI
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalInput = document.getElementById('terminal-input');
  const terminalRunBtn = document.getElementById('terminal-run-btn');
  const chipButtons = document.querySelectorAll('.t-chip');

  const commandHistory = [];
  let historyIndex = -1;

  const appendToTerminal = (html) => {
    if (!terminalScreen) return;
    const line = document.createElement('div');
    line.className = 't-line';
    line.innerHTML = html;
    terminalScreen.appendChild(line);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  };

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    appendToTerminal(`<span class="t-prompt">kinagi@workstation:~$</span> <span class="t-cmd">${rawCmd}</span>`);

    switch (cmd) {
      case 'whoami':
        appendToTerminal(`
          <div class="t-out">► <strong>Abhishek Kinagi</strong> — Director P3 @ Morgan Stanley (IST)</div>
          <div class="t-out">► Department AI Innovator: Converting product epics to production code in days via agentic pipelines</div>
          <div class="t-out">► Systems: High-throughput Trade Capture & Document Generation (Java 26 / Scala)</div>
          <div class="t-out">► Alum: MS in CS (Arizona State) • BTech in CS (VNIT Nagpur)</div>
          <div class="t-out">► Background: Ex-Goldman Sachs (Private Wealth Management) • Ex-Numerify</div>
          <div class="t-out">► Fuel: <span class="t-matcha">Ceremonial Japanese Matcha 🍵</span></div>
        `);
        break;

      case 'ai':
      case 'agents':
      case 'agentic':
        appendToTerminal(`
          <div class="t-out">► <span class="t-ai">Mature Agentic Pipelines:</span> Orchestrating multi-agent systems to deliver full product epics in days.</div>
          <div class="t-out">► <span class="t-ai">Autonomous Tooling:</span> Power user & instructor across Claude Code, Amp, GitHub Copilot, and custom subagents.</div>
          <div class="t-out">► <span class="t-ai">Multi-Dependency Testing:</span> Full test automation across tightly coupled service graphs.</div>
          <div class="t-out">► <span class="t-ai">Mindset:</span> AI-first systems architecture with deterministic assertion validation.</div>
        `);
        break;

      case 'skills':
      case 'weapons':
        appendToTerminal(`
          <div class="t-out">► <span class="t-ai">Agentic AI:</span> Multi-agent pipelines, Claude Code, Amp, Copilot, Epic-to-Code acceleration</div>
          <div class="t-out">► <span class="t-highlight">Languages:</span> Java 26 (Streams, Concurrency), Scala, Python, C++, Sybase SQL</div>
          <div class="t-out">► <span class="t-highlight">Systems:</span> High-Throughput Trade Capture, Spring Boot, Distributed Microservices</div>
          <div class="t-out">► <span class="t-highlight">Testing:</span> Full multi-dependency test automation, Playwright, Selenium, OpenJDK -ea</div>
          <div class="t-out">► <span class="t-highlight">Data & Cloud:</span> Sybase ASE, AWS Redshift, Apache Spark ML</div>
        `);
        break;

      case 'matcha':
        appendToTerminal(`
          <div class="t-out"><span class="t-matcha">🍵 Whisking ceremonial grade Uji matcha...</span></div>
          <div class="t-out">[████████████████████] 100% Brewed!</div>
          <div class="t-out">Status: Peak cognitive clarity, smooth caffeine curve, 0 merge conflicts.</div>
        `);
        showToast("🍵 Ceremonial matcha served from CLI!", true);
        break;

      case 'resume':
      case 'cat resume':
        appendToTerminal(`
          <div class="t-out">📄 Opening <a href="Abhishek_Kinagi_Resume.pdf" target="_blank" style="color:var(--accent-cyan);">Abhishek_Kinagi_Resume.pdf</a> in a new tab...</div>
        `);
        window.open('Abhishek_Kinagi_Resume.pdf', '_blank');
        break;

      case 'projects':
      case 'repos':
        appendToTerminal(`
          <div class="t-out">⚡ <strong>code-lab:</strong> Monorepo holding verified Java algorithms, Playwright automations, and Python solvers.</div>
          <div class="t-out">🤖 <strong>ResumeUploader:</strong> Automated browser application processor for Chromium/Firefox.</div>
        `);
        break;

      case 'leadership':
      case 'vnit':
        appendToTerminal(`
          <div class="t-out">🏛️ <strong>VNIT Nagpur (4 Years Management):</strong> Directed institute-wide student operations, budget allocations, logistics, and multi-department teams for university festivals.</div>
        `);
        break;

      case 'clear':
      case 'cls':
        if (terminalScreen) terminalScreen.innerHTML = '';
        break;

      case 'sudo':
      case 'sudo su':
        appendToTerminal(`
          <div class="t-error">🚨 kinagi is not in the sudoers file. This incident will be reported to Abhishek. 😉</div>
        `);
        break;

      case 'date':
        appendToTerminal(`
          <div class="t-out">🕒 Local IST: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</div>
          <div class="t-out">🌐 UTC: ${new Date().toUTCString()}</div>
        `);
        break;

      case 'help':
        appendToTerminal(`
          <div class="t-out">Available commands:</div>
          <div class="t-out">  <span class="t-highlight">whoami</span>      - Executive profile & background</div>
          <div class="t-out">  <span class="t-ai">ai</span>          - Agentic workflows & AI engineering pipelines</div>
          <div class="t-out">  <span class="t-highlight">skills</span>      - Core weapons & technology stack</div>
          <div class="t-out">  <span class="t-highlight">projects</span>    - Monorepo highlights (code-lab)</div>
          <div class="t-out">  <span class="t-highlight">leadership</span>  - 4-year student management @ VNIT</div>
          <div class="t-out">  <span class="t-highlight">matcha</span>      - Brew fresh ceremonial matcha 🍵</div>
          <div class="t-out">  <span class="t-highlight">resume</span>      - View / Download updated 1-page PDF resume</div>
          <div class="t-out">  <span class="t-highlight">clear</span>       - Clear terminal buffer</div>
        `);
        break;

      default:
        appendToTerminal(`
          <div class="t-warn">command not found: "${cmd}". Type <span class="t-highlight">help</span> for a list of commands.</div>
        `);
        break;
    }
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        handleCommand(val);
      } else if (e.key === 'ArrowUp') {
        if (commandHistory.length > 0 && historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = '';
        }
      }
    });
  }

  if (terminalRunBtn && terminalInput) {
    terminalRunBtn.addEventListener('click', () => {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    });
  }

  // Quick Chips Click Event
  chipButtons.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) handleCommand(cmd);
    });
  });

  // 7. Interactive Skills / Weapons Filter
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

});
