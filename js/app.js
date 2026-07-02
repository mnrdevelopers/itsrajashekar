/* ==========================================================================
   PREMIUM CULINARY FLIPBOOK APPLICATION LOGIC
   Featuring: 3D Page Turn, Audio Synthesis, Image Probe, GSAP Cinematics, PDF Export
   ========================================================================== */

// 1. Fallback Recipe Database (Used if no custom images exist in /pages/)
const fallbackRecipes = [
  {
    title: "Vegetable Moong Dal Chilla",
    category: "Breakfast",
    desc: "A nutrient-dense, high-protein lentil pancake loaded with freshly grated carrots and anti-inflammatory spices.",
    prepTime: "10 mins",
    cookTime: "10 mins",
    servings: "2 servings",
    page: 3,
    isSinglePage: true,
    macros: { calories: "220 kcal", protein: "11g", carbs: "32g", fat: "6g" },
    ingredients: [
      { name: "Split Yellow Moong Dal (soaked)", qty: "1 cup" },
      { name: "Sweet Yellow Carrot (grated)", qty: "1 small" },
      { name: "Sweet Onion (finely chopped)", qty: "1 small" },
      { name: "Coriander Leaves & Spiced Cumin", qty: "1 tbsp each" },
      { name: "Ground Turmeric & Flaky Salt", qty: "1/2 tsp each" }
    ],
    directions: [
      "Soak moong dal for 4-6 hours. Drain and blend with a splash of water to form a smooth batter.",
      "Stir in grated carrot, chopped onion, coriander leaves, cumin, turmeric, and salt.",
      "Heat a non-stick skillet over medium heat, brush lightly with olive oil.",
      "Ladle batter onto skillet, spread thinly in circular motion, and cook until golden brown.",
      "Flip and cook the other side for 2 minutes. Serve warm with green chutney."
    ],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Egg & Vegetable Scramble",
    category: "Breakfast",
    desc: "A rapid, hormone-balancing morning scramble combining organic eggs, fresh baby spinach, and tomatoes.",
    prepTime: "5 mins",
    cookTime: "5 mins",
    servings: "1 serving",
    page: 4,
    isSinglePage: true,
    macros: { calories: "260 kcal", protein: "20g", carbs: "12g", fat: "16g" },
    ingredients: [
      { name: "Organic Eggs", qty: "2 whole" },
      { name: "Organic Egg Whites", qty: "2 whites" },
      { name: "Fresh Baby Spinach Leaves", qty: "1 cup" },
      { name: "Cherry Tomatoes & Onions", qty: "1/2 cup sliced" },
      { name: "Black Pepper & Sea Salt", qty: "To taste" }
    ],
    directions: [
      "Finely chop the onions and slice cherry tomatoes in halves.",
      "Heat a pan over medium heat, sauté onions and tomatoes for 2 minutes.",
      "Add baby spinach and cook until wilted.",
      "Whisk eggs and whites together, pour into the pan, and cook over medium-low heat.",
      "Stir gently until soft curds form and eggs are fully cooked. Season with pepper."
    ],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Creamy Coconut Turmeric Salmon",
    category: "Main Course",
    desc: "Anti-inflammatory wild salmon cooked in a rich, velvety coconut cream seasoned with ginger and skin-supportive turmeric.",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: "2 servings",
    page: 5,
    isSinglePage: false,
    ingredients: [
      { name: "Wild Salmon Fillets", qty: "2 (150g each)" },
      { name: "Unsweetened Coconut Milk", qty: "200ml" },
      { name: "Ground Turmeric & Ginger", qty: "1 tsp each" },
      { name: "Garlic Cloves (minced)", qty: "2 cloves" },
      { name: "Baby Spinach", qty: "1 cup" },
      { name: "Lime Juice & Olive Oil", qty: "1 tbsp each" }
    ],
    directions: [
      "Season salmon with pinch of salt, pepper, and turmeric. Sear in olive oil over medium-high heat for 4 minutes per side.",
      "Remove salmon. In the same pan, sauté minced garlic and grated ginger for 1 minute until fragrant.",
      "Pour in coconut milk, add turmeric, and simmer on low for 5 minutes until the sauce reduces slightly.",
      "Stir in baby spinach until wilted. Return salmon to the pan, baste with coconut curry sauce, and finish with fresh lime juice."
    ],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Quinoa & Roasted Chickpea Bowl",
    category: "Lunch",
    desc: "A low-glycemic, fiber-packed grain bowl that stabilizes blood sugar and supports insulin sensitivity.",
    prepTime: "15 mins",
    cookTime: "20 mins",
    servings: "2 bowls",
    page: 7,
    isSinglePage: false,
    ingredients: [
      { name: "Organic Quinoa (cooked)", qty: "1.5 cups" },
      { name: "Canned Chickpeas (rinsed)", qty: "1 can" },
      { name: "Smoked Paprika & Cumin", qty: "1/2 tsp each" },
      { name: "Cucumber & Cherry Tomatoes", qty: "1 cup chopped" },
      { name: "Tahini Cream Dressing", qty: "2 tbsp" },
      { name: "Lemon Juice & Parsley", qty: "To garnish" }
    ],
    directions: [
      "Preheat oven to 400°F (200°C). Toss chickpeas with olive oil, paprika, cumin, salt, and roast for 20 minutes.",
      "Divide cooked quinoa evenly into two serving bowls.",
      "Arrange roasted chickpeas, chopped cucumber, and cherry tomatoes over the quinoa bed.",
      "Whisk tahini with warm water, lemon juice, and garlic. Drizzle over the bowls and garnish with chopped fresh parsley."
    ],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Avocado Spinach Berry Smoothie",
    category: "Breakfast",
    desc: "A nutrient-dense, low-sugar green smoothie loaded with healthy fats, thyroid-supportive zinc, and antioxidants.",
    prepTime: "5 mins",
    cookTime: "0 mins",
    servings: "1 serving",
    page: 9,
    isSinglePage: false,
    ingredients: [
      { name: "Baby Spinach (packed)", qty: "1 cup" },
      { name: "Frozen Organic Mixed Berries", qty: "1/2 cup" },
      { name: "Ripe Avocado", qty: "1/2 medium" },
      { name: "Unsweetened Almond Milk", qty: "250ml" },
      { name: "Chia Seeds", qty: "1 tbsp" },
      { name: "Plant-Based Protein Powder", qty: "1 scoop" }
    ],
    directions: [
      "Combine baby spinach, frozen mixed berries, and avocado in a high-speed blender.",
      "Add almond milk, chia seeds, and protein powder.",
      "Blend on high for 60-90 seconds until perfectly smooth and creamy.",
      "Pour into a glass, let sit for 2 minutes to allow chia seeds to thicken, and enjoy immediately."
    ],
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Zucchini Noodles with Seed Pesto",
    category: "Lunch",
    desc: "Light and nourishing zucchini spirals tossed in a zinc-rich raw pumpkin seed and basil pesto.",
    prepTime: "15 mins",
    cookTime: "5 mins",
    servings: "2 servings",
    page: 11,
    isSinglePage: false,
    ingredients: [
      { name: "Fresh Zucchini (spiralized)", qty: "2 large" },
      { name: "Raw Pumpkin Seeds (Pepitas)", qty: "1/2 cup" },
      { name: "Fresh Basil Leaves", qty: "1 cup packed" },
      { name: "Garlic Clove", qty: "1 clove" },
      { name: "Extra Virgin Olive Oil", qty: "60ml" },
      { name: "Nutritional Yeast / Flaky Salt", qty: "1 tbsp / pinch" }
    ],
    directions: [
      "Toast pumpkin seeds in a dry skillet over low heat for 3 minutes until slightly puffed.",
      "In a food processor, blend pumpkin seeds, basil, garlic, olive oil, and nutritional yeast until smooth to make pesto.",
      "Sauté spiralized zucchini noodles in a drop of olive oil for 2 minutes just until warmed (do not overcook).",
      "Toss the zucchini noodles with pumpkin seed pesto and plate immediately. Garnish with whole pumpkin seeds."
    ],
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Slow-Cooker Lemon Herb Chicken",
    category: "Main Course",
    desc: "Tender, high-protein chicken breast slow-cooked with fresh lemons, oregano, and selenium-rich garlic.",
    prepTime: "15 mins",
    cookTime: "4 hours",
    servings: "4 portions",
    page: 13,
    isSinglePage: false,
    ingredients: [
      { name: "Organic Chicken Breasts", qty: "4 breasts" },
      { name: "Fresh Lemons (sliced)", qty: "2 lemons" },
      { name: "Garlic Cloves (smashed)", qty: "6 cloves" },
      { name: "Dried Oregano & Thyme", qty: "1 tsp each" },
      { name: "Low-Sodium Chicken Broth", qty: "100ml" },
      { name: "Extra Virgin Olive Oil", qty: "1 tbsp" }
    ],
    directions: [
      "Place sliced lemons and smashed garlic cloves at the bottom of the slow cooker.",
      "Rub chicken breasts with olive oil, oregano, thyme, salt, and pepper, and lay them over the lemon bed.",
      "Pour chicken broth around the sides. Cover and cook on LOW for 4 hours until tender.",
      "Shred or slice the chicken, serving with a drizzle of the cooking juices and fresh lemon wedges."
    ],
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Golden Milk Chia Pudding",
    category: "Dessert",
    desc: "A rich, anti-inflammatory chia pudding spiced with turmeric, cinnamon, and coconut milk to soothe the gut.",
    prepTime: "10 mins",
    cookTime: "4 hours",
    servings: "2 servings",
    page: 15,
    isSinglePage: false,
    ingredients: [
      { name: "Chia Seeds", qty: "4 tbsp" },
      { name: "Light Coconut Milk", qty: "250ml" },
      { name: "Ground Turmeric & Cinnamon", qty: "1/2 tsp each" },
      { name: "Raw Honey / Stevia", qty: "1 tsp (optional)" },
      { name: "Pinch of Black Pepper", qty: "1 pinch" },
      { name: "Slivered Almonds", qty: "Garnish" }
    ],
    directions: [
      "In a bowl, whisk coconut milk, turmeric, cinnamon, honey, and black pepper (peperine helps turmeric absorption).",
      "Stir in chia seeds thoroughly. Let sit for 5 minutes, then stir again to break up any lumps.",
      "Divide into two small mason jars. Cover and refrigerate for at least 4 hours (or overnight).",
      "Serve chilled, garnished with cinnamon dust and slivered almonds."
    ],
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Sweet Potato Lentil Shakshuka",
    category: "Breakfast",
    desc: "A nutrient-rich skillet breakfast featuring sweet potato cubes and high-fiber lentils poached in spiced tomato sauce.",
    prepTime: "15 mins",
    cookTime: "25 mins",
    servings: "2 servings",
    page: 17,
    isSinglePage: false,
    ingredients: [
      { name: "Sweet Potato (diced)", qty: "1 small" },
      { name: "Cooked Brown Lentils", qty: "1 cup" },
      { name: "Canned Crushed Tomatoes", qty: "400g" },
      { name: "Organic Eggs", qty: "3 large" },
      { name: "Cumin & Coriander Powder", qty: "1/2 tsp each" },
      { name: "Fresh Cilantro & Olive Oil", qty: "To garnish" }
    ],
    directions: [
      "Sauté diced sweet potato in olive oil for 8 minutes until slightly tender and browned.",
      "Add cooked lentils, crushed tomatoes, cumin, coriander, salt, and simmer for 8 minutes until potatoes are fully cooked.",
      "Make 3 small wells in the sauce and crack eggs directly into them. Cover and simmer on low for 6-8 minutes until whites set.",
      "Garnish with fresh chopped cilantro and serve warm directly from the skillet."
    ],
    image: "https://images.unsplash.com/photo-1590412200988-a436bb705300?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Roasted Beet & Burrata Salad",
    category: "Appetizer",
    desc: "A follicular-phase superstar salad with folic-acid-rich roasted beets, creamy burrata, and pumpkin seeds.",
    prepTime: "15 mins",
    cookTime: "30 mins",
    servings: "2 portions",
    page: 19,
    isSinglePage: false,
    ingredients: [
      { name: "Medium Beets (peeled)", qty: "2 beets" },
      { name: "Fresh Burrata Cheese", qty: "1 ball" },
      { name: "Arugula Leaves", qty: "2 cups" },
      { name: "Raw Walnut Halves", qty: "2 tbsp" },
      { name: "Extra Virgin Olive Oil", qty: "2 tbsp" },
      { name: "Balsamic Vinegar", qty: "1 tsp" }
    ],
    directions: [
      "Cut beets into wedges, toss with olive oil, and roast at 400°F (200°C) for 30 minutes until tender.",
      "Arrange fresh arugula on a serving plate, and place roasted beets on top.",
      "Tear the burrata cheese ball and place it in the center of the salad.",
      "Drizzle with balsamic vinegar, olive oil, and sprinkle toasted walnuts and a pinch of flaky sea salt."
    ],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Berry Matcha Oatmeal Bake",
    category: "Breakfast",
    desc: "Metabolism-boosting organic oats baked with matcha powder, anti-inflammatory berries, and coconut flakes.",
    prepTime: "10 mins",
    cookTime: "25 mins",
    servings: "4 servings",
    page: 21,
    isSinglePage: false,
    ingredients: [
      { name: "Gluten-Free Rolled Oats", qty: "1.5 cups" },
      { name: "Organic Matcha Powder", qty: "1 tbsp" },
      { name: "Baking Powder & Salt", qty: "1 tsp / pinch" },
      { name: "Unsweetened Coconut Milk", qty: "300ml" },
      { name: "Fresh Blueberries & Raspberries", qty: "1 cup" },
      { name: "Shredded Coconut", qty: "2 tbsp" }
    ],
    directions: [
      "In a bowl, mix rolled oats, matcha powder, baking powder, and pinch of salt.",
      "Pour in coconut milk and stir until combined. Gently fold in half of the berries.",
      "Pour mixture into a greased baking dish, top with remaining berries and shredded coconut flakes.",
      "Bake at 350°F (175°C) for 25 minutes until set. Let cool slightly before cutting."
    ],
    image: "https://images.unsplash.com/photo-1517093602195-b40af9688b46?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Ginger-Garlic Steamed Sea Bass",
    category: "Main Course",
    desc: "A thyroid-boosting steamed white fish rich in iodine, selenium, and digestive-friendly fresh ginger.",
    prepTime: "10 mins",
    cookTime: "10 mins",
    servings: "2 servings",
    page: 23,
    isSinglePage: false,
    ingredients: [
      { name: "Sea Bass Fillets", qty: "2 fillets (150g)" },
      { name: "Fresh Ginger (julienned)", qty: "2 tbsp" },
      { name: "Garlic Cloves (sliced)", qty: "3 cloves" },
      { name: "Green Onions (scallions)", qty: "2 stalks" },
      { name: "Tamari (Gluten-Free Soy Sauce)", qty: "2 tbsp" },
      { name: "Sesame Oil", qty: "1 tsp" }
    ],
    directions: [
      "Place sea bass fillets on a heatproof plate that fits inside your steamer basket.",
      "Top the fish with julienned ginger and sliced garlic. Steam over boiling water for 8-10 minutes.",
      "Carefully remove plate. Scatter finely shredded green onions over the steamed fish.",
      "Warm tamari and sesame oil in a small pan, pour it sizzling hot over the scallions and fish, and serve."
    ],
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80"
  }
];

