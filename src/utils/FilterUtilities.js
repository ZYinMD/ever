  
  
  export const filterSoloPracData = (category, pimsId, fbNumber ) => {
  return (!(category && (category === "Supplier Individual" || category === "Professional")
          && (JSON.stringify(pimsId).startsWith('20')) && fbNumber  != 'undefined' ))              
  }