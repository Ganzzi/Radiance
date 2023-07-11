export const formatTime = (updatedAt) => {
  const currentTime = new Date().getTime();

  const previousTime = new Date(updatedAt).getTime();

  const minutes = Math.floor((currentTime - previousTime) / (1000 * 60));

  if (minutes < 60) {
    return `${minutes}m`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  } else if (minutes < 43200) {
    const days = Math.floor(minutes / 1440);
    return `${days}d`;
  } else if (minutes < 525600) {
    const months = Math.floor(minutes / 43200);
    return `${months}mo`;
  } else {
    const years = Math.floor(minutes / 525600);
    const remainingMonths = Math.floor((minutes % 525600) / 43200);
    if (remainingMonths > 0) {
      return `${years}y ${remainingMonths}mo`;
    } else {
      return `${years}y`;
    }
  }
};

export const formatDateTime = (dateTimeString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString(undefined, options);
};
