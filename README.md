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
    Backend: Todo o consumo de dados de manutenção foi realizado com supabase
    Banco de Dados: postgresql (supabase)
    Autenticação: Supabase Auth
    Geolocalização: API do Google Maps
    Comunicação em Tempo Real: Tabelas com realTime do supabase
    Gerenciamento de Estado: Context API (ou Redux)

🌐 APIs do Google Cloud Utilizadas

Para o funcionamento da geolocalização e outras funcionalidades, você precisará configurar as seguintes APIs no Google Cloud:
1. APIs de Armazenamento e Processamento de Dados:

    Analytics Hub API
    BigQuery API
    BigQuery Connection API
    BigQuery Data Policy API
    BigQuery Migration API
    BigQuery Reservation API
    BigQuery Storage API
    Cloud Dataplex API
    Cloud Datastore API
    Cloud Logging API
    Cloud Monitoring API
    Cloud SQL
    Cloud Storage
    Cloud Storage API
    Cloud Trace API
    Dataform API

2. APIs para Mapas e Geolocalização:

    Geocoding API: Utilizada para converter endereços em coordenadas geográficas.
    Google Cloud APIs: Conjunto de APIs para integrar diferentes funcionalidades da plataforma Google Cloud.
    Google Cloud Storage JSON API: Para interações com o armazenamento em nuvem da Google.

3. APIs de Mapas e Locais:

    Maps JavaScript API: Para embutir mapas interativos em seu aplicativo, com recursos avançados de visualização.
    Places API: Usada para buscar informações sobre locais específicos, como pontos de interesse ou estabelecimentos.

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

Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

SUPABASE_URL=your_supabase_url
SUPABASE_API_KEY=your_supabase_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

Inicie o servidor:

npm start

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

 Scripts de Banco de Dados para o Supabase

Para configurar o ambiente de banco de dados necessário para o projeto, siga os scripts SQL abaixo. Certifique-se de executar cada script na ordem correta para evitar problemas com dependências entre as tabelas. Além disso, habilite as permissões de autenticação e interação entre as tabelas.
1. Tabela: profiles

Crie a tabela de perfis de usuários:

CREATE TABLE profiles (
    id UUID PRIMARY KEY,
    updated_at TIMESTAMPTZ,
    username TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    birthday DATE,
    country TEXT,
    city TEXT,
    uf TEXT,
    banner_url TEXT
);

2. Tabela: services

Crie a tabela de serviços oferecidos pelos vendedores:

CREATE TABLE services (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario UUID REFERENCES profiles (id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    img_galery TEXT[],
    price DOUBLE PRECISION NOT NULL,
    id_status BOOLEAN DEFAULT TRUE,
    phone TEXT NOT NULL,
    coordenades NUMERIC[],
    category TEXT,
    service_img TEXT,
    average_rating DOUBLE PRECISION DEFAULT 0,
    great_service BOOLEAN DEFAULT FALSE
);

3. Tabela: chats

Crie a tabela de chats para registrar as conversas entre os clientes e vendedores:

CREATE TABLE chats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario_dono UUID REFERENCES profiles (id) ON DELETE CASCADE,
    id_servico BIGINT REFERENCES services (id) ON DELETE CASCADE,
    id_usuario_cliente UUID REFERENCES profiles (id) ON DELETE CASCADE
);

4. Tabela: financas

Crie a tabela de finanças, que mantém o controle dos pagamentos:

CREATE TABLE financas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_chat BIGINT REFERENCES chats (id) ON DELETE CASCADE,
    id_usuario UUID REFERENCES profiles (id) ON DELETE CASCADE,
    id_usuario_cliente UUID REFERENCES profiles (id) ON DELETE CASCADE,
    valor DOUBLE PRECISION NOT NULL,
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT NOW(),
    status TEXT NOT NULL
);

5. Tabela: mensagens (Com Realtime Ativado)

Crie a tabela de mensagens, com suporte para tempo real:

