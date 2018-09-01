"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Memoize = Memoize;
const cache = new Map();

function isValidKey() {
  return false;
}

function Memoize(target, prop, descriptor) {
  // This won't make sense if we are a class prop; if so, bug out
  if (typeof descriptor.initializer) return descriptor; // If we have only a setter, we can skip out

  if (descriptor.set && !descriptor.get && !descriptor.value) return descriptor; // If we do not have a get function and value is not a function, jet

  if (typeof descriptor.value !== 'function' && !descriptor.get) {
    return descriptor;
  } // Our passed arguments and function make our key


  const key = {
    target,
    prop,
    descriptor,
    func: descriptor.get || descriptor.value,
    args: [],
    validate: isValidKey // In order to determine if we have a match on key we must allow execution
    // of a wrapper function that does so

  };

  const wrapper = (...args) => {
    key.args = args; // TODO check for cache hit by comparing objects
    // return the cache if a hit or run the function and store otherwise

    if (key.validate()) {
      return cache.get(key);
    } else {
      let results;

      try {
        let results = key.func.apply(target, key.args);
        cache.set(key, results);
      } catch (error) {
        results = error;
      }
    }
  };

  if (descriptor.get) {
    descriptor.get = wrapper;
  } else {
    descriptor.value = wrapper;
  }

  return descriptor;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9kZWNvcmF0b3JzL01lbW9pemUuanMiXSwibmFtZXMiOlsiY2FjaGUiLCJNYXAiLCJpc1ZhbGlkS2V5IiwiTWVtb2l6ZSIsInRhcmdldCIsInByb3AiLCJkZXNjcmlwdG9yIiwiaW5pdGlhbGl6ZXIiLCJzZXQiLCJnZXQiLCJ2YWx1ZSIsImtleSIsImZ1bmMiLCJhcmdzIiwidmFsaWRhdGUiLCJ3cmFwcGVyIiwicmVzdWx0cyIsImFwcGx5IiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE1BQU1BLEtBQUssR0FBRyxJQUFJQyxHQUFKLEVBQWQ7O0FBRUEsU0FBU0MsVUFBVCxHQUErQjtBQUM3QixTQUFPLEtBQVA7QUFDRDs7QUFFTSxTQUFTQyxPQUFULENBQ0xDLE1BREssRUFFTEMsSUFGSyxFQUdMQyxVQUhLLEVBSUk7QUFDVDtBQUNBLE1BQUksT0FBT0EsVUFBVSxDQUFDQyxXQUF0QixFQUFtQyxPQUFPRCxVQUFQLENBRjFCLENBSVQ7O0FBQ0EsTUFBSUEsVUFBVSxDQUFDRSxHQUFYLElBQWtCLENBQUNGLFVBQVUsQ0FBQ0csR0FBOUIsSUFBcUMsQ0FBQ0gsVUFBVSxDQUFDSSxLQUFyRCxFQUE0RCxPQUFPSixVQUFQLENBTG5ELENBT1Q7O0FBQ0EsTUFDRSxPQUFPQSxVQUFVLENBQUNJLEtBQWxCLEtBQTRCLFVBQTVCLElBQ0csQ0FBQ0osVUFBVSxDQUFDRyxHQUZqQixFQUdFO0FBQ0EsV0FBT0gsVUFBUDtBQUNELEdBYlEsQ0FlVDs7O0FBQ0EsUUFBTUssR0FBRyxHQUFHO0FBQ1ZQLElBQUFBLE1BRFU7QUFFVkMsSUFBQUEsSUFGVTtBQUdWQyxJQUFBQSxVQUhVO0FBS1ZNLElBQUFBLElBQUksRUFBRU4sVUFBVSxDQUFDRyxHQUFYLElBQWtCSCxVQUFVLENBQUNJLEtBTHpCO0FBTVZHLElBQUFBLElBQUksRUFBRSxFQU5JO0FBT1ZDLElBQUFBLFFBQVEsRUFBRVosVUFQQSxDQVVaO0FBQ0E7O0FBWFksR0FBWjs7QUFZQSxRQUFNYSxPQUFPLEdBQUcsQ0FBQyxHQUFHRixJQUFKLEtBQWE7QUFDM0JGLElBQUFBLEdBQUcsQ0FBQ0UsSUFBSixHQUFXQSxJQUFYLENBRDJCLENBRzNCO0FBQ0E7O0FBQ0EsUUFBSUYsR0FBRyxDQUFDRyxRQUFKLEVBQUosRUFBb0I7QUFDbEIsYUFBT2QsS0FBSyxDQUFDUyxHQUFOLENBQVVFLEdBQVYsQ0FBUDtBQUNELEtBRkQsTUFHSztBQUNILFVBQUlLLE9BQUo7O0FBRUEsVUFBSTtBQUNGLFlBQUlBLE9BQU8sR0FBR0wsR0FBRyxDQUFDQyxJQUFKLENBQVNLLEtBQVQsQ0FBZWIsTUFBZixFQUF1Qk8sR0FBRyxDQUFDRSxJQUEzQixDQUFkO0FBQ0FiLFFBQUFBLEtBQUssQ0FBQ1EsR0FBTixDQUFVRyxHQUFWLEVBQWVLLE9BQWY7QUFDRCxPQUhELENBSUEsT0FBT0UsS0FBUCxFQUFjO0FBQ1pGLFFBQUFBLE9BQU8sR0FBR0UsS0FBVjtBQUNEO0FBQ0Y7QUFDRixHQW5CRDs7QUFxQkEsTUFBSVosVUFBVSxDQUFDRyxHQUFmLEVBQW9CO0FBQ2xCSCxJQUFBQSxVQUFVLENBQUNHLEdBQVgsR0FBaUJNLE9BQWpCO0FBQ0QsR0FGRCxNQUdLO0FBQ0hULElBQUFBLFVBQVUsQ0FBQ0ksS0FBWCxHQUFtQkssT0FBbkI7QUFDRDs7QUFFRCxTQUFPVCxVQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG5jb25zdCBjYWNoZSA9IG5ldyBNYXAoKVxuXG5mdW5jdGlvbiBpc1ZhbGlkS2V5KCk6IGJvb2xlYW4ge1xuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1lbW9pemUoXG4gIHRhcmdldDogbWl4ZWQsXG4gIHByb3A6IHN0cmluZyxcbiAgZGVzY3JpcHRvcjogT2JqZWN0XG4pOiA/T2JqZWN0IHtcbiAgLy8gVGhpcyB3b24ndCBtYWtlIHNlbnNlIGlmIHdlIGFyZSBhIGNsYXNzIHByb3A7IGlmIHNvLCBidWcgb3V0XG4gIGlmICh0eXBlb2YgZGVzY3JpcHRvci5pbml0aWFsaXplcikgcmV0dXJuIGRlc2NyaXB0b3JcblxuICAvLyBJZiB3ZSBoYXZlIG9ubHkgYSBzZXR0ZXIsIHdlIGNhbiBza2lwIG91dFxuICBpZiAoZGVzY3JpcHRvci5zZXQgJiYgIWRlc2NyaXB0b3IuZ2V0ICYmICFkZXNjcmlwdG9yLnZhbHVlKSByZXR1cm4gZGVzY3JpcHRvclxuXG4gIC8vIElmIHdlIGRvIG5vdCBoYXZlIGEgZ2V0IGZ1bmN0aW9uIGFuZCB2YWx1ZSBpcyBub3QgYSBmdW5jdGlvbiwgamV0XG4gIGlmIChcbiAgICB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSAhPT0gJ2Z1bmN0aW9uJ1xuICAgICYmICFkZXNjcmlwdG9yLmdldFxuICApIHtcbiAgICByZXR1cm4gZGVzY3JpcHRvclxuICB9XG5cbiAgLy8gT3VyIHBhc3NlZCBhcmd1bWVudHMgYW5kIGZ1bmN0aW9uIG1ha2Ugb3VyIGtleVxuICBjb25zdCBrZXkgPSB7XG4gICAgdGFyZ2V0LFxuICAgIHByb3AsXG4gICAgZGVzY3JpcHRvcixcblxuICAgIGZ1bmM6IGRlc2NyaXB0b3IuZ2V0IHx8IGRlc2NyaXB0b3IudmFsdWUsXG4gICAgYXJnczogW10sXG4gICAgdmFsaWRhdGU6IGlzVmFsaWRLZXlcbiAgfVxuXG4gIC8vIEluIG9yZGVyIHRvIGRldGVybWluZSBpZiB3ZSBoYXZlIGEgbWF0Y2ggb24ga2V5IHdlIG11c3QgYWxsb3cgZXhlY3V0aW9uXG4gIC8vIG9mIGEgd3JhcHBlciBmdW5jdGlvbiB0aGF0IGRvZXMgc29cbiAgY29uc3Qgd3JhcHBlciA9ICguLi5hcmdzKSA9PiB7XG4gICAga2V5LmFyZ3MgPSBhcmdzO1xuXG4gICAgLy8gVE9ETyBjaGVjayBmb3IgY2FjaGUgaGl0IGJ5IGNvbXBhcmluZyBvYmplY3RzXG4gICAgLy8gcmV0dXJuIHRoZSBjYWNoZSBpZiBhIGhpdCBvciBydW4gdGhlIGZ1bmN0aW9uIGFuZCBzdG9yZSBvdGhlcndpc2VcbiAgICBpZiAoa2V5LnZhbGlkYXRlKCkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCByZXN1bHRzXG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGxldCByZXN1bHRzID0ga2V5LmZ1bmMuYXBwbHkodGFyZ2V0LCBrZXkuYXJncylcbiAgICAgICAgY2FjaGUuc2V0KGtleSwgcmVzdWx0cylcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXN1bHRzID0gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGRlc2NyaXB0b3IuZ2V0KSB7XG4gICAgZGVzY3JpcHRvci5nZXQgPSB3cmFwcGVyXG4gIH1cbiAgZWxzZSB7XG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IHdyYXBwZXJcbiAgfVxuXG4gIHJldHVybiBkZXNjcmlwdG9yXG59XG4iXX0=