// App States
let pageFlip = null;
let currentMode = 'html'; // 'html' or 'image'
let hasCustomCover = false;
let detectedImages = [];
let zoomScale = 1.0;
let isMuted = true;
let flipVolume = 0.5;
let autoPlayInterval = null;
let isAutoPlaying = false;
let favorites = [];

// DOM References
const loadingOverlay = document.getElementById('loading-overlay');
const progressCircle = document.getElementById('progress-circle');
const progressText = document.getElementById('progress-text');
const bookElement = document.getElementById('book');
const hudElement = document.getElementById('controls-hud');
const sidebarElement = document.getElementById('sidebar');
const recipeSearchInput = document.getElementById('recipe-search');
const searchClearBtn = document.getElementById('search-clear-btn');
const tocListElement = document.getElementById('toc-list');
const noSearchResults = document.getElementById('no-search-results');
const tabRecipes = document.getElementById('tab-recipes');
const tabFavorites = document.getElementById('tab-favorites');
const favCountBadge = document.getElementById('fav-count-badge');
const bookmarkBtn = document.getElementById('hud-bookmark-btn');
const favoriteBtn = document.getElementById('hud-favorite-btn');
const playBtn = document.getElementById('hud-play-btn');
const darkmodeBtn = document.getElementById('hud-darkmode-btn');
const audioBtn = document.getElementById('hud-audio-btn');
const volumeSlider = document.getElementById('flip-volume-slider');
const bgAmbientMusic = document.getElementById('bg-ambient-music');
const shareModal = document.getElementById('share-modal');
const toastElement = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

/* ==========================================================================
   IMAGE PROBE LOGIC
   ========================================================================== */
function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function scanPagesFolder() {
  const detected = [];
  const maxPagesToCheck = 32;
  const extensions = ['.jpg', '.png', '.jpeg'];

  // Check files in parallel for performance optimization
  const checkPromises = [];
  for (let i = 1; i <= maxPagesToCheck; i++) {
    const pageNumStr = String(i).padStart(2, '0');
    extensions.forEach((ext) => {
      const path = `pages/${pageNumStr}${ext}`;
      checkPromises.push(
        checkImageExists(path).then((exists) => {
          if (exists) {
            detected.push({ path, index: i });
          }
        })
      );
    });
  }

  await Promise.all(checkPromises);
  // Sort by index to maintain page order
  detected.sort((a, b) => a.index - b.index);
  
  // Filter out duplicates (if both 01.jpg and 01.png exist, choose first)
  const uniqueDetected = [];
  const seenIndices = new Set();
  detected.forEach((item) => {
    if (!seenIndices.has(item.index)) {
      seenIndices.add(item.index);
      uniqueDetected.push(item);
    }
  });

  return uniqueDetected.map(item => item.path);
}

/* ==========================================================================
   AUDIO SYNTHESIS FOR PAPER TURN
   ========================================================================== */
function playSynthesizedFlipSound(volume = 0.5) {
  if (isMuted || volume <= 0) return;
  
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    
    const audioCtx = new AudioContextClass();
    
    // Create random white noise buffer
    const bufferSize = audioCtx.sampleRate * 0.45; // 0.45 seconds duration
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    
    // Bandpass filter to make it sound like paper scraping
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(950, audioCtx.currentTime);
    // Sweep the filter frequency down to simulate page slowing down at turn end
    filter.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.4);
    filter.Q.setValueAtTime(3.0, audioCtx.currentTime);
    
    // Amplitude envelope
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    // Quick attack, fade out
    gainNode.gain.linearRampToValueAtTime(volume * 0.18, audioCtx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.42);
    
    // Lowpass filter to soften high frequencies
    const lowpass = audioCtx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(3500, audioCtx.currentTime);
    
    // Connections
    noiseSource.connect(filter);
    filter.connect(lowpass);
    lowpass.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    noiseSource.start();
    noiseSource.stop(audioCtx.currentTime + 0.45);
  } catch (error) {
    console.error("Web Audio API flip sound synthesis failed:", error);
  }
}

/* ==========================================================================
   HTML PAGES CUSTOM GENERATORS (PORTRAIT 4:5 LAYOUT)
   ========================================================================== */
function getSecondPageHTMLContent() {
  return `
    <div class="page-content tips-html-layout">
      <div class="wave"></div>
      <div class="icon-top">👑</div>
      
      <h1 class="tips-main-title">TIPS FOR WOMEN</h1>
      
      <div class="heart">♡</div>
      
      <ul class="tips-list">
        <li><i class="fa-solid fa-heart-pulse"></i> Eat more whole, natural foods.</li>
        <li><i class="fa-solid fa-egg"></i> Include protein in every meal.</li>
        <li><i class="fa-solid fa-glass-water"></i> Stay hydrated.</li>
        <li><i class="fa-solid fa-bed"></i> Manage stress &amp; get good sleep.</li>
        <li><i class="fa-solid fa-circle-check"></i> Be consistent, not perfect.</li>
      </ul>

      <div class="limit-section-title">
        <span class="limit-line"></span>
        <span class="limit-text">♡ FOODS TO LIMIT ♡</span>
        <span class="limit-line"></span>
      </div>

      <div class="limit-grid">
        <div class="limit-item">
          <div class="limit-circle">🥤</div>
          <span class="limit-label">Sugary Drinks</span>
        </div>
        <div class="limit-item">
          <div class="limit-circle">🍞</div>
          <span class="limit-label">Refined Carbs</span>
        </div>
        <div class="limit-item">
          <div class="limit-circle">🍟</div>
          <span class="limit-label">Deep Fried</span>
        </div>
        <div class="limit-item">
          <div class="limit-circle">🍩</div>
          <span class="limit-label">Processed</span>
        </div>
      </div>

      <div class="tips-quote-box">
        <p>"Small healthy choices every day create big changes over time."</p>
      </div>

      <div class="instagram-footer">
        <span>LOVE YOURSELF | Itsrajashekar</span>
        <span class="page-number-lbl">2</span>
      </div>
    </div>
  `;
}

