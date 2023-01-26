import { createElement, XElement, BoundInput } from '/lib/index.js';
class Elem extends XElement {
  constructor(props) {
    super(props);
    this.addState('count', 0);
  }

  render() {
    return (
      <div>
        <h1>hello world!</h1>
        <button eventListeners={{ click: () => this.states.count++ }}>
          count is {this.states.count}
        </button>
        <Dumb name="bob" age={42} />
        <BoundInput 
      </div>
    );
  }
}

class Dumb extends XElement {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.name}s' age is
        {this.props.age}
      </div>
    );
  }
}

document.body.appendChild(<Elem />);
