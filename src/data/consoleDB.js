// consoleDB.js
export const consoleData = [
  // ================= 1ª GERAÇÃO =================
  {
    id: "odyssey", gen: 1, name: "Magnavox Odyssey", year: 1972, manufacturer: "Magnavox",
    tech: "Analógico Discreto / Sem CPU / Sinais VHF", status: "O MARCO ZERO", spriteClass: "sprite-odyssey",
    funFact: "Ele não produzia som. Os jogadores tinham que jogar em silêncio total ou imaginar os bipes.",
    description: "Projetado por Ralph Baer, o Odyssey não utilizava microprocessadores. Toda a sua lógica funcionava baseada em circuitos analógicos discretos compostos de diodos e transistores. Os 'cartuchos' eram pontes de jumpers que reconfiguravam o circuito interno para exibir blocos brancos na tela. Os jogadores precisavam colar overlays de plástico na TV para simular campos de tênis ou rinques de hóquei."
  },
  {
    id: "homepong", gen: 1, name: "Atari Home Pong", year: 1975, manufacturer: "Atari",
    tech: "Chip Customizado Pong", status: "A MÁQUINA DE SEARS", spriteClass: "sprite-homepong",
    funFact: "O protótipo original era feito de madeira e fios expostos, e Nolan Bushnell o carregava numa maleta para vender a ideia.",
    description: "Após o sucesso estrondoso de Pong nos fliperamas, Nolan Bushnell decidiu levar a experiência para a sala de estar. O Home Pong foi rejeitado por várias lojas até a Sears decidir vendê-lo sob sua marca 'Tele-Games'. Diferente do Odyssey, o Home Pong gerava o placar na própria tela de tubo e possuía efeitos sonoros (o icônico 'bip'). Seu design com botões giratórios (paddles) definiu a era."
  },
  {
    id: "telstar", gen: 1, name: "Coleco Telstar", year: 1976, manufacturer: "Coleco",
    tech: "Chip General Instrument AY-3-8500", status: "O CLONE PERFEITO", spriteClass: "sprite-telstar",
    funFact: "A Coleco quase faliu antes do lançamento devido a uma greve química que quase impediu a produção dos chips.",
    description: "Enquanto o mercado era inundado por clones de Pong construídos com componentes discretos, a Coleco foi esperta: fez uma parceria com a General Instrument e garantiu o chip AY-3-8500, o 'Pong num chip'. Com um belo acabamento em madeira falsa e controles embutidos na própria carcaça, o Telstar foi um sucesso absoluto de vendas no Dia dos Pais de 1976."
  },
  {
    id: "colortvgame", gen: 1, name: "Color TV-Game", year: 1977, manufacturer: "Nintendo",
    tech: "Microprocessador Mitsubishi", status: "O PRIMEIRO PASSO DA NINTENDO", spriteClass: "sprite-colortv",
    funFact: "Shigeru Miyamoto, o criador de Mario, ajudou a desenhar o design externo da carcaça do modelo Racing 112 desta linha.",
    description: "Antes do NES, do Mario e do Game Boy, a gigante dos baralhos Hanafuda entrou nos videogames em parceria com a Mitsubishi. O Color TV-Game 6 era um console dedicado com seis variações de Light Tennis (Pong). Diferente dos concorrentes em preto e branco, ele exibia gráficos em cores chamativas."
  },

  // ================= 2ª GERAÇÃO =================
  {
    id: "atari2600", gen: 2, name: "Atari 2600", year: 1977, manufacturer: "Atari",
    tech: "MOS 6507 @ 1.19MHz / 128 Bytes RAM", status: "O REI DA ERA DOURADA", spriteClass: "sprite-atari",
    funFact: "O console tem apenas 128 bytes de RAM. Isso é menos memória do que o texto deste card ocupa no seu navegador.",
    description: "Com seu acabamento em madeira e chaves de metal, o 2600 popularizou os cartuchos. Seu hardware (o chip TIA) era tão limitado que programadores precisavam desenhar os gráficos na tela linha por linha acompanhando o feixe de elétrons da TV. Apesar dos meros 128 bytes de RAM, gerou clássicos como Pitfall! e River Raid."
  },
  {
    id: "odyssey2", gen: 2, name: "Magnavox Odyssey²", year: 1978, manufacturer: "Magnavox / Philips",
    tech: "Intel 8048 @ 5.38MHz / 64 Bytes RAM", status: "O CONSOLE-COMPUTADOR", spriteClass: "sprite-odyssey2",
    funFact: "No Brasil, ele ficou tão famoso que muitos chamavam qualquer videogame apenas de 'Odyssey' nos anos 80.",
    description: "Com um teclado de membrana alfanumérico embutido na carcaça, o Odyssey² tentou unir o entretenimento dos jogos com a educação dos computadores domésticos. Nos EUA teve dificuldade contra o Atari, mas no Brasil e na Europa (onde foi lançado como Philips Videopac G7000), fez enorme sucesso."
  },
  {
    id: "intellivision", gen: 2, name: "Intellivision", year: 1979, manufacturer: "Mattel",
    tech: "General Instrument CP1610 16-bit / 1.4KB RAM", status: "O RIVAL INTELIGENTE", spriteClass: "sprite-intellivision",
    funFact: "O nome é uma fusão de 'Intelligent Television'. Foi o primeiro sistema a oferecer download de jogos via cabo (PlayCable).",
    description: "A Mattel lançou o Intellivision com um CPU de 16-bits para destruir graficamente o Atari 2600. Seus controles icônicos pareciam telefones, com discos direcionais e teclados numéricos que exigiam o uso de plásticos (overlays) para mapear as funções de cada jogo."
  },
  {
    id: "colecovision", gen: 2, name: "ColecoVision", year: 1982, manufacturer: "Coleco",
    tech: "Zilog Z80A @ 3.58MHz / 8KB RAM", status: "A QUALIDADE DE ARCADE", spriteClass: "sprite-colecovision",
    funFact: "A Coleco começou originalmente como 'Connecticut Leather Company', uma empresa de couro para sapatos.",
    description: "Em 1982, o ColecoVision explodiu cabeças ao trazer gráficos virtualmente idênticos aos dos fliperamas para dentro de casa. Com Donkey Kong incluso na caixa, ele humilhou os ports rudimentares do Atari 2600."
  },

  // ================= 3ª GERAÇÃO =================
  {
    id: "nes", gen: 3, name: "Nintendo (NES)", year: 1983, manufacturer: "Nintendo",
    tech: "Ricoh 2A03 8-bit / 2KB RAM", status: "O RESSUSCITADOR", spriteClass: "sprite-nes",
    funFact: "O design 'frente de videocassete' nos EUA foi feito para as pessoas não acharem que era um videogame.",
    description: "O NES definiu o padrão da indústria moderna: o direcional em cruz (D-Pad), o rígido controle de qualidade e a rolagem lateral perfeita em Super Mario Bros. As baterias internas nos cartuchos de Zelda permitiram que mundos gigantescos fossem salvos pela primeira vez."
  },
  {
    id: "sms", gen: 3, name: "Sega Master System", year: 1985, manufacturer: "Sega",
    tech: "Zilog Z80 @ 3.58MHz / 8KB RAM", status: "O TITÃ DO BRASIL", spriteClass: "sprite-master",
    funFact: "É o console com o tempo de fabricação contínua mais longo da história, graças à Tectoy no Brasil.",
    description: "Tecnicamente muito superior ao NES, o Master System possuía gráficos mais nítidos e jogos na memória (como Alex Kidd). Encontrou glória eterna na Europa e no Brasil, onde a Tectoy o manteve em produção por décadas."
  },

  // ================= 4ª GERAÇÃO =================
  {
    id: "megadrive", gen: 4, name: "Sega Genesis (Mega Drive)", year: 1988, manufacturer: "Sega",
    tech: "Motorola 68000 @ 7.6MHz / 64KB RAM", status: "O MAIS RÁPIDO DO MUNDO", spriteClass: "sprite-mega",
    funFact: "O 'Blast Processing' era apenas um termo de marketing inventado para dizer que o console era mais rápido que o SNES.",
    description: "Símbolo dos anos 90, o Mega Drive trouxe atitude adolescente. O processador Motorola permitiu o famoso 'Blast Processing', entregando jogos ultrarrápidos como Sonic the Hedgehog e trilhas sonoras FM pesadas."
  },
  {
    id: "snes", gen: 4, name: "Super Nintendo (SNES)", year: 1990, manufacturer: "Nintendo",
    tech: "Ricoh 5A22 16-bit / 128KB RAM", status: "A PERFEIÇÃO GRÁFICA", spriteClass: "sprite-snes",
    funFact: "O chip de som foi projetado pela Sony. Sim, a Nintendo ajudou a criar sua maior futura rival.",
    description: "Com uma paleta de 32 mil cores, áudio cinematográfico feito por Ken Kutaragi (Sony) e o chip Mode 7, o SNES criou pseudo-3D e rotações maravilhosas. É o berço dourado de JRPGs absolutos como Chrono Trigger."
  },
  {
    id: "neogeo", gen: 4, name: "Neo Geo AES", year: 1990, manufacturer: "SNK",
    tech: "Motorola 68000 @ 12MHz + Z80 / 64KB RAM", status: "O ROLLS-ROYCE DOS VIDEOGAMES", spriteClass: "sprite-neogeo",
    funFact: "Um único cartucho de Neo Geo hoje pode custar mais de 10 mil reais em leilões.",
    description: "O Neo Geo era literalmente um arcade de 24-bits disfarçado. Ele processava centenas de sprites colossais sem piscar. O problema? O console e os cartuchos custavam uma fortuna em 1990."
  },

  // ================= 5ª GERAÇÃO =================
  {
    id: "gbc", gen: 5, name: "Game Boy Color", year: 1998, manufacturer: "Nintendo",
    tech: "Z80 @ 8MHz / 32KB RAM", status: "A EXPLOSÃO DE CORES", spriteClass: "sprite-gbc",
    funFact: "Foi o primeiro portátil da Nintendo a ter retrocompatibilidade total com o Game Boy clássico.",
    description: "O sucessor do lendário Game Boy trouxe uma tela colorida e um processador mais rápido, permitindo clássicos como Pokémon Yellow e The Legend of Zelda: Oracle of Ages."
  },
  {
    id: "ps1", gen: 5, name: "Sony PlayStation", year: 1994, manufacturer: "Sony",
    tech: "MIPS R3000A 32-bit @ 33.8MHz / 2MB RAM", status: "A REVOLUÇÃO DOS POLÍGONOS", spriteClass: "sprite-ps1",
    funFact: "Nascido da traição da Nintendo (que cancelou o projeto do SNES CD).",
    description: "O PlayStation mudou a demografia global ao abraçar a mídia óptica e os jogos com apelo para jovens adultos. Extremamente amigável para programadores, permitiu obras como Final Fantasy VII e Metal Gear Solid."
  },

  // ================= 6ª GERAÇÃO =================
  {
    id: "gba", gen: 6, name: "Game Boy Advance", year: 2001, manufacturer: "Nintendo",
    tech: "ARM7TDMI @ 16.7MHz / 32KB RAM", status: "O SNES DE BOLSO", spriteClass: "sprite-gba",
    funFact: "Sua tela horizontal foi inspirada no design do GameGear e do Lynx para ser mais ergonômica.",
    description: "Muitas vezes chamado de 'SNES de bolso', o GBA entregou gráficos 2D perfeitos e o auge da pixel art na história dos games. Essencial para emulação estável na web."
  },
  {
    id: "ps2", gen: 6, name: "PlayStation 2", year: 2000, manufacturer: "Sony",
    tech: "Emotion Engine 128-bit @ 294MHz / 32MB RAM", status: "O MONOLITO NEGRO", spriteClass: "sprite-ps2",
    funFact: "O console mais vendido de toda a história humana (mais de 155 milhões).",
    description: "A grande jogada de gênio da Sony foi incluir um leitor de DVD player nativo. Reinou supremo com títulos definidores de gênero como GTA San Andreas e Shadow of the Colossus."
  },
  {
    id: "dreamcast", gen: 6, name: "Sega Dreamcast", year: 1998, manufacturer: "Sega",
    tech: "Hitachi SH-4 @ 200MHz / 16MB RAM", status: "O VISIONÁRIO INCOMPREENDIDO", spriteClass: "sprite-dreamcast",
    funFact: "Foi o primeiro console da história com um modem embutido (56k) para jogatina online nativa.",
    description: "O Dreamcast estava anos à frente de seu tempo. Inovou com o VMU e entregou gráficos crisp 480p lindos em Shenmue e Crazy Taxi."
  },
  {
    id: "xbox", gen: 6, name: "Microsoft Xbox", year: 2001, manufacturer: "Microsoft",
    tech: "Intel Pentium III Celeron @ 733MHz / 64MB RAM", status: "O PC NA SALA DE ESTAR", spriteClass: "sprite-xbox",
    funFact: "O protótipo original foi construído usando peças desmontadas de laptops da Dell.",
    description: "Trouxe o Xbox Live com banda larga e deu ao mundo Halo: Combat Evolved, que provou que shooters funcionam em consoles."
  }
];