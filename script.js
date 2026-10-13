/**
 * ===================================================================
 * ROYAL ENFIELD - DIGITAL MARKETING CAMPAIGN DASHBOARD
 * Core Interactivity, AI Simulator, Calendar Engine & Chart.js Visuals
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCalendar();
  initCharts();
});

/* ===================================================================
   1. NAVIGATION & SCROLL HIGHLIGHTING
   =================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  // Active section spy on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('header, section');
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   2. 7-DAY CONTENT CALENDAR INTERACTIVE ENGINE
   =================================================================== */
const calendarData = {
  1: {
    dayBadge: "DAY 1",
    formatBadge: "Format: Teaser Reel & High-Impact Carousel",
    title: "Bike Introduction: The Rebirth of a Legend",
    narrative: "Launch day kicks off with a cinematic high-contrast silhouette teaser focusing on the iconic sculpted fuel tank, chrome engine contours, and the historic Royal Enfield insignia. The goal is sheer intrigue and algorithmic velocity.",
    caption: `"Legends don't fade; they evolve. Meet the machine built to conquer tomorrow's horizons while honoring 125 years of motorcycling heritage. Unveiling today. 🏍️⚡"`,
    channel: "Instagram & YouTube Shorts",
    kpi: "Viral Reach & 100K+ Shares",
    time: "7:30 PM IST (Peak Evening)",
    cta: "Turn On Post Notifications"
  },
  2: {
    dayBadge: "DAY 2",
    formatBadge: "Format: Technical Carousel & Infographic",
    title: "Key Features & Engineering: Power Meets Precision",
    narrative: "Highlighting raw engineering: the Sherpa/J-Series counter-balanced engine, ride-by-wire throttle modes, inverted front forks, and Tripper navigation connectivity.",
    caption: `"Engineered for adrenaline, calibrated for control. Swipe left to discover how 40Nm of low-end torque turns every mountain switchback into pure poetry. 🔧⚙️"`,
    channel: "Instagram & Facebook",
    kpi: "Saves, Bookmarks & In-depth Reads",
    time: "1:00 PM IST (Lunchtime Discovery)",
    cta: "Save This Guide for Your Next Garage Session"
  },
  3: {
    dayBadge: "DAY 3",
    formatBadge: "Format: 9:16 Cinematic Audio Reel (Sound-On)",
    title: "Riding Reel: The Signature Thump",
    narrative: "High-adrenaline POV drone footage following the motorcycle ripping through misty curves at dawn. Synchronized with the authentic, bass-heavy exhaust rumble.",
    caption: `"That isn't just sound—it’s a heartbeat that echoes through mountain valleys and city corridors alike. Headphones on, volume maxed. Feel the thump. 🎧🔥"`,
    channel: "Instagram Reels & YouTube Shorts",
    kpi: "Audio Saves & Video Completion Rate",
    time: "8:00 PM IST (Prime Commute Window)",
    cta: "Use This Sound for Your Weekend Ride"
  },
  4: {
    dayBadge: "DAY 4",
    formatBadge: "Format: Community Video Story & Quotes",
    title: "Customer Experience: Stories from the Saddle",
    narrative: "Authentic, relatable testimonials featuring everyday riders, long-distance touring veterans, and weekend warriors sharing their transformational journeys on the bike.",
    caption: `"From daily city traffic to crossing the world's highest motorable pass—listen to why 50,000+ riders call this motorcycle their second home. What is your ride story? 🏍️💬"`,
    channel: "Facebook Community & Instagram Stories",
    kpi: "Comments & User-Generated Content",
    time: "6:30 PM IST",
    cta: "Share Your Story with #MyRoyalEnfield"
  },
  5: {
    dayBadge: "DAY 5",
    formatBadge: "Format: Ultra-Wide Landscape Photography & Vlog",
    title: "Travel & Adventure: Conquering the High Passes",
    narrative: "Breathtaking visual travelogue across rugged Himalayan switchbacks, desert sand trails, and rain-soaked highways, affirming pure touring credentials.",
    caption: `"The road does not ask for your excuses; it demands your courage. Out here, you don't find a destination—you rediscover yourself. Where are you heading next? 🏔️"`,
    channel: "YouTube Full Video & Instagram Carousel",
    kpi: "Watch Time & Route Map Downloads",
    time: "11:00 AM IST (Weekend Planning)",
    cta: "Download the Official Himalayan Trail Route"
  },
  6: {
    dayBadge: "DAY 6",
    formatBadge: "Format: Lead Capture Reel & Dynamic Stories",
    title: "Test Ride Promotion: Feel the Machine",
    narrative: "Direct push inviting prospective buyers to experience the clutch pull, seat comfort, and throaty acceleration firsthand at their nearest authorized studio.",
    caption: `"Reading about it is exciting. Feeling 452cc of pure response beneath your fingertips is unforgettable. Free test rides are officially open across 300+ dealerships. 🏁"`,
    channel: "Meta Ads, Instagram & YouTube Cards",
    kpi: "Click-Through Rate (CTR) & Dealership Visits",
    time: "5:00 PM IST (Weekend Pre-Booking)",
    cta: "Tap Below to Reserve Your Slot Today"
  },
  7: {
    dayBadge: "DAY 7",
    formatBadge: "Format: High-Urgency Booking CTA & Early-Bird Offer",
    title: "Booking CTA: Your Journey Starts Here",
    narrative: "Final phase conversion blitz featuring exclusive early-delivery assurances, complimentary riding apparel kits, and priority test ride booking.",
    caption: `"The wait is over. The open road is calling your name. Book your machine online today and receive the exclusive First-Rider Touring Pack. Ride beyond limits. 🚀"`,
    channel: "Omnichannel (Search, Social, WhatsApp Push)",
    kpi: "Form Submissions & Test Ride Bookings",
    time: "10:00 AM IST (Sunday Morning Action)",
    cta: "Click 'Book Test Ride' to Claim Exclusive Perks"
  }
};

