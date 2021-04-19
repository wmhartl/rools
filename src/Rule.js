import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import isInteger from 'lodash/isInteger';
import isString from 'lodash/isString';
import assert from 'assert';
import arrify from 'arrify';

class Rule {
  constructor({
    name, when, then, priority = 0, final = false, extend, activationGroup,
  }) {
    this.name = name;
    this.when = arrify(when);
    this.then = then;
    this.priority = priority;
    this.final = final;
    this.extend = arrify(extend);
    this.activationGroup = activationGroup;
    this.assert();
  }

  assert() {
    assert.ok(
      this.name,
      '"name" is required',
    );
    assert.ok(
      isString(this.name),
      '"name" must be a string',
    );
    assert.ok(
      this.when.length,
      '"when" is required with at least one premise',
    );
    assert.ok(
      this.when.reduce((acc, premise) => acc && isFunction(premise), true),
      '"when" must be a function or an array of functions',
    );
    assert.ok(
      this.then,
      '"then" is required',
    );
    assert.ok(
      isFunction(this.then),
      '"then" must be a function',
    );
    assert.ok(
      isInteger(this.priority),
      '"priority" must be an integer',
    );
    assert.ok(
      isBoolean(this.final),
      '"final" must be a boolean',
    );
    assert.ok(
      this.extend.reduce((acc, rule) => acc && (rule instanceof Rule), true),
      '"extend" must be a Rule or an array of Rules',
    );
    assert.ok(
      !this.activationGroup || isString(this.activationGroup),
      '"activationGroup" must be a string',
    );
  }
}

export default Rule;
