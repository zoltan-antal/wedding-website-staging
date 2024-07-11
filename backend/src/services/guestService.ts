import { QueryTypes } from 'sequelize';
import { sequelize } from '../utils/db';

interface FullName {
  firstName: string;
  lastName: string;
}

const getGuestByName = async ({ firstName, lastName }: FullName) => {
  const guest = await sequelize.query(
    "SELECT g.* FROM guests g LEFT JOIN name_variations first_nv ON g.id = first_nv.guest_id AND first_nv.type = 'first' LEFT JOIN name_variations last_nv ON g.id = last_nv.guest_id AND last_nv.type = 'last' WHERE (UNACCENT(g.first_name) ILIKE :firstName OR UNACCENT(first_nv.name) ILIKE :firstName) AND (UNACCENT(g.last_name) ILIKE :lastName OR UNACCENT(last_nv.name) ILIKE :lastName);",
    {
      replacements: {
        firstName: firstName.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
        lastName: lastName.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      },
      type: QueryTypes.SELECT,
      plain: true,
    }
  );

  return guest;
};

export default { getGuestByName };
