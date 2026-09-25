// Ózgeriwshi mátinler hám maǵlıwmatlardı usı jerden ózgertiń.
const CONFIG = {
  couple: {
    groom: "KÚYEW",
    bride: "KELIN"
  },
  wedding: {
    date: "2026-12-20", // YYYY-MM-DD
    time: "18:00",      // HH:MM (Tashkent jergilikli waqtı)
    timeZone: "+05:00",
    venue: "TOYXANA ATÍ",
    address: "MÁNZIL"
  },
  contact: {
    phone: "TELEFON NOMERI",
    telegramUsername: "USERNAME" // @ belgisisiz jazıń
  },
  specialTheme: "Bir ómir — birge…",
  text: {
    pageTitle: "Toyǵa shaqırıw",
    metaDescription: "Baxıtlı kúnimizdi birge atap ótiwge shaqıramız.",
    openingTitle: "Shaqırıw",
    sealAriaLabel: "Shaqırıwdı ashıw",
    introKicker: "Toyǵa shaqırıw",
    introTemplate: "Baxıtlı kúnimizde biz benen birge bolıń.",
    dateHeading: "Baxıtımız baslanatuǵın kún",
    countdownLabels: { days: "Kún", hours: "Saat", minutes: "Minut", seconds: "Sekund" },
    venueHeading: "Toyımız ótetuǵın mánzil",
    mapButton: "Kartada ashıw",
    mapAriaLabel: "Toyxana mánzilin Google kartasında ashıw",
    wishesHeading: "Kelin-kúyewge qutlıqlaw",
    wishesText: "Jańa ómir bosaǵasında bizge arnalǵan izgi sózlerińiz qádirli estelik bolıp qalsın.",
    nameLabel: "Atıńız",
    namePlaceholder: "Atıńızdı jazıń",
    nameRequired: "Atıńızdı jazıń.",
    wishLabel: "Júrek sózlerińiz",
    wishPlaceholder: "Jańa ómirińiz mehir hám baxıtqa tolsın…",
    wishRequired: "Tilegińizdi jazıń.",
    telegramButton: "Izgi tilekti jollaw",
    callButton: "Qońıraw etiw",
    telegramMessageTemplate: "Áziz kelin-kúyew!\n\n{WISH}\n\nShın júrekten tilekler menen, {NAME}",
    defaultWish: "Eń izgi tilekler menen!"
  },
  locale: "kaa-Latn-UZ",
  monthNames: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"]
};

