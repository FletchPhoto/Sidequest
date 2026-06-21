/* Sidequest — gamble logic, filters, stakes, custom quests, persistence */
(function () {
  'use strict';

  // Bump every PR. Keep in lockstep with CACHE in sw.js (e.g. 'sidequest-v3').
  var APP_VERSION = 'v3';

  var LS_SETTINGS = 'sq_settings';
  var LS_CUSTOM = 'sq_custom_quests';

  var RARITY_WEIGHTS = { common: 60, rare: 28, legendary: 10, mythic: 2 };
  // Vibe tiers are EXCLUSIVE: each vibe shows only its own quests, so flipping the
  // slider visibly changes the pool and Full Send is always a real full send.
  var TIME_LABEL = { quick: '≤ 1 hour', half: 'Half day', full: 'Full day' };
  var BUDGET_LABEL = { free: 'Free', cheap: 'Cheap', splurge: 'Splurge' };

  // ---- State ----
  var settings = loadSettings();
  var customQuests = loadCustom();
  var lastQuest = null;
  var spinning = false;

  function loadSettings() {
    var d = { vibe: 'cheeky', time: 'any', lads: 'any', budget: 'any', stakes: true };
    try {
      var s = JSON.parse(localStorage.getItem(LS_SETTINGS));
      if (s && typeof s === 'object') return Object.assign(d, s);
    } catch (e) {}
    return d;
  }
  function saveSettings() { try { localStorage.setItem(LS_SETTINGS, JSON.stringify(settings)); } catch (e) {} }

  function loadCustom() {
    try {
      var c = JSON.parse(localStorage.getItem(LS_CUSTOM));
      if (Array.isArray(c)) return c;
    } catch (e) {}
    return [];
  }
  function saveCustom() { try { localStorage.setItem(LS_CUSTOM, JSON.stringify(customQuests)); } catch (e) {} }

  function allQuests() { return (window.SIDEQUEST_DATA.quests || []).concat(customQuests); }
  function forfeits() { return window.SIDEQUEST_DATA.forfeits || []; }

  // ---- Filtering ----
  function pool() {
    return allQuests().filter(function (q) {
      if (q.spice !== settings.vibe) return false;
      if (settings.time !== 'any' && q.time !== settings.time) return false;
      if (settings.budget !== 'any' && q.budget !== settings.budget) return false;
      if (settings.lads !== 'any') {
        var want = settings.lads === '5' ? 5 : parseInt(settings.lads, 10);
        // quest works if its minimum lads requirement is met by the group size
        if (q.minLads > want) return false;
      }
      return true;
    });
  }

  // ---- Weighted draw ----
  function drawQuest(list) {
    if (!list.length) return null;
    var total = 0, i;
    for (i = 0; i < list.length; i++) total += RARITY_WEIGHTS[list[i].rarity] || 1;
    var r = Math.random() * total;
    for (i = 0; i < list.length; i++) {
      r -= RARITY_WEIGHTS[list[i].rarity] || 1;
      if (r <= 0) return list[i];
    }
    return list[list.length - 1];
  }

  function rngForfeit() {
    var f = forfeits();
    return f.length ? f[Math.floor(Math.random() * f.length)] : null;
  }

  // ---- Haptics ----
  function buzz(pattern) { try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) {} }

  // ---- DOM refs ----
  var reel = document.getElementById('reel');
  var lever = document.getElementById('lever');
  var resultEl = document.getElementById('result');
  var emptyEl = document.getElementById('empty');
  var poolNote = document.getElementById('poolNote');

  // ---- Slot reel ----
  var SLOT_H = 44;
  function buildReel(finalTitle) {
    var p = pool();
    var titles = [];
    var n = 26;
    for (var i = 0; i < n; i++) {
      var q = p[Math.floor(Math.random() * p.length)];
      titles.push(q ? q.title : '???');
    }
    titles.push(finalTitle); // landing slot
    reel.innerHTML = titles.map(function (t) { return '<div class="slot">' + escapeHtml(t) + '</div>'; }).join('');
    return titles.length;
  }

  function spin() {
    if (spinning) return;
    var p = pool();
    if (!p.length) {
      resultEl.classList.remove('show');
      emptyEl.classList.add('show');
      buzz(40);
      return;
    }
    emptyEl.classList.remove('show');
    spinning = true;
    lever.disabled = true;
    resultEl.classList.remove('show');

    var quest = drawQuest(p);
    lastQuest = quest;

    var count = buildReel(quest.title);
    reel.classList.add('spinning');
    // Center the final slot in the window (window 132px, slot 44px -> offset for centering)
    var windowCenterOffset = (132 - SLOT_H) / 2;
    var finalY = -((count - 1) * SLOT_H) + windowCenterOffset;

    // reset then animate
    reel.style.transition = 'none';
    reel.style.transform = 'translateY(' + windowCenterOffset + 'px)';
    buzz([8, 40, 8, 40, 8]);
    // force reflow
    void reel.offsetHeight;
    reel.style.transition = 'transform 2.6s cubic-bezier(.12,.62,.18,1)';
    reel.style.transform = 'translateY(' + finalY + 'px)';

    var done = false;
    function finish() {
      if (done) return; done = true;
      reel.classList.remove('spinning');
      spinning = false;
      lever.disabled = false;
      reveal(quest);
    }
    reel.addEventListener('transitionend', finish, { once: true });
    setTimeout(finish, 2800); // fallback
  }

  function reveal(quest) {
    var forfeitHtml = '';
    if (settings.stakes) {
      var f = rngForfeit();
      if (f) forfeitHtml = '<div class="forfeit"><b>Stakes:</b> Whoever bottles it ' + escapeHtml(f.charAt(0).toLowerCase() + f.slice(1)) + '</div>';
    }
    var ladsLabel = quest.minLads >= 5 ? '5+ lads' : (quest.minLads + '+ lads');
    resultEl.innerHTML =
      '<span class="badge ' + quest.rarity + '">' + quest.rarity + '</span>' +
      '<h2>' + escapeHtml(quest.title) + '</h2>' +
      '<p class="desc">' + escapeHtml(quest.desc) + '</p>' +
      '<div class="chips">' +
        '<span class="chip">⏱ ' + (TIME_LABEL[quest.time] || quest.time) + '</span>' +
        '<span class="chip">💷 ' + (BUDGET_LABEL[quest.budget] || quest.budget) + '</span>' +
        '<span class="chip">👥 ' + ladsLabel + '</span>' +
      '</div>' +
      forfeitHtml +
      '<div class="result-actions">' +
        '<button class="btn-reroll" id="reroll">↻ Re-roll</button>' +
        '<button class="btn-accept" id="accept">✓ Accept the quest</button>' +
      '</div>';
    resultEl.classList.add('show');
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    document.getElementById('reroll').addEventListener('click', spin);
    document.getElementById('accept').addEventListener('click', function () {
      buzz([10, 30, 10]);
      var btn = document.getElementById('accept');
      btn.textContent = '🍀 Good luck, lads!';
      btn.disabled = true;
    });

    var big = quest.rarity === 'legendary' || quest.rarity === 'mythic';
    if (big) { buzz([0, 60, 50, 120]); confetti(quest.rarity === 'mythic'); }
    else buzz(30);
  }

  // ---- Confetti ----
  var cvs = document.getElementById('confetti');
  var ctx = cvs.getContext('2d');
  function confetti(mega) {
    cvs.width = window.innerWidth; cvs.height = window.innerHeight;
    var colors = mega ? ['#ff5db1', '#ffcb45', '#4aa8ff', '#4ce0a8', '#fff']
                      : ['#ffb13d', '#ffcb45', '#fff', '#ff9d2f'];
    var pieces = [];
    var count = mega ? 160 : 90;
    for (var i = 0; i < count; i++) {
      pieces.push({
        x: Math.random() * cvs.width,
        y: -20 - Math.random() * cvs.height * 0.3,
        r: 4 + Math.random() * 6,
        c: colors[Math.floor(Math.random() * colors.length)],
        vy: 2.5 + Math.random() * 4,
        vx: -2 + Math.random() * 4,
        rot: Math.random() * 6.28,
        vr: -0.2 + Math.random() * 0.4,
      });
    }
    var start = Date.now();
    function frame() {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      var alive = false;
      for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i];
        p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.vy += 0.06;
        if (p.y < cvs.height + 20) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
        ctx.restore();
      }
      if (alive && Date.now() - start < 4000) requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, cvs.width, cvs.height);
    }
    requestAnimationFrame(frame);
  }

  // ---- Pool note ----
  function updatePoolNote() {
    var n = pool().length;
    poolNote.textContent = n + ' quest' + (n === 1 ? '' : 's') + ' in the pool for this vibe & filters';
  }

  // ---- Vibe segmented ----
  var vibeWrap = document.getElementById('vibe');
  function renderVibe() {
    Array.prototype.forEach.call(vibeWrap.children, function (b) {
      b.classList.toggle('active', b.dataset.vibe === settings.vibe);
    });
  }
  vibeWrap.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    settings.vibe = b.dataset.vibe; saveSettings(); renderVibe(); updatePoolNote();
    refreshReelTeaser();
    buzz(8);
  });

  // Rebuild the resting reel preview so the machine visibly reacts to vibe/filter changes.
  function refreshReelTeaser() {
    if (spinning) return;
    var p = pool();
    buildReel(p.length ? 'TAP SPIN' : 'NO QUESTS');
    reel.style.transition = 'none';
    reel.style.transform = 'translateY(' + ((132 - SLOT_H) / 2) + 'px)';
  }

  // ---- Filters sheet ----
  var filtersSheet = document.getElementById('filtersSheet');
  document.getElementById('openFilters').addEventListener('click', function () { openSheet(filtersSheet); });

  function renderFilters() {
    setGroup('time', settings.time);
    setGroup('lads', settings.lads);
    setGroup('budget', settings.budget);
    document.getElementById('stakesSwitch').classList.toggle('on', !!settings.stakes);
  }
  function setGroup(group, val) {
    var wrap = filtersSheet.querySelector('[data-group="' + group + '"]');
    Array.prototype.forEach.call(wrap.querySelectorAll('.opt'), function (o) {
      o.classList.toggle('on', o.dataset.val === val);
    });
  }
  filtersSheet.addEventListener('click', function (e) {
    var opt = e.target.closest('.opt');
    if (opt) {
      var group = opt.closest('[data-group]').dataset.group;
      var key = group === 'time' ? 'time' : group === 'budget' ? 'budget' : 'lads';
      settings[key] = opt.dataset.val;
      saveSettings(); setGroup(group, opt.dataset.val); updatePoolNote(); refreshReelTeaser(); buzz(6);
      return;
    }
    var sw = e.target.closest('#stakesSwitch');
    if (sw) {
      settings.stakes = !settings.stakes; saveSettings();
      sw.classList.toggle('on', settings.stakes); buzz(8);
    }
  });

  // ---- Quests / editor sheet ----
  var questsSheet = document.getElementById('questsSheet');
  document.getElementById('openQuests').addEventListener('click', function () { openSheet(questsSheet); renderCustom(); });

  // single-select pick groups in editor
  questsSheet.addEventListener('click', function (e) {
    var opt = e.target.closest('.opt'); if (!opt) return;
    var wrap = opt.closest('[data-pick]'); if (!wrap) return;
    Array.prototype.forEach.call(wrap.querySelectorAll('.opt'), function (o) { o.classList.remove('on'); });
    opt.classList.add('on');
    buzz(5);
  });

  function pickVal(name) {
    var sel = questsSheet.querySelector('[data-pick="' + name + '"] .opt.on');
    return sel ? sel.dataset.val : null;
  }

  document.getElementById('addQuest').addEventListener('click', function () {
    var title = document.getElementById('qTitle').value.trim();
    var desc = document.getElementById('qDesc').value.trim();
    if (!title) { document.getElementById('qTitle').focus(); buzz(40); return; }
    if (!desc) desc = 'Your own custom sidequest.';
    var q = {
      id: 'u' + Date.now(),
      title: title,
      desc: desc,
      spice: pickVal('spice') || 'cheeky',
      rarity: pickVal('rarity') || 'common',
      time: pickVal('time') || 'half',
      budget: pickVal('budget') || 'cheap',
      minLads: parseInt(pickVal('minLads') || '2', 10),
      tags: ['custom'],
      custom: true,
    };
    customQuests.push(q); saveCustom();
    document.getElementById('qTitle').value = '';
    document.getElementById('qDesc').value = '';
    buzz([10, 30, 10]);
    renderCustom(); updatePoolNote();
  });

  function renderCustom() {
    var list = document.getElementById('customList');
    var countEl = document.getElementById('customCount');
    if (!customQuests.length) {
      countEl.textContent = 'No custom quests yet — add your own above.';
      list.innerHTML = '';
      return;
    }
    countEl.textContent = customQuests.length + ' custom quest' + (customQuests.length === 1 ? '' : 's');
    list.innerHTML = customQuests.map(function (q) {
      return '<div class="qrow"><div><b>' + escapeHtml(q.title) + '</b>' +
        '<div class="qmeta">' + q.spice + ' · ' + q.rarity + ' · ' + (TIME_LABEL[q.time] || q.time) + '</div></div>' +
        '<button class="del" data-id="' + q.id + '">Delete</button></div>';
    }).join('');
  }
  document.getElementById('customList').addEventListener('click', function (e) {
    var btn = e.target.closest('.del'); if (!btn) return;
    var id = btn.dataset.id;
    customQuests = customQuests.filter(function (q) { return q.id !== id; });
    saveCustom(); renderCustom(); updatePoolNote(); buzz(20);
  });

  // ---- Sheets open/close ----
  function openSheet(sheet) { sheet.classList.add('show'); }
  function closeSheet(sheet) { sheet.classList.remove('show'); }
  document.querySelectorAll('.sheet-backdrop').forEach(function (bd) {
    bd.addEventListener('click', function (e) {
      if (e.target === bd || e.target.closest('[data-close]')) closeSheet(bd);
    });
  });

  // ---- Init ----
  lever.addEventListener('click', spin);
  // place reel at rest with a teaser
  buildReel('TAP SPIN');
  reel.style.transform = 'translateY(' + ((132 - SLOT_H) / 2) + 'px)';
  renderVibe();
  renderFilters();
  updatePoolNote();
  var versionEl = document.getElementById('appVersion');
  if (versionEl) versionEl.textContent = 'Sidequest ' + APP_VERSION;

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
})();
