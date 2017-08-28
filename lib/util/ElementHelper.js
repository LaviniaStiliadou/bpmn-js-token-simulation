'use strict';

var every = require('lodash/every'),
    some = require('lodash/some');

module.exports.is = function(element, types) {

  if (element.type === 'label') {
    return;
  }

  if (!Array.isArray(types)) {
    types = [ types ];
  }

  var isType = false;

  types.forEach(function(type) {
    var bo = element.businessObject;

    if (bo && (typeof bo.$instanceOf === 'function') && bo.$instanceOf(type)) {
      isType = true;
    }
  });

  return isType;
};

module.exports.isTypedEvent = function(event, eventDefinitionType, filter) {
  
  function matches(definition, filter) {
    return every(filter, function(val, key) {

      // we want a == conversion here, to be able to catch
      // undefined == false and friends
      return definition[key] == val;
    });
  }

  return some(event.eventDefinitions, function(definition) {
    return definition.$type === eventDefinitionType && matches(event, filter);
  });
};

module.exports.getBusinessObject = function(element) {
  return (element && element.businessObject) || element;
};

module.exports.isParent = function(parent, child) {
  var childParent = child.parent;

  while (childParent) {
    if (childParent === parent) {
      return true;
    }

    childParent = childParent.parent;
  }

  return false;
};

module.exports.supportedElements = [
  'bpmn:Association',
  'bpmn:DataInputAssociation',
  'bpmn:DataOutputAssociation',
  'bpmn:DataObjectReference',
  'bpmn:DataStoreReference',
  'bpmn:EndEvent',
  'bpmn:ExclusiveGateway',
  'bpmn:IntermediateCatchEvent',
  'bpmn:ParallelGateway',
  'bpmn:SequenceFlow',
  'bpmn:StartEvent',
  'bpmn:SubProcess',
  'bpmn:Task',
  'bpmn:TextAnnotation'
];