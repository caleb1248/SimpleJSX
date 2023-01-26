import { createElement, XElement } from '/lib/index.js';
class Elem extends XElement {
  constructor(props) {
    super(props);
    this.addState('count', 0);
  }
  render() {
    return createElement("div", null, createElement("h1", null, "hello world!"), createElement("button", {
      eventListeners: {
        click: () => this.states.count++
      }
    }, "count is ", this.states.count), createElement(Dumb, {
      name: "bob",
      age: 42
    }));
  }
}
class Dumb extends XElement {
  constructor(props) {
    super(props);
  }
  render() {
    return createElement("div", null, this.props.name, "s' age is", this.props.age);
  }
}
document.body.appendChild(createElement(Elem, null));
