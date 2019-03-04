


class StringUtilities {

  static createGUIDArray(length){
  
     var uniqeIds = [];

     for(let i=0;i<length;i++){
       var idAddedTOArray = false;

       while(!idAddedTOArray){
         var newID = this.createGUID();
         var isIncluded = uniqeIds.includes(newID);

         if(!isIncluded){
           uniqeIds.push(newID);
           idAddedTOArray = true;
         }
       }
     }

     return uniqeIds;

   }

   static createGUID(){
     var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
       var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
       return v.toString(16);
     });

     return guid;
   }


}
export default StringUtilities;