const customRecipeData = [
  {
    title: "Vegetable Moong Dal Chilla",
    category: "Recipe 01 • Breakfast",
    calories: "220 kcal",
    protein: "11g",
    carbs: "32g",
    fiber: "6g",
    img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "1 cup Yellow Moong Dal (soaked)",
      "1 small onion (finely chopped)",
      "1 carrot (grated)",
      "Coriander leaves (chopped)",
      "Salt, turmeric, cumin powder"
    ],
    directions: [
      "Soak moong dal for 4-6 hours.",
      "Blend into a smooth, pouring batter.",
      "Stir chopped vegetables and spices into batter.",
      "Heat a pan, spread batter like a thin crepe/dosa.",
      "Drizzle ghee on edges, cook both sides until golden."
    ],
    benefits: "Yellow Moong Dal is a low-glycemic, high-protein plant source that supports insulin sensitivity and weight management for women with PCOS."
  },
  {
    title: "Egg & Vegetable Scramble",
    category: "Recipe 02 • Breakfast",
    calories: "260 kcal",
    protein: "20g",
    carbs: "12g",
    fiber: "4g",
    img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "2 Whole Eggs (organic preferred)",
      "2 Egg Whites",
      "Handful fresh spinach leaves",
      "1/2 onion & 1/2 tomato (chopped)",
      "Pinch of black pepper & salt"
    ],
    directions: [
      "Chop onion, tomato, and spinach finely.",
      "Sauté onion and tomato in a pan with a drop of ghee.",
      "Add spinach and cook until wilted.",
      "Pour whisked eggs into the pan.",
      "Stir gently on low heat until softly scrambled."
    ],
    benefits: "Rich in choline, proteins, and selenium, which are essential building blocks for thyroid hormone synthesis and metabolic functions."
  },
  {
    title: "Millet Vegetable Upma",
    category: "Recipe 03 • Breakfast",
    calories: "240 kcal",
    protein: "8g",
    carbs: "38g",
    fiber: "7g",
    img: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "1 cup Foxtail Millet (washed)",
      "1/2 cup Mixed veggies (peas, carrots)",
      "1 tsp Mustard seeds & curry leaves",
      "Pinch of salt & turmeric powder",
      "1 tbsp cold-pressed coconut oil"
    ],
    directions: [
      "Dry roast foxtail millet on low heat until fragrant.",
      "Heat oil in a pan, pop mustard seeds and add curry leaves.",
      "Add chopped mixed vegetables and sauté for 3 minutes.",
      "Pour 2.5 cups of water, add turmeric and salt, bring to a boil.",
      "Stir in millet, cover, and simmer until cooked and fluffy."
    ],
    benefits: "Foxtail millet is rich in dietary fiber and magnesium, helping to stabilize glycemic response and improve lipid profiles."
  },
  {
    title: "Avocado & Spinach Toast",
    category: "Recipe 04 • Lunch Selection",
    calories: "290 kcal",
    protein: "9g",
    carbs: "22g",
    fiber: "8g",
    img: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "1 Slice sourdough or gluten-free bread",
      "1/2 Ripe avocado",
      "Handful of baby spinach leaves",
      "1 tsp fresh lemon juice",
      "Chili flakes, sea salt, black sesame"
    ],
    directions: [
      "Toast bread until crisp and golden brown.",
      "Mash avocado with lemon juice, salt, and pepper in a bowl.",
      "Sauté spinach leaves in a pan with water for 1 minute.",
      "Spread mashed avocado over the toasted bread.",
      "Top with sautéed spinach, chili flakes, and black sesame."
    ],
    benefits: "Monounsaturated fats from avocado help absorb fat-soluble vitamins and support progesterone production."
  },
  {
    title: "Berry Hormone Smoothie",
    category: "Recipe 05 • Snack Selection",
    calories: "210 kcal",
    protein: "15g",
    carbs: "28g",
    fiber: "5g",
    img: "https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "1 cup Frozen mixed berries",
      "1 scoop Organic plant-based protein",
      "1 tbsp ground flaxseeds",
      "1 cup unsweetened almond milk",
      "Pinch of cinnamon powder"
    ],
    directions: [
      "Add berries and protein powder to blender.",
      "Add flaxseeds and cinnamon for extra hormone support.",
      "Pour in almond milk.",
      "Blend on high speed until thick and smooth.",
      "Serve cold immediately."
    ],
    benefits: "Berries are loaded with antioxidants that lower systemic inflammation, while flaxseeds support healthy estrogen metabolism."
  },
  {
    title: "Lemon Herb Grilled Salmon",
    category: "Recipe 06 • Dinner Selection",
    calories: "380 kcal",
    protein: "34g",
    carbs: "4g",
    fiber: "2g",
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "150g Salmon fillet (skin-on)",
      "1/2 Lemon (sliced & juiced)",
      "1 clove Garlic (minced)",
      "1 tsp Rosemary & fresh dill",
      "1 tbsp Extra virgin olive oil"
    ],
    directions: [
      "Marinate salmon with olive oil, lemon juice, garlic, and herbs.",
      "Heat a grill pan or cast iron skillet on medium-high.",
      "Cook salmon skin-side down for 4-5 minutes.",
      "Gently flip and cook for another 3 minutes.",
      "Serve warm garnished with lemon slices."
    ],
    benefits: "High concentration of Omega-3 fatty acids reduces inflammation, balances insulin, and supports thyroid cellular health."
  },
  {
    title: "Coconut Chia Seed Pudding",
    category: "Recipe 07 • Dessert Selection",
    calories: "180 kcal",
    protein: "5g",
    carbs: "18g",
    fiber: "11g",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "3 tbsp Chia seeds",
      "1 cup Unsweetened light coconut milk",
      "1/2 tsp pure vanilla extract",
      "1 tsp maple syrup or stevia",
      "Handful of fresh raspberries"
    ],
    directions: [
      "Whisk chia seeds, coconut milk, vanilla, and syrup in a bowl.",
      "Let sit for 10 minutes, then stir again to break clumps.",
      "Cover and chill in refrigerator for 4 hours.",
      "Top with fresh raspberries before serving."
    ],
    benefits: "Chia seeds contain alpha-linolenic acid (ALA) and high fiber, promoting gut health and bowel regularity to clear excess hormones."
  },
  {
    title: "Mediterranean Chickpea Salad",
    category: "Recipe 08 • Lunch Selection",
    calories: "310 kcal",
    protein: "12g",
    carbs: "42g",
    fiber: "12g",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "1 cup Canned chickpeas (drained)",
      "1/2 Cucumber (chopped)",
      "1/2 cup Cherry tomatoes (halved)",
      "1 tbsp lemon juice & olive oil",
      "Crumbled vegan feta cheese & parsley"
    ],
    directions: [
      "Rinse and drain chickpeas thoroughly.",
      "In a salad bowl, toss chickpeas, cucumber, and tomatoes.",
      "Drizzle with lemon juice and olive oil.",
      "Garnish with chopped parsley.",
      "Top with crumbled feta and serve."
    ],
    benefits: "Legumes provide slow-releasing carbohydrates and plant-based protein to sustain energy and prevent glucose spikes."
  },
  {
    title: "Turmeric Ginger Golden Latte",
    category: "Recipe 09 • Drink Selection",
    calories: "120 kcal",
    protein: "3g",
    carbs: "12g",
    fiber: "1g",
    img: "https://images.unsplash.com/photo-1542556040-ee9808df090c?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "1 cup Unsweetened almond or coconut milk",
      "1/2 tsp organic Turmeric powder",
      "1/4 tsp Ginger powder",
      "Pinch of black pepper & cinnamon",
      "1 tsp organic honey or stevia"
    ],
    directions: [
      "Heat almond milk in a small pot over medium heat.",
      "Whisk in turmeric, ginger, black pepper, and cinnamon.",
      "Bring to a light simmer (do not boil).",
      "Remove from heat and stir in honey.",
      "Pour into mug and sprinkle extra cinnamon."
    ],
    benefits: "Curcumin in turmeric is highly anti-inflammatory, while black pepper boosts its bioavailability by up to 2000%."
  },
  {
    title: "Stuffed Sweet Potato & Greens",
    category: "Recipe 10 • Dinner Selection",
    calories: "320 kcal",
    protein: "8g",
    carbs: "56g",
    fiber: "8g",
    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "1 Medium Sweet Potato",
      "1 cup Kale or spinach (chopped)",
      "2 tbsp Sesame tahini dressing",
      "1 tbsp raw pumpkin seeds",
      "Pinch of salt, paprika, cumin"
    ],
    directions: [
      "Wash potato, poke with fork, bake at 200°C for 45 mins.",
      "Sauté kale in a pan with garlic and oil for 2 mins.",
      "Slice baked potato open lengthwise and fluff inside.",
      "Stuff with sautéed kale.",
      "Drizzle tahini dressing and top with pumpkin seeds."
    ],
    benefits: "Sweet potatoes are rich in beta-carotene and vitamin B6, which supports progesterone production in the luteal phase."
  }
];

function getRecipePageHTML(recipeIndex) {
  const data = customRecipeData[recipeIndex];
  if (!data) return '';
  
  return `
    <div class="page-content recipe-html-layout">
      <div class="wave"></div>
      <div class="heart">♡</div>
      
      <div class="recipe-header">
        <span class="recipe-num-label">${data.category}</span>
        <h1 class="recipe-title-main">${data.title}</h1>
        <div class="badge-container">
          <span class="badge badge-pcos"><i class="fa-solid fa-circle-check"></i> PCOS Friendly</span>
          <span class="badge badge-thyroid"><i class="fa-solid fa-circle-check"></i> Thyroid Friendly</span>
        </div>
      </div>
      
      <div class="recipe-hero-section">
        <div class="recipe-img-container" style="background-image: url('${data.img}');"></div>
        <div class="recipe-macros-grid">
          <div class="macro-card">
            <span class="macro-icon">🔥</span>
            <span class="macro-val">${data.calories.split(' ')[0]}</span>
            <span class="macro-lbl">Calories</span>
          </div>
          <div class="macro-card">
            <span class="macro-icon">💪</span>
            <span class="macro-val">${data.protein}</span>
            <span class="macro-lbl">Protein</span>
          </div>
          <div class="macro-card">
            <span class="macro-icon">🌾</span>
            <span class="macro-val">${data.carbs}</span>
            <span class="macro-lbl">Carbs</span>
          </div>
          <div class="macro-card">
            <span class="macro-icon">🥬</span>
            <span class="macro-val">${data.fiber}</span>
            <span class="macro-lbl">Fiber</span>
          </div>
        </div>
      </div>
      
      <div class="recipe-content-grid">
        <div class="glass-card recipe-ingredients-card">
          <h3>🥬 Ingredients</h3>
          <ul>
            ${data.ingredients.map(ing => `<li>• ${ing}</li>`).join('')}
          </ul>
        </div>
        
        <div class="glass-card recipe-instructions-card">
          <h3>📖 Directions</h3>
          <ol>
            ${data.directions.map((dir, i) => `<li><span class="step-num">${i + 1}</span> ${dir}</li>`).join('')}
          </ol>
        </div>
      </div>
      
      <div class="glass-card recipe-benefits-card">
        <h3>🌟 Health &amp; Hormone Benefits</h3>
        <p>${data.benefits}</p>
      </div>
      
      <div class="instagram-footer">
        <span>📷 @Its_rajashekar_12</span>
        <span class="page-number-lbl">${recipeIndex + 3}</span>
      </div>
    </div>
  `;
}

