// gamesDB.js
export const retroGames = [
  // --- GERAÇÃO 8-BIT (NES / MASTER SYSTEM) ---
  {
    id: "mario",
    consoleId: "nes",
    title: "Super Mario Bros.",
    year: 1985,
    description: "O jogo que salvou a indústria dos videogames em 85.",
    iconicReason: "Estabeleceu as regras de design de fases que seguimos até hoje.",
    achievements: [{ id: "smb_01", title: "Agradeça ao Toad", xp: 150, icon: "🍄" }]
  },
  {
    id: "castle-illusion",
    consoleId: "sms",
    title: "Mickey Mouse - Castle of Illusion",
    year: 1990,
    description: "Uma das melhores adaptações da Disney para os 8-bits.",
    iconicReason: "Provou que o Master System era capaz de cores vibrantes e animações fluidas.",
    achievements: [{ id: "ci_01", title: "Mestre da Magia", xp: 150, icon: "🎩" }]
  },

  // --- GERAÇÃO 16-BIT (SNES / MEGA DRIVE) ---
  {
    id: "sonic-the-hedgehog",
    consoleId: "megadrive",
    title: "Sonic the Hedgehog",
    year: 1991,
    description: "Velocidade pura e atitude em forma de ouriço azul.",
    iconicReason: "Deu à SEGA o poder necessário para enfrentar a Nintendo.",
    achievements: [{ id: "snc_01", title: "Velocidade do Som", xp: 200, icon: "🦔" }]
  },
  {
    id: "super-mario-world",
    consoleId: "snes",
    title: "Super Mario World",
    year: 1990,
    description: "A evolução perfeita da fórmula do Mario, agora com o Yoshi.",
    iconicReason: "O maior clássico do SNES e um dos melhores jogos de plataforma já feitos.",
    achievements: [{ id: "smw_01", title: "Amigo do Yoshi", xp: 200, icon: "🦖" }]
  },

  // --- GERAÇÃO PORTÁTIL (GAME BOY COLOR / ADVANCE) ---
  // Esses consoles são 100% estáveis na web e não precisam de BIOS
  {
    id: "pokemon-yellow",
    consoleId: "gbc",
    title: "Pokémon Yellow",
    year: 1998,
    description: "A jornada clássica de Kanto com o Pikachu seguindo você.",
    iconicReason: "Fenômeno cultural que definiu a cara da Nintendo nos anos 90.",
    achievements: [{ id: "pkm_01", title: "Mestre Pokémon", xp: 300, icon: "⚡" }]
  },
  {
    id: "zelda-minish",
    consoleId: "gba",
    title: "Zelda: The Minish Cap",
    year: 2004,
    description: "Uma aventura vibrante onde Link pode encolher de tamanho.",
    iconicReason: "Um dos jogos visualmente mais bonitos da era pixel-art.",
    achievements: [{ id: "tmc_01", title: "Pequeno Herói", xp: 300, icon: "🗡️" }]
  },
  {
    id: "metroid-fusion",
    consoleId: "gba",
    title: "Metroid Fusion",
    year: 2002,
    description: "Samus Aran enfrenta o parasita X em uma estação espacial.",
    iconicReason: "Trouxe uma narrativa mais densa e clima de suspense para a série.",
    achievements: [{ id: "mf_01", title: "Caçadora de Elite", xp: 350, icon: "🚀" }]
  }
];