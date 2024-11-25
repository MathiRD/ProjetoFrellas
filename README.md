# ProjetoFrellasFuncionalidades Principais
Para Clientes:

    Busca e Mapeamento de Profissionais: Encontre vendedores próximos para serviços presenciais ou profissionais online para serviços remotos.
    Chat com Vendedores: Comunique-se diretamente com os vendedores e esclareça dúvidas antes de contratar.
    Gestão de Serviços:
        Acompanhe serviços pagos e pendentes na aba de finanças.
        Descubra serviços populares e recomendados por outros clientes.
    Edição de Perfil: Personalize suas preferências e informações de contato.

Para Vendedores:

    Criação de Anúncios: Publique seus serviços, fornecendo detalhes, preços e localização (para serviços presenciais).
    Chat com Clientes: Converse diretamente com clientes interessados em contratar seus serviços.
    Gerenciamento de Finanças:
        Controle suas receitas e verifique o status dos pagamentos (pagos e pendentes).
    Serviços Populares: Destaque-se entre os serviços mais procurados pelos clientes.
    Edição de Perfil: Atualize informações sobre seus serviços, especialidades e disponibilidade.

🚀 Tecnologias Utilizadas

    Frontend: React Native
    Backend: Node.js com Express
    Banco de Dados: Supabase
    Autenticação: Supabase Auth
    Geolocalização: API do Google Maps
    Comunicação em Tempo Real: WebSocket (para chat em tempo real)
    Gerenciamento de Estado: Context API (ou Redux)

📲 Como Executar o Projeto
Pré-requisitos

    Node.js v16+ e npm/yarn instalados.
    Supabase configurado para autenticação e banco de dados.
    Conta no Google Maps (para funcionalidades de mapeamento de localização).

Passo a Passo

    Clone o repositório:

git clone https://github.com/seu-usuario/frellas.git
cd frellas

Instale as dependências:

npm install
# ou
yarn install

Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

SUPABASE_URL=your_supabase_url
SUPABASE_API_KEY=your_supabase_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

Inicie o servidor:

npm start
# ou
yarn start

Inicie o app mobile:

Certifique-se de ter o emulador configurado ou um dispositivo conectado:

    npm run android
    # ou
    npm run ios

🛠️ Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para colaborar:

    Faça um fork do repositório.

    Crie uma branch para sua funcionalidade:

git checkout -b minha-nova-funcionalidade

Faça o commit das suas alterações:

git commit -m 'Adicionei uma nova funcionalidade'

Envie as mudanças:

git push origin minha-nova-funcionalidade

Abra um Pull Request.

Observações:

    Supabase: O projeto utiliza Supabase para gerenciamento de banco de dados e autenticação. A configuração do Supabase é necessária para rodar o projeto.
    API do Google Maps: A funcionalidade de mapeamento de profissionais requer a integração com a API do Google Maps. Certifique-se de configurar uma chave de API do Google Maps.