function getShoppingListHTML() {
  return `
    <div class="page-content shopping-html-layout">
      <div class="wave"></div>
      <div class="heart">♡</div>
      
      <h1>
        <span>ORGANIC</span>
        HEALTHY SHOPPING LIST
      </h1>
      <h2>PCOS &amp; Thyroid Foods</h2>
      
      <div class="shopping-container">
        <div class="glass-card shopping-card">
          <h3>🥬 Organic Produce</h3>
          <ul class="checklist">
            <li><input type="checkbox" id="shop-1"> <label for="shop-1">Spinach, Kale, Baby Arugula</label></li>
            <li><input type="checkbox" id="shop-2"> <label for="shop-2">Mixed Berries (Blueberries, Raspberries)</label></li>
            <li><input type="checkbox" id="shop-3"> <label for="shop-3">Avocado, Lemons, Limes</label></li>
            <li><input type="checkbox" id="shop-4"> <label for="shop-4">Ginger root, Garlic bulb</label></li>
          </ul>
        </div>

        <div class="glass-card shopping-card">
          <h3>🥩 Clean Proteins</h3>
          <ul class="checklist">
            <li><input type="checkbox" id="shop-5"> <label for="shop-5">Organic Whole Eggs</label></li>
            <li><input type="checkbox" id="shop-6"> <label for="shop-6">Wild-caught Salmon fillets</label></li>
            <li><input type="checkbox" id="shop-7"> <label for="shop-7">Yellow Moong Dal (split)</label></li>
            <li><input type="checkbox" id="shop-8"> <label for="shop-8">Organic canned Chickpeas</label></li>
          </ul>
        </div>

        <div class="glass-card shopping-card">
          <h3>🥥 Healthy Fats &amp; Pantry</h3>
          <ul class="checklist">
            <li><input type="checkbox" id="shop-9"> <label for="shop-9">Chia seeds &amp; Ground flaxseeds</label></li>
            <li><input type="checkbox" id="shop-10"> <label for="shop-10">Extra virgin olive oil / Coconut oil</label></li>
            <li><input type="checkbox" id="shop-11"> <label for="shop-11">Sesame Tahini dressing</label></li>
            <li><input type="checkbox" id="shop-12"> <label for="shop-12">Turmeric powder, Cumin, Hing</label></li>
          </ul>
        </div>
      </div>

      <div class="instagram-footer">
        <span>📷 @Its_rajashekar_12</span>
        <span class="page-number-lbl">13</span>
      </div>
    </div>
  `;
}

function getMealPlannerHTML() {
  return `
    <div class="page-content planner-html-layout">
      <div class="wave"></div>
      <div class="heart">♡</div>
      
      <h1>
        <span>HORMONE BALANCE</span>
        WEEKLY MEAL PLANNER
      </h1>
      <h2>Fueling Your Vitality</h2>
      
      <div class="planner-grid-wrapper">
        <table class="planner-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch Selection</th>
              <th>Dinner Selection</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="day-col">Mon</td>
              <td>Moong Dal Chilla</td>
              <td>Avocado Toast</td>
              <td>Grilled Salmon</td>
            </tr>
            <tr>
              <td class="day-col">Tue</td>
              <td>Egg Scramble</td>
              <td>Chickpea Salad</td>
              <td>Stuffed Sweet Potato</td>
            </tr>
            <tr>
              <td class="day-col">Wed</td>
              <td>Millet Upma</td>
              <td>Avocado Toast</td>
              <td>Grilled Salmon</td>
            </tr>
            <tr>
              <td class="day-col">Thu</td>
              <td>Moong Dal Chilla</td>
              <td>Chickpea Salad</td>
              <td>Stuffed Sweet Potato</td>
            </tr>
            <tr>
              <td class="day-col">Fri</td>
              <td>Egg Scramble</td>
              <td>Avocado Toast</td>
              <td>Grilled Salmon</td>
            </tr>
            <tr>
              <td class="day-col">Sat</td>
              <td>Millet Upma</td>
              <td>Chickpea Salad</td>
              <td>Stuffed Sweet Potato</td>
            </tr>
            <tr>
              <td class="day-col">Sun</td>
              <td>Golden Latte &amp; Fruit</td>
              <td>Avocado Toast</td>
              <td>Light Chickpea Salad</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="instagram-footer">
        <span>📷 @Its_rajashekar_12</span>
        <span class="page-number-lbl">14</span>
      </div>
    </div>
  `;
}

function getThankYouPageHTML() {
  return `
    <div class="page-content thank-html-layout">
      <div class="wave"></div>
      <div class="icon-top">🌸</div>
      
      <h1 class="thank-title">THANK YOU!</h1>
      <h2 class="thank-subtitle">Your Hormone Healing Journey Starts Here</h2>
      
      <div class="heart">♡</div>

      <div class="thank-card-wrapper">
        <div class="glass-card thank-card">
          <p>This guide was lovingly compiled to give you delicious, simple, and scientifically backed recipes to support your endocrine health, thyroid pathways, and insulin balancing.</p>
          <p class="signature">Itsrajashekar</p>
        </div>
      </div>

      <div class="thank-cta">
        <p>Join our thriving community on Instagram for daily wellness inspiration, kitchen hacks, and hormone balancing tips!</p>
        <a href="https://instagram.com/Its_rajashekar_12" target="_blank" class="thank-insta-btn">
          <i class="fa-brands fa-instagram"></i> @Its_rajashekar_12
        </a>
      </div>

      <div class="instagram-footer">
        <span>LOVE YOURSELF | Itsrajashekar</span>
        <span class="page-number-lbl">15</span>
      </div>
    </div>
  `;
}

