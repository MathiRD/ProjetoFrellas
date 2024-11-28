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

Scripts de Banco de Dados para o supabase

Para configurar o ambiente de banco de dados necessário para o projeto, siga os scripts SQL abaixo. Certifique-se de executar cada script na ordem, para evitar problemas com dependências entre tabelas.
Tabela: profiles

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

Tabela: services

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

Tabela: chats

CREATE TABLE chats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario_dono UUID REFERENCES profiles (id) ON DELETE CASCADE,
    id_servico BIGINT REFERENCES services (id) ON DELETE CASCADE,
    id_usuario_cliente UUID REFERENCES profiles (id) ON DELETE CASCADE
);

Tabela: financas

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

Tabela: mensagens (Com Realtime Ativado)

CREATE TABLE mensagens (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_chat BIGINT REFERENCES chats (id) ON DELETE CASCADE,
    id_usuario UUID REFERENCES profiles (id) ON DELETE CASCADE,
    mensagem TEXT NOT NULL,
    data_hora TIMESTAMP DEFAULT NOW(),
    enviado_por_usuario BOOLEAN NOT NULL,
    id_usuario_envio UUID REFERENCES profiles (id) ON DELETE CASCADE
);

    Observação: Para habilitar o recurso de tempo real, ative o Realtime na tabela mensagens no painel do Supabase.

Tabela: rating

CREATE TABLE rating (
    id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_service BIGINT REFERENCES services (id) ON DELETE CASCADE,
    id_usuario UUID REFERENCES profiles (id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 0 AND rating <= 5) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

⚠️ Observações Importantes

    Ordem de Execução:
        Execute primeiro o script para a tabela profiles, pois outras tabelas dependem dela.
        Depois, siga a ordem: services, chats, financas, mensagens e rating.

    Realtime no Supabase:
        A funcionalidade de mensagens em tempo real requer que o Realtime esteja ativado para a tabela mensagens.
        No painel do Supabase, vá até Database > Replication e habilite o Realtime para essa tabela.

    Configuração Inicial:
        Certifique-se de que o Supabase está configurado corretamente e que as variáveis de ambiente necessárias estão no arquivo .env.

Esses scripts ajudam a configurar o ambiente necessário para rodar o projeto. Se precisar de mais ajustes ou ajuda, é só avisar!

além dos seguintes scripts para conversa entre as tabelas durante a autenticação e permissões dos usuários de alterar e apagar dados:

-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

CREATE
OR REPLACE FUNCTION public.handle_new_user () RETURNS TRIGGER
SET
  search_path = '' AS $$
begin
   insert into public.profiles (id, full_name, avatar_url, username)
   values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'username');
   return new;
end; 
$$ LANGUAGE plpgsql SECURITY DEFINER;

E nas policies devem criar para a tabela mensagem uma de permissão total de insert (para usuários autenticados) e uma de select para todos os usuários,
na tabela profiles deve existir uma de delete, select, insert, e update para que os usuários possam alterar seu próprio perfil.