import { dia, elementTools, linkTools } from '@clientio/rappid'
export const boundaryTool = new elementTools.Boundary()
export const removeButton = new elementTools.Remove()
export const connecetTool = new elementTools.Connect()

function getMarkup(angle = 0) {
  return [
    {
      tagName: 'circle',
      selector: 'button',
      attributes: {
        r: 7,
        fill: '#4666E5',
        stroke: '#FFFFFF',
        cursor: 'pointer',
      },
    },
    {
      tagName: 'path',
      selector: 'icon',
      attributes: {
        transform: `rotate(${angle})`,
        d: 'M -4 -1 L 0 -1 L 0 -4 L 4 0 L 0 4 0 1 -4 1 z',
        fill: '#FFFFFF',
        stroke: 'none',
        'stroke-width': 2,
        'pointer-events': 'none',
      },
    },
  ]
}

export const infoButton = new linkTools.Button({
  focusOpacity: 0.5,
  distance: 60,
  action: function(evt) {
      alert("info button");
  },
  markup: [{
      tagName: 'circle',
      selector: 'button',
      attributes: {
          'r': 8,
          'fill': '#001DFF',
          'cursor': 'pointer'
      }
  }, {
      tagName: 'path',
      selector: 'icon',
      attributes: {
          'd': 'M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4',
          'fill': 'none',
          'stroke': '#FFFFFF',
          'stroke-width': 2,
          'pointer-events': 'none'
      }
  }]
});

export const connectRight = new elementTools.Connect({
  x: '100%',
  y: '50%',
  markup: getMarkup(0),
})

export const connectBottom = new elementTools.Connect({
  x: '50%',
  y: '100%',
  markup: getMarkup(90),
})
export const connectTop = new elementTools.Connect({
  x: '50%',
  y: '0%',
  markup: getMarkup(270),
})
export const connectLeft = new elementTools.Connect({
  x: '0%',
  y: '50%',
  markup: getMarkup(180),
})


export const toolsView = new dia.ToolsView({
    tools: [
      boundaryTool,
      removeButton,
      connectLeft,
      connectRight,
      connectBottom,
      connectTop,
    ],
  })