function initFloatingHearts(container) {
  if (!container) return;
  const existing = container.querySelectorAll('.floating-heart-particle');
  existing.forEach(el => el.remove());
  
  const heartsCount = 15;
  for (let i = 0; i < heartsCount; i++) {
    const h = document.createElement("div");
    h.innerHTML = "❤";
    h.className = "floating-heart-particle";
    h.style.position = "absolute";
    h.style.left = Math.random() * 100 + "%";
    h.style.top = Math.random() * 100 + "%";
    h.style.fontSize = (12 + Math.random() * 16) + "px";
    h.style.opacity = '0.05';
    h.style.color = "#F75A9C";
    h.style.pointerEvents = "none";
    h.style.animation = `floatHeart${i} ${6 + Math.random() * 6}s linear infinite`;
    container.appendChild(h);

    if (!document.getElementById(`float-heart-style-${i}`)) {
      const style = document.createElement("style");
      style.id = `float-heart-style-${i}`;
      style.innerHTML = `
        @keyframes floatHeart${i} {
          0% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

/* ==========================================================================
   BOOK BUILDER (HTML VS IMAGE)
   ========================================================================== */
function buildBookDOM() {
  bookElement.innerHTML = '';
  
  const userPages = [
    "pages/01.jpg",
    "pages/02.png",
    "pages/03.jpg",
    "pages/04.jpg",
    "pages/05.jpg",
    "pages/06.png",
    "pages/07.png",
    "pages/08.png",
    "pages/09.png",
    "pages/10.png",
    "pages/11.png",
    "pages/12.png"
  ];

  let totalPages = 28; // Default HTML mode count
  if (currentMode === 'image') {
    // 12 user images + 1 thank you page + 1 back cover = 14 pages total
    totalPages = 14;
  }
  
  for (let idx = 0; idx < totalPages; idx++) {
    const pageDiv = document.createElement('div');
    const isLeft = idx % 2 !== 0;
    const isRight = idx % 2 === 0 && idx !== 0;
    pageDiv.className = `page ${isLeft ? 'page-left' : ''} ${isRight ? 'page-right' : ''}`;
    
    // Determine hardcover density: Page 0 and last page are hardcovers
    const isCover = idx === 0 || idx === totalPages - 1;
    pageDiv.setAttribute('data-density', isCover ? 'hard' : 'soft');
    
    if (currentMode === 'image') {
      if (idx < 12) {
        // Pages 0-11: User-uploaded Images
        const imgPath = userPages[idx];
        const bgColor = idx === 0 ? '#fdf0f0' : '#ffd9e8';
        pageDiv.innerHTML = `
          <div class="page-content image-mode-page" style="padding: 0; background-color: ${bgColor};">
            <img src="${imgPath}" class="image-mode-img" alt="Page ${idx + 1}" style="width: 100%; height: 100%; object-fit: contain; display: block;" />
          </div>
        `;
      } else if (idx === 12) {
        // Page 12: HTML Thank You Page
        pageDiv.innerHTML = `
          <div class="page-content thank-html-layout" style="padding: 30px;">
            <div class="wave"></div>
            <div class="icon-top">🌸</div>
            <h1 class="thank-title" style="font-size: 2.4rem;">THANK YOU!</h1>
            <h2 class="thank-subtitle" style="font-size: 2.2rem; margin-bottom: 20px;">Your Hormone Healing Journey</h2>
            <div class="heart">♡</div>
            <div class="thank-card-wrapper" style="margin-bottom: 20px;">
              <div class="glass-card thank-card" style="padding: 20px;">
                <p>This guide was lovingly compiled to give you delicious, simple, and scientifically backed recipes to support your endocrine health, thyroid pathways, and insulin balancing.</p>
                <p class="signature" style="font-size: 2.4rem; margin-top: 10px;">Itsrajashekar</p>
              </div>
            </div>
            <div class="thank-cta">
              <p style="font-size: 0.8rem; margin-bottom: 10px;">Join our thriving community on Instagram for daily wellness inspiration and hormone balancing tips!</p>
              <a href="https://instagram.com/Its_rajashekar_12" target="_blank" class="thank-insta-btn">
                <i class="fa-brands fa-instagram"></i> @Its_rajashekar_12
              </a>
            </div>
            <div class="instagram-footer">
              <span>LOVE YOURSELF | Itsrajashekar</span>
              <span class="page-number-lbl">13</span>
            </div>
          </div>
        `;
        setTimeout(() => initFloatingHearts(pageDiv.querySelector('.thank-html-layout')), 100);
      } else {
        // Page 13: Back Cover Page (Hardcover)
        pageDiv.innerHTML = `
          <div class="page-content cover-back-layout" style="justify-content: center; align-items: center; background-color: var(--color-pink-primary); height: 100%; margin: 0; border: none; padding: 40px;">
            <div class="cover-back-logo">Its_rajashekar_12</div>
            <div style="width: 40px; height: 1px; background-color: var(--color-white); margin-top: 12px; margin-bottom: 12px;"></div>
            <p style="font-size: 0.95rem; letter-spacing: 1px; text-transform: none; color: rgba(255, 255, 255, 0.9);">
              <i class="fa-brands fa-instagram" style="margin-right: 5px;"></i> @Its_rajashekar_12
            </p>
          </div>
        `;
      }
    } else {
      // FALLBACK HTML PAGE
      pageDiv.innerHTML = getFallbackHTMLContent(idx, totalPages);
    }
    
    bookElement.appendChild(pageDiv);
  }
  
  const isPortrait = window.innerWidth <= 768;
  if (isPortrait) {
    bookElement.style.width = '100%';
    bookElement.style.height = '100%';
  } else {
    bookElement.style.width = '1800px';
    bookElement.style.height = '1125px';
  }
}

function getFallbackHTMLContent(idx, totalPages) {
  if (idx === 0) {
    // Front Cover
    return `
      <div class="page-content cover-layout">
        <div class="cover-header">Maison Culinarium</div>
        <div class="cover-title-group">
          <h1 class="cover-title">10 Best PCOS &amp;<br>Thyroid Recipes</h1>
          <div class="cover-divider"></div>
          <p class="cover-subtitle">Healthy. Hormone-Balancing. Nourishing.</p>
        </div>
        <div class="cover-footer">Premium Recipe Edition</div>
      </div>
    `;
  }
  
  if (idx === 1) {
    // Inside Cover Welcome
    return `
      <div class="page-content" style="justify-content: center; text-align: center; padding: 50px 30px;">
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--color-charcoal); margin-bottom: 20px;">Nourish &amp; Balance</h2>
        <p style="font-size: 0.82rem; line-height: 1.7; color: var(--color-charcoal-light); margin-bottom: 20px; font-style: italic;">
          "Welcome to a collection of recipes designed specifically for women navigating PCOS and Thyroid wellness. Every ingredient here has been chosen to help balance your hormones, stabilize your blood sugar, reduce inflammation, and fuel your energy levels naturally."
        </p>
        <div style="width: 40px; height: 1px; background-color: var(--color-pink-primary); margin: 0 auto 20px;"></div>
        <p style="font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: var(--color-pink-dark); font-weight: 600;">
          Healthy. Hormone-Balancing. Nourishing.
        </p>
        <div class="page-corner-hint"></div>
        <span class="page-num">1</span>
      </div>
    `;
  }
  
  if (idx === 2) {
    // Table of Contents
    let tocItemsHTML = '';
    fallbackRecipes.forEach((recipe, rIdx) => {
      const startPage = 3 + (rIdx * 2);
      tocItemsHTML += `
        <li style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 15px; cursor: pointer;" onclick="turnToBookPage(${startPage})">
          <span style="font-size: 0.85rem; font-weight: 500; color: var(--color-charcoal); border-bottom: 1px dashed rgba(0,0,0,0.15); flex-grow: 1; margin-right: 8px;">
            ${recipe.title}
          </span>
          <span style="font-family: var(--font-heading); font-weight: 600; color: var(--color-pink-primary);">${startPage}</span>
        </li>
      `;
    });
    return `
      <div class="page-content" style="padding: 40px 30px;">
        <h2 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--color-charcoal); margin-bottom: 20px; text-align: center; border-bottom: 2px solid var(--color-pink-light); padding-bottom: 8px;">CookBook Index</h2>
        <ul style="list-style: none; margin-top: 10px;">
          ${tocItemsHTML}
        </ul>
        <div class="page-corner-hint"></div>
        <span class="page-num">2</span>
      </div>
    `;
  }
  
  // Recipes (Page 3 to 22)
  if (idx >= 3 && idx <= 22) {
    const recipeIdx = Math.floor((idx - 3) / 2);
    const recipe = fallbackRecipes[recipeIdx];
    const isLeft = idx % 2 !== 0;
    
    if (isLeft) {
      // Left Page
      return `
        <div class="page-content recipe-layout">
          <div class="recipe-page-header">
            <div class="recipe-category">${recipe.category}</div>
            <h2 class="recipe-title" style="font-size: 1.8rem;">${recipe.title}</h2>
            <p class="recipe-desc">${recipe.desc}</p>
          </div>
          <div class="recipe-img-box">
            <img class="lazy-load" data-src="${recipe.image}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 450 300'%3E%3C/svg%3E" alt="${recipe.title}" />
          </div>
          <div class="recipe-metadata-grid">
            <div class="meta-item">
              <div class="meta-label">Prep Time</div>
              <div class="meta-val">${recipe.prepTime}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Cooking</div>
              <div class="meta-val">${recipe.cookTime}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Portion</div>
              <div class="meta-val">${recipe.servings}</div>
            </div>
          </div>
          <div class="page-corner-hint"></div>
          <span class="page-num">
            <i class="fa-regular fa-heart fav-heart-icon" onclick="toggleFavorite(event, ${recipeIdx})" style="cursor: pointer; margin-right: 5px;" title="Like recipe"></i>
            ${idx}
          </span>
        </div>
      `;
    } else {
      // Right Page
      const ingredientsHTML = recipe.ingredients.map(ing => `
        <li>
          <span>${ing.name}</span>
          <span class="ing-qty">${ing.qty}</span>
        </li>
      `).join('');

      const directionsHTML = recipe.directions.map(step => `
        <li>${step}</li>
      `).join('');

      return `
        <div class="page-content recipe-layout" style="padding: 40px 30px;">
          <div>
            <h3 class="recipe-sec-title"><i class="fa-solid fa-mortar-pestle"></i> Ingredients</h3>
            <ul class="ingredients-list">
              ${ingredientsHTML}
            </ul>
          </div>
          <div>
            <h3 class="recipe-sec-title"><i class="fa-solid fa-kitchen-cooker"></i> Instructions</h3>
            <ol class="directions-list">
              ${directionsHTML}
            </ol>
          </div>
          <div class="page-corner-hint"></div>
          <span class="page-num">${idx}</span>
        </div>
      `;
    }
  }
  
  if (idx === totalPages - 3) {
    // Healthy Living Resources
    return `
      <div class="page-content" style="padding: 40px 30px; justify-content: space-between;">
        <div>
          <h3 class="recipe-sec-title" style="border-bottom: 2px solid var(--color-pink-primary); padding-bottom: 8px; margin-bottom: 15px;">
            <i class="fa-solid fa-seedling"></i> Hormone Balance Tips
          </h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 12px; font-size: 0.82rem; line-height: 1.5; border-left: 3px solid var(--color-pink-primary); padding-left: 10px;">
              <strong>Stabilize Blood Sugar:</strong> Focus on low-glycemic complex carbs paired with proteins and healthy fats to prevent insulin spikes.
            </li>
            <li style="margin-bottom: 12px; font-size: 0.82rem; line-height: 1.5; border-left: 3px solid var(--color-pink-primary); padding-left: 10px;">
              <strong>Support Thyroid Function:</strong> Ensure adequate intake of selenium, zinc, and iodine-rich foods like salmon, pepitas, and sea bass.
            </li>
            <li style="margin-bottom: 12px; font-size: 0.82rem; line-height: 1.5; border-left: 3px solid var(--color-pink-primary); padding-left: 10px;">
              <strong>Reduce Chronic Inflammation:</strong> Incorporate anti-inflammatory spices like turmeric, ginger, and garlic into daily meals.
            </li>
            <li style="margin-bottom: 12px; font-size: 0.82rem; line-height: 1.5; border-left: 3px solid var(--color-pink-primary); padding-left: 10px;">
              <strong>Prioritize Sleep & Stress Relief:</strong> Cortisol levels directly impact thyroid hormones and aggravate PCOS symptoms.
            </li>
          </ul>
        </div>
        <div class="page-corner-hint"></div>
        <span class="page-num">${idx}</span>
      </div>
    `;
  }
  
  if (idx === totalPages - 2) {
    // Inside Back Cover
    return `
      <div class="page-content" style="justify-content: center; text-align: center; padding: 50px 30px;">
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--color-charcoal); margin-bottom: 20px;">Nourish Your Body</h2>
        <p style="font-size: 0.85rem; line-height: 1.7; color: var(--color-charcoal-light); margin-bottom: 24px; font-style: italic;">
          "Every healthy choice you make is a love letter to your body. Treat yourself with care, patience, and delicious, nutrient-dense food."
        </p>
        <div style="width: 30px; height: 1px; background-color: var(--color-pink-primary); margin: 0 auto 20px;"></div>
        <p style="font-size: 0.75rem; color: var(--color-charcoal-light); font-style: italic;">
          Made with Love for Women.
        </p>
        <div class="page-corner-hint"></div>
        <span class="page-num">${idx}</span>
      </div>
    `;
  }
  
  if (idx === totalPages - 1) {
    // Back Cover
    return `
      <div class="page-content cover-back-layout">
        <div class="cover-back-logo">Its_rajashekar_12</div>
        <div style="width: 40px; height: 1px; background-color: var(--color-gold); margin-bottom: 12px;"></div>
        <p style="font-size: 0.75rem; letter-spacing: 1px; text-transform: none; color: rgba(255, 255, 255, 0.7);">
          <i class="fa-brands fa-instagram" style="margin-right: 5px;"></i> @Its_rajashekar_12
        </p>
      </div>
    `;
  }
  
  return `
    <div class="page-content" style="justify-content: center; text-align: center;">
      <p style="color: var(--color-charcoal-light); font-style: italic;">Page ${idx}</p>
    </div>
  `;
}

/* ==========================================================================
   INITIALIZE STPAGEFLIP
   ========================================================================== */
function initPageFlip() {
  if (pageFlip) {
    pageFlip.destroy();
  }

  const PageFlipClass = window.PageFlip || (window.St && window.St.PageFlip);
  if (!PageFlipClass) {
    console.error("PageFlip library is not loaded.");
    return;
  }

  // Determine viewport dimension to set sizing appropriately
  const viewportWidth = window.innerWidth;
  const isPortrait = viewportWidth <= 768;

  // Initialize
  pageFlip = new PageFlipClass(bookElement, {
    width: isPortrait ? window.innerWidth : 900, 
    height: isPortrait ? window.innerHeight : 1125,
    size: "stretch",
    minWidth: 200,
    maxWidth: 2500,
    minHeight: 200,
    maxHeight: 2500,
    drawShadow: !isPortrait, // Disable shadows on mobile for flat screen performance
    flippingTime: 600, // Faster page turn on phone
    showCover: true,
    useMouseEvents: true,
    swipeDistance: 30,
    maxShadowOpacity: 0.3,
    usePortrait: isPortrait
  });

  // Load from HTML elements
  pageFlip.loadFromHTML(document.querySelectorAll('.page'));

  // Reveal book in DOM after StPageFlip arranges elements
  bookElement.style.visibility = 'visible';

  // Events Binding
  pageFlip.on('flip', (e) => {
    const pageIndex = e.data;
    playSynthesizedFlipSound(flipVolume);
    updateHUDPageIndicator(pageIndex);
    
    // Toggle 3D spine crease based on closed/opened states
    const total = pageFlip.getPageCount();
    if (pageIndex === 0 || pageIndex === total - 1) {
      bookElement.classList.add('book-closed');
      bookElement.classList.remove('book-opened');
    } else {
      bookElement.classList.add('book-opened');
      bookElement.classList.remove('book-closed');
    }
    
    // Save last read page bookmark in localstorage
    localStorage.setItem('cookbook_bookmark_page', pageIndex);
    updateBookmarkStatus(pageIndex);
    
    // Trigger lazy loading for visible and surrounding pages
    lazyLoadSurroundingPages(pageIndex);
  });

  pageFlip.on('changeState', (e) => {
    // If user is flipping, pause autoplay briefly
    if (e.data !== 'read' && isAutoPlaying) {
      pauseAutoplay();
    }
  });

  pageFlip.on('changeOrientation', (e) => {
    const orientation = e.data;
    if (orientation === 'portrait') {
      document.body.classList.add('portrait-mode');
      document.body.classList.remove('landscape-mode');
    } else {
      document.body.classList.add('landscape-mode');
      document.body.classList.remove('portrait-mode');
    }
    // Re-verify layouts and elements
    updateHUDPageIndicator(pageFlip.getCurrentPageIndex());
  });

  // Setup initial HUD state
  updateHUDPageIndicator(pageFlip.getCurrentPageIndex());
  updateBookmarkStatus(pageFlip.getCurrentPageIndex());
  lazyLoadSurroundingPages(pageFlip.getCurrentPageIndex());
}

function turnToBookPage(pageNum) {
  if (pageFlip) {
    pageFlip.turnToPage(pageNum);
  }
}

/* ==========================================================================
   LAZY IMAGE LOADING
   ========================================================================== */
function lazyLoadSurroundingPages(activeIndex) {
  const pages = document.querySelectorAll('.page');
  const pagesToLoad = [activeIndex - 1, activeIndex, activeIndex + 1, activeIndex + 2];
  
  pagesToLoad.forEach((idx) => {
    if (idx >= 0 && idx < pages.length) {
      const img = pages[idx].querySelector('img.lazy-load');
      if (img && img.dataset.src && !img.src.includes(img.dataset.src)) {
        img.src = img.dataset.src;
        img.classList.remove('lazy-load');
      }
    }
  });
}

/* ==========================================================================
   HUD LOGIC & CONTROLS
   ========================================================================== */
function updateHUDPageIndicator(pageIndex) {
  const indicator = document.getElementById('hud-page-indicator');
  const maxPage = pageFlip.getPageCount();
  
  if (pageIndex === 0) {
    indicator.textContent = `Cover (1 of ${maxPage})`;
  } else if (pageIndex === maxPage - 1) {
    indicator.textContent = `Back Cover (${maxPage} of ${maxPage})`;
  } else {
    const isPortrait = window.innerWidth <= 768 || pageFlip.getOrientation() === 'portrait';
    if (isPortrait) {
      indicator.textContent = `Page ${pageIndex + 1} of ${maxPage}`;
    } else {
      const leftPage = pageIndex % 2 === 0 ? pageIndex : pageIndex - 1;
      const rightPage = leftPage + 1;
      if (rightPage >= maxPage - 1) {
        indicator.textContent = `Page ${leftPage + 1} of ${maxPage}`;
      } else {
        indicator.textContent = `Pages ${leftPage + 1}–${rightPage + 1} of ${maxPage}`;
      }
    }
  }

  // Update Scrubber Page Slider
  const pageSlider = document.getElementById('kindle-page-slider');
  if (pageSlider) {
    pageSlider.max = maxPage - 1;
    pageSlider.value = pageIndex;
  }

  // Update like button active icon depending on current page content
  updateFavoriteButtonState(pageIndex);
}

// Fullscreen
function toggleFullscreen() {
  const fullscreenBtn = document.getElementById('hud-fullscreen-btn');
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
      fullscreenBtn.setAttribute('data-tooltip', 'Exit Fullscreen');
    }).catch(err => {
      showToast("Fullscreen disabled");
    });
  } else {
    document.exitFullscreen().then(() => {
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
      fullscreenBtn.setAttribute('data-tooltip', 'Fullscreen');
    });
  }
}

// Zoom Controls (scale transform wrapper)
function changeZoom(factor) {
  if (factor === 0) {
    zoomScale = 1.0;
  } else {
    zoomScale = Math.min(2.2, Math.max(1.0, zoomScale + factor));
  }
  
  const viewport = document.getElementById('viewport');
  viewport.style.cursor = zoomScale > 1.0 ? 'grab' : 'default';

  // Apply scales
  const zoomContainer = document.getElementById('zoom-container');
  if (zoomScale === 1.0) {
    // Reset dragging position too
    currentTranslateX = 0;
    currentTranslateY = 0;
    zoomContainer.style.transform = `scale(1)`;
  } else {
    applyZoomTransform();
  }
}

// Autoplay Read Mode
function toggleAutoplay() {
  if (isAutoPlaying) {
    pauseAutoplay();
  } else {
    startAutoplay();
  }
}

function startAutoplay() {
  isAutoPlaying = true;
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  playBtn.classList.add('active');
  playBtn.setAttribute('data-tooltip', 'Pause Reading');
  showToast("Auto Play Activated");
  
  autoPlayInterval = setInterval(() => {
    if (pageFlip) {
      const curr = pageFlip.getCurrentPageIndex();
      const count = pageFlip.getPageCount();
      if (curr >= count - 2) {
        // Return to cover
        pageFlip.turnToPage(0);
      } else {
        pageFlip.flipNext();
      }
    }
  }, 4500); // turns every 4.5 seconds
}

function pauseAutoplay() {
  isAutoPlaying = false;
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  playBtn.classList.remove('active');
  playBtn.setAttribute('data-tooltip', 'Auto Play Book');
  clearInterval(autoPlayInterval);
}

// Night Mode Toggle
function toggleNightMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  darkmodeBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  darkmodeBtn.setAttribute('data-tooltip', isDark ? 'Warm Day Mode' : 'Toggle Night Mode');
  localStorage.setItem('cookbook_dark_mode', isDark);
  showToast(isDark ? "Night Mode Activated" : "Day Mode Activated");
}

// Ambient Background Music controls
function toggleMusic() {
  isMuted = !isMuted;
  localStorage.setItem('cookbook_audio_muted', isMuted);
  
  if (isMuted) {
    bgAmbientMusic.pause();
    audioBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    audioBtn.classList.remove('active');
    showToast("Sounds Muted");
  } else {
    bgAmbientMusic.play().then(() => {
      audioBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      audioBtn.classList.add('active');
      showToast("Ambient Kitchen Music Playing");
    }).catch(err => {
      console.log("Audio play blocked by browser. Requires page click first.");
      showToast("Click page to play audio");
      isMuted = true;
    });
  }
}

// Bookmarking Action
function saveBookmark() {
  const current = pageFlip.getCurrentPageIndex();
  localStorage.setItem('cookbook_bookmark_saved', current);
  updateBookmarkStatus(current);
  showToast(`Bookmarked Page ${current}!`);
}

function updateBookmarkStatus(currentIndex) {
  const saved = localStorage.getItem('cookbook_bookmark_saved');
  const isBookmarked = saved !== null && parseInt(saved, 10) === currentIndex;
  
  if (isBookmarked) {
    bookmarkBtn.classList.add('active');
    bookmarkBtn.querySelector('i').className = 'fa-solid fa-bookmark';
    bookmarkBtn.setAttribute('data-tooltip', 'Page Bookmarked');
  } else {
    bookmarkBtn.classList.remove('active');
    bookmarkBtn.querySelector('i').className = 'fa-regular fa-bookmark';
    bookmarkBtn.setAttribute('data-tooltip', 'Save Bookmark');
  }
}

/* ==========================================================================
   FAVORITES SYSTEM
   ========================================================================== */
function loadFavorites() {
  const stored = localStorage.getItem('cookbook_favorites');
  if (stored) {
    favorites = JSON.parse(stored);
  }
  updateFavoritesBadge();
}

function toggleFavorite(e, recipeIndex) {
  e.stopPropagation(); // prevent flipping trigger on page click
  const indexPos = favorites.indexOf(recipeIndex);
  
  if (indexPos > -1) {
    favorites.splice(indexPos, 1);
    showToast("Removed from favorites");
  } else {
    favorites.push(recipeIndex);
    showToast("Added to favorites");
  }
  
  localStorage.setItem('cookbook_favorites', JSON.stringify(favorites));
  updateFavoritesBadge();
  updateFavoriteButtonState(pageFlip.getCurrentPageIndex());
  renderSidebarTOC();
}

function updateFavoritesBadge() {
  favCountBadge.textContent = favorites.length;
}

function getRecipeIndexFromPageIndex(pageIndex) {
  return fallbackRecipes.findIndex(r => {
    if (r.isSinglePage) {
      return r.page === pageIndex;
    } else {
      return r.page === pageIndex || r.page + 1 === pageIndex;
    }
  });
}

function updateFavoriteButtonState(pageIndex) {
  // Check if current page is associated with a recipe index
  const recipeIndex = getRecipeIndexFromPageIndex(pageIndex);
  if (currentMode === 'image' || recipeIndex === -1) {
    // Hide or disable like button on covers/ToC/Tips
    favoriteBtn.style.opacity = '0.3';
    favoriteBtn.style.pointerEvents = 'none';
    favoriteBtn.querySelector('i').className = 'fa-regular fa-heart';
    return;
  }
  
  favoriteBtn.style.opacity = '1';
  favoriteBtn.style.pointerEvents = 'auto';
  
  const isLiked = favorites.includes(recipeIndex);
  
  if (isLiked) {
    favoriteBtn.classList.add('active');
    favoriteBtn.querySelector('i').className = 'fa-solid fa-heart';
    favoriteBtn.setAttribute('data-tooltip', 'Liked!');
    
    // Update inner page heart icon if exists
    const innerHeart = document.querySelectorAll('.fav-heart-icon')[recipeIndex];
    if (innerHeart) {
      innerHeart.className = 'fa-solid fa-heart fav-heart-icon';
      innerHeart.style.color = 'var(--color-pink-primary)';
    }
  } else {
    favoriteBtn.classList.remove('active');
    favoriteBtn.querySelector('i').className = 'fa-regular fa-heart';
    favoriteBtn.setAttribute('data-tooltip', 'Add to Favorites');
    
    const innerHeart = document.querySelectorAll('.fav-heart-icon')[recipeIndex];
    if (innerHeart) {
      innerHeart.className = 'fa-regular fa-heart fav-heart-icon';
      innerHeart.style.color = 'inherit';
    }
  }
}

/* ==========================================================================
   SIDEBAR (TABLE OF CONTENTS) & SEARCH
   ========================================================================== */
function renderSidebarTOC(searchQuery = '', showOnlyFavs = false) {
  tocListElement.innerHTML = '';
  
  if (currentMode === 'image') {
    const pagesCount = pageFlip.getPageCount();
    let matchesCount = 0;
    
    for (let i = 0; i < pagesCount; i++) {
      let title = `Page ${i}`;
      let desc = 'Wellness Cuisine';
      
      if (i === 0) {
        title = "Front Cover";
        desc = "10 Best PCOS & Thyroid Recipes";
      } else if (i === 1) {
        title = "Hormone Balance Tips";
        desc = "Healthy guidelines & foods to limit";
      } else if (i >= 2 && i <= 11) {
        const recipeIndex = i - 2;
        const recipe = customRecipeData[recipeIndex];
        if (recipe) {
          title = recipe.title;
          desc = `Recipe 0${recipeIndex + 1}`;
          if (recipeIndex + 1 === 10) desc = "Recipe 10";
        } else {
          title = `Recipe 0${recipeIndex + 1}`;
          if (recipeIndex + 1 === 10) title = "Recipe 10";
          desc = "Hormone-Balancing Meal";
        }
      } else if (i === 12) {
        title = "Thank You Page";
        desc = "A note from the author & signature";
      } else {
        title = "Back Cover";
        desc = "Instagram: @Its_rajashekar_12";
      }
      
      if (searchQuery && !(title.toLowerCase().includes(searchQuery.toLowerCase()) || desc.toLowerCase().includes(searchQuery.toLowerCase()))) {
        continue;
      }
      
      matchesCount++;
      const li = document.createElement('li');
      li.className = 'toc-item';
      li.onclick = () => {
        pageFlip.turnToPage(i);
        closeSidebar();
      };
      li.innerHTML = `
        <div class="toc-info">
          <span class="toc-title">${title}</span>
          <span class="toc-desc">${desc}</span>
        </div>
        <span class="toc-page">${i}</span>
      `;
      tocListElement.appendChild(li);
    }
    
    noSearchResults.classList.toggle('hidden', matchesCount > 0);
  } else {
    // TOC for HTML Mode: recipe content
    let matchesCount = 0;
    
    // Welcome / Index
    if (!showOnlyFavs && (!searchQuery || "index welcome introduction".includes(searchQuery.toLowerCase()))) {
      const indexLi = document.createElement('li');
      indexLi.className = 'toc-item';
      indexLi.onclick = () => { pageFlip.turnToPage(1); closeSidebar(); };
      indexLi.innerHTML = `
        <div class="toc-info">
          <span class="toc-title">Introduction & Index</span>
          <span class="toc-desc">Welcome note & visual directory</span>
        </div>
        <span class="toc-page">1</span>
      `;
      tocListElement.appendChild(indexLi);
      matchesCount++;
    }

    fallbackRecipes.forEach((recipe, idx) => {
      const pageIndex = recipe.page;
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFav = !showOnlyFavs || favorites.includes(idx);
      
      if (matchesSearch && matchesFav) {
        matchesCount++;
        const li = document.createElement('li');
        li.className = 'toc-item';
        li.onclick = () => {
          pageFlip.turnToPage(pageIndex);
          closeSidebar();
        };
        li.innerHTML = `
          <div class="toc-info">
            <span class="toc-title">${recipe.title}</span>
            <span class="toc-desc">${recipe.category} • ${recipe.prepTime}</span>
          </div>
          <span class="toc-page">${pageIndex}</span>
        `;
        tocListElement.appendChild(li);
      }
    });

    noSearchResults.classList.toggle('hidden', matchesCount > 0);
  }
}

function openSidebar() {
  sidebarElement.classList.add('open');
  document.getElementById('hud-toc-btn').classList.add('active');
}

function closeSidebar() {
  sidebarElement.classList.remove('open');
  document.getElementById('hud-toc-btn').classList.remove('active');
}

/* ==========================================================================
   SHARE MODAL & NATIVE SHARE
   ========================================================================== */
function openShareModal() {
  shareModal.classList.add('open');
  
  // Set WhatsApp, Facebook, Twitter links dynamically
  const url = window.location.href;
  const text = "Explore L'Art de la Cuisine - A Premium Digital Recipe Flipbook!";
  
  document.getElementById('share-whatsapp').href = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`;
  document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  
  // Custom QR Code generation
  const qrPlaceholder = document.getElementById('qr-code-placeholder');
  qrPlaceholder.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}&color=2d2624&bgcolor=faf6f0" alt="QR Code Link" style="width: 120px; height: 120px;" />`;
  
  // Support Native Share API
  const nativeBtn = document.getElementById('share-native');
  if (navigator.share) {
    nativeBtn.classList.remove('hidden');
    nativeBtn.onclick = () => {
      navigator.share({
        title: "L'Art de la Cuisine",
        text: text,
        url: url
      }).catch(err => console.log("Share failed:", err));
    };
  } else {
    nativeBtn.classList.add('hidden');
  }
}

