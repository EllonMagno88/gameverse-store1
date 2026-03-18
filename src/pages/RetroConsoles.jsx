import React, { useState, useEffect } from 'react';
import { consoleData } from '../data/consoleDB';
import '../components/RetroConsoles.css';

export default function RetroConsoles() {
  const [filterGen, setFilterGen] = useState('ALL');
  const [visibleConsoles, setVisibleConsoles] = useState(consoleData);

  useEffect(() => {
    if (filterGen === 'ALL') {
      setVisibleConsoles(consoleData);
    } else {
      const filtered = consoleData.filter(c => String(c.gen) === String(filterGen));
      setVisibleConsoles(filtered);
    }
  }, [filterGen]);

  const groupedConsoles = visibleConsoles.reduce((acc, console) => {
    (acc[console.gen] = acc[console.gen] || []).push(console);
    return acc;
  }, {});

  const genTitles = {
    1: { title: "1ª GERAÇÃO // O BIG BANG ANALÓGICO", desc: "A era onde tudo era mato e os pixels eram blocos de fita isolante na tela da TV." },
    2: { title: "2ª GERAÇÃO // A INVASÃO DOS CARTUCHOS", desc: "A febre do Atari e o crash de 83. O mercado inflou e implodiu." },
    3: { title: "3ª GERAÇÃO // O RESGATE 8-BITS", desc: "A Nintendo salva a indústria. Os jogos ganham rolagem lateral e direcional em cruz." },
    4: { title: "4ª GERAÇÃO // A GUERRA DOS 16-BITS", desc: "Sega vs Nintendo. 'Genesis does what Nintendon't'. A era de ouro da rivalidade." },
    5: { title: "5ª GERAÇÃO // A REVOLUÇÃO 3D E O CD", desc: "Polígonos tremidos, loading screens e o nascimento das cinemáticas." },
    6: { title: "6ª GERAÇÃO // O IMPÉRIO DO DVD", desc: "A Sony domina o mundo, a Sega se despede dos consoles e a Microsoft entra no jogo." }
  };

  return (
    <div className="retro-consoles-page">
      <div className="crt-overlay"></div>
      
      <main className="consoles-content">
        <header className="consoles-page-title">
          <h2 className="glitch-text" data-text="ARQUIVOS_DE_HARDWARE">ARQUIVOS_DE_HARDWARE</h2>
          <nav className="filter-nav">
            {['ALL', 1, 2, 3, 4, 5, 6].map(g => (
              <button 
                key={g} 
                className={`filter-btn ${filterGen === String(g) ? 'active' : ''}`}
                onClick={() => setFilterGen(String(g))}
              >
                {g === 'ALL' ? '[ VER_TODOS ]' : `[ ${g}ª_GEN ]`}
              </button>
            ))}
          </nav>
        </header>

        <section className="consoles-database-wrapper">
          {Object.keys(groupedConsoles).map(genNum => (
            <div className="generation-section" key={genNum}>
              <div className={`gen-divider-banner banner-gen-${genNum}`}>
                <div className="banner-content">
                  <h3>{genTitles[genNum]?.title || `${genNum}ª GERAÇÃO`}</h3>
                  <p>{genTitles[genNum]?.desc}</p>
                </div>
              </div>

              <div className="consoles-grid">
                {groupedConsoles[genNum].map((item) => (
                  <article className="console-card" key={item.id}>
                    <div className="card-header">
                      <span className="gen-label">GEN_0{item.gen}</span>
                      <span className="manufacturer">{item.manufacturer}</span>
                    </div>

                    <div className="console-display">
                      <div className="display-grid-overlay"></div>
                      <div className={`console-sprite ${item.spriteClass}`}></div>
                    </div>

                    <div className="console-specs">
                      <h3 className="console-name">{item.name}</h3>
                      <div className="tech-badge">{item.status}</div>
                      
                      <div className="console-desc-box">
                        <p>{item.description}</p>
                      </div>
                      
                      <div className="specs-list">
                         <div className="spec-item"><span className="label">ANO:</span><span className="value">{item.year}</span></div>
                         <div className="spec-item"><span className="label">TECH:</span><span className="value">{item.tech}</span></div>
                      </div>

                      {/* Info Extra vinculada diretamente ao console no Banco de Dados */}
                      <div className="card-fun-fact">
                        <span className="fact-label">INFO_EXTRA:</span>
                        <p>{item.funFact}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* --- SEÇÃO CORRIGIDA: GUERRA DOS CONSOLES COM DIVISÕES CLARAS --- */}
        <section className="console-wars-section">
          <div className="war-title-block">
            <h2 className="glitch-text" data-text="GUERRA_DOS_CONSOLES">GUERRA_DOS_CONSOLES</h2>
            <div className="war-subtitle">RELATÓRIO DE CONFLITOS E EVOLUÇÃO TECNOLÓGICA</div>
          </div>

          <div className="war-chronicles">
            <article className="war-card">
              <div className="war-header-row">
                <span className="war-era">1988-1994: A GUERRA DOS BITS</span>
                <div className="war-status-tag">FINALIZADO</div>
              </div>
              <h3>Sega Genesis vs SNES</h3>
              <div className="war-body">
                <p>O nascimento da rivalidade moderna. Enquanto a Nintendo focava em cores e som (Mode 7), a Sega vendia "atitude" e velocidade (Blast Processing). Foi o marco da transição de "brinquedos" para "eletrônicos de desejo".</p>
                <div className="war-footer-info">
                  <span className="tech-milestone">MARCO: Popularização dos 16-bits.</span>
                  <span className="winner-tag">RESULTADO: Domínio de Mercado Partilhado</span>
                </div>
              </div>
            </article>

            <article className="war-card">
              <div className="war-header-row">
                <span className="war-era">1994-1999: O ADVENTO DO 3D</span>
                <div className="war-status-tag">FINALIZADO</div>
              </div>
              <h3>A Traição da Sony</h3>
              <div className="war-body">
                <p>A Nintendo rompeu com a Sony para o projeto de CD do SNES, criando sua maior rival. O PlayStation provou que o CD-ROM era o futuro, enquanto o N64 lutava com o espaço limitado dos cartuchos, apesar do seu poder 3D superior.</p>
                <div className="war-footer-info">
                  <span className="tech-milestone">MARCO: Renderização Poligonal e Mídia Óptica.</span>
                  <span className="winner-tag">RESULTADO: Vitória Esmagadora da Sony</span>
                </div>
              </div>
            </article>

            <article className="war-card">
              <div className="war-header-row">
                <span className="war-era">2000-2006: A ERA MULTIMÍDIA</span>
                <div className="war-status-tag">FINALIZADO</div>
              </div>
              <h3>O Monolito Negro vs A Caixa X</h3>
              <div className="war-body">
                <p>O PS2 venceu ao ser o DVD player mais barato do mercado. A Microsoft entrou na briga trazendo a arquitetura de PC (DirectX) e a revolução da jogatina online em banda larga com a Xbox Live.</p>
                <div className="war-footer-info">
                  <span className="tech-milestone">MARCO: Integração de Internet e DVD Video.</span>
                  <span className="winner-tag">RESULTADO: PS2 torna-se o mais vendido da história</span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}