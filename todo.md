# Integração da Roleta Existente com React

## Arquivos a serem criados:
1. `src/pages/Roleta.tsx` - Página da roleta (baseada no index.html original)
2. `src/pages/AdminLogin.tsx` - Página de login administrativo
3. `src/pages/AdminPainel.tsx` - Painel de controle administrativo
4. `src/components/RoletaCanvas.tsx` - Componente da roleta em canvas
5. `src/lib/roletaConfig.ts` - Configurações e funções da roleta
6. `src/App.tsx` - Atualizar rotas

## Funcionalidades mantidas:
- Roleta com canvas e animações
- Sistema de configuração via localStorage
- Upload de imagens
- Painel administrativo completo
- Sistema de login
- Todas as cores e textos configuráveis
- Preview em tempo real

## Estrutura de rotas:
- `/` - Roleta principal
- `/admin-login` - Login administrativo
- `/admin-painel` - Painel de controle (protegido)