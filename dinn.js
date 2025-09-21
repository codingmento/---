document.getElementById("year").textContent = new Date().getFullYear();

const listEl = document.getElementById("list");
const search = document.getElementById("search");

function render(items) {
  listEl.innerHTML = "";
  items.forEach((h) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h2>${h.title}</h2>
      <div class="meta">الرقم: ${h.id} — ${h.meta}</div>
      <div class="text" id="text-${h.id}">${h.text}</div>
      <div class="controls">
        <button class="btn" onclick="copyText(${h.id})">انسخ الحديث</button>
        <button class="btn secondary" onclick="toggle(${h.id})">طَي / توسيع</button>
      </div>
    `;
    listEl.appendChild(card);
  });
}

function toggle(id) {
  const t = document.getElementById("text-" + id);
  if (!t) return;
  if (t.style.maxHeight) {
    t.style.maxHeight = "";
    t.style.overflow = "";
  } else {
    t.style.maxHeight = "500px";
    t.style.overflow = "auto";
  }
}

function copyText(id) {
  const t = document.getElementById("text-" + id);
  if (!t) return;
  navigator.clipboard
    .writeText(t.innerText)
    .then(() => {
      alert("تم نسخ نص الحديث إلى الحافظة ✅");
    })
    .catch(() => alert("لم أنجح بالنسخ — جربي يدوياً"));
}

search.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) return render(hadiths);
  const filtered = hadiths.filter((h) =>
    (h.title + h.meta + h.text).toLowerCase().includes(q)
  );
  render(filtered);
});

// initial render
render(hadiths);
