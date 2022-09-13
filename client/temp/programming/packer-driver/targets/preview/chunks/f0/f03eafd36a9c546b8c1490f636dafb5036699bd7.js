System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, decodeHead, encodeHead, _dec, _class, _crd, ccclass, property, Main;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfHead(extras) {
    _reporterNs.report("Head", "./Untitle", _context.meta, extras);
  }

  function _reportPossibleCrUseOfdecodeHead(extras) {
    _reporterNs.report("decodeHead", "./Untitle", _context.meta, extras);
  }

  function _reportPossibleCrUseOfencodeHead(extras) {
    _reporterNs.report("encodeHead", "./Untitle", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      decodeHead = _unresolved_2.decodeHead;
      encodeHead = _unresolved_2.encodeHead;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a7ed6NgDIRA6rTi69E42ukP", "Main", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Main", Main = (_dec = ccclass('Main'), _dec(_class = class Main extends Component {
        start() {
          var client = new WebSocket("ws://127.0.0.1:9002");

          client.onopen = () => {
            this.schedule(() => {
              var head = {
                begin: 1,
                end: 2
              };
              client.send((_crd && encodeHead === void 0 ? (_reportPossibleCrUseOfencodeHead({
                error: Error()
              }), encodeHead) : encodeHead)(head));
            }, 1);
          };

          client.onmessage = /*#__PURE__*/_asyncToGenerator(function* (event) {
            var data = event.data;
            data = yield data.text();
            var ret = (_crd && decodeHead === void 0 ? (_reportPossibleCrUseOfdecodeHead({
              error: Error()
            }), decodeHead) : decodeHead)(data);
            console.log("\u4ECE\u670D\u52A1\u7AEF\u63A5\u6536\u6D88\u606F" + ret.begin + " === " + ret.end);
          });
        }

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f03eafd36a9c546b8c1490f636dafb5036699bd7.js.map