const filters = [
  {
    name: 'Затемнение',
    min: 0,
    max: 2,
    units: '',
    canvasName: 'brightness',
    defaultValue: 0.5
  },
  {
    name: 'Размытие',
    min: 0,
    max: 2,
    units: 'px',
    canvasName: 'blur',
    defaultValue: 1
  },
  {
    name: 'Контраст',
    min: 50,
    max: 400,
    units: '%',
    canvasName: 'contrast',
    defaultValue: 50
  },
  {
    name: 'Серый',
    min: 0,
    max: 100,
    units: '%',
    canvasName: 'grayscale',
    defaultValue: 0
  },
  {
    name: 'hue-rotate',
    min: 0,
    max: 180,
    units: 'deg',
    canvasName: 'hue-rotate',
    defaultValue: 0
  },
  {
    name: 'Инверсия',
    min: 0,
    max: 100,
    units: '%',
    canvasName: 'invert',
    defaultValue: 0
  },
  {
    name: 'Непрозрачность',
    min: 0,
    max: 100,
    units: '%',
    canvasName: 'opacity',
    defaultValue: 100
  },
  {
    name: 'saturable',
    min: 0,
    max: 100,
    units: '%',
    canvasName: 'saturate',
    defaultValue: 100
  },
  {
    name: 'sepia',
    min: 0,
    max: 100,
    units: '%',
    canvasName: 'sepia',
    defaultValue: 100
  }
]

export default filters