function closeShareModal() {
  shareModal.classList.remove('open');
}

function copyBookLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showToast("Link copied to clipboard!");
  }).catch(() => {
    showToast("Copy failed.");
  });
}

/* ==========================================================================
   PDF DOWNLOADING (html2pdf.js)
   ========================================================================== */
async function triggerPDFDownload() {
  showToast("Compiling PDF, please wait...");
  
  const element = document.createElement('div');
  element.className = 'pdf-print-container';
  element.style.width = '900px';
  element.style.background = '#ffd9e8';
  element.style.color = '#222222';
  
  const userPages = [
    "pages/01.jpg",
    "pages/02.png",
    "pages/03.jpg",
    "pages/04.jpg",
    "pages/05.jpg",
    "pages/06.png",
    "pages/07.png",
    "pages/08.png",
    "pages/09.png",
    "pages/10.png",
    "pages/11.png",
    "pages/12.png"
  ];
  
  for (let idx = 0; idx < 14; idx++) {
    const pageClone = document.createElement('div');
    pageClone.style.width = '900px';
    pageClone.style.height = '1125px'; // 4:5 ratio
    pageClone.style.pageBreakAfter = 'always';
    pageClone.style.pageBreakInside = 'avoid';
    pageClone.style.boxShadow = 'none';
    pageClone.style.margin = '0';
    pageClone.style.padding = '0';
    pageClone.style.border = 'none';
    pageClone.style.display = 'flex';
    pageClone.style.flexDirection = 'column';
    pageClone.style.justifyContent = 'space-between';
    pageClone.style.position = 'relative';
    pageClone.style.overflow = 'hidden';

    if (idx < 12) {
      const imgPath = userPages[idx];
      const bgColor = idx === 0 ? '#fdf0f0' : '#ffd9e8';
      pageClone.style.backgroundColor = bgColor;
      pageClone.innerHTML = `
        <div class="page-content image-mode-page" style="padding: 0; width: 100%; height: 100%;">
          <img src="${imgPath}" alt="Page ${idx + 1}" style="width: 100%; height: 100%; object-fit: contain; display: block;" />
        </div>
      `;
    } else if (idx === 12) {
      pageClone.style.backgroundColor = '#ffd9e8';
      pageClone.innerHTML = getThankYouPageHTML();
      const wave = pageClone.querySelector('.wave');
      if (wave) wave.style.opacity = '0.3';
    } else {
      pageClone.style.backgroundColor = 'var(--color-pink-primary)';
      pageClone.innerHTML = `
        <div class="page-content cover-back-layout" style="justify-content: center; align-items: center; height: 100%; width: 100%; display: flex; flex-direction: column; padding: 40px; background-color: var(--color-pink-primary);">
          <div class="cover-back-logo" style="color: white; font-weight: 800; font-size: 2rem;">Its_rajashekar_12</div>
          <div style="width: 40px; height: 1px; background-color: white; margin-top: 12px; margin-bottom: 12px;"></div>
          <p style="font-size: 0.95rem; color: rgba(255, 255, 255, 0.9); margin: 0;">
            <i class="fa-brands fa-instagram" style="margin-right: 5px;"></i> @Its_rajashekar_12
          </p>
        </div>
      `;
    }
    
    element.appendChild(pageClone);
  }
  
  document.body.appendChild(element);
  
  const options = {
    margin: 0,
    filename: '10-Best-PCOS-Thyroid-Recipes.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'px', format: [900, 1125], hotfixes: ['px_scaling'] },
    pagebreak: { mode: ['avoid-all', 'css'] }
  };
  
  try {
    await html2pdf().from(element).set(options).save();
    showToast("PDF Downloaded Successfully!");
  } catch (error) {
    console.error("PDF generation error:", error);
    showToast("Error generating PDF.");
  } finally {
    element.remove();
  }
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message) {
  toastMessage.textContent = message;
  toastElement.classList.add('show');
  
  setTimeout(() => {
    toastElement.classList.remove('show');
  }, 2500);
}

