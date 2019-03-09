/*Z
This function prepares the name shown on the top left corner
*/

import { firstNameFirst, getOrgFullName } from './ProfileHelper';

export default function prepareName(data) {
  if (Array.isArray(data)) // came from 404
    return data[0].displayName || '';
  if (data.individualName)
    return firstNameFirst(data.individualName[0]);
  if (data.organizationName)
    return getOrgFullName(data.organizationName, 'DBA');
  return '';
}

