export const BUSINESS_HOURS = {
  openHour: 8,
  closeHour: 24,
};

export const isBusinessOpen = (): boolean => {
  const currentHour = new Date().getHours();
  return (
    currentHour >= BUSINESS_HOURS.openHour &&
    currentHour < BUSINESS_HOURS.closeHour
  );
};

export const getBusinessStatus = (): { isOpen: boolean; message: string } => {
  const isOpen = isBusinessOpen();
  return {
    isOpen,
    message: isOpen ? "Estamos abertos!" : "Estamos fechados!",
  };
};

export const getBusinessHours = (): string => {
  const formatHour = (hour: number): string => {
    return hour.toString().padStart(2, "0") + ":00";
  };
  return `${formatHour(BUSINESS_HOURS.openHour)} às ${formatHour(
    BUSINESS_HOURS.closeHour
  )}`;
};
