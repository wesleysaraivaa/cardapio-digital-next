import React from 'react';

type BusinessStatusAlertProps = {
  isOpen: boolean;
  message?: string;
  closedMessage?: string; // Mensagem específica para quando estiver fechado
  openMessage?: string; // Mensagem específica para quando estiver aberto (menos comum de usar aqui)
};

const BusinessStatusAlert: React.FC<BusinessStatusAlertProps> = ({
  isOpen,
  message, // Mensagem genérica se fornecida
  closedMessage = "O horário de atendimento é das 08:00 às 17:00.\nVolte nesse período para fazer seu pedido.",
  // openMessage = "Estamos abertos!", // Exemplo se necessário
}) => {
  if (isOpen) {
    // Poderia renderizar o openMessage ou nada, dependendo da necessidade.
    // Para este caso específico do Cart, provavelmente não renderizamos nada se aberto.
    return null;
  }

  // Se uma mensagem genérica for fornecida e estiver fechado, use-a.
  // Senão, use a closedMessage padrão.
  const displayMessage = message && !isOpen ? message : closedMessage;

  return (
    <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
      <strong>Estamos fechados!</strong><br />
      {displayMessage.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default BusinessStatusAlert; 