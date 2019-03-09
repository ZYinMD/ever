/*Z
This function generateds the category name to be displayed on the top left corder underneath the provider name
*/

export default function prepareCategory(data) {
  if (Array.isArray(data)) // came from 404
    return data[0].category || '';
  else
    return data.providerDetailTypeName || '';
}

