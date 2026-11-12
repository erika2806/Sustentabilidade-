document.addEventListener('DOMContentLoaded', () => {
    /* ======================================================================
       1. Menu Mobile e Navegação Ativa
       ====================================================================== */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

    // Destacar link ativo durante a rolagem
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 110;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    /* ======================================================================
       2. Animação de Contadores na Barra de Estatísticas
       ====================================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateStats = () => {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1600;
            const increment = target / (duration / 20);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    };

    const statsSection = document.querySelector('.stats-bar');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        }, { threshold: 0.4 });
        observer.observe(statsSection);
    }

    /* ======================================================================
       3. Filtro de Artigos Científicos
       ====================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articleCards = document.querySelectorAll('.article-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Atualiza estado ativo dos botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            articleCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'todos' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ======================================================================
       4. Banco de Dados para Modal (Artigos Completos e Detalhes dos Temas)
       ====================================================================== */
    const articlesData = {
        "1": {
            tag: "Pegada de Carbono • Artigo Científico",
            title: "Avaliação do Ciclo de Vida (ACV) e Pegada de Carbono na Cadeia Agroindustrial Brasileira",
            meta: "Autores: Silva, M. R.; Oliveira, T. S.; Mendes, C. A. | Publicado em: Journal of Cleaner Production (2024)",
            content: `
                <h4>1. Introdução</h4>
                <p>A quantificação rigorosa das emissões de gases de efeito estufa (GEE) tornou-se requisito central para acordos climáticos internacionais e rastreabilidade de exportações. A norma ISO 14067 estabelece diretrizes específicas para o cálculo da pegada de carbono de produtos (PCF).</p>
                <h4>2. Metodologia</h4>
                <p>Foram analisadas 45 unidades produtivas entre 2021 e 2023, considerando as fronteiras "do berço ao portão" (cradle-to-gate). Contabilizaram-se emissões de óxido nitroso (N₂O) do solo, consumo de diesel em maquinário e transporte rodoviário/ferroviário.</p>
                <h4>3. Principais Resultados e Conclusões</h4>
                <p>A integração lavoura-pecuária-floresta (ILPF) associada ao uso de fertilizantes de liberação controlada reduziu em 42% as emissões líquidas por tonelada. Conclui-se que o inventário de carbono é uma ferramenta estratégica tanto para mitigação climática quanto para competitividade comercial.</p>
            `
        },
        "2": {
            tag: "Plástico Verde • Artigo Científico",
            title: "Polietileno Verde de Alta Densidade (PEAD): Balanço Energético, Captura de Carbono e Desempenho Mecânico",
            meta: "Autores: Costa, L. F.; Almeida, R. P.; Nakamura, H. | Publicado em: Polymer Degradation and Stability (2023)",
            content: `
                <h4>1. Introdução</h4>
                <p>Os biopolímeros surgem como alternativa direta às resinas de origem fóssil. Diferente dos plásticos biodegradáveis, o polietileno verde (drop-in) possui estrutura molecular idêntica ao polietileno convencional, garantindo durabilidade e total compatibilidade com as usinas de reciclagem existentes.</p>
                <h4>2. Síntese e Sequestro de Carbono</h4>
                <p>O processo inicia-se com a fermentação da sacarose da cana-de-açúcar para obtenção do bioetanol, seguida de desidratação catalítica para gerar eteno verde e posterior polimerização. Durante a fotossíntese da cana, cada tonelada de resina produzida remove até 3,09 toneladas de CO₂ da atmosfera.</p>
                <h4>3. Conclusão</h4>
                <p>Os ensaios de tração, resistência ao impacto e calorimetria diferencial de varredura (DSC) confirmaram que o PEAD verde pode substituir imediatamente embalagens rígidas convencionais sem necessidade de adaptação no maquinário industrial.</p>
            `
        },
        "3": {
            tag: "Logística Reversa • Artigo Científico",
            title: "Eficiência de Redes de Logística Reversa de Embalagens Pós-Consumo sob a Ótica da PNRS",
            meta: "Autores: Ferreira, A. B.; Santos, G. L.; Ribeiro, D. M. | Publicado em: Waste Management & Research (2024)",
            content: `
                <h4>1. Contexto Regulatório</h4>
                <p>Instituída pela Lei nº 12.305/2010, a Política Nacional de Resíduos Sólidos (PNRS) estabeleceu a responsabilidade compartilhada pelo ciclo de vida dos produtos e tornou obrigatória a estruturação de sistemas de logística reversa.</p>
                <h4>2. Modelagem Operacional</h4>
                <p>O estudo modelou fluxos reversos em 12 regiões metropolitanas, avaliando o impacto da instalação de Centrais de Triagem Mecanizada e Pontos de Entrega Voluntária (PEVs) integrados às cooperativas de catadores.</p>
                <h4>3. Resultados</h4>
                <p>A rastreabilidade via certificados de crédito de reciclagem aliada à roteirização inteligente reduziu os custos logísticos em 28% e aumentou em 3,1 vezes o volume de material reinserido na cadeia produtiva.</p>
            `
        },
        "4": {
            tag: "Economia Circular • Artigo Científico",
            title: "Ecodesign e Simbiose Industrial: Métricas de Circularidade para a Indústria de Transformação",
            meta: "Autores: Lima, V. C.; Rocha, E. N.; Pereira, J. K. | Publicado em: Resources, Conservation & Recycling (2024)",
            content: `
                <h4>1. Do Modelo Linear ao Circular</h4>
                <p>A economia linear baseia-se na extração intensiva de recursos finitos e geração massiva de rejeitos. A Economia Circular propõe dissociar o crescimento econômico do consumo de matérias-primas virgens.</p>
                <h4>2. Simbiose Industrial</h4>
                <p>Em distritos industriais analisados, resíduos térmicos, escórias siderúrgicas e aparas poliméricas de uma planta foram utilizados como insumos diretos por indústrias vizinhas, fechando ciclos materiais.</p>
                <h4>3. Conclusões</h4>
                <p>Empresas que aplicam princípios de ecodesign (modularidade, facilidade de desmontagem e monomateriais) reduzem custos com insumos em até 35% e minimizam passivos ambientais.</p>
            `
        },
        "5": {
            tag: "Pilhas e Baterias • Artigo Científico",
            title: "Hidrometalurgia Verde para Recuperação de Lítio, Cobalto e Manganês de Baterias Íon-Lítio Exauridas",
            meta: "Autores: Souza, R. T.; Martins, P. H.; Cardoso, F. S. | Publicado em: Hydrometallurgy & Environmental Science (2023)",
            content: `
                <h4>1. O Desafio do Lixo Eletroeletrônico</h4>
                <p>A eletrificação da frota e o uso massivo de dispositivos portáteis elevaram exponencialmente a geração de baterias exauridas. O descarte em aterros provoca lixiviação de metais pesados e riscos de ignição.</p>
                <h4>2. Lixiviação Orgânica</h4>
                <p>Em vez de ácidos minerais altamente corrosivos (como H₂SO₄ e HCl), os pesquisadores empregaram ácido cítrico combinado com peróxido de hidrogênio como agente redutor para dissolver a massa negra (black mass) dos cátodos.</p>
                <h4>3. Eficiência de Recuperação</h4>
                <p>O método atingiu taxas de recuperação de 96% para o lítio e 94% para o cobalto em temperatura amena (60 °C), consolidando a "mineração urbana" como alternativa limpa e rentável à mineração primária.</p>
            `
        }
    };

    const topicsDetails = {
        carbono: {
            tag: "Eixo Temático • Clima",
            title: "Aprofundamento: Pegada de Carbono e Descarbonização",
            meta: "Protocolo GHG (Greenhouse Gas Protocol) & ISO 14064",
            content: `
                <p>A pegada de carbono não se restringe apenas ao dióxido de carbono (CO₂), mas engloba todos os gases do Protocolo de Quioto, como metano (CH₄) e óxido nitroso (N₂O), convertidos em CO₂ equivalente conforme seu Potencial de Aquecimento Global (GWP).</p>
                <h4>Estratégias de Mitigação</h4>
                <p><strong>1. Inventário:</strong> Mapear fontes de emissão nos Escopos 1, 2 e 3.<br>
                <strong>2. Redução na Fonte:</strong> Eficiência energética, transição para matriz renovável (solar, eólica, biomassa) e eletrificação de frotas.<br>
                <strong>3. Compensação:</strong> Projetos certificados de reflorestamento, restauração de biomas e créditos de carbono auditados.</p>
            `
        },
        plastico: {
            tag: "Eixo Temático • Biomateriais",
            title: "Aprofundamento: Plástico Verde e Química Renovável",
            meta: "Certificação ASTM D6866 (Conteúdo de Carbono Biobaseado)",
            content: `
                <p>O plástico verde representa uma inovação estratégica na indústria química ao substituir a nafta de petróleo pelo etanol de fontes renováveis. Sua origem renovável é comprovada cientificamente por meio da datação por Carbono-14 (norma ASTM D6866).</p>
                <h4>Diferença entre Plástico Verde e Biodegradável</h4>
                <p>É fundamental não confundir os conceitos: o <strong>Plástico Verde</strong> é feito de fonte renovável (cana-de-açúcar) e é 100% reciclável, mas não é biodegradável — o que é uma vantagem para embalagens duráveis e infraestrutura, pois mantém o carbono imobilizado por décadas no ciclo da reciclagem.</p>
            `
        },
        logistica: {
            tag: "Eixo Temático • Gestão Ambiental",
            title: "Aprofundamento: Logística Reversa na Prática",
            meta: "Política Nacional de Resíduos Sólidos (Lei nº 12.305/2010)",
            content: `
                <p>A logística reversa operacionaliza o retorno de produtos e embalagens após o consumo pelo cidadão até o fabricante ou reciclador, evitando que materiais de alto valor econômico acabem em aterros sanitários ou lixões.</p>
                <h4>Cadeias Obrigatórias no Brasil</h4>
                <p>Por determinação legal e acordos setoriais, fabricantes, importadores, distribuidores e comerciantes devem estruturar sistemas de logística reversa para: pilhas e baterias, pneus, lâmpadas fluorescentes, óleos lubrificantes, embalagens de agrotóxicos, produtos eletroeletrônicos e embalagens em geral.</p>
            `
        },
        circular: {
            tag: "Eixo Temático • Economia Regenerativa",
            title: "Aprofundamento: Os Ciclos da Economia Circular",
            meta: "Fundação Ellen MacArthur • Diagrama Borboleta",
            content: `
                <p>Na Economia Circular, os fluxos de materiais são divididos em dois grandes ciclos: o <strong>Ciclo Biológico</strong> (nutrientes renováveis que retornam com segurança à biosfera por compostagem ou digestão anaeróbia) e o <strong>Ciclo Técnico</strong> (produtos e materiais não biodegradáveis mantidos em circulação).</p>
                <h4>Hierarquia de Valor (Os R's da Circularidade)</h4>
                <p>Antes de reciclar, a economia circular prioriza: <strong>Recusar, Repensar, Reduzir, Reutilizar, Reparar, Recondicionar e Remanufaturar</strong>. A reciclagem é a etapa final para recuperar a matéria-prima quando o produto não pode mais ser restaurado.</p>
            `
        },
        baterias: {
            tag: "Eixo Temático • Resíduos Perigosos",
            title: "Aprofundamento: Impactos e Reciclagem de Pilhas e Baterias",
            meta: "Resolução CONAMA nº 401/2008",
            content: `
                <p>Quando uma pilha é descartada no lixo comum e compactada nos caminhões de coleta ou aterros, seu invólucro metálico se rompe, liberando eletrólitos corrosivos e metais pesados que percolam pelo solo até atingir rios e aquíferos.</p>
                <h4>O que acontece após a coleta nos PEVs?</h4>
                <p>Nos centros de reciclagem especializados, as pilhas passam por triagem, trituração mecânica e processos hidrometalúrgicos ou pirometalúrgicos. Desses processos são recuperados sais metálicos, zinco, manganês, níquel, cobalto e lítio, que retornam à indústria como matéria-prima secundária.</p>
            `
        }
    };

    const modal = document.getElementById('contentModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');
    const modalTag = document.getElementById('modalTag');
    const modalTitle = document.getElementById('modalTitle');
    const modalMeta = document.getElementById('modalMeta');
    const modalBody = document.getElementById('modalBody');

    const openModalWithData = (data) => {
        if (!data) return;
        modalTag.textContent = data.tag;
        modalTitle.textContent = data.title;
        modalMeta.textContent = data.meta;
        modalBody.innerHTML = data.content;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.btn-read-article').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-article');
            openModalWithData(articlesData[id]);
        });
    });

    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const topic = btn.getAttribute('data-topic');
            openModalWithData(topicsDetails[topic]);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    /* ======================================================================
       5. Calculadora de Pegada de Carbono
       ====================================================================== */
    const carbonForm = document.getElementById('carbonForm');
    const co2Output = document.getElementById('co2Output');
    const co2Feedback = document.getElementById('co2Feedback');
