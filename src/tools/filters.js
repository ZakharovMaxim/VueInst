const filters = [
  {
    name: 'Затемнение',
    min: 0,
    max: 2,
    units: '',
    canvasName: 'brightness',
    value: 0.5,
    presentValue: 0.5,
    active: false
  },
  {
    name: 'Размытие',
    min: 0,
    max: 2,
    units: 'px',
    canvasName: 'blur',
    value: 1,
    presentValue: 1,
    active: false
  },
  {
    name: 'Контраст',
    min: 50,
    max: 400,
    units: '%',
    canvasName: 'contrast',
    value: 50,
    presentValue: 50,
    active: false
  },
  {
    name: 'Серый',
    min: 0,
    max: 100,
    units: '%',
    canvasName: 'grayscale',
    value: 0,
    presentValue: 0,
    active: false
  },
  {
    name: 'hue-rotate',
    min: 0,
    max: 180,
    units: 'deg',
    canvasName: 'hue-rotate',
    value: 0,
    presentValue: 0,
    active: false
  },
  {
    name: 'Инверсия',
    min: 0,
    max: 100,
    units: '%',
    canvasName: 'invert',
    value: 0,
    presentValue: 0,
    active: false
  },
  {
    name: 'Непрозрачность',
    min: 0,
    max: 100,
    units: '%',
    canvasName: 'opacity',
    value: 100,
    presentValue: 100,
    active: false
  },
  {
    name: 'saturable',
    min: 0,
    max: 100,
    units: '%',
    canvasName: 'saturate',
    value: 100,
    presentValue: 100,
    active: false
  },
  {
    name: 'sepia',
    min: 0,
    max: 100,
    units: '%',
    canvasName: 'sepia',
    value: 100,
    presentValue: 100,
    active: false
  }
]

export default filters