function initCalendar() {
  const tabs = document.querySelectorAll('.day-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const dayNum = tab.getAttribute('data-day');
      updateCalendarView(dayNum);
    });
  });
}

function updateCalendarView(day) {
  const data = calendarData[day];
  if (!data) return;

  const card = document.getElementById('calendarDisplayCard');
  if (card) {
    card.style.opacity = '0.5';
    setTimeout(() => {
      document.getElementById('calDayBadge').innerText = data.dayBadge;
      document.getElementById('calFormatBadge').innerText = data.formatBadge;
      document.getElementById('calThemeTitle').innerText = data.title;
      document.getElementById('calNarrative').innerText = data.narrative;
      document.getElementById('calCaption').innerText = data.caption;
      document.getElementById('calChannel').innerText = data.channel;
      document.getElementById('calKpi').innerText = data.kpi;
      document.getElementById('calTime').innerText = data.time;
      document.getElementById('calCta').innerText = data.cta;
      card.style.opacity = '1';
    }, 150);
  }
}

/* ===================================================================
   3. AI MARKETING ASSISTANT (Simulated Real-Time Generator)
   =================================================================== */
const aiContentBank = {
  hunter: {
    caption: `Built for the chaos of the metropolis and the pulse of young streets. The Royal Enfield Hunter 350 delivers razor-sharp handling, snappy ergonomics, and a rumble that turns heads at every red light. Why commute when you can conquer? 🏍️🏙️`,
    hashtags: `#Hunter350 #RoyalEnfield #AShotOfMotorcycling #UrbanRider #CityCruiser #GenZRiders #RidePure #StreetScrambler #TwoWheelsOnly`,
    adcopy: `⚡ TIRED OF CROWDED SUBWAYS? Take back control of your urban commute with the agile, head-turning Royal Enfield Hunter 350. Lightweight chassis, signature thump, and starting EMIs at just ₹3,999/mo. Book a 10-minute test ride near you now!`,
    reel: `🎬 REEL CONCEPT: "Urban Commute vs. Hunter 350"
• Scene 1: Person stuck in a crowded subway station checking watch with bored expression (0-2s)
• Scene 2: Cut to key turning in the Hunter 350 ignition with exhaust note roaring to life (3-5s)
• Scene 3: Fast-paced drone cuts zipping through neon-lit night city avenues (6-11s)
• Scene 4: Rider parks outside rooftop cafe with helmet resting on tank. Text overlay: "Your city. Your pace." (12-15s)`
  },
  himalayan: {
    caption: `Where the paved road ends, your true story begins. The all-new Himalayan 450 is engineered to conquer snow-covered passes, untamed riverbeds, and desolate trails. Pack your panniers; the high altitude is calling your name. 🏔️🧭`,
    hashtags: `#Himalayan450 #RoyalEnfield #BuiltForAllRoads #AdventureTouring #MotoExploration #LadakhRide #Sherpa450 #EnduroVibes #RideBeyondLimits`,
    adcopy: `🏔️ THE MOUNTAINS ARE CALLING. Conquer untamed terrain with the liquid-cooled Sherpa 450 engine and long-travel Showa suspension. Discover why world travelers trust the Royal Enfield Himalayan. Schedule your off-road test ride today!`,
    reel: `🎬 REEL CONCEPT: "Passing the Clouds: Himalayan 450 Trail Run"
• Scene 1: Slow-motion splash through a crystal-clear mountain river crossing (0-3s)
• Scene 2: Wide-angle vista shot overlooking a 15,000-foot Himalayan mountain pass (4-8s)
• Scene 3: Close-up of the Tripper TFT display navigating treacherous dirt hairpins (9-12s)
• Scene 4: Rider stands beside the bike watching sunset over snow peaks. Audio: Pure wind + deep exhaust thrum (13-15s)`
  },
  classic: {
    caption: `Timeless metal, handcrafted soul, and an unmistakable heartbeat that has inspired generations for over 70 years. The Classic 350 isn't just a motorcycle—it's an emotion passed down through decades. Ride the original legend. 👑🛡️`,
    hashtags: `#Classic350 #RoyalEnfield #TimelessClassic #PureMotorcycling #BulletLover #VintageMotorcycle #ThumpLife #HeritageOnWheels`,
    adcopy: `👑 SOME LEGENDS CAN NEVER BE DUPLICATED. The Royal Enfield Classic 350 delivers signature teardrop styling, heavy flywheel stability, and timeless craftsmanship. Claim exclusive delivery priority and booking perks this week only.`,
    reel: `🎬 REEL CONCEPT: "Generations of Brotherhood"
• Scene 1: Black-and-white vintage photograph of a grandfather riding a 1960 Bullet (0-3s)
• Scene 2: Seamless color transition to grandson cleaning the gleaming chrome tank of a modern Classic 350 (4-7s)
• Scene 3: Both kickstarting and riding together along a sunlit coastal highway (8-13s)
• Scene 4: Text overlay: "Built with metal. Kept with love. Royal Enfield Classic 350." (14-15s)`
  },
  continental: {
    caption: `Leaned forward, tucked in, throttle pinned wide. The Royal Enfield Continental GT 650 is pure cafe racer adrenaline. Twin cylinders, dual exhausts, and a rush that leaves ordinary traffic far behind. Live the ton-up life. 🏁⚡`,
    hashtags: `#ContinentalGT650 #RoyalEnfield #CafeRacer #TwinCylinder #TonUpClub #GT650 #SpeedAndStyle #RideInStyle #PureSpeed`,
    adcopy: `🏁 CAFÉ RACER REVOLUTION. Experience 47 horsepower of smooth twin-cylinder rumble on the Continental GT 650. Classic clip-on handlebars and sculpted racing tank. Test ride the legend at your nearest Royal Enfield studio.`,
    reel: `🎬 REEL CONCEPT: "The Midnight Ton-Up Run"
• Scene 1: Leather gloves zipping up, visor snapping down under neon streetlights (0-3s)
• Scene 2: Aggressive rev-match downshift echoing under a concrete tunnel (4-8s)
• Scene 3: Fast sweeping camera roll showing the twin chrome pipes gleaming at 100 km/h (9-12s)
• Scene 4: Smooth stop at an artisanal midnight diner, rider takes off helmet with satisfied grin (13-15s)`
  }
};