/* ==========================================================================
   ZOOM DRAGGING (INTERACTION)
   ========================================================================== */
let isDragging = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;
let currentTranslateX = 0, currentTranslateY = 0;

const zoomContainer = document.getElementById('zoom-container');
const viewport = document.getElementById('viewport');

viewport.addEventListener('mousedown', dragStart);
viewport.addEventListener('mousemove', drag);
viewport.addEventListener('mouseup', dragEnd);
viewport.addEventListener('mouseleave', dragEnd);

viewport.addEventListener('touchstart', dragStart, { passive: true });
viewport.addEventListener('touchmove', drag, { passive: false });
viewport.addEventListener('touchend', dragEnd);

function dragStart(e) {
  if (zoomScale <= 1.0) return;
  isDragging = true;
  
  const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
  
  startX = clientX - currentTranslateX;
  startY = clientY - currentTranslateY;
  viewport.style.cursor = 'grabbing';
}

function drag(e) {
  if (!isDragging) return;
  if (e.cancelable) e.preventDefault();
  
  const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
  
  translateX = clientX - startX;
  translateY = clientY - startY;
  
  // Boundary constraints relative to zoom level
  const maxTranslateX = (zoomScale - 1) * (viewport.clientWidth / 2);
  const maxTranslateY = (zoomScale - 1) * (viewport.clientHeight / 2);
  
  translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
  translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));
  
  currentTranslateX = translateX;
  currentTranslateY = translateY;
  
  applyZoomTransform();
}

