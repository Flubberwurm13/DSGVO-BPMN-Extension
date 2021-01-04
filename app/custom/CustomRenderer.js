import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import PathMap from './PathMap.js'

import {
  append as svgAppend,
  attr as svgAttr,
  classes as svgClasses,
  create as svgCreate
} from 'tiny-svg';

import {
  getRoundRectPath
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';


const HIGH_PRIORITY = 1500,
      TASK_BORDER_RADIUS = 2,
      COLOR_GREEN = '#52B415',
      COLOR_YELLOW = '#ffc800',
      COLOR_RED = '#cc0000';


export default class CustomRenderer extends BaseRenderer {

  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {

    // ignore labels
    return !element.labelTarget;
  }

  drawShape(parentNode, element) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);


    if (is(element, 'dsgvo:UnrechtmaessigeVerarbeitung')) {
      const rect = drawRect(parentNode, 100, 80, TASK_BORDER_RADIUS);
      var x = 15;
      var y = 12;

      var pathData = this.getScaledPath('Unrechtmaessige_Verarbeitung', {
        abspos: {
          x: x,
          y: y
        }
      });
      drawPath(pathData, {
        strokeWidth: 0.5,
      });

      return shape;
    }

    return shape;
  }

  getShapePath(shape) {
    if (is(shape, 'bpmn:Task')) {
      return getRoundRectPath(shape, TASK_BORDER_RADIUS);
    }

    return this.bpmnRenderer.getShapePath(shape);
  }




}

CustomRenderer.$inject = [ 'eventBus', 'bpmnRenderer' ];

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, color) {
  const rect = svgCreate('rect');

  svgAttr(rect, {
    width: width,
    height: height,
    rx: borderRadius,
    ry: borderRadius,
    stroke: color,
    strokeWidth: 2,
    fill: color
  });

  svgAppend(parentNode, rect);

  return rect;
}
function drawPath(parentGfx, d, attrs) {

  attrs = computeStyle(attrs, [ 'no-fill' ], {
    strokeWidth: 2,
    stroke: 'black'
  });

  var path = svgCreate('path');
  svgAttr(path, { d: d });
  svgAttr(path, attrs);

  svgAppend(parentGfx, path);

  return path;
}