let typingInterval = null;

function generateAiContent(type) {
  // Update active state of buttons
  const buttons = document.querySelectorAll('.ai-btn');
  buttons.forEach(b => b.classList.remove('active'));
  
  if (type === 'caption') document.getElementById('btnGenCaption')?.classList.add('active');
  if (type === 'hashtags') document.getElementById('btnGenHashtags')?.classList.add('active');
  if (type === 'adcopy') document.getElementById('btnGenAdCopy')?.classList.add('active');
  if (type === 'reel') document.getElementById('btnGenReelIdea')?.classList.add('active');

  const model = document.getElementById('aiModelSelect')?.value || 'himalayan';
  const statusText = document.getElementById('aiStatusText');
  const outputBox = document.getElementById('aiOutputContent');

  if (!outputBox) return;

  if (statusText) statusText.innerText = "Synthesizing Campaign Copy...";
  outputBox.innerHTML = `<span class="typing-cursor"></span>`;

  // Clear any existing typing animation
  if (typingInterval) clearInterval(typingInterval);

  const selectedText = aiContentBank[model][type] || "Content generated successfully.";

  let i = 0;
  outputBox.innerHTML = '';
  typingInterval = setInterval(() => {
    if (i < selectedText.length) {
      outputBox.innerText = selectedText.substring(0, i + 1);
      outputBox.innerHTML += `<span class="typing-cursor"></span>`;
      i++;
    } else {
      clearInterval(typingInterval);
      outputBox.innerText = selectedText;
      if (statusText) statusText.innerText = "AI Output Ready";
    }
  }, 12);
}

function copyAiOutput() {
  const output = document.getElementById('aiOutputContent');
  if (output) {
    copyText(output.innerText);
  }
}

/* ===================================================================
   4. CHART.JS CAMPAIGN ANALYTICS
   =================================================================== */
