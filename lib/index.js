export class XElement {
  constructor(props) {
    this.props = props;
    this.states = {};
  }

  addState(stateName, initValue) {
    let val = initValue;
    const self = this;
    Object.defineProperty(this.states, stateName, {
      get() {
        return val;
      },
      set(value) {
        val = value;
        self.whenStateChange();
      },
    });
  }
  render() {}
}

export class BoundInput extends XElement {
  constructor(props) {
    super(props);
  }

  render() {
    return <input {...this.props} eventListeners={...(this.props.eventListeners || {}), {"change": (e) => this.props.boundState=e.target.value}}/>
  }
}

export function createElement(type, t, ...children) {
  if (type == 'Fragment') {
    return children;
  }
  if (type.prototype instanceof XElement) {
    t = t || {};
    const e = new type(Object.assign(t, { children: children }));
    let elem = e.render();
    e.whenStateChange = () => {
      const newElem = e.render();

      elem.replaceWith(newElem);
      elem = newElem;
      console.log(elem);
    };

    return elem;
  }
  var elem = document.createElement(type);
  let { eventListeners, ...attrs } = t || {};
  eventListeners = eventListeners || {};
  Object.keys(attrs).forEach((v) => elem.setAttribute(v, attrs[v]));
  Object.keys(eventListeners).forEach((e) =>
    elem.addEventListener(e, eventListeners[e])
  );
  elem.replaceChildren(...children);
  eventListeners;
  return elem;
}
