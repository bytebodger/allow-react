import { allow as core } from '@toolz/allow';
import React from 'react';

const Allow = () => {
   const anArrayOfReactElements = (value, minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      core.anArray(value).anInteger(minLength, is.not.negative).anInteger(maxLength, is.not.negative);
      if (core.getAllowNull() && value === null)
         return allow;
      value.forEach(item => core.anInteger(item));
      core.checkLength(value, minLength, maxLength);
      return allow;
   };
   
   const aReactElement = value => {
      if (!React.isValidElement(value))
         return core.fail(value, 'is not a React element');
      return allow;
   };
   
   const is = {not: {negative: 0}};
   
   return {
      aBoolean: core.aBoolean,
      aFunction: core.aFunction,
      anArray: core.anArray,
      anArrayOfArrays: core.anArrayOfArrays,
      anArrayOfInstances: core.anArrayOfInstances,
      anArrayOfIntegers: core.anArrayOfIntegers,
      anArrayOfNumbers: core.anArrayOfNumbers,
      anArrayOfObjects: core.anArrayOfObjects,
      anArrayOfReactElements,
      anArrayOfStrings: core.anArrayOfStrings,
      anInstanceOf: core.anInstanceOf,
      anInteger: core.anInteger,
      anObject: core.anObject,
      aNumber: core.aNumber,
      aReactElement,
      aString: core.aString,
      getAllowNull: core.getAllowNull,
      getFailureBehavior: core.getFailureBehavior,
      getOnFailure: core.getOnFailure,
      oneOf: core.oneOf,
      setAllowNull: core.setAllowNull,
      setOnFailure: core.setOnFailure,
      setFailureBehavior: core.setFailureBehavior,
   };
};

export const allow = Allow();