function initCharts() {
  if (typeof Chart === 'undefined') {
    console.warn("Chart.js not loaded. Verify internet connection or CDN link.");
    return;
  }

  // Global Chart Styling Defaults
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Inter', sans-serif";

  // 1. Line Chart: Reach & Impressions Growth
  const reachCtx = document.getElementById('reachLineChart');
  if (reachCtx) {
    new Chart(reachCtx, {
      type: 'line',
      data: {
        labels: ['Day 1-5', 'Day 6-10', 'Day 11-15', 'Day 16-20', 'Day 21-25', 'Day 26-30'],
        datasets: [
          {
            label: 'Total Impressions (Millions)',
            data: [0.85, 1.62, 2.75, 3.90, 4.88, 5.82],
            borderColor: '#e63946',
            backgroundColor: 'rgba(230, 57, 70, 0.12)',
            borderWidth: 3,
            fill: true,
            tension: 0.38,
            pointBackgroundColor: '#e63946',
            pointRadius: 5
          },
          {
            label: 'Unique Reach (Millions)',
            data: [0.42, 0.88, 1.34, 1.76, 2.15, 2.45],
            borderColor: '#d4af37',
            backgroundColor: 'rgba(212, 175, 55, 0.08)',
            borderWidth: 3,
            fill: true,
            tension: 0.38,
            pointBackgroundColor: '#d4af37',
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { boxWidth: 12, font: { size: 12, weight: '500' } }
          }
        },
        scales: {
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { callback: value => value + 'M' }
          },
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.06)' }
          }
        }
      }
    });
  }

  // 2. Doughnut Chart: Platform Distribution
  const doughnutCtx = document.getElementById('platformDoughnutChart');
  if (doughnutCtx) {
    new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Instagram (52%)', 'YouTube (28%)', 'Facebook (14%)', 'Other (6%)'],
        datasets: [{
          data: [52, 28, 14, 6],
          backgroundColor: ['#e1306c', '#ff0000', '#1877f2', '#d4af37'],
          borderWidth: 2,
          borderColor: '#181d28',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { size: 11 } }
          }
        },
        cutout: '68%'
      }
    });
  }

  // 3. Bar Chart: Platform Engagement Comparison
  const barCtx = document.getElementById('engagementBarChart');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Instagram Reels', 'Instagram Carousel', 'YouTube Shorts', 'YouTube Long-form', 'Facebook Posts', 'Interactive Polls'],
        datasets: [{
          label: 'Total Engagements (Likes, Comments & Shares)',
          data: [194000, 112000, 86000, 42000, 28000, 20000],
          backgroundColor: [
            'rgba(230, 57, 70, 0.85)',
            'rgba(212, 175, 55, 0.85)',
            'rgba(255, 0, 0, 0.8)',
            'rgba(255, 77, 77, 0.7)',
            'rgba(24, 119, 242, 0.8)',
            'rgba(16, 185, 129, 0.8)'
          ],
          borderRadius: 8,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.15)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { callback: value => (value / 1000) + 'K' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }
}

/* ===================================================================
   5. TEST RIDE MODAL & LEAD CAPTURE ENGINE
   =================================================================== */
function openTestRideModal() {
  const modal = document.getElementById('testRideModal');
  const formContainer = document.getElementById('modalFormContainer');
  const successScreen = document.getElementById('modalSuccessScreen');

  if (modal) {
    if (formContainer) formContainer.style.display = 'block';
    if (successScreen) successScreen.style.display = 'none';
    modal.classList.add('active');
  }
}

function closeTestRideModal() {
  const modal = document.getElementById('testRideModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal when clicking backdrop outside
window.addEventListener('click', (e) => {
  const modal = document.getElementById('testRideModal');
  if (e.target === modal) {
    closeTestRideModal();
  }
});

function handleTestRideSubmit(e) {
  e.preventDefault();
  const formContainer = document.getElementById('modalFormContainer');
  const successScreen = document.getElementById('modalSuccessScreen');
  const bookingIdBadge = document.getElementById('successBookingId');

  // Generate simulated unique lead ID
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const bookingId = `RE-TR-${randomNum}`;

  if (bookingIdBadge) {
    bookingIdBadge.innerText = bookingId;
  }

  if (formContainer && successScreen) {
    formContainer.style.display = 'none';
    successScreen.style.display = 'block';
  }

  showToast(`Test ride booked successfully! Booking Ref: ${bookingId}`);
  document.getElementById('testRideForm')?.reset();
}

/* ===================================================================
   6. UTILITIES: CLIPBOARD COPY & TOAST
   =================================================================== */
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Copied to clipboard!");
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast("Copied to clipboard!");
  } catch (err) {
    showToast("Copying failed. Please copy manually.");
  }
  document.body.removeChild(textArea);
}

let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toastMessage');
  const toastText = document.getElementById('toastText');

  if (!toast || !toastText) return;

  toastText.innerText = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
