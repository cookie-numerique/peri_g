import dayjs from 'dayjs';

/**
 * @description Convertir une date pour un format
 * @param {Object} params
 * @returns {String}
 */
export const formatDate = (params: {
  date?: Date | string,
  format: string
} = {
  date: new Date(),
  format: 'DD/MM/YYYY'
}) => {
  const {date = new Date(), format} = params ?? {};
  return dayjs(date).format(format);
}