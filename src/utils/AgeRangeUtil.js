/**
 * Created by g6xt on 3/13/2018.
 */
import React from 'react';

export const ValidateAgeRangeValue = (updatedObj) => {
  const restrictNumb = /^[0-9\b]*$/;
  if (restrictNumb.test(updatedObj) && updatedObj <= 999 && updatedObj >= 0 && updatedObj.length <=3) {
     return true;
  }
  else {
    return false;
  }
  }