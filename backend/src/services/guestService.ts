import { QueryTypes } from 'sequelize';
import { sequelize } from '../utils/db';

interface FullName {
  firstName: string;
  lastName: string;
}

const getGuestByName = async ({ firstName, lastName }: FullName) => {
  const guest = await sequelize.query(
    "SELECT g.* FROM guests g LEFT JOIN name_variations first_nv ON g.id = first_nv.guest_id AND first_nv.type = 'first' LEFT JOIN name_variations last_nv ON g.id = last_nv.guest_id AND last_nv.type = 'last' WHERE (g.first_name = :firstName OR first_nv.name = :firstName) AND (g.last_name = :lastName OR last_nv.name = :lastName);",
    {
      replacements: { firstName: firstName, lastName: lastName },
      type: QueryTypes.SELECT,
      plain: true,
    }
  );

  return guest;
};

export default { getGuestByName };
