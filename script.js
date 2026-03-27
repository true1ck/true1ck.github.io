document.addEventListener('DOMContentLoaded', () => {
  // 1. Cursor Glow Follow
  const cursorGlow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  // 2. Navigation Hide/Show on Scroll
  let lastScroll = 0;
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      nav.style.transform = 'translateY(0)';
      return;
    }
    if (currentScroll > lastScroll) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  // 3. Reveal Animations on Scroll
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .project-card, .stack-category').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // 4. Terminal Simulation Typing
  const terminalLines = [
    { text: 'whoami', type: 'cmd' },
    { text: 'chandresh-kerkar', type: 'output' },
    { text: 'cat stats.json', type: 'cmd' },
    { text: '{ "repos": 57, "langs": 10, "status": "building" }', type: 'json' },
    { text: 'ls projects/', type: 'cmd' },
    { text: 'netaboard/  pandapaste/  attendo-ai/  bse-ai/', type: 'output' },
    { text: './apply_yc.sh', type: 'cmd' },
    { text: 'Executing... builder_mindset.exe [OK]', type: 'output' }
  ];

  const terminalBody = document.getElementById('terminalBody');
  if (terminalBody) {
    let lineIndex = 0;
    terminalBody.innerHTML = ''; // Clear initial static content

    function typeLine() {
      if (lineIndex >= terminalLines.length) {
        // Reset or stop
        return;
      }

      const line = terminalLines[lineIndex];
      const lineDiv = document.createElement('div');
      
      if (line.type === 'cmd') {
        lineDiv.className = 't-line';
        lineDiv.innerHTML = `<span class="t-prompt">❯</span> <span class="t-cmd"></span>`;
        terminalBody.appendChild(lineDiv);
        
        const cmdSpan = lineDiv.querySelector('.t-cmd');
        let charIndex = 0;
        const typeChar = () => {
          if (charIndex < line.text.length) {
            cmdSpan.textContent += line.text[charIndex];
            charIndex++;
            setTimeout(typeChar, 50);
          } else {
            lineIndex++;
            setTimeout(typeLine, 500);
          }
        };
        typeChar();
      } else {
        lineDiv.className = line.type === 'json' ? 't-output t-json' : 't-output';
        lineDiv.textContent = line.text;
        terminalBody.appendChild(lineDiv);
        lineIndex++;
        setTimeout(typeLine, 800);
      }
      
      // Auto scroll terminal
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Start terminal animation when in view
    const termObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        typeLine();
        termObserver.disconnect();
      }
    }, { threshold: 0.5 });
    termObserver.observe(document.querySelector('.terminal'));
  }

  // 5. Hero Badge Pulsing Effect Logic (if any JS needed)
  // Already mostly handled by CSS animations
});