CREATE TABLE mensagens (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_chat BIGINT REFERENCES chats (id) ON DELETE CASCADE,
    id_usuario UUID REFERENCES profiles (id) ON DELETE CASCADE,
    mensagem TEXT NOT NULL,
    data_hora TIMESTAMP DEFAULT NOW(),
    enviado_por_usuario BOOLEAN NOT NULL,
    id_usuario_envio UUID REFERENCES profiles (id) ON DELETE CASCADE
);

Observação: Para habilitar o recurso de tempo real, ative o Realtime na tabela mensagens no painel do Supabase. No painel do Supabase, vá até Database > Replication e habilite o Realtime para essa tabela.
6. Tabela: rating

Crie a tabela de ratings para serviços:

CREATE TABLE rating (
    id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_service BIGINT REFERENCES services (id) ON DELETE CASCADE,
    id_usuario UUID REFERENCES profiles (id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 0 AND rating <= 5) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

⚠️ Observações Importantes
Ordem de Execução

    Execute primeiro o script para a tabela profiles, pois outras tabelas dependem dela.
    Depois, siga a ordem: services, chats, financas, mensagens e rating.

Realtime no Supabase

    A funcionalidade de mensagens em tempo real requer que o Realtime esteja ativado para a tabela mensagens.
    No painel do Supabase, vá até Database > Replication e habilite o Realtime para essa tabela.

Configuração Inicial

    Certifique-se de que o Supabase está configurado corretamente e que as variáveis de ambiente necessárias estão no arquivo .env.

🔐 Scripts para Autenticação e Permissões

A seguir, estão os scripts para configurar a autenticação de usuários e permissões para que possam interagir com os dados:
1. Criação da Tabela de Perfis Públicos

CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  CONSTRAINT username_length CHECK (CHAR_LENGTH(username) >= 3)
);

2. Ativação do Row Level Security (RLS)

Ative o RLS (Row Level Security) para garantir que os usuários só possam acessar seus próprios dados:

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

3. Políticas de Acesso para Perfis

Defina as permissões para usuários autenticados e suas interações com seus próprios perfis:

-- Política de acesso para visualização de perfis públicos
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

-- Política de inserção de perfil por usuários autenticados
CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = id);

-- Política de atualização de perfil por usuários autenticados
CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING ((SELECT auth.uid()) = id);

4. Função para Criação Automática de Perfil ao Registrar Novo Usuário

Esta função cria automaticamente um perfil para cada novo usuário que se registra no Supabase:

CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SET SEARCH_PATH = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

5. Trigger para Criar Perfil ao Registrar Novo Usuário

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

6. Configuração de Armazenamento de Avatares

Crie um bucket de armazenamento para avatares de usuários e configure as permissões de acesso:

-- Criação do bucket de avatares
INSERT INTO storage.buckets (id, name)
  VALUES ('avatars', 'avatars');

-- Permissão de acesso para os avatares
CREATE POLICY "Avatar images are publicly accessible." ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

-- Permissão para usuários enviarem avatares
CREATE POLICY "Anyone can upload an avatar." ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars');

💬 Permissões de Mensagens

Configure permissões para a tabela de mensagens:

-- Permissões de mensagens para usuários autenticados
CREATE POLICY "Authenticated users can insert messages." ON mensagens
  FOR INSERT USING (auth.uid() IS NOT NULL);

-- Permissões para selecionar mensagens
CREATE POLICY "Everyone can view messages." ON mensagens
  FOR SELECT USING (true);

Permissões de Perfil

    Delete: Somente o usuário proprietário pode deletar seu perfil.
    Select: Todos os usuários podem ver os perfis públicos.
    Insert: Somente o usuário pode criar seu próprio perfil.
    Update: Somente o usuário pode atualizar seu próprio perfil.

Esses scripts configuram tanto o banco de dados necessário quanto as permissões de acesso para que os usuários possam interagir com seus dados de forma segura e eficaz.
