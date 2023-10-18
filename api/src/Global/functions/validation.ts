import { Repository } from 'typeorm';

export const validate = async (models: Repository<any>, dto: object) => {
  const data_exists = [];
  for (const elment in dto) {
    const exists = await models.findOne({
      where: {
        [elment]: dto[elment],
      },
    });
    if (exists) {
      data_exists.push(`El ${elment} ya se encuentra registrado`);
    }
  }
  return data_exists;
};
