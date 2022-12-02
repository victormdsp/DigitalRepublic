# Digital Republic Teste

<section>
  <h2>Contextualização</h2>
    <p> Resolução do desafio proposto pela empresa Digital Republic em desenvolver um projeto Back-End. </p>
</section>

<section>
  <h2>Tecnologias utilizadas</h2>
    <ul>
      <li>NodeJs</li>
      <li>TypeScript</li>
      <li>MongoDb</li>
    </ul>
    <p> A proposta do desafio não especificava um banco de dados, porém como já possuo conhecimento com MongoDB preferi optar por ele. </p>
    <h2>Bibliotecas utilizadas</h2>
    <ul>
      <li>Express (Criação das rotas)</li>
      <li>uuidv4 (Criação dos Id's)</li>
      <li>Bcrypt (Criação de senhas com hash)</li>
      <li>Mongoose (Manipulação de querys , modelos , schemas, etc, do MongoDB)</li>
    </ul>
    <p> Foi utilizado o Visual Studio Code para o desenvolvimento de todo o código. </p>
    <p> Foram feitos dois projetos utilizando das mesmas bibliotecas , vou separar cada um e explicar o porque de dois projetos diferente. </p>
</section>

<section>
  <h2> Primeiro Projeto (Padrão) </h2>
  <h3> Organização das pastas </h3>
</section>

<section>
  <h2> Segundo Projeto (Diferente) </h2>
  <h3> Organização das pastas </h3>
  <img src="./images/pastas.png">
  <p> Como podemos ver na imagem acima , possuímos a pasta src e dentro dela temos 2 pastas importantes, a "interfaces" e a "mongoDBModels", e também possuímos os arquivos routes.ts e server.ts.</p>
  
  <h2> Pasta Interfaces </h2>
  <section>
    <p> Dentro da pasta interfaces temos 2 arquivos , o IUsuario que seria a interface para a classe Usuario e o IConta que seria a interface para a classe Conta, dentro delas temos apenas a criação do contrato de cada classe com seus métodos e atributos como mostrado nas imagens abaixo</p>
    <img src="./images/IConta.png>
    <img src="./images/IUsuario.png>
  </section>
  
  <h2> Pasta mongoDBModels </h2>
  <section>
    <p> Dentro da pasta mongoDbModels nós possímos dois arquivos contendo os Schemas do Usuário e da Conta juntamente com a exportação de seus modelos, também é dentro destes Schemas que são feitos os contratos com as interfaces, assim sendo obrigarótio a criação dos atributos e métodos presentes nas interfaces.</p>
    <p> Na criação dos atributos do Schema nós possuímos algumas keywords que são: </p>
    <ul>
      <li> required - dado obrigatório ao construir o objeto </li>
      <li> type - tipo do dado (number, string, etc) </li>
    </ul>
    <p> Onde se encontra a keyword methos, é onde ficam os métodos que poderão ser utilizados ao criar um objeto deste modelo.</p>
    <p> Imagens abaixo.</p>
    <img src="./images/UsurioModel">
    <img src="./images/ContaModel">
    
    <p> No modelo da Conta nós possuímos os métodos: </p>
    <ul>
      <li> abrirConta - Cria uma nova conta bancária.</li>
      <li> depositar - Deposita um valor passado na conta bancária.</li>
      <li> transferir - Faz uma trasferência bancária.</li>
      <li> transferir - Notifica a conta que recebeu uma transferência.</li>
    </ul>
    
    <p> No modelo do Usuário nós possuímos o método: </p>
    <ul>
      <li> createUsuario - Cria um novo usuário.</li>
    </ul>
  </section>
  
  <a href="https://www.youtube.com.br">
</section>