function dragEnd() {
  isDragging = false;
  viewport.style.cursor = zoomScale > 1.0 ? 'grab' : 'default';
}

function applyZoomTransform() {
  zoomContainer.style.transform = `scale(${zoomScale}) translate(${currentTranslateX / zoomScale}px, ${currentTranslateY / zoomScale}px)`;
}

/* ==========================================================================
   APPLICATION LIFECYCLE / BOOTSTRAP
   ========================================================================== */
async function initApp() {
  // A. Check for custom page images in /pages
  // Update preloader percentage
  updateProgress(15, "Scanning pages...");
  const images = await scanPagesFolder();
  updateProgress(45, "Loading layouts...");
  
  detectedImages = images;
  
  if (images.length > 0) {
    currentMode = 'image';
  } else {
    currentMode = 'html';
  }
  
  // B. Build the book structure inside the DOM
  buildBookDOM();
  updateProgress(75, "Assembling engine...");

  // C. Setup bookmarks, darkmode preferences, audio
  loadFavorites();
  
  const savedDarkMode = localStorage.getItem('cookbook_dark_mode') === 'true';
  if (savedDarkMode) {
    document.body.classList.add('dark-mode');
    darkmodeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    darkmodeBtn.setAttribute('data-tooltip', 'Warm Day Mode');
  }

  const savedMuted = localStorage.getItem('cookbook_audio_muted');
  if (savedMuted !== null) {
    isMuted = savedMuted === 'true';
    if (!isMuted) {
      // Audio element setup
      bgAmbientMusic.volume = 0.35;
    }
  }
  
  const savedVolume = localStorage.getItem('cookbook_flip_volume');
  if (savedVolume !== null) {
    flipVolume = parseFloat(savedVolume);
    volumeSlider.value = flipVolume * 100;
  }

  // D. Initialize StPageFlip
  initPageFlip();
  updateProgress(100, "CookBook Ready!");

  // E. Play intro opening cinematic
  setTimeout(playIntroCinematic, 400);
}

function updateProgress(percentage, phrase) {
  progressText.textContent = `${percentage}%`;
  document.getElementById('loading-overlay').querySelector('.loader-subtitle').textContent = phrase;
  
  // SVG Ring offset: 2 * PI * r (34) = 213.62
  const offset = 213.62 - (percentage / 100) * 213.62;
  progressCircle.style.strokeDashoffset = offset;
}

function playIntroCinematic() {
  // GSAP opening sequence
  const introTl = gsap.timeline({
    onComplete: () => {
      // Reveal Controls HUD sliding up
      hudElement.classList.remove('hidden-hud');
      
      // Auto open cover page
      setTimeout(() => {
        // If a saved bookmark is present, let's turn to it. Otherwise, open the cover to show table of contents
        const savedBookmark = localStorage.getItem('cookbook_bookmark_saved');
        if (savedBookmark !== null && parseInt(savedBookmark, 10) > 0) {
          const targetPage = parseInt(savedBookmark, 10);
          showToast(`Resuming page ${targetPage}...`);
          pageFlip.turnToPage(targetPage);
        } else {
          pageFlip.flip(1); // open cover
        }
      }, 1000);
    }
  });

  // Hide loading preloader
  introTl.to(loadingOverlay, {
    opacity: 0,
    duration: 0.6,
    onComplete: () => {
      loadingOverlay.style.display = 'none';
    }
  });

  // Position closed book titled on table initially
  gsap.set('#book-shadow-wrapper', {
    transform: 'rotateX(22deg) rotateY(-12deg) rotateZ(-6deg) scale(0.85)',
    opacity: 0
  });

  // Animate book: rotate flat and raise scale to center stage
  introTl.to('#book-shadow-wrapper', {
    opacity: 1,
    transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)',
    duration: 1.5,
    ease: 'power3.out'
  });
}

/* ==========================================================================
   EVENT LISTENERS BINDING
   ========================================================================== */
function setupEventListeners() {
  // HUD Navigation Buttons
  document.getElementById('hud-prev-btn').addEventListener('click', () => {
    if (pageFlip) pageFlip.flipPrev();
  });
  document.getElementById('hud-next-btn').addEventListener('click', () => {
    if (pageFlip) pageFlip.flipNext();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!pageFlip) return;
    if (e.key === 'ArrowLeft') pageFlip.flipPrev();
    if (e.key === 'ArrowRight') pageFlip.flipNext();
  });

  // Sidebar Controls
  document.getElementById('hud-toc-btn').addEventListener('click', () => {
    if (sidebarElement.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
      renderSidebarTOC(recipeSearchInput.value);
    }
  });
  document.getElementById('sidebar-close-btn').addEventListener('click', closeSidebar);
  
  // Search bar logic
  recipeSearchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    searchClearBtn.classList.toggle('visible', query.length > 0);
    const activeTab = tabFavorites.classList.contains('active');
    renderSidebarTOC(query, activeTab);
  });

  searchClearBtn.addEventListener('click', () => {
    recipeSearchInput.value = '';
    searchClearBtn.classList.remove('visible');
    const activeTab = tabFavorites.classList.contains('active');
    renderSidebarTOC('', activeTab);
    recipeSearchInput.focus();
  });

  // ToC Tabs Toggle
  tabRecipes.addEventListener('click', () => {
    tabRecipes.classList.add('active');
    tabFavorites.classList.remove('active');
    renderSidebarTOC(recipeSearchInput.value, false);
  });

  tabFavorites.addEventListener('click', () => {
    tabFavorites.classList.add('active');
    tabRecipes.classList.remove('active');
    renderSidebarTOC(recipeSearchInput.value, true);
  });

  // HUD Functional Controls
  bookmarkBtn.addEventListener('click', saveBookmark);
  favoriteBtn.addEventListener('click', (e) => {
    const current = pageFlip.getCurrentPageIndex();
    const recipeIndex = getRecipeIndexFromPageIndex(current);
    if (recipeIndex !== -1) {
      toggleFavorite(e, recipeIndex);
    }
  });
  
  playBtn.addEventListener('click', toggleAutoplay);
  darkmodeBtn.addEventListener('click', toggleNightMode);
  audioBtn.addEventListener('click', toggleMusic);
  
  // Volume Slider
  volumeSlider.addEventListener('input', (e) => {
    flipVolume = parseInt(e.target.value, 10) / 100;
    localStorage.setItem('cookbook_flip_volume', flipVolume);
    // Sync ambient music volume
    bgAmbientMusic.volume = flipVolume * 0.7; // cap ambient slightly lower
  });

  // Share Dialog Actions
  document.getElementById('hud-share-btn').addEventListener('click', openShareModal);
  document.getElementById('share-modal-close').addEventListener('click', closeShareModal);
  document.getElementById('share-copylink').addEventListener('click', copyBookLink);
  shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) closeShareModal();
  });

  // PDF download
  document.getElementById('hud-download-btn').addEventListener('click', triggerPDFDownload);

  // Zoom
  document.getElementById('hud-zoom-in-btn').addEventListener('click', () => changeZoom(0.2));
  document.getElementById('hud-zoom-out-btn').addEventListener('click', () => changeZoom(-0.2));
  
  // Fullscreen
  document.getElementById('hud-fullscreen-btn').addEventListener('click', toggleFullscreen);

  // Kindle Scrubber Page Slider
  const pageSlider = document.getElementById('kindle-page-slider');
  if (pageSlider) {
    pageSlider.addEventListener('input', (e) => {
      const targetPage = parseInt(e.target.value, 10);
      if (pageFlip) {
        pageFlip.turnToPage(targetPage);
      }
    });
  }

  // Tap viewport center to toggle controls HUD (Kindle style)
  const viewportEl = document.getElementById('viewport');
  if (viewportEl) {
    viewportEl.addEventListener('click', (e) => {
      // Ignore click if it originated inside HUD, sidebar, share modal, or dialog card
      if (
        e.target.closest('#controls-hud') || 
        e.target.closest('#sidebar') || 
        e.target.closest('.hud-btn') || 
        e.target.closest('.modal-card') ||
        e.target.closest('#hud-toc-btn')
      ) {
        return;
      }
      hudElement.classList.toggle('hidden-hud');
    });
  }

  // Double Click / Double Tap viewport to zoom/reset zoom
  const viewport = document.getElementById('viewport');
  viewport.addEventListener('dblclick', () => {
    if (zoomScale > 1.0) {
      changeZoom(0); // reset
    } else {
      changeZoom(0.4); // zoom in slightly
    }
  });

  // Re-adjust page-flip responsive bounds on resize
  window.addEventListener('resize', () => {
    if (pageFlip) {
      const isPortrait = window.innerWidth <= 768;
      if (isPortrait) {
        bookElement.style.width = '100%';
        bookElement.style.height = '100%';
      } else {
        bookElement.style.width = '1800px';
        bookElement.style.height = '1125px';
      }
      pageFlip.update();
    }
  });
}

// 2. Register PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((reg) => console.log('[Service Worker] Registered successfully', reg.scope))
      .catch((err) => console.error('[Service Worker] Registration failed', err));
  });
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  initApp();
});
