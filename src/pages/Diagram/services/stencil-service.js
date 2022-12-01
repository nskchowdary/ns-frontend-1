/*! JointJS+ v3.6.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2022 client IO

 2022-11-17 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/

import { ui, dia } from '@clientio/rappid';
import * as appShapes from '../shapes/app-shapes';

export class StencilService {
  create(paperScroller, snaplines) {
    this.stencil = new ui.Stencil({
      paper: paperScroller,
      snaplines: snaplines,
      width: 240,
      groups: this.getStencilGroups(),
      dropAnimation: true,
      groupsToggleButtons: true,
      paperOptions: function () {
        return {
          model: new dia.Graph(
            {},
            {
              cellNamespace: appShapes,
            }
          ),
          cellViewNamespace: appShapes,
        };
      },
      search: {
        '*': ['type', 'attrs/text/text', 'attrs/root/dataTooltip', 'attrs/label/text'],
        'org.Member': ['attrs/.rank/text', 'attrs/root/dataTooltip', 'attrs/.name/text'],
      },
      layout: {
        columns: 2,
        marginX: 10,
        marginY: 10,
        columnGap: 10,
        columnWidth: 100,
        // reset defaults
        resizeToFit: false,
        dx: 0,
        dy: 0,
      },
      // Remove tooltip definition from clone
      dragStartClone: (cell) => cell.clone().removeAttr('root/dataTooltip'),
    });
  }

  setShapes() {
    this.stencil.load(this.getStencilShapes());
  }

  getStencilGroups() {
    return {
      standard: { index: 1, label: 'Standard shapes' },
      //   fsa: { index: 2, label: 'State machine' },
      //   pn: { index: 3, label: 'Petri nets' },
      //   erd: { index: 4, label: 'Entity-relationship' },
      // uml: { index: 5, label: 'UML' },
      // org: { index: 6, label: 'ORG' }
    };
  }

  getStencilShapes() {
    return {
      standard: [
        {
          type: 'standard.Rectangle',
          size: { width: 90, height: 54 },
          attrs: {
            root: {
              dataTooltip: 'Rectangle',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            body: {
              rx: 2,
              ry: 2,
              width: 50,
              height: 30,
              fill: 'transparent',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0',
            },
            label: {
              text: 'rect',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0,
            },
          },
        },
        {
          type: 'standard.Ellipse',
          size: { width: 90, height: 54 },
          attrs: {
            root: {
              dataTooltip: 'Link',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            body: {
              width: 50,
              height: 30,
              fill: 'transparent',
              stroke: 'transparent',
              strokeWidth: 2,
              strokeDasharray: '0',
            },
            label: {
              text: 'custom line',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0,
            },
          },
        },
        {
          type: 'app.RectangularModel',
          size: { width: 90, height: 67.5 },
          allowOrthogonalResize: false,
          attrs: {
            root: {
              dataTooltip: 'Rectangle with ports',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            body: {
              fill: 'transparent',
              rx: 2,
              ry: 2,
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0',
            },
            label: {
              text: 'rect',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0,
            },
          },
          ports: {
            items: [{ group: 'in' }, { group: 'in' }, { group: 'out' }],
          },
        },
        {
          type: 'app.CircularModel',
          size: { width: 90, height: 54 },
          allowOrthogonalResize: false,
          attrs: {
            root: {
              dataTooltip: 'Ellipse with ports',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            body: {
              fill: 'transparent',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0',
            },
            label: {
              text: 'ellipse',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0,
            },
          },
          ports: {
            items: [{ group: 'in' }, { group: 'in' }, { group: 'out' }],
          },
        },
        {
          type: 'standard.Polygon',
          size: { width: 90, height: 54 },
          attrs: {
            root: {
              dataTooltip: 'Rhombus',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            body: {
              points: 'calc(0.5 * w),0 calc(w),calc(0.5 * h) calc(0.5 * w),calc(h) 0,calc(0.5 * h)',
              fill: 'transparent',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0',
            },
            label: {
              text: 'rhombus',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0,
            },
          },
        },
        {
          type: 'standard.Cylinder',
          size: { width: 90, height: 54 },
          attrs: {
            root: {
              dataTooltip: 'Cylinder',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            body: {
              fill: 'transparent',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0',
            },
            top: {
              fill: '#31d0c6',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0',
            },
            label: {
              text: 'cylinder',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0,
            },
          },
        },
        {
          type: 'standard.Image',
          size: { width: 90, height: 71 },
          attrs: {
            root: {
              dataTooltip: 'Image',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            image: {
              xlinkHref: '/assets/image-icon1.svg',
            },
            body: {
              fill: 'transparent',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0',
            },
            label: {
              text: 'image',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              fill: '#c6c7e2',
            },
          },
        },
        {
          type: 'standard.EmbeddedImage',
          size: { width: 90, height: 54 },
          attrs: {
            root: {
              dataTooltip: 'Card',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            body: {
              fill: 'transparent',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0',
            },
            image: {
              xlinkHref: '/assets/image-icon1.svg',
            },
            label: {
              text: 'card',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0,
            },
          },
        },
        {
          type: 'standard.InscribedImage',
          size: { width: 60, height: 60 },
          attrs: {
            root: {
              dataTooltip: 'Icon',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            border: {
              stroke: '#31d0c6',
              strokeWidth: 3,
              strokeDasharray: '0',
            },
            background: {
              fill: 'transparent',
            },
            image: {
              xlinkHref: '/assets/image-icon1.svg',
            },
            label: {
              text: 'icon',
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0,
            },
          },
        },
        {
          type: 'standard.HeaderedRectangle',
          size: { width: 90, height: 54 },
          attrs: {
            root: {
              dataTooltip: 'Rectangle with header',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            body: {
              fill: 'transparent',
              stroke: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0',
            },
            header: {
              stroke: '#31d0c6',
              fill: '#31d0c6',
              strokeWidth: 2,
              strokeDasharray: '0',
              height: 20,
            },
            bodyText: {
              textWrap: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur molestie.',
                width: -10,
                height: -20,
                ellipsis: true,
              },
              fill: '#c6c7e2',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0,
              refY2: 12,
            },
            headerText: {
              text: 'header',
              fill: '#f6f6f6',
              fontFamily: 'Roboto Condensed',
              fontWeight: 'Normal',
              fontSize: 11,
              strokeWidth: 0,
              refY: 12,
            },
          },
        },
      ],
      fsa: [
        {
          type: 'fsa.StartState',
          size: { width: 60, height: 60 },
          preserveAspectRatio: true,
          attrs: {
            root: {
              dataTooltip: 'Start State',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            circle: {
              'width': 50,
              'height': 30,
              'fill': '#61549c',
              'stroke-width': 0,
            },
            text: {
              'text': 'startState',
              'fill': '#c6c7e2',
              'font-family': 'Roboto Condensed',
              'font-weight': 'Normal',
              'font-size': 11,
              'stroke-width': 0,
            },
          },
        },
        {
          type: 'fsa.EndState',
          size: { width: 60, height: 60 },
          preserveAspectRatio: true,
          attrs: {
            'root': {
              dataTooltip: 'End State',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            '.inner': {
              fill: '#6a6c8a',
              stroke: 'transparent',
            },
            '.outer': {
              'fill': 'transparent',
              'stroke': '#61549c',
              'stroke-width': 2,
              'stroke-dasharray': '0',
            },
            'text': {
              'text': 'endState',
              'fill': '#c6c7e2',
              'font-family': 'Roboto Condensed',
              'font-weight': 'Normal',
              'font-size': 11,
              'stroke-width': 0,
            },
          },
        },
        {
          type: 'fsa.State',
          size: { width: 60, height: 60 },
          preserveAspectRatio: true,
          attrs: {
            root: {
              dataTooltip: 'State',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            circle: {
              'fill': '#6a6c8a',
              'stroke': '#61549c',
              'stroke-width': 2,
              'stroke-dasharray': '0',
            },
            text: {
              'text': 'state',
              'fill': '#c6c7e2',
              'font-family': 'Roboto Condensed',
              'font-weight': 'Normal',
              'font-size': 11,
              'stroke-width': 0,
            },
          },
        },
      ],
      pn: [
        {
          type: 'pn.Place',
          size: { width: 60, height: 60 },
          preserveAspectRatio: true,
          tokens: 3,
          attrs: {
            'root': {
              dataTooltip: 'Place',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            '.root': {
              'fill': 'transparent',
              'stroke': '#61549c',
              'stroke-width': 2,
              'stroke-dasharray': '0',
            },
            '.tokens circle': {
              'fill': '#6a6c8a',
              'stroke': '#000',
              'stroke-width': 0,
            },
            '.label': {
              'text': '',
              'font-family': 'Roboto Condensed',
              'font-weight': 'Normal',
            },
          },
        },
        {
          type: 'pn.Transition',
          size: { width: 14, height: 60 },
          preserveAspectRatio: true,
          attrs: {
            'root': {
              dataTooltip: 'Transition',
              dataTooltipPosition: 'left',
              dataTooltipPositionSelector: '.joint-stencil',
            },
            'rect': {
              'rx': 3,
              'ry': 3,
              'width': 12,
              'height': 50,
              'fill': '#61549c',
              'stroke': '#7c68fc',
              'stroke-width': 0,
              'stroke-dasharray': '0',
            },
            '.label': {
              'text': 'transition',
              'font-family': 'Roboto Condensed',
              'font-weight': 'Normal',
              'stroke-width': 0,
              'fill': '#222138',
            },
          },
        },
      ],
    };
  }
}
