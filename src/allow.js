import { allow as core } from '@toolz/allow';
import React from 'react';
import { isARegularObject } from '@toolz/is-a-regular-object-react';

const Allow = () => {
   const anArrayOfObjects = (value, minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      core.anArray(value).anInteger(minLength, is.not.negative).anInteger(maxLength, is.not.negative);
      if (core.getAllowNull() && value === null)
         return allow;
      let reactElementFound = false;
      value.forEach(item => {
         if (reactElementFound)
            return;
         if (React.isValidElement(item))
            return core.fail(item, 'is a React element');
         core.anObject(item);
      });
      core.checkLength(value, minLength, maxLength);
      return allow;
   };
   
   const anArrayOfReactElements = (value, minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      core.anArray(value).anInteger(minLength, is.not.negative).anInteger(maxLength, is.not.negative);
      if (core.getAllowNull() && value === null)
         return allow;
      value.forEach(item => aReactElement(item));
      core.checkLength(value, minLength, maxLength);
      return allow;
   };
   
   const anObject = (value, minNumberOfKeys = 0, maxNumberOfKeys = Number.MAX_SAFE_INTEGER) => {
      core.anInteger(minNumberOfKeys, is.not.negative).anInteger(maxNumberOfKeys, is.not.negative);
      if (React.isValidElement(value))
         return core.fail(value, 'is a React element');
      if (!isARegularObject(value))
         return core.fail(value, 'is not an object');
      core.checkLength(Object.keys(value), minNumberOfKeys, maxNumberOfKeys);
      return allow;
   };
   
   const aReactElement = value => {
      if (!React.isValidElement(value))
         return core.fail(value, 'is not a React element');
      return allow;
   };
   
   const is = {not: {negative: 0}};

   const oneOf = (value, allowedValues) => {
      if (core.getAllowNull() && value === null)
         return allow;
      if (isARegularObject(value) || Array.isArray(value) || typeof value === 'function' || React.isValidElement(value)) {
         core.fail(value, 'cannot be an object, array, function, or a React element');
         return allow;
      }
      if (React.isValidElement(value) || typeof allowedValues !== 'object' || allowedValues === null) {
         core.fail(allowedValues, 'allowedValues must be supplied in an object or an array');
         return allow;
      }
      if (Array.isArray(allowedValues)) {
         if (!allowedValues.some(allowedValue => value === allowedValue))
            return core.fail(value, 'is not an allowed value');
         return allow;
      }
      const entries = Object.entries(allowedValues);
      if (!entries.some(entry => entry[1] === value))
         return core.fail(value, 'is not an allowed value');
      return allow;
   };
   
   return {
      aBoolean: core.aBoolean,
      aFunction: core.aFunction,
      anArray: core.anArray,
      anArrayOfArrays: core.anArrayOfArrays,
      anArrayOfInstances: core.anArrayOfInstances,
      anArrayOfIntegers: core.anArrayOfIntegers,
      anArrayOfNumbers: core.anArrayOfNumbers,
      anArrayOfObjects,
      anArrayOfReactElements,
      anArrayOfStrings: core.anArrayOfStrings,
      anInstanceOf: core.anInstanceOf,
      anInteger: core.anInteger,
      anObject,
      aNumber: core.aNumber,
      aReactElement,
      aString: core.aString,
      getAllowNull: core.getAllowNull,
      getFailureBehavior: core.getFailureBehavior,
      getOnFailure: core.getOnFailure,
      oneOf,
      setAllowNull: core.setAllowNull,
      setOnFailure: core.setOnFailure,
      setFailureBehavior: core.setFailureBehavior,
   };
};

export const allow = Allow();