(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const names = `${CONFIG.couple.groom} & ${CONFIG.couple.bride}`;
  const weddingDate = new Date(`${CONFIG.wedding.date}T${CONFIG.wedding.time}:00${CONFIG.wedding.timeZone}`);

  // Ay atları barlıq brauzerlerde qaraqalpaq tilinde kórsetiledi.
  const [year, month, day] = CONFIG.wedding.date.split("-");
  const dateText = `${Number(day)}-${CONFIG.monthNames[Number(month) - 1]}, ${year}`;
  const numericDate = CONFIG.wedding.date.split("-").reverse().join(" · ");
  const setText = (id, value) => { $(id).textContent = value; };

  function fillContent() {
    document.title = CONFIG.text.pageTitle;
    document.querySelector('meta[name="description"]').content = CONFIG.text.metaDescription;
    document.querySelector('meta[property="og:title"]').content = CONFIG.text.pageTitle;
    document.querySelector('meta[property="og:description"]').content = CONFIG.text.metaDescription;

    setText("opening-title", CONFIG.text.openingTitle);
    setText("opening-names", names);
    setText("opening-monogram", `${CONFIG.couple.groom.charAt(0)} · ${CONFIG.couple.bride.charAt(0)}`);
    setText("header-monogram", `${CONFIG.couple.groom.charAt(0)} & ${CONFIG.couple.bride.charAt(0)}`);
    setText("opening-date", numericDate);
    setText("hero-date", `${numericDate}  /  ${CONFIG.wedding.time}`);
    setText("letter-names", names);
    $("envelope").setAttribute("aria-label", CONFIG.text.sealAriaLabel);

    setText("intro-kicker", CONFIG.text.introKicker);
    [CONFIG.couple.groom, "&", CONFIG.couple.bride].forEach((name, index) => {
      const line = document.createElement("span");
      line.className = index === 1 ? "name-ampersand" : "name-line";
      line.textContent = name;
      $("couple-names").append(line);
    });
    setText("theme-note", CONFIG.specialTheme);
    setText("intro-text", CONFIG.text.introTemplate
      .replace("{DATE}", dateText)
      .replace("{TIME}", CONFIG.wedding.time));

    setText("date-heading", CONFIG.text.dateHeading);
    setText("date-day", day);
    setText("date-month", `${CONFIG.monthNames[Number(month) - 1]} ${year}`);
    setText("date-weekday", ["Ekshembi", "Dúyshembi", "Siyshembi", "Sárshembi", "Piyshembi", "Juma", "Shembi"][new Date(`${CONFIG.wedding.date}T12:00:00Z`).getUTCDay()]);
    setText("date-display", `${dateText} · ${CONFIG.wedding.time}`);
    setText("calendar-month", `${CONFIG.monthNames[Number(month) - 1]} ${year}`);
    const offset = (new Date(Date.UTC(Number(year), Number(month) - 1, 1)).getUTCDay() + 6) % 7;
    const monthDays = new Date(Date.UTC(Number(year), Number(month), 0)).getUTCDate();
    for (let cell = 0; cell < Math.ceil((offset + monthDays) / 7) * 7; cell++) {
      if (cell % 7 === 0) $("calendar-days").append(document.createElement("tr"));
      const td = document.createElement("td");
      const date = cell - offset + 1;
      if (date > 0 && date <= monthDays) {
        const label = document.createElement("span");
        label.textContent = date;
        if (date === Number(day)) {
          label.className = "wedding-day";
          label.setAttribute("aria-label", `${dateText} — toy kúnimiz`);
        }
        td.append(label);
      }
      $("calendar-days").lastElementChild.append(td);
    }
    setText("days-label", CONFIG.text.countdownLabels.days);
    setText("hours-label", CONFIG.text.countdownLabels.hours);
    setText("minutes-label", CONFIG.text.countdownLabels.minutes);
    setText("seconds-label", CONFIG.text.countdownLabels.seconds);

    setText("venue-heading", CONFIG.text.venueHeading);
    setText("venue-name", CONFIG.wedding.venue);
    setText("venue-address", CONFIG.wedding.address);
    const mapLink = $("map-link");
    mapLink.textContent = CONFIG.text.mapButton;
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${CONFIG.wedding.venue}, ${CONFIG.wedding.address}`)}`;
    mapLink.setAttribute("aria-label", CONFIG.text.mapAriaLabel);

    setText("wishes-heading", CONFIG.text.wishesHeading);
    setText("wishes-text", CONFIG.text.wishesText);
    setText("name-label", CONFIG.text.nameLabel);
    setText("wish-label", CONFIG.text.wishLabel);
    $("guest-name").placeholder = CONFIG.text.namePlaceholder;
    $("guest-wish").placeholder = CONFIG.text.wishPlaceholder;
    setText("telegram-button", CONFIG.text.telegramButton);
    const phoneLink = $("phone-link");
    phoneLink.textContent = `${CONFIG.text.callButton}: ${CONFIG.contact.phone}`;
    phoneLink.href = `tel:${CONFIG.contact.phone.replace(/[^+\d]/g, "")}`;

    setText("welcome-names", names);
    setText("footer-names", names);
    setText("footer-date", dateText);
  }

  function updateCountdown() {
    const remaining = Math.max(0, weddingDate.getTime() - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const values = {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60
    };

    Object.entries(values).forEach(([id, value]) => {
      const text = String(value).padStart(2, "0");
      if ($(id).textContent !== text) {
        setText(id, text);
        if (!document.body.classList.contains("is-locked")) {
          $(id).classList.remove("is-ticking");
          requestAnimationFrame(() => $(id).classList.add("is-ticking"));
        }
      }
    });
  }

  function openInvitation() {
    const envelope = $("envelope");
    const opening = $("opening");
    const invitation = $("invitation");
    const totalDelay = 2400;

    if (envelope.classList.contains("is-opening")) return;
    envelope.classList.add("is-opening");
    envelope.disabled = true;

    window.setTimeout(() => {
      opening.classList.add("is-gone");
      opening.setAttribute("inert", "");
      document.body.classList.remove("is-locked");
      invitation.setAttribute("aria-hidden", "false");
      invitation.removeAttribute("inert");
      invitation.classList.add("is-visible");
      document.querySelector(".hero-section").classList.add("is-revealed");
      $("couple-names").setAttribute("tabindex", "-1");
      $("couple-names").focus({ preventScroll: true });
    }, totalDelay);
  }

  function setupWishes() {
    const fields = [
      [$("guest-name"), CONFIG.text.nameRequired],
      [$("guest-wish"), CONFIG.text.wishRequired]
    ];
    fields.forEach(([field, message]) => {
      field.addEventListener("invalid", () => field.setCustomValidity(message));
      field.addEventListener("input", () => field.setCustomValidity(field.value.trim() ? "" : message));
    });
    $("wishes-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const name = $("guest-name").value.trim();
      const wish = $("guest-wish").value.trim();
      if (!name) {
        $("guest-name").setCustomValidity(CONFIG.text.nameRequired);
        $("guest-name").reportValidity();
        return;
      }

      if (!wish) {
        $("guest-wish").setCustomValidity(CONFIG.text.wishRequired);
        $("guest-wish").reportValidity();
        return;
      }

      const message = CONFIG.text.telegramMessageTemplate
        .replace("{NAME}", name)
        .replace("{WISH}", wish);
      const username = CONFIG.contact.telegramUsername.replace(/^@/, "");
      window.open(`https://t.me/${encodeURIComponent(username)}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    });
  }

  function setupReveal() {
    const sections = document.querySelectorAll(".reveal:not(.hero-section)");
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px" });

    sections.forEach((section) => observer.observe(section));
  }

  function setupAtmosphere() {
    const particleCount = window.matchMedia("(max-width: 640px)").matches ? 9 : 15;
    for (let index = 0; index < particleCount; index++) {
      const petal = document.createElement("i");
      petal.className = "petal";
      petal.style.setProperty("--left", `${(index * 37) % 100}%`);
      petal.style.setProperty("--size", `${5 + index % 5}px`);
      petal.style.setProperty("--duration", `${17 + index % 8}s`);
      petal.style.setProperty("--delay", `${-index * 2.7}s`);
      petal.style.setProperty("--drift", `${index % 2 ? 65 : -65}px`);
      $("atmosphere").append(petal);
    }
    document.addEventListener("visibilitychange", () => document.body.classList.toggle("page-hidden", document.hidden));
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.target.classList.toggle("in-view", entry.isIntersecting));
      });
      document.querySelectorAll(".photo-frame").forEach((photo) => observer.observe(photo));
    }
    let queued = false;
    const updateProgress = () => {
      const height = document.documentElement.scrollHeight - innerHeight;
      $("reading-progress").style.transform = `scaleX(${height > 0 ? Math.min(1, Math.max(0, scrollY / height)) : 0})`;
      queued = false;
    };
    window.addEventListener("scroll", () => {
      if (!queued) { queued = true; requestAnimationFrame(updateProgress); }
    }, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  function setupPhotoViewer() {
    const photos = Array.from(document.querySelectorAll(".photo-button"));
    const viewer = $("photo-viewer");
    let current = 0;
    let trigger;
    const showPhoto = (index) => {
      current = (index + photos.length) % photos.length;
      const photo = photos[current].querySelector("img");
      $("viewer-image").src = photo.src;
      $("viewer-image").alt = photo.alt;
      setText("viewer-caption", `${current + 1} / ${photos.length} · ${photo.alt}`);
    };
    photos.forEach((button, index) => button.addEventListener("click", () => {
      trigger = button;
      showPhoto(index);
      viewer.showModal();
      document.body.classList.add("viewer-open");
    }));
    $("viewer-close").addEventListener("click", () => viewer.close());
    $("viewer-prev").addEventListener("click", () => showPhoto(current - 1));
    $("viewer-next").addEventListener("click", () => showPhoto(current + 1));
    viewer.addEventListener("click", (event) => { if (event.target === viewer) viewer.close(); });
    viewer.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        viewer.close();
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        showPhoto(current + (event.key === "ArrowLeft" ? -1 : 1));
      }
    });
    viewer.addEventListener("close", () => {
      document.body.classList.remove("viewer-open");
      trigger?.focus({ preventScroll: true });
    });
  }

  fillContent();
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
  $("envelope").addEventListener("click", openInvitation);
  setupWishes();
  setupReveal();
  setupAtmosphere();
  setupPhotoViewer();
})();
