/*
The 5 components to render the 5 tabs in this node are named Info, EducationInfo, License, QualityProgram, AdditionalInfo. However, the tab names that users see shouldn't be like this. Plus, the name of the first tab changes based depending on the entity
This function helps decide what the tabs is called.
*/

export default function decideTabTitle(componentName, data) {
  const lookUpTable = {
    Info: data.providerDetailTypeName + ' Info',
    EducationInfo: 'Education Info',
    License: 'License/Cert & Other Identifiers',
    QualityProgram: 'Quality Program',
    AdditionalInfo: 'Additional Info',
  };
  return lookUpTable[componentName] || 'unknown';
}
