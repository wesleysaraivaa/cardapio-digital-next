import React from "react";

type BusinessStatusAlertProps = {
  isOpen: boolean;
  message?: string;
  closedMessage?: string;
  openMessage?: string;
};

const BusinessStatusAlert = ({
  isOpen,
  message,
  closedMessage = "O horário de atendimento é das 08:00 às 17:00.\nVolte nesse período para fazer seu pedido.",
}: BusinessStatusAlertProps) => {
  if (isOpen) {
    return null;
  }

  const displayMessage = message && !isOpen ? message : closedMessage;

  return (
    <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
      <strong>Estamos fechados!</strong>
      <br />
      {displayMessage.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default BusinessStatusAlert;
