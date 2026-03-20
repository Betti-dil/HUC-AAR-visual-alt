/*!
 * workflow-bridge.js — Enables cross-file workflow navigation
 * Drop into any source file: <script src="workflow-bridge.js"></script>
 * Works with file:// and http:// protocols.
 * When running inside the full-workflow iframe, hooks trigger buttons
 * to advance to the next step via postMessage.
 */
(function() {
  // Only activate when inside an iframe (workflow mode)
  if (window.parent === window) return;

  // Map of button text → step to advance to
  var triggers = {
    'Authorize investigation': 1,
    'Confirm Evidence pack': 2,
    'Confirm selection and authorize': 3,
    'Confirm and authorize': 3,
    'Confirm findings': 4
  };

  function hookButtons() {
    var btns = document.querySelectorAll('button');
    btns.forEach(function(btn) {
      var text = btn.textContent.trim();
      if (triggers[text] !== undefined && !btn.dataset.wfHooked) {
        btn.dataset.wfHooked = 'true';
        btn.removeAttribute('onclick');
        btn.onclick = null;
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          window.top.postMessage({ wfAdvance: triggers[text] }, '*');
        });
      }
    });

    // Special case: inject "Confirm findings" button in 04-Veracity-scoring
    var alertCard = document.querySelector('.alert-card-yellow');
    if (alertCard && !document.getElementById('wf-confirm-findings')) {
      // Check we're in the right file (has veracity-related content)
      var hasVeracity = document.querySelector('.col-confidence');
      if (hasVeracity) {
        var container = document.createElement('div');
        container.id = 'wf-confirm-findings';
        container.style.cssText = 'display:flex; justify-content:flex-end; margin-top:16px; padding:0 0 16px;';
        container.innerHTML = '<button class="btn btn-primary btn-md">Confirm findings</button>';
        alertCard.parentElement.appendChild(container);
        container.querySelector('button').addEventListener('click', function(e) {
          e.preventDefault();
          window.top.postMessage({ wfAdvance: 4 }, '*');
        });
      }
    }
  }

  // Run on DOMContentLoaded and also after a delay for dynamic content
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hookButtons);
  } else {
    hookButtons();
  }
  // Retry for late-rendered content
  setTimeout(hookButtons, 1000);
  setTimeout(hookButtons, 3000);
})();
