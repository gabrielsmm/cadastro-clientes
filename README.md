<h1>Controle de Cadastro de Clientes</h1>

<p>O sistema de controle de cadastro de clientes é uma aplicação desenvolvida para gerenciar o cadastro de clientes e endereços. Através do sistema, é possível cadastrar novos clientes e seus respectivos endereços, vinculando-os geograficamente.</p>

<h2>Pré-requisitos</h2>
<p>Antes de começar, verifique se você atendeu aos seguintes requisitos:</p>
<ul>

<li>Java SE Development Kit 17</li>
<li>Angular 15.2.7</li>
<li>Node 18.12.1</li>
<li>NPM 8.19.2</li>
<li>Angular CLI 15.1.6</li>

</ul>

<p>Observação: para exibição dos mapas é necessário ter a chave para a API do Google Maps. Para isso, acesse o site: https://developers.google.com/maps/documentation/javascript/get-api-key
</p>

<p>Após a obtenção da chave é necessário configurar nos seguintes arquivos: </p>

```
frontend/src/index.html
frontend/src/app/services/geocoding-api.service.ts
```

<h2>Instruções de uso</h2>
<p>Para usar o cadastro de clientes, siga estas etapas:</p>
<p>Clone o repositório</p>

```
git clone https://github.com/gabrielsmm/cadastro-clientes.git
```

<h4>Frontend</h4>
<p>Acesse a pasta da aplicação e instale as dependências:</p>

```
cd frontend
npm install
```

<p>Inicie a aplicação:</p>

```
ng serve
```

<h4>Backend</h4>
<p>Para execução da API é recomendado o uso de alguma das IDE's abaixo:</p>
<ul>

<li>IDE IntelliJ</li>
<li>Spring Tools Suite</li>
<li>Netbeans</li>
<li>Eclipse</li>

</ul>

<h2>Tecnologias Utilizadas</h2>
<h3>Backend</h3>
<ul>

<li>IDE IntelliJ</li>

<li>Java 17</li>

<li>Maven</li>

<li>Framework Spring</li>

<li>Spring Boot</li>

<li>Spring Web</li>

<li>Spring Data JPA</li>

<li>Postman</li>

<li>Swagger</li>

<li>H2Database</li>

<li>Lombok</li>

<li>PostgreSQL</li>

</ul>

<h3>Frontend</h3>

<ul>

<li>Angular 15+</li>

<li>Reactive Forms</li>

<li>Material</li>

<li>Bootstrap</li>

<li>Integração com Google Maps</li>

<li>Integração com ViaCep</li>

</ul>

<h2>Regras de negócio</h2>

<h4>1. Cadastro de clientes</h4>
<p>O cadastro de clientes é uma das principais funcionalidades do sistema, e para garantir a qualidade dos dados cadastrados, são aplicadas as seguintes regras de negócio:</p>
<ul>

<li>O sistema permite o cadastro de clientes com nome , CNPJ e endereço com localização geográfica;</li>

<li>O sistema não permite o cadastro de um cliente sem nome, CNPJ e endereço com localização;</li>

<li>O cadastro de endereço inclui localização geográfica;</li>

<li>Validação de CEP por meio da API do ViaCep;</li>

<li>Busca das referências de latitude e longitude por meio da API do Google Maps.</li>

</ul>

<img src="imagens/cadastro-clientes.png" alt="Cadastro de clientes">

> Na tela acima, é possível realizar o cadastro de um cliente contando com validação de CEP por meio da API do ViaCep e obtenção da latitude e longitude do cliente por meio da API do Google Maps e sua exibição.

<h4>2. Visualização de clientes no mapa</h4>
<p>A funcionalidade de visualização de clientes no mapa permite que os usuários do sistema possam ver a localização dos clientes cadastrados. Para garantir a efetividade dessa funcionalidade, são aplicadas as seguintes regras de negócio:</p>
<ul>

<li>O sistema permite a visualização dos clientes cadastrados em um mapa utilizando a API do Google Maps.</li>

</ul>

<img src="imagens/exibicao-clientes.png" alt="Exibição de clientes">

> A tela acima exibe os clientes de forma listada, oferecendo opções para edição, exclusão e visualização da localização do cliente no mapa.

<img src="imagens/exibicao-mapa-cliente.png" alt="Mapa de um cliente">

> A imagem acima ilustra a exibição da localização do cliente selecionado com informações mais detalhadas sobre a sua localização.

<img src="imagens/mapa-clientes.png" alt="Mapa de clientes">

> A tela acima se trata da exibição de todos os clientes cadastrados em um mapa com marcações em vermelho e o nome do cliente.

<img src="imagens/mapa-clientes-filtrado.png" alt="Mapa de clientes filtrado">

> A imagem acima demonstra a utilização da ferramenta de filtro para trazer somente clientes que possuem alguma ocorrência do filtro informado em seus endereços.

<h4>3. Requisitos não funcionais</h4>
<p>Alguns dos requisitos não funcionais que o sistema possui são:</p>
<ul>

<li>Performance: o sistema possui boa performance e responde rapidamente às consultas;</li>

<li>Usabilidade: o sistema é de fácil utilização e navegação;</li>

<li>Escalabilidade: o sistema é escalável, permitindo o cadastro de um grande número de clientes e endereços.</li>

</ul>

<h2>Plano de teste</h2>

<h3>Técnicas de teste</h3>

<ul>

<li>Verificar se os requisitos de negócio estão sendo atendidos e se o sistema está funcionando corretamente;</li>

<li>Verificar o funcionamento das funcionalidades de cadastro de cliente;</li>

<li>Verificar a integração do sistema com o banco de dados e com outras ferramentas de suporte.</li>

</ul>

<h3>Casos de teste</h3>

<h4>Cadastrar Cliente</h4>

<p>Descrição: Verificar se é possível cadastrar um cliente com nome, CNPJ e endereço com localização.</p>

<ol>
    <li>Acessar o sistema;</li>
    <li>Selecionar a opção de cadastro de cliente;</li>
    <li>Informar o nome, CNPJ e endereço do cliente com localização;</li>
    <li>Salvar o cadastro do cliente;</li>
    <li>Verificar se o cadastro do cliente foi salvo corretamente no banco de dados.</li>
</ol>

<h4>Visualizar Clientes no Mapa</h4>

<p>Descrição: Verificar se é possível visualizar os clientes em um mapa com opções de filtro.</p>

<ol>
    <li>Acessar o sistema;</li>
    <li>Selecionar a opção de visualização de clientes no mapa;</li>
    <li>Verificar se o mapa é exibido corretamente;</li>
    <li>Selecionar uma opção de filtro;</li>
    <li>Verificar se os clientes são exibidos corretamente de acordo com o filtro selecionado.</li>
</ol>