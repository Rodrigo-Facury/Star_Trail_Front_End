import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

function PrivacyPolicy() {
  return (
    <Box p="6" backgroundColor='#1E1E1E' minHeight='100vh' color='white'>
      <Heading as="h1" fontSize="2xl" mb="4">
        Política de Privacidade da Star Trail
      </Heading>

      <Text fontSize="lg" mb="4">
        Esta Política de Privacidade descreve como a Star Trail coleta, usa e compartilha informações pessoais quando você
        utiliza nossos serviços. É importante que você leia e entenda esta política, pois ao usar a plataforma da Star
        Trail, você concorda com a coleta e uso de suas informações pessoais da maneira descrita aqui.
      </Text>

      <Accordion allowToggle>
        {/* Seção 1 */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                1. Informações Coletadas
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {/* Conteúdo da Seção 1 */}
            <Text fontSize="lg" mb="4">
              Ao utilizar a Star Trail, podemos coletar as seguintes informações pessoais:
            </Text>

            {/* Lista de informações coletadas */}
            <ul>
              <li>
                <Text fontSize="lg" mb="2">
                  1.1. <strong>Informações de Conta:</strong> Quando você cria uma conta, podemos coletar informações como
                  seu nome, endereço de e-mail, nome de usuário e senha.
                </Text>
              </li>
              <li>
                <Text fontSize="lg" mb="2">
                  1.2. <strong>Conteúdo do Usuário:</strong> Ao compartilhar trilhas de aprendizagem, comentários,
                  mensagens ou qualquer outra forma de comunicação na plataforma, coletamos o conteúdo que você cria.
                </Text>
              </li>
              <li>
                <Text fontSize="lg" mb="2">
                  1.3. <strong>Informações de Interatividade:</strong> Coletamos informações sobre como você interage com
                  outros usuários, como as trilhas que você segue, os comentários que faz e as mensagens que envia.
                </Text>
              </li>
              <li>
                <Text fontSize="lg" mb="2">
                  1.4. <strong>Informações de Uso:</strong> Registramos informações sobre como você utiliza a plataforma,
                  incluindo os dispositivos que você utiliza, seu endereço IP, seu navegador da web e as páginas que você
                  visita.
                </Text>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>

        {/* Seção 2 */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                2. Uso das Informações
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {/* Conteúdo da Seção 2 */}
            <Text fontSize="lg" mb="4">
              Utilizamos as informações coletadas para os seguintes fins:
            </Text>

            {/* Lista de usos de informações */}
            <ul>
              <li>
                <Text fontSize="lg" mb="2">
                  2.1. <strong>Fornecimento e Melhoria de Serviços:</strong> Utilizamos suas informações para fornecer nossos
                  serviços, incluindo a criação de trilhas de aprendizagem, a interação com outros usuários e a personalização
                  de sua experiência na plataforma.
                </Text>
              </li>
              <li>
                <Text fontSize="lg" mb="2">
                  2.2. <strong>Comunicação:</strong> Podemos utilizar seu endereço de e-mail para enviar notificações sobre a
                  plataforma, como atualizações, novos recursos e mensagens de outros usuários.
                </Text>
              </li>
              <li>
                <Text fontSize="lg" mb="2">
                  2.3. <strong>Análise e Pesquisa:</strong> Analisamos informações coletadas para melhorar nossos serviços,
                  entender o uso da plataforma e realizar pesquisas.
                </Text>
              </li>
              <li>
                <Text fontSize="lg" mb="2">
                  2.4. <strong>Cumprimento de Obrigações Legais:</strong> Em alguns casos, podemos utilizar suas informações
                  para cumprir obrigações legais, como responder a intimações ou processos legais.
                </Text>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>

        {/* Seção 3 */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                3. Compartilhamento de Informações
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {/* Conteúdo da Seção 3 */}
            <Text fontSize="lg" mb="4">
              Não compartilhamos informações pessoais com terceiros, exceto nas seguintes situações:
            </Text>

            {/* Lista de situações de compartilhamento */}
            <ul>
              <li>
                <Text fontSize="lg" mb="2">
                  3.1. <strong>Com Outros Usuários:</strong> Algumas informações, como seu nome de usuário e conteúdo
                  compartilhado, são visíveis para outros usuários da Star Trail.
                </Text>
              </li>
              <li>
                <Text fontSize="lg" mb="2">
                  3.2. <strong>Parceiros de Serviços:</strong> Podemos compartilhar informações com parceiros de serviços que
                  nos ajudam a fornecer e melhorar a plataforma, como provedores de hospedagem e análise.
                </Text>
              </li>
              <li>
                <Text fontSize="lg" mb="2">
                  3.3. <strong>Cumprimento de Obrigações Legais:</strong> Podemos compartilhar informações pessoais em resposta a
                  intimações, processos legais ou quando necessário para cumprir a lei.
                </Text>
              </li>
              <li>
                <Text fontSize="lg" mb="2">
                  3.4. <strong>Transferências de Negócios:</strong> Se a Star Trail for adquirida ou fundida com outra empresa,
                  suas informações podem ser transferidas para os novos proprietários.
                </Text>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>

        {/* Seção 4 */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                4. Proteção de Informações
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {/* Conteúdo da Seção 4 */}
            <Text fontSize="lg" mb="4">
              Levamos a segurança das informações pessoais a sério e implementamos medidas para proteger suas informações contra
              acesso não autorizado, uso indevido ou divulgação. No entanto, nenhum sistema de segurança é totalmente à prova de
              falhas, e não podemos garantir a segurança de suas informações.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        {/* Seção 5 */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                5. Seus Direitos
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {/* Conteúdo da Seção 5 */}
            <Text fontSize="lg" mb="4">
              Você tem direitos em relação às suas informações pessoais, incluindo o direito de acessar, corrigir ou excluir suas
              informações. Você também pode optar por não receber comunicações nossas. Para exercer esses direitos ou fazer
              perguntas sobre suas informações pessoais, entre em contato conosco por meio das informações de contato fornecidas
              no final desta política.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        {/* Seção 6 */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                6. Alterações nesta Política
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {/* Conteúdo da Seção 6 */}
            <Text fontSize="lg" mb="4">
              Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças em nossas práticas de
              privacidade. Publicaremos uma versão atualizada da política na plataforma e indicaremos a data da última revisão. O
              uso continuado dos serviços após a publicação de alterações constitui aceitação dessas alterações.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        {/* Seção 7 */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                7. Contato
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {/* Conteúdo da Seção 7 */}
            <Text fontSize="lg" mb="4">
              Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco através do e-mail <strong>rodrigo@startrail.com.br</strong>.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default PrivacyPolicy;
