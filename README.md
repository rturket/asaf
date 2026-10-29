# ASAF — Associação de Salvamento Aquático de Florianópolis (`@asaf.gv`)

Portal oficial de divulgação do trabalho dos Guarda-Vidas (Civis Voluntários e Bombeiros Militares), denúncia do sucateamento e da falta de cobertura nas praias fora de temporada, e **Peticionamento Público Auditável** pelas 5 pautas da categoria.

## Bandeiras e Pautas Principais
1. **Reajuste Digno:** Correção real das diárias/remuneração frente ao custo de vida e periculosidade.
2. **Redução de Carga Horária sem Redução de Salário:** Fim das jornadas exaustivas de 9h a 12h sob sol extremo sem perda remuneratória.
3. **Guarda-Vidas o Ano Inteiro:** Cobertura permanente nas praias de Florianópolis fora da alta temporada.
4. **Contratação Digna:** Superação da precarização do modelo de "voluntariado" (Lei Estadual nº 13.880/2006), garantindo direitos trabalhistas e previdenciários.
5. **Plano de Carreira:** Reconhecimento de tempo de serviço, recertificações e progressão profissional.

## Arquitetura do Protótipo de Telas
O protótipo interativo contempla 5 telas/fluxos integrados:
- **Tela 1 — Manifesto, Realidade nas Praias e As 5 Pautas:** Hero de impacto, comparador interativo de cobertura das praias de Florianópolis (Verão vs. Inverno), valorização do serviço de salvamento e detalhamento das reivindicações.
- **Tela 2 — Petição Pública Legítima (LGPD + Validação):** Formulário com validação matemática de CPF (`mod 11`), verificação em 2 etapas (OTP), geração de trilha de auditoria (`SHA-256`) e conformidade estrita com a LGPD.
- **Tela 3 — Comprovante de Assinatura e Card Viral (`@asaf.gv`):** Geração de comprovante auditável e card visual no formato Stories para compartilhamento no Instagram e WhatsApp.
- **Tela 4 — Área do Guarda-Vidas (Cadastro ASAF & Relato de Sucateamento):** Canal para filiação de Guarda-Vidas Civis e Bombeiros e envio de relatos/fotos sobre condições de postos e EPIs.
- **Tela 5 — Painel de Transparência & Dossiê para Políticos:** Carta aberta oficial, métricas de apoio por região/perfil e prévia do Caderno Oficial de Assinaturas para protocolo na ALESC, Governo de SC, Câmara Municipal de Florianópolis, MPSC e MPT.

## Como Executar o Protótipo
Basta abrir o arquivo `index.html` em qualquer navegador moderno.
