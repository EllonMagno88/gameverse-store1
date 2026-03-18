import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlatformDuelCanvas from '../components/PlatformDuelCanvas';
import ConsoleDuelCanvas from '../components/ConsoleDuelCanvas'; 
import TankDuelCanvas from '../components/TankDuelCanvas';
import SpeedDuelCanvas from '../components/SpeedDuelCanvas';
import PolyDuelCanvas from '../components/PolyDuelCanvas';
import FluidDuelCanvas from '../components/FluidDuelCanvas';
import '../components/RetroHome.css';

export default function RetroHome() {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="retro-wrapper">
      <div className="crt-overlay"></div>

      {!isLoaded ? (
        <div className="retro-intro-anim">
          <h2 className="loading-text-retro">[ ACESSANDO_ARQUIVOS_CONFIDENCIAIS ]</h2>
          <div className="progress-bar-retro"><div className="progress-fill"></div></div>
        </div>
      ) : (
        <section className="retro-main fadeIn">
          
          {/* BOAS-VINDAS */}
          <div className="retro-welcome-box">
            <h2 className="glitch-text" data-text="PARABÉNS, VIAJANTE!">PARABÉNS, VIAJANTE!</h2>
            <p className="welcome-desc">
              VOCÊ QUEBROU O CÓDIGO! VOCÊ ESTÁ NA <span>GAMEVERSE_RETRÔ</span>: UMA FALHA NO ESPAÇO-TEMPO ONDE O PIXEL É REI E OS BITS SÃO CONTADOS NOS DEDOS. 
              AQUI, O SEU PC DE ÚLTIMA GERAÇÃO NÃO VALE NADA. O QUE IMPORTA É O SINAL VHF E A SORTE DE NÃO ENROLAR A FITA DO CARTUCHO. 
            </p>
          </div>

          {/* --- 1ª GERAÇÃO --- */}
          <div className="generation-section gen-1-theme">
            <h3 className="section-title">// 1ª_GERAÇÃO: O_BIG_BANG (1972)</h3>
            <div className="battle-container">
              <div className="console-focus-card primary">
                <div className="badge">PIONEIRO</div>
                <h4>MAGNAVOX ODYSSEY</h4>
                <div className="pixel-divider-short"></div>
                <p>TECNOLOGIA ANALÓGICA PURA. O PONTO ZERO DOS VIDEOGAMES CASEIROS.</p>
              </div>
              <div className="vs-badge">VS</div>
              <div className="console-focus-card rival">
                <div className="badge">RIVAL</div>
                <h4>PONG (ATARI)</h4>
                <div className="pixel-divider-short"></div>
                <p>O FENÔMENO QUE TRANSFORMOU O "BIP" EM UM NEGÓCIO DE BILHÕES.</p>
              </div>
            </div>
            <div className="duel-visual-wrapper">
              <ConsoleDuelCanvas console1Name="ODYSSEY" console2Name="PONG_ATARI" color1="#33ff33" color2="#ffaa00" />
            </div>
            <div className="retro-news-container">
              <h4 className="news-label">TRANSMISSÕES_1972</h4>
              <div className="retro-news-grid">
                <div className="news-item"><span className="news-tag">[ HARDWARE ]</span><p>ENGENHEIROS AFIRMAM: "O FUTURO DOS GAMES SERÁ EM CARTUCHOS".</p></div>
                <div className="news-item"><span className="news-tag">[ MERCADO ]</span><p>ODYSSEY ATINGE 100 MIL UNIDADES VENDIDAS. O MUNDO ENLOUQUECEU!</p></div>
              </div>
            </div>
          </div>

          {/* --- 2ª GERAÇÃO --- */}
          <div className="generation-section gen-2-theme">
            <div className="line-divider"></div>
            <h3 className="section-title">// 2ª_GERAÇÃO: A_ERA_DOS_CARTUCHOS (1977)</h3>
            <div className="battle-container">
              <div className="console-focus-card primary-atari">
                <div className="badge">REI</div>
                <h4>ATARI 2600</h4>
                <div className="pixel-divider-short"></div>
                <p>O ÍCONE QUE TROUXE O ARCADE PARA DENTRO DA SALA DE ESTAR.</p>
              </div>
              <div className="vs-badge">VS</div>
              <div className="console-focus-card rival-intel">
                <div className="badge">RIVAL</div>
                <h4>INTELLIVISION</h4>
                <div className="pixel-divider-short"></div>
                <p>A MATTEL TENTANDO DESBANCAR O REINO COM MAIS "REALISMO".</p>
              </div>
            </div>
            <div className="duel-visual-wrapper tank-style">
              <TankDuelCanvas color1="#8b4513" color2="#00aaff" />
            </div>
            <div className="retro-news-container">
              <h4 className="news-label">TRANSMISSÕES_1977_1982</h4>
              <div className="retro-news-grid">
                <div className="news-item highlight"><span className="news-tag">[ 1978 ]</span><p>SPACE INVADERS CAUSA ESCASSEZ DE MOEDAS NO JAPÃO.</p></div>
                <div className="news-item"><span className="news-tag">[ 1982 ]</span><p>PAC-MAN CHEGA AO ATARI 2600. RUMORES DE UMA VERSÃO POLÊMICA.</p></div>
              </div>
            </div>
          </div>

          {/* --- 3ª GERAÇÃO --- */}
          <div className="generation-section gen-3-theme">
            <div className="line-divider"></div>
            <h3 className="section-title">// 3ª_GERAÇÃO: O_RENASCIMENTO_8-BITS (1983)</h3>
            <div className="battle-container">
              <div className="console-focus-card nintendo-red">
                <div className="badge">SALVADOR</div>
                <h4>NES (NINTENDO)</h4>
                <div className="pixel-divider-short"></div>
                <p>A RESSURREIÇÃO DA INDÚSTRIA APÓS O GRANDE CRASH DE 83.</p>
              </div>
              <div className="vs-badge">VS</div>
              <div className="console-focus-card sega-blue">
                <div className="badge">DESAFIANTE</div>
                <h4>MASTER SYSTEM</h4>
                <div className="pixel-divider-short"></div>
                <p>A SEGA MOSTRANDO QUE TINHA O DOBRO DE CORES E PODER.</p>
              </div>
            </div>
            <div className="duel-visual-wrapper">
              <PlatformDuelCanvas color1="#ff0000" color2="#0000ff" />
            </div>
            <div className="retro-news-container">
              <h4 className="news-label">TRANSMISSÕES_1983_1987</h4>
              <div className="retro-news-grid">
                <div className="news-item"><span className="news-tag">[ 1985 ]</span><p>NES LANÇADO NOS EUA. O SELO DE QUALIDADE NINTENDO É A LEI.</p></div>
                <div className="news-item sega-news"><span className="news-tag">[ 1986 ]</span><p>MASTER SYSTEM TRAZ O PODER DOS ARCADES PARA CASA.</p></div>
              </div>
            </div>
          </div>

          {/* --- 4ª GERAÇÃO --- */}
          <div className="generation-section gold-era">
            <div className="line-divider"></div>
            <h3 className="section-title gold-text">// 4ª_GERAÇÃO: A_SUPREMACIA_16-BITS (1990)</h3>
            <div className="battle-container">
              <div className="console-focus-card snes-card">
                <div className="badge gold">PODER_GRÁFICO</div>
                <h4>SUPER NINTENDO</h4>
                <p>MODE 7 E CHIPS ESPECIAIS: ONDE A NINTENDO PERFECCIONOU O 2D.</p>
              </div>
              <div className="vs-badge">VS</div>
              <div className="console-focus-card mega-card">
                <div className="badge blast">BLAST_PROCESSING</div>
                <h4>MEGA DRIVE</h4>
                <p>ATITUDE, VELOCIDADE E O SOM QUE DEFINIU OS ANOS 90.</p>
              </div>
            </div>
            <div className="duel-visual-wrapper speed-style">
              <SpeedDuelCanvas />
            </div>
            <div className="retro-news-container">
              <h4 className="news-label">MEMÓRIAS_DA_GUERRA_DOS_CONSOLES</h4>
              <div className="retro-news-grid">
                <div className="news-item blood-item"><span className="news-tag">[ CENSURA ]</span><p>MORTAL KOMBAT: SANGUE NO MEGA DRIVE, SUOR NO SNES.</p></div>
                <div className="news-item"><span className="news-tag">[ REVOLUÇÃO ]</span><p>DONKEY KONG COUNTRY MOSTRA O PODER DO PRÉ-RENDERIZADO.</p></div>
              </div>
            </div>
          </div>

          {/* --- 5ª GERAÇÃO --- */}
          <div className="generation-section poly-era">
            <div className="line-divider"></div>
            <h3 className="section-title poly-text">// 5ª_GERAÇÃO: O_ALVORECER_DOS_POLÍGONOS (1994)</h3>
            <div className="battle-container">
              <div className="console-focus-card psx-card">
                <div className="badge psx">CD-ROM</div>
                <h4>PLAYSTATION</h4>
                <p>A SONY CHEGOU PARA MUDAR TUDO. ADEUS CARTUCHOS, OLÁ FMV.</p>
              </div>
              <div className="vs-badge">VS</div>
              <div className="console-focus-card saturn-card">
                <div className="badge saturn">2D_MESTRE</div>
                <h4>SEGA SATURN</h4>
                <p>A ARQUITETURA COMPLEXA QUE TRAVOU UMA GUERRA DE POLÍGONOS.</p>
              </div>
            </div>
            <div className="duel-visual-wrapper poly-style">
              <PolyDuelCanvas />
            </div>
            <div className="retro-news-container">
              <h4 className="news-label">TRANSMISSÕES_DO_FUTURO_3D</h4>
              <div className="retro-news-grid">
                <div className="news-item"><span className="news-tag">[ MÍDIA ]</span><p>O CD PODE ARMAZENAR 700MB! ESPAÇO INFINITO PARA JOGOS.</p></div>
                <div className="news-item highlight"><span className="news-tag">[ RIVAL ]</span><p>NINTENDO ANUNCIA O "ULTRA 64". SERÁ QUE O CARTUCHO SOBREVIVE?</p></div>
              </div>
            </div>
          </div>

          {/* --- 6ª GERAÇÃO --- */}
          <div className="generation-section fluid-era">
            <div className="line-divider"></div>
            <h3 className="section-title fluid-text">// 6ª_GERAÇÃO: O_DOMÍNIO_DO_DVD (2000)</h3>
            <div className="battle-container">
              <div className="console-focus-card ps2-card">
                <div className="badge ps2">REI</div>
                <h4>PLAYSTATION 2</h4>
                <p>O CONSOLE MAIS VENDIDO COM UMA BIBLIOTECA INFINITA.</p>
              </div>
              <div className="vs-badge">VS</div>
              <div className="console-focus-card xbox-card">
                <div className="badge xbox">DIRECTX</div>
                <h4>XBOX</h4>
                <p>A MICROSOFT ENTRA COM O PODER DO HD INTERNO E HALO.</p>
              </div>
            </div>
            <div className="duel-visual-wrapper fluid-style">
              <FluidDuelCanvas />
            </div>
            <div className="retro-news-container">
              <h4 className="news-label">LOGS_DO_SÉCULO_XXI</h4>
              <div className="retro-news-grid">
                <div className="news-item highlight"><span className="news-tag">[ ONLINE ]</span><p>XBOX LIVE REVOLUCIONA COMO JOGAMOS COM AMIGOS.</p></div>
                <div className="news-item"><span className="news-tag">[ NINTENDO ]</span><p>GAMECUBE LANÇA COM MINI-DVDS E DESIGN COMPACTO.</p></div>
              </div>
            </div>
          </div>

          {/* BOTÃO FINAL */}
          <div className="explore-more-container">
            <button className="retro-btn-massive" onClick={() => navigate('/retro/consoles')}>
                [ ACESSAR_BANCO_DE_DADOS_COMPLETO ]
            </button>
          </div>
        </section>
      )}
    </main>
  );
}